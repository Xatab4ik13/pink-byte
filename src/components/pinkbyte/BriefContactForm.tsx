import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, Check, Download, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { briefContactSchema, canDownloadBrief } from "./brief-contact-model";
import { submitBriefContact } from "./brief-contact.functions";

export function BriefContactForm({ brief, onDownload }: { brief: string; onDownload: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const send = useServerFn(submitBriefContact);
  const valid = briefContactSchema.safeParse({ name, email, phone, consent, brief }).success;
  const downloadable = canDownloadBrief(saved, consent);

  return (
    <form
      className="pb-brief-contact flex min-h-0 flex-1 flex-col"
      onSubmit={async (event) => {
        event.preventDefault();
        if (!valid || pending || saved) return;
        setPending(true);
        setError("");
        try {
          await send({ data: { name, email, phone, consent, brief } });
          setSaved(true);
        } catch {
          setError("Заявка не отправлена. Ваши данные сохранены в форме, попробуйте ещё раз.");
        } finally {
          setPending(false);
        }
      }}
    >
      <div className="pb-brief-contact-fields min-h-0 flex-1 px-1 py-6">
        <h3 className="text-3xl font-extrabold leading-tight">
          Получите ТЗ бесплатно.
        </h3>
        <p className="mb-6 mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Оставьте контакты и скачайте бесплатный черновик ТЗ. Мы изучим задачу и свяжемся с вами в
          течение дня.
        </p>
        {saved ? (
          <div role="status" className="border-t border-border py-6">
            <p className="flex items-center gap-2 font-semibold">
              <Check className="size-5" /> Заявка отправлена
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Теперь можно скачать ваш черновик ТЗ.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <label className="block space-y-2 text-sm font-medium">
              Имя
              <Input
                className="mt-2 h-11 rounded-lg bg-background"
                autoComplete="name"
                required
                minLength={2}
                maxLength={120}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Как к вам обращаться"
                disabled={pending}
              />
            </label>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium">
                Почта
                <Input
                  className="mt-2 h-11 rounded-lg bg-background"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.ru"
                  disabled={pending}
                />
              </label>
              <label className="block text-sm font-medium">
                Телефон{" "}
                <span className="text-xs font-normal text-muted-foreground">необязательно</span>
                <Input
                  className="mt-2 h-11 rounded-lg bg-background"
                  type="tel"
                  autoComplete="tel"
                  maxLength={40}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7"
                  disabled={pending}
                />
              </label>
            </div>
            <div className="flex items-start gap-3 pt-1">
              <Checkbox
                id="brief-consent"
                checked={consent}
                onCheckedChange={(value) => setConsent(value === true)}
                disabled={pending}
                className="mt-0.5 rounded"
              />
              <div className="min-w-0 text-xs leading-relaxed text-muted-foreground">
                <label htmlFor="brief-consent" className="cursor-pointer">
                  Я согласен на обработку персональных данных для обсуждения проекта и связи со
                  мной.
                </label>
                <details className="mt-1">
                  <summary className="cursor-pointer text-foreground underline underline-offset-4">
                    Условия согласия
                  </summary>
                  <p className="mt-2">
                    Разрешаю студии Pink Byte получить и хранить мои имя, почту, телефон и ответы из
                    брифа для оценки задачи и обратной связи. Согласие не распространяется на
                    рекламные рассылки. Для отзыва согласия можно обратиться в Telegram: @noirdig.
                  </p>
                </details>
              </div>
            </div>
          </div>
        )}
        {error && (
          <p role="alert" className="mt-4 text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
      <div className="pb-brief-composer flex shrink-0 flex-wrap items-center gap-3">
        {!saved && (
          <Button type="submit" disabled={!valid || pending} className="h-11 rounded-full px-5">
            {pending ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <ArrowUpRight className="size-4" />
            )}
            {pending ? "Отправляем…" : "Отправить и получить ТЗ"}
          </Button>
        )}
        <Button
          type="button"
          variant="secondary"
          disabled={!downloadable}
          onClick={() => {
            if (downloadable) onDownload();
          }}
          className="h-11 rounded-full px-5"
        >
          <Download className="size-4" /> Скачать ТЗ
        </Button>
      </div>
    </form>
  );
}
