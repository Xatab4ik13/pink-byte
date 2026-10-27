import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/pinkbyte/Hero";
import { Contact, Footer } from "@/components/pinkbyte/Closing";
import { Reveal, btn } from "@/components/pinkbyte/primitives";
import { useOpenBrief } from "@/components/pinkbyte/brief-context";
import { CRM_OFFER, CRM_INCLUDED, CRM_STEPS, CRM_EXTRAS, CRM_FAQ } from "@/components/pinkbyte/crm-data";
import devices from "@/assets/crm-hero-devices.webp.asset.json";
import panels from "@/assets/crm-panels.webp.asset.json";
import access from "@/assets/crm-access-panel.webp.asset.json";
import cost from "@/assets/shop-cost-panel.webp.asset.json";
import mobileCost from "@/assets/shop-m-price.webp.asset.json";

const PRICE = `От ${new Intl.NumberFormat("ru-RU").format(CRM_OFFER.priceFrom)} ₽`;
const TITLE = "Разработка CRM-системы на заказ от 60 000 ₽ · Pink Byte";
const DESC = "Создаём CRM под процессы вашей компании: клиенты, сделки, задачи, роли, отчёты и интеграции. От 60 000 ₽, от 15 рабочих дней.";
const outlined = `${btn.paper} border border-foreground/70 shadow-[0_14px_30px_-16px_color-mix(in_oklab,var(--ink)_55%,transparent)]`;

export const Route = createFileRoute("/uslugi/crm-sistema")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "preload", as: "image", href: devices.url, fetchPriority: "high" }],
  }),
  component: CrmPage,
});

function Dot({ children }: { children: string }) {
  return <li className="flex items-start gap-3 text-sm md:text-base"><span aria-hidden className="mt-1.5 size-2.5 shrink-0 rounded-full bg-primary shadow-[0_0_10px_var(--lime)]" />{children}</li>;
}

