import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/pinkbyte/Hero";
import { Contact, Footer } from "@/components/pinkbyte/Closing";
import { Reveal, btn } from "@/components/pinkbyte/primitives";
import { useOpenBrief } from "@/components/pinkbyte/brief-context";
import { APP_OFFER, APP_INCLUDED, APP_EXTRAS, APP_FAQ, APP_STORE_URL } from "@/components/pinkbyte/app-data";
import phones from "@/assets/app-hero-phones.webp.asset.json";
import booking from "@/assets/app-booking-panels.webp.asset.json";
import admin from "@/assets/app-admin-panel.webp.asset.json";
import stores from "@/assets/app-stores.webp.asset.json";
import cost from "@/assets/shop-cost-panel.webp.asset.json";
import mobileCost from "@/assets/shop-m-price.webp.asset.json";

const PRICE = `От ${new Intl.NumberFormat("ru-RU").format(APP_OFFER.priceFrom)} ₽`;
const TITLE = "Разработка мобильных приложений на заказ от 90 000 ₽ · Pink Byte";
const DESC = "Создаём приложения для iOS и Android: дизайн, разработка, серверная часть и публикация в магазинах. От 90 000 ₽, от 20 рабочих дней.";
const outlined = `${btn.paper} border border-foreground/70 shadow-[0_14px_30px_-16px_color-mix(in_oklab,var(--ink)_55%,transparent)]`;

export const Route = createFileRoute("/uslugi/mobilnoe-prilozhenie")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "preload", as: "image", href: phones.url, fetchPriority: "high" }],
  }),
  component: AppPage,
});

function Dot({ children }: { children: string }) {
  return <li className="flex items-start gap-3 text-sm md:text-base"><span aria-hidden className="mt-1.5 size-2.5 shrink-0 rounded-full bg-primary shadow-[0_0_10px_var(--lime)]" />{children}</li>;
}

