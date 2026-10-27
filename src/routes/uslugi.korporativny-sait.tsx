import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/pinkbyte/Hero";
import { Contact, Footer } from "@/components/pinkbyte/Closing";
import { Reveal, btn } from "@/components/pinkbyte/primitives";
import { useOpenBrief } from "@/components/pinkbyte/brief-context";
import { CORPORATE_OFFER, CORPORATE_INCLUDED, CORPORATE_FAQ } from "@/components/pinkbyte/corporate-data";
import devices from "@/assets/corporate-hero-devices.webp.asset.json";
import project from "@/assets/corporate-conc-case.webp.asset.json";
import pages from "@/assets/corporate-pages-panel.webp.asset.json";
import cost from "@/assets/shop-cost-panel.webp.asset.json";
import mobileCost from "@/assets/shop-m-price.webp.asset.json";

const PRICE = `От ${new Intl.NumberFormat("ru-RU").format(CORPORATE_OFFER.priceFrom)} ₽`;
const TITLE = "Разработка корпоративного сайта от 30 000 ₽ · Pink Byte";
const DESC = "Создаём корпоративные сайты на собственном коде: от 5 страниц, от 8 рабочих дней, от 30 000 ₽. Дизайн, панель управления, наполнение и формы обращений.";
const EXTRAS = ["Передаём исходный код", "Обучаем работе с сайтом", "Месяц поддержки: исправление ошибок и небольшие правки"];
const CASE_LABELS = [
  { title: "Направления бизнеса", text: "Разные услуги, понятные разделы." },
  { title: "Информация о компании", text: "Контекст для клиентов и партнёров." },
  { title: "Формы обращений", text: "Запрос попадает к нужной команде." },
];

export const Route = createFileRoute("/uslugi/korporativny-sait")({
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
  component: CorporatePage,
});