function CrmPage() {
  const openBrief = useOpenBrief();
  const [open, setOpen] = useState<number | null>(0);
  return <>
    <div id="top" className="bg-background"><Header tone="light" /></div>
    <main>
      <section className="container-pb pt-8 md:pt-10" aria-labelledby="crm-title">
        <nav aria-label="Хлебные крошки" className="text-xs text-muted-foreground">
          <span className="hidden md:inline"><Link to="/" className="hover:text-foreground">Главная</Link><span className="mx-2">/</span></span>
          <Link to="/" hash="services" className="hover:text-foreground">Услуги</Link><span className="mx-2">/</span><span>CRM-системы</span>
        </nav>
        <div className="mt-6 grid gap-6 md:gap-8 lg:grid-cols-[1.55fr_1fr] lg:items-start">
          <div>
            <h1 id="crm-title" className="pb-service-title font-display font-extrabold">
              Разработка <span aria-hidden className="ml-2 inline-block h-[0.12em] w-[0.9em] translate-y-[0.05em] rounded-full bg-primary align-middle" /><br />
              <span className="whitespace-nowrap">CRM-систем</span> <br />на заказ
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xl font-bold md:text-3xl">
              <span>{PRICE}</span>
              <span aria-hidden className="h-7 w-px bg-border" />
              <span>От {CRM_OFFER.workingDaysFrom} рабочих дней</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Точную стоимость и срок определяем по ТЗ.</p>
          </div>
          <div className="lg:pt-2">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">Создаём CRM под процессы вашей компании: клиенты, сделки, задачи и отчёты в одной системе.</p>
            <Button onClick={openBrief} className={`${outlined} mt-8 hidden h-auto px-10 py-4 text-base md:inline-flex`}>Рассчитать стоимость CRM</Button>
            <div className="mt-6 grid gap-3 md:hidden">
              <Button onClick={openBrief} className="h-auto w-full whitespace-normal rounded-full bg-foreground px-6 py-4 text-base font-semibold text-background hover:bg-foreground/90">Рассчитать стоимость CRM</Button>
            </div>
          </div>
        </div>
        <figure className="mt-6 md:mt-8">
          <img src={devices.url} width={1479} height={880} alt="Монитор с воронкой сделок CRM и смартфон со списком задач" fetchPriority="high" decoding="async" className="mx-auto h-auto w-full max-w-[1200px]" />
        </figure>
      </section>

      <section className="container-pb mt-10 border-t border-border pt-10 md:mt-12" aria-labelledby="crm-case-title">
        <Reveal>
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end md:gap-8">
            <h2 id="crm-case-title" className="font-display text-3xl font-extrabold leading-none md:text-6xl">Как может работать ваша CRM</h2>
            <p className="max-w-sm text-base text-muted-foreground">Показываем пример интерфейса. Состав и логика системы определяются вашими процессами.</p>
          </div>
        </Reveal>
        <img src={panels.url} width={1600} height={730} loading="lazy" decoding="async" alt="Пример CRM: карточка клиента с историей общения, сделка со следующим действием и задачи команды" className="mt-8 h-auto w-full" />
      </section>

      <section className="container-pb pt-16 md:pt-28" aria-labelledby="crm-included-title">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:gap-8">
          <h2 id="crm-included-title" className="font-display text-3xl font-extrabold leading-[0.95] tracking-[-0.04em] md:text-6xl">Что входит в разработку CRM</h2>
          <p className="shrink-0 text-sm text-muted-foreground md:pt-3 md:text-right">Система под процессы<br />вашей компании.</p>
        </div>
        <div className="mt-6 grid gap-6 md:mt-8 md:gap-8 lg:grid-cols-[0.62fr_1.38fr] lg:items-stretch">
          <ul className="order-2 lg:order-none">
            {CRM_INCLUDED.map((i) => <li key={i.title} className="border-b border-border py-4 first:pt-0 last:border-0 md:py-6"><h3 className="text-lg font-bold md:text-2xl">{i.title}</h3><p className="mt-1 text-sm text-muted-foreground md:text-base">{i.text}</p></li>)}
          </ul>
          <figure className="relative order-1 flex flex-col lg:order-none lg:min-h-[42rem]">
            <img src={access.url} width={816} height={819} loading="lazy" decoding="async" alt="Объёмные панели прав доступа по ролям и импорта клиентов" className="pb-shop-products-img h-auto w-full" />
          </figure>
        </div>
      </section>

      <section className="container-pb pt-16 md:pt-20" aria-labelledby="crm-steps-title">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end md:gap-8">
          <h2 id="crm-steps-title" className="font-display text-3xl font-extrabold leading-[0.95] tracking-[-0.04em] md:text-5xl">От рабочих процессов до запуска</h2>
          <p className="max-w-xs text-sm text-muted-foreground md:text-right">Функции, подключения и объём первой версии фиксируем до начала разработки.</p>
        </div>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {CRM_STEPS.map((s) => <li key={s.title} className="border-border lg:border-l lg:px-6 lg:first:border-0 lg:first:pl-0"><h3 className="text-lg font-bold">{s.title}</h3><p className="mt-1 text-sm text-muted-foreground md:text-base">{s.text}</p></li>)}
        </ul>
      </section>

      <section className="container-pb pt-12 md:pt-16" aria-labelledby="crm-price-title">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink text-ink-foreground">
          <img src={mobileCost.url} width={760} height={1710} loading="lazy" decoding="async" alt="" aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-auto w-full md:hidden" />
          <img src={cost.url} width={1800} height={631} loading="lazy" decoding="async" alt="" aria-hidden className="pointer-events-none absolute inset-0 hidden h-full w-full object-cover object-right md:block" />
          <div className="relative grid gap-8 p-6 md:gap-10 md:p-12 lg:grid-cols-[1fr_1.5fr] lg:pr-[16%]">
            <div>
              <h2 id="crm-price-title" className="font-display pr-16 text-[2.1rem] font-extrabold leading-[0.95] tracking-[-0.04em] md:pr-0 md:text-6xl">Сколько стоит разработка</h2>
              <p className="font-display mt-4 whitespace-nowrap text-5xl font-extrabold tracking-[-0.04em] text-primary md:text-7xl">{PRICE}</p>
              <p className="mt-2 text-2xl font-bold md:text-3xl">От {CRM_OFFER.workingDaysFrom} рабочих дней</p>
              <p className="mt-2 text-sm text-ink-muted">Точную стоимость и срок определяем по ТЗ.</p>
              <Button onClick={openBrief} className={`${btn.lime} mt-7 h-auto px-10 py-4 max-md:hidden`}>Получить расчёт</Button>
            </div>
            <div className="self-center">
              <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">{CRM_INCLUDED.map((i) => <Dot key={i.title}>{i.title}</Dot>)}</ul>
              <ul className="mt-8 grid gap-4 border-t border-ink-border pt-6 sm:grid-cols-3">{CRM_EXTRAS.map((t) => <Dot key={t}>{t}</Dot>)}</ul>
              <p className="mt-6 text-sm text-ink-muted">Клиенты, воронка, задачи, роли, отчёты, интеграции и импорт входят в согласованный состав работ.</p>
            </div>
          </div>
          <div className="relative flex justify-center px-6 pb-8 md:hidden">
            <Button onClick={openBrief} className={`${btn.lime} h-auto rounded-full px-10 py-4 text-base`}>Получить расчёт</Button>
          </div>
        </div>
      </section>

      <section className="container-pb pt-20 md:pt-24" aria-labelledby="crm-faq-title">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <h2 id="crm-faq-title" className="font-display text-4xl font-extrabold leading-[0.95] tracking-[-0.04em] md:text-6xl">Перед началом работы</h2>
          <div className="grid gap-3">
            {CRM_FAQ.map((item, index) => {
              const on = open === index;
              return <div key={item.q} className="rounded-2xl border border-border bg-background">
                <h3><button type="button" onClick={() => setOpen(on ? null : index)} aria-expanded={on} aria-controls={`crm-answer-${index}`} className="flex w-full items-center gap-4 px-5 py-4 text-left text-base font-medium md:text-lg">
                  <span aria-hidden className={`grid size-8 shrink-0 place-items-center rounded-full transition-colors duration-300 ${on ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>{on ? <Minus className="size-4" /> : <Plus className="size-4" />}</span><span>{item.q}</span>
                </button></h3>
                <div id={`crm-answer-${index}`} aria-hidden={!on} data-open={on} className="pb-faq-reveal"><div className="pb-faq-answer-clip"><div className="pb-5 pl-[4.25rem] pr-5"><p className="pb-faq-answer text-sm text-muted-foreground md:text-base">{item.a}</p></div></div></div>
              </div>;
            })}
          </div>
        </div>
      </section>

      <Contact title="Обсудим CRM для вашей компании" text="Расскажите, как устроена работа. Определим состав системы и этапы разработки." />
    </main>
    <Footer />
  </>;
}
