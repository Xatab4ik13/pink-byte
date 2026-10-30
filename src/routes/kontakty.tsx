import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Minus, Paperclip, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Header } from "@/components/pinkbyte/Hero";
import { Footer } from "@/components/pinkbyte/Closing";
import { Reveal, SERVICE_LINKS, btn } from "@/components/pinkbyte/primitives";
import { useOpenBrief } from "@/components/pinkbyte/brief-context";
import { cn } from "@/lib/utils";
import bubbles from "@/assets/contacts-bubbles.webp.asset.json";
import whatsappIcon from "@/assets/whatsapp-icon.webp.asset.json";
import telegramIcon from "@/assets/telegram-icon.webp.asset.json";
import maxIcon from "@/assets/max-icon.webp.asset.json";
import mailIcon from "@/assets/mail-icon.webp.asset.json";

const TITLE = "Контакты Pink Byte · сайты, CRM и приложения под заказ";
const DESC =
  "Свяжитесь со студией Pink Byte в мессенджерах, по почте или через форму заявки. Разрабатываем корпоративные сайты, интернет-магазины, CRM-системы и мобильные приложения.";

/* Адреса каналов пришлём позже: достаточно вписать href, и ссылка станет рабочей. */
const CHANNELS = [
  { name: "WhatsApp", action: "Открыть чат", icon: whatsappIcon, href: "" },
  { name: "Telegram", action: "Открыть чат", icon: telegramIcon, href: "" },
  { name: "MAX", action: "Открыть чат", icon: maxIcon, href: "" },
  { name: "Почта", action: "Отправить письмо", icon: mailIcon, href: "" },
];

const CONSENT_TEXT =
  "Разрешаю студии Pink Byte получить и хранить мои имя, контакты, описание задачи и приложенные материалы для оценки проекта и обратной связи. Согласие не распространяется на рекламные рассылки. Отозвать согласие можно в Telegram: @noirdig.";

export const Route = createFileRoute("/kontakty")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactsPage,
});

