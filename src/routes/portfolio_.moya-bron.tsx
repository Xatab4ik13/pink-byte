import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/pinkbyte/Hero";
import { Contact, Footer } from "@/components/pinkbyte/Closing";
import { Reveal, btn } from "@/components/pinkbyte/primitives";
import { useOpenBrief } from "@/components/pinkbyte/brief-context";
import { APP_STORE_URL } from "@/components/pinkbyte/app-data";
import hero from "@/assets/bron-hero.webp.asset.json";
import app from "@/assets/bron-app.webp.asset.json";
import benefits from "@/assets/bron-benefits.webp.asset.json";
import cities from "@/assets/bron-cities.webp.asset.json";
import listing from "@/assets/bron-listing.webp.asset.json";
import filters from "@/assets/bron-filters.webp.asset.json";
import panels from "@/assets/app-booking-panels.webp.asset.json";
import m1 from "@/assets/bron-mobile-1.webp.asset.json";
import m2 from "@/assets/bron-mobile-2.webp.asset.json";

const TITLE = "Моя Бронь: приложение и сайт бронирования отелей · кейс Pink Byte";
const DESC =
  "Как мы сделали сервис бронирования отелей «Моя Бронь»: поиск и фильтры, карточки отелей, приложение для iOS и Android, мини-приложение в Telegram и мобильную версию.";

export const Route = createFileRoute("/portfolio_/moya-bron")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/portfolio/moya-bron" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/portfolio/moya-bron" }],
  }),
  component: MoyaBronCase,
});

const FACTS = [
  { k: "Клиент", v: "Сервис «Моя Бронь»" },
  { k: "Тип проекта", v: "Мобильное приложение и сайт" },
  { k: "Что делали", v: "Дизайн, приложение, серверная часть" },
  { k: "Сайт", v: "moyabron.ru" },
];

const Shot = ({ src, alt, w, h }: { src: string; alt: string; w: number; h: number }) => (
  <img src={src} alt={alt} width={w} height={h} loading="lazy" decoding="async" className="h-auto w-full rounded-2xl border border-border shadow-[0_24px_60px_-30px_color-mix(in_oklab,var(--ink)_45%,transparent)]" />
);

const Block = ({ src, alt, title, w = 1440, h = 900, children }: { src: string; alt: string; title: string; w?: number; h?: number; children: React.ReactNode }) => (
  <section className="container-pb mt-16">
    <Reveal><Shot src={src} w={w} h={h} alt={alt} /></Reveal>
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
      <h2 className="font-display text-3xl font-extrabold md:text-5xl">{title}</h2>
      <p className="text-lg leading-relaxed text-muted-foreground">{children}</p>
    </div>
  </section>
);

