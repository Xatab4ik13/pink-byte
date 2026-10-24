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
import robot from "@/assets/robot-sit.png.asset.json";
import { BRIEF_QUESTIONS, canSubmitAnswer, createBrief, type BriefAnswer } from "./brief-model";
import { TELEGRAM_URL } from "./primitives";
import { BriefContext } from "./brief-context";

function ComposerTools({ text }: { text: string }) {
  const attachments = usePromptInputAttachments();
  return (
    <PromptInputFooter className="flex-wrap gap-2">
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        <PromptInputButton
          tooltip="Прикрепить файл"
          aria-label="Прикрепить файл"
          onClick={() => attachments.openFileDialog()}
          className="size-10 rounded-full"
        >
          <Paperclip />
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
        className="size-10 shrink-0 rounded-full"
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
          className="pb-brief-dialog gap-0 overflow-visible border-ink-border bg-ink p-0 text-ink-foreground [&>button]:text-ink-foreground"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            textarea.current?.focus();
          }}
        >
          <img
            src={robot.url}
            alt="Робот Pink Byte сидит на нижнем краю окна"
            width={900}
            height={639}
            className="pb-brief-robot pointer-events-none absolute z-20"
          />
          <div className="pb-brief-heading relative shrink-0">
            <div className="pb-brief-intro">
              <div className="flex flex-wrap items-center gap-3 pr-6">
                <DialogTitle className="text-lg font-semibold tracking-normal">
                  Давайте создадим ваш проект.
                </DialogTitle>
                <span className="text-xs text-primary">ТЗ бесплатно</span>
              </div>
              <DialogDescription className="mt-2 text-xs text-ink-muted">
                Пробный диалог · без ИИ · файлы не отправляются
              </DialogDescription>
              <div
                key={step}
                className="pb-question relative mt-5 rounded-[20px] bg-primary px-5 py-4 text-primary-foreground"
                aria-live="polite"
                aria-atomic="true"
              >
                <Message from="assistant" className="max-w-full">
                  <MessageContent className="text-base font-semibold leading-snug">
                    <MessageResponse>
                      {done
                        ? "Готово! Собрал ваши ответы в черновик ТЗ. Его можно скачать и обсудить с командой."
                        : (current?.question ?? "")}
                    </MessageResponse>
                  </MessageContent>
                </Message>
              </div>
            </div>
          </div>
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-b-[24px] bg-background text-foreground">
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-5 py-3 md:px-8">
              <span className="text-xs font-medium text-muted-foreground">
                {done
                  ? "Ваш черновик ТЗ"
                  : `${step + 1} из ${BRIEF_QUESTIONS.length} · ${current?.title}`}
              </span>
              <div
                className="flex gap-1.5"
                aria-label={`Отвечено на ${step} из ${BRIEF_QUESTIONS.length} вопросов`}
              >
                {BRIEF_QUESTIONS.map((q, i) => (
                  <span
                    key={q.title}
                    className={`h-1 w-6 rounded-full ${i < step ? "bg-foreground" : i === step ? "bg-primary" : "bg-border"}`}
                  />
                ))}
              </div>
            </div>
            <Conversation className="min-h-0" key={done ? "result" : "conversation"}>
              <ConversationContent className="gap-5 px-5 py-5 md:px-8">
                {done ? (
                  <Message from="assistant" className="max-w-full">
                    <MessageContent className="w-full">
                      <MessageResponse>{brief}</MessageResponse>
                    </MessageContent>
                  </Message>
                ) : answers.length ? (
                  answers.map((answer, index) => (
                    <div key={index} className="space-y-2">
                      <p className="text-xs text-muted-foreground">
                        {BRIEF_QUESTIONS[index]?.title}
                      </p>
                      <Message from="user">
                        <MessageContent className="group-[.is-user]:bg-foreground group-[.is-user]:text-background">
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
                ) : (
                  <div className="flex items-center gap-3 py-3 text-sm text-muted-foreground">
                    <FileText className="size-5 shrink-0" />
                    <p>Начнём с вашей идеи.</p>
                  </div>
                )}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>
            <div className="pb-brief-composer shrink-0 border-t border-border p-4 md:px-8 md:py-5">
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
                  className="[&>[data-slot=input-group]]:rounded-xl [&>[data-slot=input-group]]:bg-background"
                >
                  <PromptInputTextarea
                    ref={textarea}
                    aria-label="Ваш ответ"
                    placeholder={current?.placeholder}
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    className="min-h-20 max-h-36 px-4 text-base"
                  />
                  <ComposerTools text={text} />
                </PromptInput>
              )}
              <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                {done
                  ? "Черновик составлен по вашим ответам, без анализа вложений."
                  : "Ответы останутся в этом окне до обновления страницы. Вложения — только для наброска."}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </BriefContext.Provider>
  );
}
