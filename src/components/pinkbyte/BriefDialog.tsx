import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUp, FileText, Paperclip, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message-shell";
import {
  PromptInput,
  PromptInputButton,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  usePromptInputAttachments,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import robot from "@/assets/robot-brief-seated.webp";
import mark from "@/assets/mark-pb.png.asset.json";
import { BRIEF_QUESTIONS, canSubmitAnswer, createBrief, type BriefAnswer } from "./brief-model";
import { Logo } from "./primitives";
import { BriefContactForm } from "./BriefContactForm";
import { useBriefViewport } from "./use-brief-viewport";

function ComposerTools({ text }: { text: string }) {
  const attachments = usePromptInputAttachments();
  return (
    <PromptInputFooter className="flex-wrap gap-2">
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        <PromptInputButton
          tooltip="Прикрепить бриф, примеры или схемы"
          aria-label="Прикрепить файл"
          onClick={() => attachments.openFileDialog()}
          className="pb-brief-attach h-9 rounded-lg px-2"
        >
          <Paperclip />
          <span className="text-xs">Прикрепить файл</span>
        </PromptInputButton>
        {attachments.files.map((file) => (
          <span
            key={file.id}
            className="flex max-w-full items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs text-foreground"
          >
            <FileText className="size-3 shrink-0" />
            <span className="max-w-36 truncate">{file.filename}</span>
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label={`Удалить ${file.filename}`}
              onClick={() => attachments.remove(file.id)}
            >
              <X />
            </Button>
          </span>
        ))}
      </div>
      <PromptInputSubmit
        aria-label="Отправить ответ"
        title="Отправить ответ"
        status="ready"
        disabled={
          !canSubmitAnswer({ text, files: attachments.files.map((f) => f.filename || "Файл") })
        }
        variant="secondary"
        className="size-10 shrink-0 rounded-lg"
      >
        <ArrowUp />
      </PromptInputSubmit>
    </PromptInputFooter>
  );
}

function BriefComposer({
  textarea,
  placeholder,
  onSubmit,
}: {
  textarea: React.RefObject<HTMLTextAreaElement | null>;
  placeholder: string | undefined;
  onSubmit: (message: PromptInputMessage) => void;
}) {
  const [text, setText] = useState("");
  return (
    <div className="pb-brief-composer shrink-0 pt-3">
      <PromptInput
        onSubmit={(message) => {
          onSubmit(message);
          setText("");
        }}
        multiple
        className="pb-composer-box"
      >
        <PromptInputTextarea
          ref={textarea}
          aria-label="Ваш ответ"
          placeholder={placeholder}
          enterKeyHint="send"
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="min-h-12 max-h-24 px-4 text-sm"
        />
        <ComposerTools text={text} />
      </PromptInput>
    </div>
  );
}

export default function BriefDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [answers, setAnswers] = useState<BriefAnswer[]>([]);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  useBriefViewport(open, dialog);
  const step = answers.length;
  const done = step === BRIEF_QUESTIONS.length;
  const current = BRIEF_QUESTIONS[step];
  const brief = useMemo(() => createBrief(answers), [answers]);
  const progress = Math.round((answers.length / BRIEF_QUESTIONS.length) * 100);
  useEffect(() => {
    if (!open || done || window.matchMedia("(max-width: 640px)").matches) return;
    const frame = requestAnimationFrame(() => textarea.current?.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(frame);
  }, [open, step, done]);
  function submit(message: PromptInputMessage) {
    const answer = {
      text: message.text.trim(),
      files: message.files.map((f) => f.filename || "Файл"),
    };
    if (!canSubmitAnswer(answer) || done) return;
    setAnswers((previous) => [...previous, answer]);
  }
  function download() {
    const url = URL.createObjectURL(new Blob([brief], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "Pink-Byte-ТЗ.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          ref={dialog}
          className={`pb-brief-dialog gap-0 overflow-visible border-border bg-background p-0 text-foreground${done ? " pb-brief-complete" : ""}`}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            if (!window.matchMedia("(max-width: 640px)").matches) {
              textarea.current?.focus({ preventScroll: true });
            }
          }}
        >
          <div
            className="pb-brief-robot pointer-events-none absolute z-20"
            aria-label="Робот Pink Byte сидит на нижней кромке, ноги свисают наружу"
          >
            <img src={robot} alt="" width={768} height={832} className="block h-auto w-full" />
            <span key={`mouth-${step}`} className="pb-brief-mouth" />
          </div>
          <div className="pb-brief-layout">
            <aside className="pb-brief-stage" aria-label="Уже в брифе">
              <Logo className="w-28" />
              <DialogTitle className="display mt-6 text-[44px]">
                Обсудим
                <br />{" "}
                ваш <span className="text-primary">проект.</span>
              </DialogTitle>
              <DialogDescription className="mt-4 text-sm leading-relaxed text-ink-muted">
                Нет ТЗ? Не страшно. Расскажите задачу своими словами: наш агент задаст нужные
                вопросы, а мы оценим проект и назовём цену.{" "}
                <span className="text-ink-foreground">Черновик ТЗ сделаем бесплатно.</span>
              </DialogDescription>
              <div className="pb-brief-notes mt-7 border-t border-ink-border pt-5">
                <div className="mb-3 flex items-baseline justify-between">
                  <span className="text-xs text-ink-muted">
                    {done ? "Исходные данные собраны" : "Робот оценивает объём работы"}
                  </span>
                  <span className="text-2xl font-extrabold tabular-nums text-primary">
                    {progress}%
                  </span>
                </div>
                <div
                  className={`relative${done ? " pb-progress-complete" : ""}`}
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progress}
                  aria-label="Оценка объёма работы"
                >
                  <span className="pb-progress-glow" style={{ right: `${100 - progress}%` }} />
                  <div className="pb-progress-track">
                    <div
                      className="pb-progress-fill"
                      style={{ transform: `scaleX(${progress / 100})` }}
                    />
                  </div>
                </div>
                {done && (
                  <p role="status" className="pb-progress-ready mt-3 text-sm font-medium text-primary">
                    Черновик вашего ТЗ готов
                  </p>
                )}
              </div>
            </aside>
            <div className="pb-brief-main flex min-h-0 flex-1 flex-col">
              <div className="flex shrink-0 items-center gap-2.5 border-b border-border pb-4 pr-10">
                <span className="pb-agent-mark" aria-hidden="true">
                  <img src={mark.url} alt="" width={28} height={28} />
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {done ? "Контакты для связи" : "Агент Pink Byte"}
                </span>
              </div>
              {done ? (
                <BriefContactForm brief={brief} onDownload={download} />
              ) : (
                <>
                  <Conversation className="min-h-0" key="conversation">
                    <ConversationContent className="gap-6 px-1 py-5">
                      {done ? (
                        <Message from="assistant" className="max-w-full">
                          <MessageContent className="w-full">
                            <p className="whitespace-pre-wrap break-words">{brief}</p>
                          </MessageContent>
                        </Message>
                      ) : answers.length ? (
                        answers.map((answer, index) => (
                          <div key={index} className="space-y-4">
                            <Message from="assistant">
                              <MessageContent className="pb-bubble-bot">
                                <p className="whitespace-pre-wrap break-words">
                                  {BRIEF_QUESTIONS[index]?.question ?? ""}
                                </p>
                              </MessageContent>
                            </Message>
                            <Message from="user">
                              <MessageContent className="pb-bubble-user pb-msg-in-right">
                                <p className="whitespace-pre-wrap break-words">{answer.text}</p>
                                {answer.files.map((name, k) => (
                                  <span key={k} className="flex items-center gap-2 text-xs">
                                    <FileText className="size-3 shrink-0" />
                                    {name}
                                  </span>
                                ))}
                              </MessageContent>
                            </Message>
                          </div>
                        ))
                      ) : null}
                      {!done && (
                        <Message
                          key={step}
                          from="assistant"
                          className="pb-chat-current"
                          aria-live="polite"
                        >
                          <MessageContent className="pb-bubble-bot pb-msg-in-left">
                            <p className="whitespace-pre-wrap break-words">{current?.question ?? ""}</p>
                          </MessageContent>
                        </Message>
                      )}
                    </ConversationContent>
                    <ConversationScrollButton />
                  </Conversation>
                  <BriefComposer textarea={textarea} placeholder={current?.placeholder} onSubmit={submit} />
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
  );
}
