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
import pages from "@/assets/corporate-pages-panel-feathered.webp.asset.json";
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
        <div className="mt-6 grid gap-6 md:gap-8 lg:grid-cols-[1.55fr_1fr] lg:items-start">
          <div>
            <h1 id="corporate-title" className="pb-service-title font-display font-extrabold">
              Разработка <span aria-hidden className="ml-2 inline-block h-[0.12em] w-[0.9em] translate-y-[0.05em] rounded-full bg-primary align-middle" /><br />корпоративных<span className="block pl-4">сайтов</span>
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xl font-bold md:text-3xl">
              <span>{PRICE}</span>
              <span aria-hidden className="h-7 w-px bg-border" />
              <span>{CORPORATE_OFFER.workingDaysFrom} рабочих дней</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">При готовых текстах и фотографиях.</p>
          </div>
          <div className="lg:pt-2">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">Создаём сайты на собственном коде для компаний по всей России. Дизайн, разработка и запуск под задачи вашего бизнеса.</p>
            <Button onClick={openBrief} className={`${btn.paper} border border-foreground/70 shadow-[0_14px_30px_-16px_color-mix(in_oklab,var(--ink)_55%,transparent)] mt-8 hidden h-auto max-w-full whitespace-normal px-10 py-4 text-base md:inline-flex`}>Рассчитать стоимость сайта</Button>
            <div className="mt-6 grid gap-3 md:hidden">
              <Button onClick={openBrief} className="h-auto w-full whitespace-normal rounded-full bg-foreground px-6 py-4 text-base font-semibold text-background hover:bg-foreground/90">Рассчитать стоимость сайта</Button>
              <a href="#case" className="mx-auto text-sm font-semibold underline underline-offset-4">Посмотреть проект</a>
            </div>
          </div>
        </div>
        <figure className="mt-6 md:mt-8">
          <img src={devices.url} width={1446} height={1004} alt="Монитор и смартфон с сайтом архитектурного бюро ФОРМА" fetchPriority="high" decoding="async" className="pb-corporate-devices mx-auto h-auto w-full" />
        </figure>
      </section>

      <section id="case" className="container-pb mt-8 scroll-mt-6 border-t border-border pt-8 md:mt-10" aria-labelledby="corporate-case-title">
        <Reveal>
          <h2 id="corporate-case-title" className="font-display text-3xl font-extrabold leading-none md:text-6xl">Корпоративный сайт в деталях</h2>
          <p className="mt-3 max-w-3xl text-lg text-muted-foreground">Разработали сайт „Концентрации“ под ключ: дизайн, адаптивную версию и функциональность</p>
        </Reveal>
        <img src={project.url} width={1600} height={647} alt="Сайт Концентрации: главная страница, направления бизнеса и форма обращения" loading="lazy" decoding="async" className="mt-7 -ml-[7.5%] h-auto w-[115%] max-w-none" />
        <ul className="mt-4 grid gap-5 md:-mt-2 md:grid-cols-[1.45fr_1fr_0.85fr]">
          {CASE_LABELS.map((item) => <li key={item.title} className="lg:translate-x-20"><h3 className="text-base font-bold md:text-lg">{item.title}</h3><p className="mt-1 text-sm text-muted-foreground">{item.text}</p></li>)}
        </ul>
        <Button asChild className={`${btn.paper} border border-foreground/70 shadow-[0_14px_30px_-16px_color-mix(in_oklab,var(--ink)_55%,transparent)] mt-6 h-auto px-12 py-4 text-lg max-md:w-full max-md:rounded-full max-md:bg-foreground max-md:text-background max-md:text-base max-md:hover:bg-foreground/90`}>
          <a href="https://conc.ru/" target="_blank" rel="noreferrer">Смотреть проект</a>
        </Button>
      </section>

      <section className="container-pb pt-16 md:pt-24" aria-labelledby="corporate-included-title">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:gap-8">
          <h2 id="corporate-included-title" className="font-display text-3xl font-extrabold leading-[1.02] md:text-5xl lg:text-6xl">Что входит в разработку<br className="hidden md:block" /> корпоративного сайта</h2>
          <p className="shrink-0 text-sm text-muted-foreground md:pt-3 md:text-right">Собственный код.<br />Без конструкторов.</p>
        </div>
        <div className="mt-6 grid gap-6 md:mt-8 md:gap-8 lg:grid-cols-[0.62fr_1.38fr] lg:items-stretch">
          <ul className="order-2 lg:order-none">
            {CORPORATE_INCLUDED.map((item) => <li key={item.title} className="border-b border-border py-4 first:pt-0 last:border-0 md:py-5"><h3 className="text-lg font-bold md:text-2xl">{item.title}</h3><p className="mt-1 max-w-md text-sm text-muted-foreground md:text-base">{item.text}</p></li>)}
          </ul>
          <figure className="relative order-1 flex flex-col lg:order-none lg:min-h-[42rem]">
            <img src={pages.url} width={835} height={795} loading="lazy" decoding="async" alt="Объёмная панель управления страницами сайта с редактором текста и изображений" className="pb-shop-products-img h-auto w-full" />
          </figure>
        </div>
      </section>

      <section className="container-pb pt-12 md:pt-16" aria-labelledby="corporate-price-title">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink text-ink-foreground">
          <img src={mobileCost.url} width={760} height={1710} loading="lazy" decoding="async" alt="" aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-auto w-full md:hidden" />
          <img src={cost.url} width={1800} height={631} loading="lazy" decoding="async" alt="" aria-hidden className="pointer-events-none absolute inset-0 hidden h-full w-full object-cover object-right md:block" />
          <div className="relative grid gap-8 p-6 md:gap-10 md:p-12 lg:grid-cols-[1fr_1.5fr] lg:pr-[16%]">
            <div>
              <h2 id="corporate-price-title" className="font-display pr-16 text-[2.1rem] font-extrabold leading-[0.95] md:pr-0 md:text-6xl">Сколько стоит разработка</h2>
              <p className="font-display mt-4 whitespace-nowrap text-5xl font-extrabold text-primary md:text-7xl">{PRICE}</p>
              <p className="mt-2 text-2xl font-bold md:text-3xl">{CORPORATE_OFFER.workingDaysFrom} рабочих дней</p>
              <p className="mt-2 text-sm text-ink-muted">При готовых текстах и фотографиях.</p>
              <Button onClick={openBrief} className={`${btn.lime} mt-7 h-auto px-10 py-4 max-md:hidden`}>Получить расчёт</Button>
            </div>
            <div className="self-center">
              <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {CORPORATE_INCLUDED.map((item) => <li key={item.title} className="flex items-start gap-3 text-sm md:text-base"><span aria-hidden className="mt-1.5 size-2.5 shrink-0 rounded-full bg-primary shadow-[0_0_10px_var(--lime)]" />{item.title}</li>)}
              </ul>
              <ul className="mt-8 grid gap-4 border-t border-ink-border pt-6 sm:grid-cols-3">
                {EXTRAS.map((item) => <li key={item} className="flex items-start gap-3 text-sm md:text-base"><span aria-hidden className="mt-1.5 size-2.5 shrink-0 rounded-full bg-primary shadow-[0_0_10px_var(--lime)]" />{item}</li>)}
              </ul>
              <p className="mt-6 text-sm text-ink-muted">Итоговую стоимость рассчитаем под ваш проект.<br />Домен и хостинг оплачиваются отдельно.</p>
            </div>
          </div>
          <div className="relative flex justify-center px-6 pb-8 md:hidden">
            <Button onClick={openBrief} className={`${btn.lime} h-auto rounded-full px-10 py-4 text-base`}>Получить расчёт</Button>
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