function ContactsPage() {
  const openBrief = useOpenBrief();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [service, setService] = useState("");
  const [about, setAbout] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [notice, setNotice] = useState("");
  const [sent, setSent] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);

  return <>
    <div id="top" className="bg-ink text-ink-foreground">
      <Header />
      <section className="container-pb pt-4 pb-8 md:pt-6 md:pb-8" aria-labelledby="contacts-title">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <h1 id="contacts-title" className="pb-service-title font-display font-extrabold">
              Контакты
              <span className="block text-primary">Pink Byte</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-muted md:text-xl">
              Разрабатываем корпоративные сайты, интернет-магазины, CRM-системы и мобильные приложения.
            </p>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-muted md:text-xl">
              Работаем онлайн с заказчиками по всей России.
            </p>
          </div>
          <div className="relative mx-auto w-[min(300px,80vw)] md:w-[min(430px,80%)]">
            <img
              src={bubbles.url}
              alt="Два объёмных речевых пузыря: тёмный с тремя лаймовыми точками и светлый с двумя строками"
              width={961}
              height={914}
              fetchPriority="high"
              decoding="async"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </section>
      <section className="container-pb pb-10 md:pb-12">
        <Reveal className="flex flex-col items-start justify-between gap-5 rounded-[2rem] border border-ink-border p-5 md:flex-row md:items-center md:p-7">
          <div>
            <h2 className="font-display text-2xl font-extrabold leading-tight md:text-4xl">Составим ТЗ бесплатно.</h2>
            <p className="mt-3 text-sm text-ink-muted md:text-base">Ответьте на вопросы о проекте и получите ТЗ за 10 минут.</p>
            <p className="mt-1 text-sm text-ink-muted md:text-base">Оформим вашу идею в требования к разработке.</p>
          </div>
          <Button onClick={openBrief} className={`${btn.lime} shrink-0 h-auto px-10 py-4`}>Оставить ТЗ</Button>
        </Reveal>
      </section>
    </div>

    <main className="bg-background">
      <section className="container-pb pt-14 pb-4 md:pt-20" aria-labelledby="channels-title">
        <h2 id="channels-title" className="font-display text-4xl font-extrabold leading-none md:text-6xl">Напишите нам.</h2>
        <ul className="mt-10 grid grid-cols-2 gap-y-10 lg:mt-14 lg:grid-cols-4 lg:gap-y-0">
          {CHANNELS.map((channel, index) => (
            <li key={channel.name} className={cn("flex flex-col items-center px-3 text-center", index > 0 && "lg:border-l lg:border-border")}>
              <img src={channel.icon.url} width={128} height={128} alt="" loading="lazy" decoding="async" className="h-24 w-24 object-contain md:h-28 md:w-28" />
              <h3 className="mt-4 text-lg font-bold md:text-xl">{channel.name}</h3>
              {channel.href
                ? <a href={channel.href} target="_blank" rel="noreferrer" className="mt-2 text-sm underline underline-offset-4">{channel.action}</a>
                : <span className="mt-2 text-sm underline underline-offset-4">{channel.action}</span>}
            </li>
          ))}
        </ul>
      </section>

      <section className="container-pb pt-12 md:pt-16" aria-labelledby="contacts-form-title">
        <Reveal className="rounded-[2rem] bg-muted p-6 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
            <div>
              <h2 id="contacts-form-title" className="font-display text-[2.1rem] font-extrabold leading-[0.95] md:text-6xl">
                Расскажите,<br />что вы задумали.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
                Опишите задачу и приложите материалы. Мы свяжемся с вами, чтобы обсудить детали.
              </p>
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (!consent) {
                  setNotice("Нужно согласие на обработку персональных данных.");
                  return;
                }
                setNotice("");
                setSent(true);
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-semibold">
                  Ваше имя
                  <Input
                    className="mt-2 h-11 rounded-lg border-0 bg-background"
                    autoComplete="name"
                    required
                    maxLength={120}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Как к вам обращаться"
                  />
                </label>
                <label className="block text-sm font-semibold">
                  Как с вами связаться
                  <Input
                    className="mt-2 h-11 rounded-lg border-0 bg-background"
                    required
                    maxLength={254}
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Телефон, почта или контакт"
                  />
                  <span className="mt-2 block text-xs font-normal text-muted-foreground">Телефон, почта или контакт в мессенджере</span>
                </label>
              </div>

              <label className="mt-5 block text-sm font-semibold">
                Услуга <span className="text-xs font-normal text-muted-foreground">необязательно</span>
                <span className="relative mt-2 block">
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    aria-label="Услуга"
                    className="h-11 w-full appearance-none rounded-lg border-0 bg-background px-4 pr-10 text-sm font-normal"
                  >
                    <option value="">Выбрать услугу</option>
                    {SERVICE_LINKS.map((item) => <option key={item.href} value={item.label}>{item.label}</option>)}
                    <option value="Другое">Другое</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                </span>
              </label>

              <label className="mt-5 block text-sm font-semibold">
                О проекте
                <Textarea
                  className="mt-2 min-h-28 rounded-lg border-0 bg-background text-sm font-normal"
                  maxLength={4000}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Пара слов о задаче, сроках и о том, что уже есть"
                />
              </label>

              <label className="mt-5 flex h-11 cursor-pointer items-center gap-3 rounded-lg bg-background px-4 text-sm text-muted-foreground">
                <Paperclip className="size-4 shrink-0" aria-hidden />
                Прикрепить файлы
                <input
                  type="file"
                  multiple
                  className="sr-only"
                  onChange={(e) => setFiles(Array.from(e.target.files ?? []).map((file) => file.name))}
                />
              </label>
              {files.length > 0 && <p className="mt-2 truncate text-xs text-muted-foreground">{files.join(", ")}</p>}

              <div className="mt-5 flex items-start gap-3">
                <Checkbox
                  id="contacts-consent"
                  checked={consent}
                  onCheckedChange={(value) => { setConsent(value === true); setNotice(""); }}
                  className="mt-0.5 rounded"
                />
                <div className="min-w-0 text-xs leading-relaxed text-muted-foreground">
                  <label htmlFor="contacts-consent" className="cursor-pointer">Согласен на обработку персональных данных</label>
                  <details className="mt-1">
                    <summary className="cursor-pointer text-foreground underline underline-offset-4">Политика конфиденциальности</summary>
                    <p className="mt-2">{CONSENT_TEXT}</p>
                  </details>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Button type="submit" className={`${btn.ink} h-auto px-10 py-4`}>Отправить сообщение</Button>
                {sent && <p role="status" className="text-sm text-muted-foreground">Форма пока прототип: данные никуда не отправляются.</p>}
                {notice && <p role="alert" className="text-sm text-destructive">{notice}</p>}
              </div>
            </form>
          </div>
        </Reveal>
      </section>

      <section className="container-pb pt-12 pb-4 md:pt-16" aria-labelledby="legal-title">
        <div className="border-t border-border">
          <h2>
            <Button
              variant="ghost"
              onClick={() => setLegalOpen((value) => !value)}
              aria-expanded={legalOpen}
              aria-controls="legal-details"
              className="h-auto w-full justify-start gap-4 whitespace-normal rounded-none px-0 py-5 text-left hover:bg-transparent"
            >
              <span id="legal-title" className="text-lg font-bold md:text-xl">Реквизиты</span>
              <span aria-hidden className="hidden h-5 w-px bg-border sm:block" />
              <span className="text-sm font-normal text-muted-foreground">Юридическая информация</span>
              <span className="ml-auto shrink-0 pl-4 text-muted-foreground">{legalOpen ? <Minus className="size-5" /> : <Plus className="size-5" />}</span>
            </Button>
          </h2>
          <div id="legal-details" aria-hidden={!legalOpen} data-open={legalOpen} className="pb-faq-reveal">
            <div className="pb-faq-answer-clip">
              <p className="pb-faq-answer max-w-2xl">Реквизиты студии уточняются и появятся здесь позже.</p>
            </div>
          </div>
          <div className="border-t border-border" />
        </div>
      </section>
    </main>
    <Footer />
  </>;
}