function AppPage() {
  const openBrief = useOpenBrief();
  const [open, setOpen] = useState<number | null>(0);
  return <>
    <div id="top" className="bg-background"><Header tone="light" /></div>
    <main>
      <section className="container-pb pt-8 md:pt-10" aria-labelledby="app-title">
        <nav aria-label="Хлебные крошки" className="text-xs text-muted-foreground">
          <span className="hidden md:inline"><Link to="/" className="hover:text-foreground">Главная</Link><span className="mx-2">/</span></span>
          <Link to="/" hash="services" className="hover:text-foreground">Услуги</Link><span className="mx-2">/</span><span>Мобильные приложения</span>
        </nav>
        <div className="mt-6 grid gap-6 md:gap-8 lg:grid-cols-[1.55fr_1fr] lg:items-start">
          <div>
            <h1 id="app-title" className="pb-service-title font-display font-extrabold">
              Разработка <span aria-hidden className="ml-2 inline-block h-[0.12em] w-[0.9em] translate-y-[0.05em] rounded-full bg-primary align-middle" /><br />
              мобильных <br />приложений на заказ
            </h1>
            <div className="mt-6 flex flex-nowrap items-center gap-x-3 whitespace-nowrap text-[clamp(1rem,5vw,1.25rem)] font-bold sm:gap-x-5 md:text-3xl">
              <span>{PRICE}</span>
              <span aria-hidden className="h-7 w-px shrink-0 bg-border" />
              <span>от {APP_OFFER.workingDaysFrom} рабочих дней</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Точную стоимость и срок определяем по ТЗ.</p>
          </div>
          <div className="lg:pt-2">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">Создаём приложения для iOS и Android: дизайн, разработка, серверная часть и публикация.</p>
            <Button onClick={openBrief} className={`${outlined} mt-8 hidden h-auto px-10 py-4 text-base md:inline-flex`}>Рассчитать стоимость приложения</Button>
            <div className="mt-6 grid gap-3 md:hidden">
              <Button onClick={openBrief} className="h-auto w-full whitespace-normal rounded-full bg-foreground px-6 py-4 text-base font-semibold text-background hover:bg-foreground/90">Рассчитать стоимость приложения</Button>
            </div>
          </div>
        </div>
        <figure className="mt-6 md:mt-8">
          <img src={phones.url} width={1151} height={963} alt="Два смартфона с интерфейсом онлайн-записи: каталог услуг и выбор даты" fetchPriority="high" decoding="async" className="mx-auto h-auto w-full max-w-[820px]" />
        </figure>
      </section>

      <section className="container-pb mt-10 border-t border-border pt-10 md:mt-12" aria-labelledby="app-case-title">
        <Reveal>
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end md:gap-8">
            <div>
              <h2 id="app-case-title" className="font-display text-3xl font-extrabold leading-none md:text-6xl">Приложение в деталях</h2>
              <p className="mt-3 text-base font-semibold md:text-lg">Моя Бронь · бронирование отелей</p>
            </div>
            <p className="max-w-sm text-base text-muted-foreground">Поиск отеля, выбор номера и оплата в приложении.</p>
          </div>
        </Reveal>
        <img src={booking.url} width={1443} height={879} loading="lazy" decoding="async" alt="Экраны приложения Моя Бронь: поиск и фильтры, карточка отеля, бронирование и оплата" className="mt-8 h-auto w-full" />
        <div className="mt-6 flex justify-center">
          <Button asChild className={`${outlined} h-auto px-10 py-4 text-base max-md:w-full`}>
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">Смотреть в App Store</a>
          </Button>
        </div>
      </section>

      <section className="container-pb pt-16 md:pt-28" aria-labelledby="app-included-title">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:gap-8">
          <h2 id="app-included-title" className="font-display text-3xl font-extrabold leading-[0.95] tracking-[-0.04em] md:text-6xl">Что входит в разработку приложения</h2>
          <p className="shrink-0 text-sm text-muted-foreground md:pt-3 md:text-right">Нативная и кроссплатформенная<br />разработка.</p>
        </div>
        <div className="mt-6 grid gap-6 md:mt-8 md:gap-8 lg:grid-cols-[0.62fr_1.38fr] lg:items-stretch">
          <ul className="order-2 lg:order-none">
            {APP_INCLUDED.map((i) => <li key={i.title} className="border-b border-border py-4 first:pt-0 last:border-0 md:py-6"><h3 className="text-lg font-bold md:text-2xl">{i.title}</h3><p className="mt-1 text-sm text-muted-foreground md:text-base">{i.text}</p></li>)}
          </ul>
          <figure className="relative order-1 flex flex-col lg:order-none lg:min-h-[42rem]">
            <img src={admin.url} width={1083} height={985} loading="lazy" decoding="async" alt="Объёмная панель управления пользователями, уведомлений и прав доступа" className="pb-shop-products-img h-auto w-full" />
          </figure>
        </div>
      </section>

      <section className="container-pb pt-16 md:pt-20" aria-labelledby="app-stores-title">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-10">
          <h2 id="app-stores-title" className="font-display text-3xl font-extrabold leading-[0.95] tracking-[-0.04em] md:text-6xl">Публикация в магазинах приложений</h2>
          <div>
            <img src={stores.url} width={1600} height={468} loading="lazy" decoding="async" alt="App Store, Google Play и RuStore" className="h-auto w-full" />
            <p className="mt-4 text-sm text-muted-foreground md:text-base">Подготовим приложение и отправим на проверку через ваши аккаунты разработчика. Публикация в согласованных магазинах входит в стоимость.</p>
            <p className="mt-4 rounded-2xl border border-border px-5 py-3 text-sm text-muted-foreground">Нет аккаунтов? Поможем с регистрацией и оформлением по отдельной договорённости.</p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <Button onClick={openBrief} className={`${btn.lime} h-auto px-8 py-3 max-md:w-full`}>Обсудить публикацию</Button>
              <span className="text-sm text-muted-foreground">Решение о допуске принимает магазин.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container-pb pt-12 md:pt-16" aria-labelledby="app-price-title">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink text-ink-foreground">
          <img src={mobileCost.url} width={760} height={1710} loading="lazy" decoding="async" alt="" aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-auto w-full md:hidden" />
          <img src={cost.url} width={1800} height={631} loading="lazy" decoding="async" alt="" aria-hidden className="pointer-events-none absolute inset-0 hidden h-full w-full object-cover object-right md:block" />
          <div className="relative grid gap-8 p-6 md:gap-10 md:p-12 lg:grid-cols-[1fr_1.5fr] lg:pr-[16%]">
            <div>
              <h2 id="app-price-title" className="font-display pr-16 text-[2.1rem] font-extrabold leading-[0.95] tracking-[-0.04em] md:pr-0 md:text-6xl">Сколько стоит разработка</h2>
              <p className="font-display mt-4 whitespace-nowrap text-5xl font-extrabold tracking-[-0.04em] text-primary md:text-7xl">{PRICE}</p>
              <p className="mt-2 text-2xl font-bold md:text-3xl">От {APP_OFFER.workingDaysFrom} рабочих дней</p>
              <p className="mt-2 text-sm text-ink-muted">Точную стоимость, сроки и платформы фиксируем в ТЗ.</p>
              <Button onClick={openBrief} className={`${btn.lime} mt-7 h-auto px-10 py-4 max-md:hidden`}>Получить расчёт</Button>
            </div>
            <div className="self-center">
              <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">{APP_INCLUDED.map((i) => <Dot key={i.title}>{i.title}</Dot>)}</ul>
              <ul className="mt-8 grid gap-4 border-t border-ink-border pt-6 sm:grid-cols-3">{APP_EXTRAS.map((t) => <Dot key={t}>{t}</Dot>)}</ul>
            </div>
          </div>
          <div className="relative flex justify-center px-6 pb-8 md:hidden">
            <Button onClick={openBrief} className={`${btn.lime} h-auto rounded-full px-10 py-4 text-base`}>Получить расчёт</Button>
          </div>
        </div>
      </section>

      <section className="container-pb pt-20 md:pt-24" aria-labelledby="app-faq-title">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <h2 id="app-faq-title" className="font-display text-4xl font-extrabold leading-[0.95] tracking-[-0.04em] md:text-6xl">Перед началом работы</h2>
          <div className="grid gap-3">
            {APP_FAQ.map((item, index) => {
              const on = open === index;
              return <div key={item.q} className="rounded-2xl border border-border bg-background">
                <h3><button type="button" onClick={() => setOpen(on ? null : index)} aria-expanded={on} aria-controls={`app-answer-${index}`} className="flex w-full items-center gap-4 px-5 py-4 text-left text-base font-medium md:text-lg">
                  <span aria-hidden className={`grid size-8 shrink-0 place-items-center rounded-full transition-colors duration-300 ${on ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>{on ? <Minus className="size-4" /> : <Plus className="size-4" />}</span><span>{item.q}</span>
                </button></h3>
                <div id={`app-answer-${index}`} aria-hidden={!on} data-open={on} className="pb-faq-reveal"><div className="pb-faq-answer-clip"><div className="pb-5 pl-[4.25rem] pr-5"><p className="pb-faq-answer text-sm text-muted-foreground md:text-base">{item.a}</p></div></div></div>
              </div>;
            })}
          </div>
        </div>
      </section>

      <Contact title="Обсудим ваше приложение" text="Расскажите об идее. Определим функции и этапы разработки." />
    </main>
    <Footer />
  </>;
}
