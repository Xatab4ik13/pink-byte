import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/pinkbyte/Hero";
import { Contact, Footer } from "@/components/pinkbyte/Closing";
import { Reveal, btn } from "@/components/pinkbyte/primitives";
import { useOpenBrief } from "@/components/pinkbyte/brief-context";
import hero from "@/assets/conc-hero.webp.asset.json";
import dirs from "@/assets/conc-dirs.webp.asset.json";
import focus from "@/assets/conc-focus.webp.asset.json";
import dist from "@/assets/conc-dist.webp.asset.json";
import m1 from "@/assets/conc-mobile-1.webp.asset.json";
import m2 from "@/assets/conc-mobile-2.webp.asset.json";

const TITLE = "Концентрация: сайт компании в химии и фармацевтике · кейс Pink Byte";
const DESC =
  "Как мы сделали корпоративный сайт «Концентрации» (ex. AppScience): три направления бизнеса, ключевые цифры компании, страницы дистрибуции и производства, заявка и мобильная версия.";

export const Route = createFileRoute("/portfolio_/konczentracziya")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/portfolio/konczentracziya" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/portfolio/konczentracziya" }],
  }),
  component: ConcCase,
});

const FACTS = [
  { k: "Клиент", v: "Концентрация, ex. AppScience" },
  { k: "Тип проекта", v: "Корпоративный сайт" },
  { k: "Что делали", v: "Дизайн, вёрстка, адаптив" },
  { k: "Сайт", v: "conc.ru" },
];

const Shot = ({ src, alt, w, h }: { src: string; alt: string; w: number; h: number }) => (
  <img src={src} alt={alt} width={w} height={h} loading="lazy" decoding="async" className="h-auto w-full rounded-2xl border border-border shadow-[0_24px_60px_-30px_color-mix(in_oklab,var(--ink)_45%,transparent)]" />
);

function ConcCase() {
  const openBrief = useOpenBrief();
  return <>
    <Header tone="light" />
    <main>
      <article>
        <header className="container-pb pt-8 md:pt-10">
          <Link to="/portfolio" preload="intent" className="text-sm font-semibold text-muted-foreground underline underline-offset-4">Все проекты</Link>
          <h1 className="pb-service-title mt-4 font-display font-extrabold">Концентрация</h1>
          <p className="mt-4 max-w-3xl text-2xl font-semibold leading-tight md:text-4xl">Корпоративный сайт компании, которая обеспечивает лаборатории и производства реактивами, сырьём и оборудованием.</p>
          <dl className="mt-8 grid gap-4 border-y border-border py-6 sm:grid-cols-2 lg:grid-cols-4">
            {FACTS.map((f) => <div key={f.k}><dt className="text-sm text-muted-foreground">{f.k}</dt><dd className="mt-1 font-semibold">{f.v}</dd></div>)}
          </dl>
          <figure className="mt-10"><Shot src={hero.url} w={1440} h={900} alt="Главная страница сайта Концентрации: закрываем все потребности лабораторий и производств" /></figure>
        </header>

        <section className="container-pb mt-16 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <h2 className="font-display text-3xl font-extrabold md:text-5xl">Задача</h2>
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>«Концентрация», ранее AppScience, работает в трёх направлениях: дистрибуция химических реактивов и лабораторного оборудования, производство фармацевтического сырья и собственная фармкомпания. Клиенты компании: научные лаборатории, службы контроля качества и промышленные предприятия.</p>
            <p>После смены названия нужен был сайт, который сразу объясняет, чем компания занимается, показывает её масштаб и выглядит так же серьёзно, как и сама работа с химией и фармацевтикой.</p>
          </div>
        </section>

        <section className="container-pb mt-16">
          <Reveal><Shot src={dirs.url} w={1440} h={900} alt="Направления бизнеса Концентрации: дистрибуция, производство, фармкомпания и ключевые цифры" /></Reveal>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <h2 className="font-display text-3xl font-extrabold md:text-5xl">Три направления и цифры</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">Направления бизнеса переключаются как вкладки: дистрибуция, производство, фармкомпания. У каждого короткое описание и переход на отдельную страницу. Ниже идут цифры компании: год основания, выручка, число постоянных клиентов, поставленных SKU, стран-производителей и сотрудников. Цифры набираются при прокрутке и сразу дают понять масштаб.</p>
          </div>
        </section>

        <section className="container-pb mt-16">
          <Reveal><Shot src={focus.url} w={1440} h={900} alt="Блок «Концентрируемся на главном»: цена, сроки, надёжность и сервис" /></Reveal>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <h2 className="font-display text-3xl font-extrabold md:text-5xl">Фирменный стиль в деталях</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">Квадратные скобки из логотипа стали главным графическим приёмом: в них стоят название, направления, цифры и заголовки преимуществ. Глубокий бирюзовый фон с мягким свечением напоминает лабораторное стекло. Блок «Концентрируемся на главном» раскладывает преимущества по четырём темам: цена, сроки, надёжность и сервис.</p>
          </div>
        </section>

        <section className="container-pb mt-16">
          <Reveal><Shot src={dist.url} w={1440} h={900} alt="Страница направления «Дистрибуция Концентрации» с кнопкой запроса коммерческого предложения" /></Reveal>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <h2 className="font-display text-3xl font-extrabold md:text-5xl">Страницы направлений</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">Для дистрибуции, производства и фармкомпании сделаны отдельные страницы. Каждая начинается с крупного заголовка и своего целевого действия: на дистрибуции это запрос коммерческого предложения, на производстве обсуждение партнёрства. Так посетитель сразу попадает к нужной команде.</p>
          </div>
        </section>

        <section className="container-pb mt-16 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-extrabold md:text-5xl">Удобно с телефона</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">На телефоне меню прячется под одну кнопку, а цифры компании выстраиваются в столбик крупным шрифтом. Описания направлений и кнопки остаются под рукой.</p>
            <h2 className="mt-12 font-display text-3xl font-extrabold md:text-5xl">Заявка в конце пути</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">Внизу главной стоит форма обратной связи с выбором темы запроса. Компания сразу понимает, к какому направлению относится обращение, и передаёт его профильному менеджеру.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Shot src={m1.url} w={600} h={1298} alt="Мобильная версия главной страницы Концентрации" />
            <Shot src={m2.url} w={600} h={1298} alt="Мобильная версия: цифры компании Концентрация" />
          </div>
        </section>

        <section className="container-pb mt-16 flex flex-col items-start gap-6 border-t border-border pt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-2xl font-semibold leading-tight">Нужен сайт для вашей компании?</p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={openBrief} className={`${btn.lime} h-auto px-10 py-4`}>Рассчитать стоимость сайта</Button>
            <Button asChild variant="outline" className="h-auto rounded-full px-8 py-4 font-semibold">
              <a href="https://conc.ru/" target="_blank" rel="noreferrer">Смотреть сайт</a>
            </Button>
          </div>
        </section>
      </article>
      <div className="mt-16"><Contact /></div>
    </main>
    <Footer />
  </>;
}