function CorporatePage() {
  const openBrief = useOpenBrief();
  const [open, setOpen] = useState<number | null>(0);
  return <>
    <div id="top" className="bg-background"><Header tone="light" /></div>
    <main>
      <section className="container-pb pt-8 md:pt-10" aria-labelledby="corporate-title">
        <nav aria-label="Хлебные крошки" className="text-xs text-muted-foreground">
          <span className="hidden md:inline"><Link to="/" className="hover:text-foreground">Главная</Link><span className="mx-2">/</span></span>
          <Link to="/" hash="services" className="hover:text-foreground">Услуги</Link><span className="mx-2">/</span><span>Корпоративный сайт</span>
        </nav>
        <div className="mt-6 grid gap-7 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] lg:gap-10">
          <div>
            <h1 id="corporate-title" className="pb-corporate-title font-display font-extrabold">
              Разработка <span aria-hidden className="ml-2 inline-block h-[0.12em] w-[0.8em] rounded-full bg-primary align-middle" /><br />корпоративных сайтов
            </h1>
            <dl className="mt-7 grid grid-cols-3 gap-3 md:max-w-3xl md:gap-6">
              {[
                { value: PRICE, label: "Стоимость разработки" },
                { value: `От ${CORPORATE_OFFER.pagesFrom} страниц`, label: "Минимальный объём" },
                { value: `От ${CORPORATE_OFFER.workingDaysFrom} рабочих дней`, label: "Срок запуска" },
              ].map((item) => <div key={item.label} className="min-w-0 border-l border-border pl-3 first:border-0 first:pl-0 md:pl-6">
                <dd className="text-base font-bold leading-tight md:text-2xl">{item.value}</dd>
                <dt className="mt-2 text-xs leading-snug text-muted-foreground md:text-sm">{item.label}</dt>
              </div>)}
            </dl>
          </div>
          <div className="lg:pt-2">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">Создаём сайты на собственном коде для компаний по всей России. Дизайн, разработка и запуск под задачи вашего бизнеса.</p>
            <Button onClick={openBrief} className={`${btn.ink} mt-6 h-auto w-full py-4 text-base`}>Обсудить проект</Button>
          </div>
        </div>
        <figure className="mt-6 md:mt-8">
          <img src={devices.url} width={1446} height={1004} alt="Монитор и смартфон с сайтом архитектурного бюро ФОРМА" fetchPriority="high" decoding="async" className="pb-corporate-devices mx-auto h-auto w-full" />
        </figure>
      </section>

      <section id="case" className="container-pb mt-8 scroll-mt-6 border-t border-border pt-8 md:mt-10" aria-labelledby="corporate-case-title">
        <Reveal className="grid gap-5 md:grid-cols-[1.3fr_0.8fr_auto] md:items-end">
          <div><h2 id="corporate-case-title" className="font-display text-4xl font-extrabold leading-none md:text-6xl">Проект целиком</h2><p className="mt-3 text-lg text-muted-foreground">Концентрация · conc.ru</p></div>
          <p className="text-muted-foreground">Разработали корпоративный сайт под ключ.</p>
          <Button asChild variant="link" className="h-auto justify-start p-0 text-foreground underline underline-offset-4"><a href="https://conc.ru/" target="_blank" rel="noreferrer">Открыть conc.ru</a></Button>
        </Reveal>
        <img src={project.url} width={1600} height={647} alt="Сайт Концентрации: главная страница, направления бизнеса и форма обращения" loading="lazy" decoding="async" className="mt-7 h-auto w-full" />
        <ul className="mt-4 grid gap-5 md:grid-cols-[1.45fr_1fr_0.85fr]">
          {CASE_LABELS.map((item) => <li key={item.title}><h3 className="text-base font-bold md:text-lg">{item.title}</h3><p className="mt-1 text-sm text-muted-foreground">{item.text}</p></li>)}
        </ul>
      </section>

      <section className="container-pb pt-16 md:pt-24" aria-labelledby="corporate-included-title">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:gap-8">
          <h2 id="corporate-included-title" className="font-display text-3xl font-extrabold leading-[1.02] md:text-5xl lg:text-6xl">Что входит в разработку<br className="hidden md:block" /> корпоративного сайта</h2>
          <p className="shrink-0 text-sm text-muted-foreground md:pt-3 md:text-right">Собственный код.<br />Без конструкторов.</p>
        </div>
        <div className="mt-7 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <ul className="order-2 lg:order-none">
            {CORPORATE_INCLUDED.map((item) => <li key={item.title} className="border-b border-border py-4 first:pt-0 last:border-0 md:py-5"><h3 className="text-lg font-bold md:text-2xl">{item.title}</h3><p className="mt-1 max-w-md text-sm text-muted-foreground md:text-base">{item.text}</p></li>)}
          </ul>
          <img src={pages.url} width={1100} height={826} loading="lazy" decoding="async" alt="Объёмная панель управления страницами сайта с редактором текста и изображений" className="order-1 h-auto w-full lg:order-none" />
        </div>
      </section>

      <section className="container-pb pt-12 md:pt-16" aria-labelledby="corporate-price-title">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink text-ink-foreground">
          <picture><source media="(max-width: 767px)" srcSet={mobileCost.url} /><img src={cost.url} width={1800} height={631} alt="" aria-hidden loading="lazy" decoding="async" className="pointer-events-none absolute inset-0 h-full w-full object-cover object-right" /></picture>
          <div className="relative grid gap-8 p-6 md:p-10 lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:pr-[18%]">
            <div>
              <h2 id="corporate-price-title" className="font-display text-3xl font-extrabold leading-none md:text-5xl">Стоимость<br />корпоративного сайта</h2>
              <p className="font-display mt-3 whitespace-nowrap text-4xl font-extrabold text-primary md:text-6xl">{PRICE}</p>
              <p className="mt-3 text-lg font-bold md:text-xl">От {CORPORATE_OFFER.pagesFrom} страниц · От {CORPORATE_OFFER.workingDaysFrom} рабочих дней</p>
              <p className="mt-2 max-w-md text-sm text-ink-muted">Объём работ, подключения и срок фиксируем до начала разработки.</p>
              <Button onClick={openBrief} className={`${btn.lime} mt-5 h-auto px-10 py-4 max-md:hidden`}>Обсудить проект</Button>
            </div>
            <ul className="grid content-center gap-5 border-t border-ink-border pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              {EXTRAS.map((item) => <li key={item} className="flex items-start gap-4 text-sm md:text-base"><span aria-hidden className="mt-1.5 size-3 shrink-0 rounded-full border-[3px] border-primary" />{item}</li>)}
            </ul>
            <Button onClick={openBrief} className={`${btn.lime} mx-auto h-auto px-10 py-4 md:hidden`}>Обсудить проект</Button>
          </div>
        </div>
      </section>

      <section className="container-pb pb-12 pt-16 md:pb-16 md:pt-20" aria-labelledby="corporate-faq-title">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <h2 id="corporate-faq-title" className="font-display text-4xl font-extrabold leading-none md:text-6xl">Перед началом работы</h2>
          <div className="grid gap-3">
            {CORPORATE_FAQ.map((item, index) => {
              const on = open === index;
              return <div key={item.q} className="rounded-2xl border border-border bg-background">
                <h3><Button variant="ghost" onClick={() => setOpen(on ? null : index)} aria-expanded={on} aria-controls={`corporate-answer-${index}`} className="h-auto w-full justify-start gap-4 whitespace-normal px-5 py-4 text-left text-base font-medium hover:bg-transparent">
                  <span aria-hidden className={`grid size-8 shrink-0 place-items-center rounded-full transition-colors duration-300 ${on ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>{on ? <Minus className="size-4" /> : <Plus className="size-4" />}</span><span>{item.q}</span>
                </Button></h3>
                <div id={`corporate-answer-${index}`} aria-hidden={!on} data-open={on} className="pb-faq-reveal"><div className="pb-faq-answer-clip"><div className="pl-[4.25rem] pr-5"><p className="pb-faq-answer">{item.a}</p></div></div></div>
              </div>;
            })}
          </div>
        </div>
      </section>
      <Contact title="Обсудим сайт вашей компании" text="Расскажите о бизнесе и задачах. Подготовим предложение по разработке." />
    </main>
    <Footer />
  </>;
}