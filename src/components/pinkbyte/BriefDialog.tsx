import { useRef, useState, type ReactNode } from "react";
import { ArrowUp, Check, Download, FileText, Paperclip, RotateCcw, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputButton,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  usePromptInputAttachments,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import robot from "@/assets/robot-brief-seated.png";
import { BRIEF_QUESTIONS, canSubmitAnswer, createBrief, type BriefAnswer } from "./brief-model";
import { Logo, TELEGRAM_URL } from "./primitives";
import { BriefContext } from "./brief-context";

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

export function BriefProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<BriefAnswer[]>([]);
  const [text, setText] = useState("");
  const textarea = useRef<HTMLTextAreaElement>(null);
  const step = answers.length;
  const done = step === BRIEF_QUESTIONS.length;
  const current = BRIEF_QUESTIONS[step];
  const brief = createBrief(answers);
  function submit(message: PromptInputMessage) {
    const answer = {
      text: message.text.trim(),
      files: message.files.map((f) => f.filename || "Файл"),
    };
    if (!canSubmitAnswer(answer) || done) return;
    setAnswers((previous) => [...previous, answer]);
    setText("");
    requestAnimationFrame(() => textarea.current?.focus());
  }
  function restart() {
    setAnswers([]);
    setText("");
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
    <BriefContext.Provider value={() => setOpen(true)}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="pb-brief-dialog gap-0 overflow-visible border-border bg-background p-0 text-foreground"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            textarea.current?.focus();
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
                <br />
                ваш <span className="text-primary">проект.</span>
              </DialogTitle>
              <DialogDescription className="mt-4 text-sm leading-relaxed text-ink-muted">
                Нет ТЗ — не страшно. Расскажите задачу своими словами: наш агент задаст
                нужные вопросы, а мы оценим проект и назовём цену.{" "}
                <span className="text-ink-foreground">Черновик ТЗ — бесплатно.</span>
              </DialogDescription>
              <div className="pb-brief-notes mt-7 min-h-0 flex-1 overflow-y-auto border-t border-ink-border pt-5">
                {answers.length ? (
                  <div className="space-y-4">
                    {answers.map((answer, index) => (
                      <div key={index}>
                        <p className="mb-1 text-[11px] text-primary">
                          {BRIEF_QUESTIONS[index]?.title}
                        </p>
                        <p className="line-clamp-2 break-words text-sm leading-relaxed">
                          {answer.text || "Материалы приложены"}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs leading-relaxed text-ink-muted">
                    Здесь будет собираться ваш бриф.
                  </p>
                )}
              </div>
            </aside>
            <div className="pb-brief-main flex min-h-0 flex-1 flex-col">
              <div className="flex shrink-0 items-center gap-2 border-b border-border pb-4 pr-10">
                <span className="pb-live-dot" />
                <span className="text-xs font-medium text-foreground">
                  {done ? "Ваш черновик ТЗ" : "Агент Pink Byte · онлайн"}
                </span>
              </div>
              <Conversation className="min-h-0" key={done ? "result" : "conversation"}>
                <ConversationContent className="gap-6 px-1 py-5">
                  {done ? (
                    <Message from="assistant" className="max-w-full">
                      <MessageContent className="w-full">
                        <MessageResponse>{brief}</MessageResponse>
                      </MessageContent>
                    </Message>
                  ) : answers.length ? (
                    answers.map((answer, index) => (
                      <div key={index} className="space-y-4">
                        <Message from="assistant">
                          <MessageContent className="pb-bubble-bot">
                            <MessageResponse>
                              {BRIEF_QUESTIONS[index]?.question ?? ""}
                            </MessageResponse>
                          </MessageContent>
                        </Message>
                        <Message from="user">
                          <MessageContent className="pb-bubble-user">
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
                      <MessageContent className="pb-bubble-bot">
                        <MessageResponse>{current?.question ?? ""}</MessageResponse>
                      </MessageContent>
                    </Message>
                  )}
                </ConversationContent>
                <ConversationScrollButton />
              </Conversation>
              <div className="pb-brief-composer shrink-0 pt-3">
                {done ? (
                  <div className="flex flex-wrap items-center gap-3">
                    <Button onClick={download} className="h-11 rounded-full px-5">
                      <Download />
                      Скачать ТЗ
                    </Button>
                    <Button asChild variant="secondary" className="h-11 rounded-full px-5">
                      <a href={TELEGRAM_URL} target="_blank" rel="noreferrer">
                        <Check />
                        Обсудить с командой
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Начать заново"
                      title="Начать заново"
                      onClick={restart}
                    >
                      <RotateCcw />
                    </Button>
                  </div>
                ) : (
                  <PromptInput
                    onSubmit={submit}
                    multiple
                    className="pb-composer-box"
                  >
                    <PromptInputTextarea
                      ref={textarea}
                      aria-label="Ваш ответ"
                      placeholder={current?.placeholder}
                      value={text}
                      onChange={(event) => setText(event.target.value)}
                      className="min-h-12 max-h-24 px-4 text-sm"
                    />
                    <ComposerTools text={text} />
                  </PromptInput>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </BriefContext.Provider>
  );
}
