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
import { TELEGRAM_URL } from "./primitives";
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
          className="size-10 rounded-full"
        >
          <Paperclip />
          <span className="text-xs">Файлы</span>
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
          <div className="pb-brief-heading relative shrink-0">
            <div className="pb-brief-intro">
              <div className="flex flex-wrap items-center gap-3 pr-6">
                <DialogTitle className="text-2xl font-extrabold tracking-normal md:text-3xl">
                  Обсудим ваш проект
                </DialogTitle>
                <span className="text-xs font-medium text-muted-foreground">ТЗ бесплатно</span>
              </div>
              <DialogDescription className="mt-2 text-xs text-muted-foreground">
                Помощник Pink Byte · пробный диалог
              </DialogDescription>
            </div>
          </div>
          <div className="pb-brief-layout">
            <div className="pb-brief-main flex min-h-0 flex-1 flex-col">
              <div className="flex shrink-0 items-center justify-between gap-4 pb-3">
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
                <ConversationContent className="gap-5 p-1 pb-5">
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
                          <MessageContent className="group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground">
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
                    <div
                      key={step}
                      className="pb-question relative mr-3 rounded-[20px] border border-border bg-muted px-5 py-4"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      <Message from="assistant" className="max-w-full">
                        <MessageContent className="text-lg font-bold leading-snug">
                          <MessageResponse>{current?.question ?? ""}</MessageResponse>
                        </MessageContent>
                      </Message>
                    </div>
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
                    className="[&>[data-slot=input-group]]:rounded-xl [&>[data-slot=input-group]]:bg-background"
                  >
                    <PromptInputTextarea
                      ref={textarea}
                      aria-label="Ваш ответ"
                      placeholder={current?.placeholder}
                      value={text}
                      onChange={(event) => setText(event.target.value)}
                      className="min-h-12 max-h-24 px-4 text-base"
                    />
                    <ComposerTools text={text} />
                  </PromptInput>
                )}
                <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
                  {done
                    ? "Черновик составлен по вашим ответам, без анализа вложений."
                    : "Набросок без ИИ. Ответы и файлы не отправляются команде."}
                </p>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block text-[11px] text-muted-foreground underline underline-offset-4"
                >
                  Написать команде
                </a>
              </div>
            </div>
            <aside className="pb-brief-summary" aria-label="Уже в брифе">
              <h3 className="text-base font-bold">Уже в брифе</h3>
              {answers.length ? (
                <div className="mt-5 space-y-4">
                  {answers.map((answer, index) => (
                    <div key={index} className="border-b border-border pb-4 last:border-0">
                      <p className="mb-2 text-[11px] text-muted-foreground">
                        {BRIEF_QUESTIONS[index]?.title}
                      </p>
                      <p className="line-clamp-4 break-words text-sm leading-relaxed">
                        {answer.text || "Материалы приложены"}
                      </p>
                      {answer.files.length > 0 && (
                        <p className="mt-2 break-words text-xs text-muted-foreground">
                          {answer.files.join(", ")}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                  Пока начисто. Начнём с вашей идеи.
                </p>
              )}
            </aside>
          </div>
        </DialogContent>
      </Dialog>
    </BriefContext.Provider>
  );
}
