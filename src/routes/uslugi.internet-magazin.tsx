import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/pinkbyte/Hero";
import { Contact, Footer } from "@/components/pinkbyte/Closing";
import { Reveal, btn } from "@/components/pinkbyte/primitives";
import { useOpenBrief } from "@/components/pinkbyte/brief-context";
import heroDevices from "@/assets/shop-hero-devices.webp.asset.json";
import products from "@/assets/shop-products-panel-cropped.webp.asset.json";
import costPanel from "@/assets/shop-cost-panel.webp.asset.json";
import brionilux from "@/assets/shop-brionilux-case.webp.asset.json";

const TITLE = "Разработка интернет-магазина от 40 000 ₽ · Pink Byte";
const DESC =
  "Создаём интернет-магазины на собственном коде за 10 рабочих дней: дизайн, каталог с корзиной, управление товарами, оплата и доставка. От 40 000 ₽.";

export const Route = createFileRoute("/uslugi/internet-magazin")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/uslugi/internet-magazin" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/uslugi/internet-magazin" }, { rel: "preload", as: "image", href: heroDevices.url, fetchPriority: "high" }],
  }),
  component: ShopPage,
});

const INCLUDED = [
  { title: "Дизайн и каталог", text: "Разрабатываем дизайн магазина и создаём каталог товаров с корзиной." },
  { title: "Управление товарами", text: "Добавляем управление товарами, чтобы вы могли самостоятельно обновлять ассортимент." },
  { title: "Наполнение каталога", text: "Добавляем от 100 товаров. Фотографии и описания предоставляет заказчик." },
  { title: "Оплата и доставка", text: "Подключаем оплату и доставку для оформления заказов на сайте." },
];

const PRICE_ITEMS = ["Дизайн", "Наполнение от 100 товаров", "Каталог и корзина", "Подключение оплаты", "Управление товарами", "Подключение доставки"];
const EXTRAS = ["Передаём исходный код", "Обучаем работе с сайтом", "Месяц поддержки: ошибки и небольшие правки"];

const FAQ = [
  { q: "Кто готовит фотографии и описания?", a: "Вы предоставляете фотографии и описания, мы наполняем каталог. Наполнение: от 100 товаров." },
  { q: "Можно самостоятельно управлять товарами?", a: "Да. В магазине есть управление товарами: вы сами добавляете позиции, меняете цены и наличие." },
  { q: "Передаёте ли вы исходный код?", a: "Да, исходный код передаём вам после запуска. Сайт написан на собственном коде, без конструкторов." },
  { q: "Что входит в поддержку после запуска?", a: "Месяц поддержки: исправляем ошибки и вносим небольшие правки." },
  { q: "Нужно ли отдельно оплачивать домен и хостинг?", a: "Да, домен и хостинг оплачиваются отдельно от разработки." },
];