function MoyaBronCase() {
  const openBrief = useOpenBrief();
  return <>
    <Header tone="light" />
    <main>
      <article>
        <header className="container-pb pt-8 md:pt-10">
          <Link to="/portfolio" preload="intent" className="text-sm font-semibold text-muted-foreground underline underline-offset-4">Все проекты</Link>
          <h1 className="pb-service-title mt-4 font-display font-extrabold">Моя Бронь</h1>
          <p className="mt-4 max-w-3xl text-2xl font-semibold leading-tight md:text-4xl">Сервис бронирования отелей по всей России: поиск с фильтрами на сайте, приложения для iOS и Android и мини-приложение в Telegram.</p>
          <dl className="mt-8 grid gap-4 border-y border-border py-6 sm:grid-cols-2 lg:grid-cols-4">
            {FACTS.map((f) => <div key={f.k}><dt className="text-sm text-muted-foreground">{f.k}</dt><dd className="mt-1 font-semibold">{f.v}</dd></div>)}
          </dl>
          <figure className="mt-10"><Shot src={hero.url} w={1440} h={900} alt="Главный экран сайта «Моя Бронь» с формой поиска отелей по городу, датам и гостям" /></figure>
        </header>

        <section className="container-pb mt-16 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <h2 className="font-display text-3xl font-extrabold md:text-5xl">Задача</h2>
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>«Моя Бронь» это агрегатор размещения по России: отели, гостиницы, апартаменты, хостелы, санатории, базы отдыха и глэмпинги. Пользователь приходит с коротким вопросом: где ночевать в конкретные даты и сколько это стоит.</p>
            <p>Значит, сервис должен отвечать на него за секунды: поиск по городу и датам, честные карточки с ценой и рейтингом, понятные фильтры и оплата российской картой или через СБП. Всё это нужно было собрать воедино на сайте и в приложении, чтобы человек начинал бронирование с любого экрана.</p>
          </div>
        </section>

        <Block src={app.url} alt="Промо-баннер приложения «Моя Бронь»: промокод APP15, QR-код, кнопки App Store, Google Play и Telegram, экран телефона с результатами поиска" title="Приложение под рукой" w={980} h={446}>
          На главной странице сразу виден блок про приложение: скидка 15% на первую бронь по промокоду APP15, QR-код и кнопки App Store, Google Play и мини-приложения в Telegram. Рядом макет телефона с уже готовой выдачей, поэтому переход с сайта в приложение не выглядит как лишнее действие.
        </Block>

        <Block src={benefits.url} alt="Три преимущества сервиса: более 40 000 отелей, поддержка 24/7 без роботов, 700 000 реальных отзывов" title="Три обещания на первом экране" w={980} h={544}>
          Под поиском стоят три опоры сервиса: более 40 000 отелей и свыше 1 000 000 вариантов размещения, поддержка 24/7 с живыми операторами и 700 000 реальных отзывов от гостей. Цифры работают на доверие, поэтому они вынесены в самые первые экраны и сайта, и приложения.
        </Block>

        <Block src={cities.url} alt="Подборка «Отели в России» с карточками городов: Москва, Санкт-Петербург, Казань, Калининград, Иркутск" title="Города и курорты" w={980} h={378}>
          Дальше идут готовые подборки: «Отели в России» с городами от Москвы и Санкт-Петербурга до Казани, Калининграда и Иркутска, и «Отдых на море» с Сочи, Севастополем, Анапой, Геленджиком и Ялтой. Человек, который ещё не выбрал место, попадает в нужную выдачу в один клик, а ссылка «Все города» ведёт в полный каталог.
        </Block>

        <Block src={listing.url} alt="Страница выдачи «Отели в Москве» с фильтрами слева и карточками отелей с рейтингом и ценой" title="Выдача без сюрпризов">
          В выдаче видно сразу: название, звёздность, оценку гостей, расстояние до центра, набор удобств и цену за ночь с числом гостей. Если номер по этой цене почти разобрали, карточка предупреждает об этом заранее. Ссылка «Все варианты» открывает все доступные номера отеля, чтобы не пришлось сравнивать вручную.
        </Block>

        <Block src={filters.url} alt="Фильтры выдачи: тип размещения, удобства отеля и номера, питание и условия отмены, плюс описание района" title="Фильтры и тексты для поиска">
          Слева работают фильтры по типу размещения, удобствам отеля и номера, питанию и условиям отмены, сверху сортировка, диапазон цены, оценка гостей и звёздность. Под выдачей размечены текстовые блоки про конкретные районы города, поэтому человек понимает, чем отель в центре у Кремля отличается от варианта у вокзала, и поисковик видит эти описания.
        </Block>

        <section className="container-pb mt-16">
          <Reveal><Shot src={panels.url} w={1443} h={879} alt="Экраны приложения «Моя Бронь»: поиск и фильтры, карточка отеля, бронирование и оплата" /></Reveal>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <h2 className="font-display text-3xl font-extrabold md:text-5xl">Экраны приложения</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">В приложении тот же путь, что на сайте: поиск и фильтры, карточка отеля с фото и отзывами, выбор номера и оплата. История заказов сохраняется, поэтому повторное бронирование занимает пару касаний.</p>
          </div>
        </section>

        <section className="container-pb mt-16 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-extrabold md:text-5xl">Удобно с телефона</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">В мобильной версии поиск превращается в вертикальную карточку: город, даты и гости идут друг под другом, кнопка «Найти» всегда под рукой. В выдаче фильтры собраны в чипсы: сортировка, цена за ночь, звёзды и оценка гостей.</p>
            <h2 className="mt-12 font-display text-3xl font-extrabold md:text-5xl">Дальше по сценарию</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">Для тех, кто не хочет ничего устанавливать, есть мини-приложение в Telegram. А в подвале сайта остаются ссылки «Подключить отель», «Все города России», блог и служба поддержки, кнопки магазинов приложений и переключатель светлой или тёмной темы.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Shot src={m1.url} w={700} h={1515} alt="Мобильная версия главного экрана «Моя Бронь» с формой поиска" />
            <Shot src={m2.url} w={700} h={1515} alt="Мобильная версия выдачи отелей в Москве с чипсами фильтров и карточками" />
          </div>
        </section>

        <section className="container-pb mt-16 flex flex-col items-start gap-6 border-t border-border pt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-2xl font-semibold leading-tight">Нужно приложение для бронирования или услуг?</p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={openBrief} className={`${btn.lime} h-auto px-10 py-4`}>Рассчитать стоимость приложения</Button>
            <Button asChild variant="outline" className="h-auto rounded-full px-8 py-4 font-semibold">
              <a href="https://moyabron.ru/" target="_blank" rel="noreferrer">Смотреть сайт</a>
            </Button>
            <Button asChild variant="outline" className="h-auto rounded-full px-8 py-4 font-semibold">
              <a href={APP_STORE_URL} target="_blank" rel="noreferrer">Приложение</a>
            </Button>
          </div>
        </section>
      </article>
      <div className="mt-16"><Contact /></div>
    </main>
    <Footer />
  </>;
}
