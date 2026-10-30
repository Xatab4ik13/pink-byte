import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/pinkbyte/Hero";
import { Contact, Footer } from "@/components/pinkbyte/Closing";
import { Reveal, btn } from "@/components/pinkbyte/primitives";
import { useOpenBrief } from "@/components/pinkbyte/brief-context";
import hero from "@/assets/nikitsky-hero.webp.asset.json";
import intro from "@/assets/nikitsky-intro.webp.asset.json";
import flats from "@/assets/nikitsky-flats.webp.asset.json";
import ph from "@/assets/nikitsky-ph.webp.asset.json";
import place from "@/assets/nikitsky-place.webp.asset.json";
import contacts from "@/assets/nikitsky-contacts.webp.asset.json";
import m1 from "@/assets/nikitsky-mobile-1.webp.asset.json";
import m2 from "@/assets/nikitsky-mobile-2.webp.asset.json";

const TITLE = "Никитский 6: сайт клубного дома в центре Москвы · кейс Pink Byte";
const DESC =
  "Как мы сделали сайт клубного дома «Никитский 6» на Никитском бульваре: архитектура, квартиры с авторской отделкой, пентхаусы, локация и мобильная версия.";

export const Route = createFileRoute("/portfolio_/nikitsky-6")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/portfolio/nikitsky-6" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/portfolio/nikitsky-6" }],
  }),
  component: NikitskyCase,
});

const FACTS = [
  { k: "Клиент", v: "Клубный дом «Никитский 6»" },
  { k: "Тип проекта", v: "Корпоративный сайт" },
  { k: "Что делали", v: "Дизайн, вёрстка, адаптив" },
  { k: "Сайт", v: "nikitsky6.ru" },
];

const Shot = ({ src, alt, w, h }: { src: string; alt: string; w: number; h: number }) => (
  <img src={src} alt={alt} width={w} height={h} loading="lazy" decoding="async" className="h-auto w-full rounded-2xl border border-border shadow-[0_24px_60px_-30px_color-mix(in_oklab,var(--ink)_45%,transparent)]" />
);

const Block = ({ src, alt, title, children }: { src: string; alt: string; title: string; children: React.ReactNode }) => (
  <section className="container-pb mt-16">
    <Reveal><Shot src={src} w={1440} h={900} alt={alt} /></Reveal>
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
      <h2 className="font-display text-3xl font-extrabold md:text-5xl">{title}</h2>
      <p className="text-lg leading-relaxed text-muted-foreground">{children}</p>
    </div>
  </section>
);

function NikitskyCase() {
  const openBrief = useOpenBrief();
  return <>
    <Header tone="light" />
    <main>
      <article>
        <header className="container-pb pt-8 md:pt-10">
          <Link to="/portfolio" preload="intent" className="text-sm font-semibold text-muted-foreground underline underline-offset-4">Все проекты</Link>
          <h1 className="pb-service-title mt-4 font-display font-extrabold">Никитский 6</h1>
          <p className="mt-4 max-w-3xl text-2xl font-semibold leading-tight md:text-4xl">Сайт клубного дома на Никитском бульваре, который продаёт атмосферу исторической Москвы так же спокойно и уверенно, как выглядит сам дом.</p>
          <dl className="mt-8 grid gap-4 border-y border-border py-6 sm:grid-cols-2 lg:grid-cols-4">
            {FACTS.map((f) => <div key={f.k}><dt className="text-sm text-muted-foreground">{f.k}</dt><dd className="mt-1 font-semibold">{f.v}</dd></div>)}
          </dl>
          <figure className="mt-10"><Shot src={hero.url} w={1440} h={900} alt="Главный экран сайта клубного дома Никитский 6 с фасадом здания" /></figure>
        </header>

        <section className="container-pb mt-16 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <h2 className="font-display text-3xl font-extrabold md:text-5xl">Задача</h2>
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>«Никитский 6» — клубный дом с колоннами в историческом центре Москвы: 57 квартир с авторской отделкой, 4 пентхауса с террасами и каминами, подземный паркинг. Покупатель такой недвижимости выбирает не метры, а образ жизни.</p>
            <p>Сайт должен был передать это ощущение: тишину бульваров, качество материалов, приватность. Без агрессивных баннеров и с бережным отношением к визуализациям.</p>
          </div>
        </section>

        <Block src={intro.url} alt="Блок «Никитский 6, дом с колоннами» с описанием и визуализацией фасада" title="Спокойный тон">
          Сайт построен на тёплом светлом фоне, тонкой типографике и большом количестве воздуха. Короткие тексты и крупные визуализации фасада сразу задают настроение: дом вписан в архитектуру старого центра и не спорит с ней. Ключевые преимущества дома собраны коротким списком: квартиры, пентхаусы, виды на Кремль, клубная инфраструктура и паркинг.
        </Block>

        <Block src={flats.url} alt="Раздел «57 квартир с авторской отделкой» с интерьерами в двух стилях" title="Квартиры и интерьеры">
          Квартирам посвящён отдельный раздел: два стиля интерьеров, Airy Contemporary и Skyline Modern, натуральные дерево, камень и металл, полностью оборудованные кухни. Тезисы стоят слева, справа листаются интерьерные визуализации.
        </Block>

        <Block src={ph.url} alt="Раздел о четырёх пентхаусах с террасами, окнами Sky-frame и каминами" title="Пентхаусы">
          Для четырёх пентхаусов сделан свой блок: приватные террасы с видом на исторический центр, панорамные окна Sky-frame и дровяные камины. Та же структура, что у квартир, поэтому разделы легко сравнивать.
        </Block>

        <Block src={place.url} alt="Раздел «Место, говорящее само за себя» с фотографиями бульваров и исторических зданий" title="Локация">
          Отдельный рассказ о месте: культурные слои XVII–XX веков, километры зелёных бульваров и виды от открытых перспектив центра до тихих переулков. Фотографии района работают на ценность адреса не хуже, чем визуализации дома.
        </Block>

        <section className="container-pb mt-16 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-extrabold md:text-5xl">Удобно с телефона</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">В мобильной версии визуализации остаются крупными, тексты идут одной колонкой, а телефон и мессенджеры офиса продаж закреплены в верхней панели. Связаться можно с любого экрана.</p>
            <h2 className="mt-12 font-display text-3xl font-extrabold md:text-5xl">Офис продаж</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">В конце страницы адрес и часы работы офиса продаж, контакты для прессы и короткая форма с удобным временем для звонка. Никаких лишних полей: имя, телефон и почта.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Shot src={m1.url} w={600} h={1298} alt="Мобильная версия главного экрана Никитский 6" />
            <Shot src={m2.url} w={600} h={1298} alt="Мобильная версия раздела о квартирах Никитский 6" />
          </div>
        </section>

        <section className="container-pb mt-16">
          <Reveal><Shot src={contacts.url} w={1440} h={900} alt="Контакты офиса продаж Никитский 6 и форма обратной связи" /></Reveal>
        </section>

        <section className="container-pb mt-16 flex flex-col items-start gap-6 border-t border-border pt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-2xl font-semibold leading-tight">Нужен сайт для жилого комплекса?</p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={openBrief} className={`${btn.lime} h-auto px-10 py-4`}>Рассчитать стоимость сайта</Button>
            <Button asChild variant="outline" className="h-auto rounded-full px-8 py-4 font-semibold">
              <a href="https://nikitsky6.ru/" target="_blank" rel="noreferrer">Смотреть сайт</a>
            </Button>
          </div>
        </section>
      </article>
      <div className="mt-16"><Contact /></div>
    </main>
    <Footer />
  </>;
}