function ShopPage() {
  const openBrief = useOpenBrief();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <div id="top" className="bg-background">
        <Header initialActive="/#services" tone="light" />
      </div>
      <main>
        <section className="container-pb pt-8 md:pt-10" aria-labelledby="shop-title">
          <nav aria-label="Хлебные крошки" className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Главная</Link>
            <span className="mx-2">/</span>
            <a href="/#services" className="hover:text-foreground">Услуги</a>
            <span className="mx-2">/</span>
            <span>Интернет-магазины</span>
          </nav>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:items-start">
            <div>
              <h1 id="shop-title" className="text-[clamp(1.9rem,5.6vw,5rem)] font-black leading-[0.95] tracking-[-0.045em]">
                Разработка <span aria-hidden className="ml-2 inline-block h-[0.12em] w-[0.9em] translate-y-[0.05em] rounded-full bg-primary align-middle" />
                <br /><span className="whitespace-nowrap">интернет-магазинов</span>
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-2xl font-bold md:text-3xl">
                <span>От 40 000 ₽</span>
                <span aria-hidden className="h-7 w-px bg-border" />
                <span>10 рабочих дней</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">При готовых фотографиях и описаниях товаров.</p>
            </div>
            <div className="lg:pt-2">
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                Создаём интернет-магазины на собственном коде для бизнеса по всей России. Разрабатываем дизайн, наполняем каталог, подключаем оплату и доставку.
              </p>
              <Button onClick={openBrief} className={`${btn.paper} bg-background text-foreground border border-foreground/70 shadow-[0_14px_30px_-16px_color-mix(in_oklab,var(--ink)_55%,transparent)] hover:bg-background mt-8 h-auto px-10 py-4 text-base`}>Рассчитать стоимость магазина</Button>
            </div>
          </div>
          <figure className="mt-10">
            <img src={heroDevices.url} width={1600} height={850} alt="Планшет и смартфон с демонстрационным каталогом мебели и оформлением заказа" fetchPriority="high" decoding="async" className="mx-auto h-auto w-full max-w-[1200px]" />
          </figure>
        </section>

        <section id="case" className="container-pb scroll-mt-6 border-t border-border pt-10 mt-12" aria-labelledby="case-title">
          <Reveal className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Проект целиком</p>
              <h2 id="case-title" className="mt-3 text-5xl font-black leading-none tracking-[-0.04em] md:text-7xl">Brionilux</h2>
              <p className="mt-2 text-lg text-muted-foreground">Интернет-магазин электрофурнитуры</p>
            </div>
            <div>
              <p className="text-muted-foreground">Разработали дизайн и сайт, наполнили каталог.</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {["Дизайн", "Разработка", "Наполнение"].map((t) => (
                  <li key={t} className="rounded-full bg-muted px-4 py-2 text-sm">{t}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <div className="relative mt-8">
            <img src={brionilux.url} width={1448} height={1024} loading="lazy" decoding="async" alt="Brionilux: каталог рамок, карточка товара, корзина и оформление заказа без регистрации" className="h-auto w-full" />
            <Button asChild className={`${btn.paper} bg-background text-foreground border border-foreground/70 shadow-[0_14px_30px_-16px_color-mix(in_oklab,var(--ink)_55%,transparent)] hover:bg-background mt-6 h-auto px-12 py-4 text-lg md:absolute md:bottom-[9%] md:left-0 md:mt-0`}>
              <a href="https://brionulux.ru/" target="_blank" rel="noreferrer">Смотреть проект</a>
            </Button>
          </div>
        </section>

        <section className="container-pb pt-20 md:pt-28" aria-labelledby="included-title">
          <div className="flex items-start justify-between gap-6">
            <h2 id="included-title" className="text-4xl font-black leading-[0.95] tracking-[-0.04em] md:text-6xl">Что входит в разработку<br className="hidden md:block" /> интернет-магазина</h2>
            <p className="hidden shrink-0 text-right text-sm text-muted-foreground md:block">Собственный код.<br />Без конструкторов.</p>
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-[0.62fr_1.38fr] lg:items-stretch">
            <ul>
              {INCLUDED.map((i) => (
                <li key={i.title} className="border-b border-border py-6 first:pt-0 last:border-0">
                  <h3 className="text-xl font-bold md:text-2xl">{i.title}</h3>
                  <p className="mt-1 text-muted-foreground">{i.text}</p>
                </li>
              ))}
            </ul>
            <figure className="relative flex flex-col lg:min-h-[42rem]">
              <img src={products.url} width={943} height={796} loading="lazy" decoding="async" alt="Объёмные стеклянные панели управления товарами" className="h-auto w-full pb-shop-products-img" />
            </figure>
          </div>
        </section>

        <section className="container-pb pt-16" aria-labelledby="price-title">
          <div className="relative overflow-hidden rounded-[2rem] bg-ink text-ink-foreground">
            <img src={costPanel.url} width={1800} height={631} loading="lazy" decoding="async" alt="" aria-hidden className="pointer-events-none absolute inset-0 hidden h-full w-full object-cover object-right md:block" />
            <div className="relative grid gap-10 p-8 md:p-12 lg:grid-cols-[1fr_1.5fr] lg:pr-[16%]">
              <div>
                <h2 id="price-title" className="text-4xl font-black leading-[0.95] tracking-[-0.04em] md:text-6xl">Сколько стоит разработка</h2>
                <p className="mt-4 text-5xl font-black tracking-[-0.04em] whitespace-nowrap text-primary md:text-7xl">От 40 000 ₽</p>
                <p className="mt-2 text-2xl font-bold md:text-3xl">10 рабочих дней</p>
                <p className="mt-2 text-sm text-ink-muted">При готовых фотографиях и описаниях товаров.</p>
                <Button onClick={openBrief} className={`${btn.lime} mt-7 h-auto px-10 py-4`}>Получить расчёт</Button>
              </div>
              <div className="self-center">
                <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {PRICE_ITEMS.map((t) => <Dot key={t}>{t}</Dot>)}
                </ul>
                <ul className="mt-8 grid gap-4 border-t border-ink-border pt-6 sm:grid-cols-3">
                  {EXTRAS.map((t) => <Dot key={t}>{t}</Dot>)}
                </ul>
                <p className="mt-6 text-sm text-ink-muted">Итоговую стоимость рассчитаем под ваш проект.<br />Домен и хостинг оплачиваются отдельно.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container-pb pt-20 md:pt-24" aria-labelledby="faq-title">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <h2 id="faq-title" className="text-4xl font-black leading-[0.95] tracking-[-0.04em] md:text-6xl">Перед началом работы</h2>
            <div className="grid gap-3">
              {FAQ.map((item, index) => {
                const on = open === index;
                return (
                  <div key={item.q} className="rounded-2xl border border-border bg-background">
                    <h3>
                      <button type="button" onClick={() => setOpen(on ? null : index)} aria-expanded={on} aria-controls={`shop-answer-${index}`} className="flex w-full items-center gap-4 px-5 py-4 text-left text-base font-medium md:text-lg">
                        <span aria-hidden className={`grid size-8 shrink-0 place-items-center rounded-full transition-colors duration-300 ${on ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                          {on ? <Minus className="size-4" /> : <Plus className="size-4" />}
                        </span>
                        <span>{item.q}</span>
                      </button>
                    </h3>
                    <div id={`shop-answer-${index}`} aria-hidden={!on} data-open={on} className="pb-faq-reveal">
                      <div className="pb-faq-answer-clip">
                        <div className="pb-5 pl-[4.25rem] pr-5"><p className="pb-faq-answer text-sm text-muted-foreground md:text-base">{item.a}</p></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Contact title="Обсудим ваш интернет-магазин" text="Расскажите, что продаёте и какие задачи должен решать сайт. Рассчитаем стоимость под ваш проект." />
      </main>
      <Footer />
    </>
  );
}

function Dot({ children }: { children: string }) {
  return (
    <li className="flex items-start gap-3 text-sm md:text-base">
      <span aria-hidden className="mt-1.5 size-2.5 shrink-0 rounded-full bg-primary shadow-[0_0_10px_var(--lime)]" />
      {children}
    </li>
  );
}
