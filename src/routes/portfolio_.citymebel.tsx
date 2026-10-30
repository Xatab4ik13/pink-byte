import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/pinkbyte/Hero";
import { Contact, Footer } from "@/components/pinkbyte/Closing";
import { Reveal, btn } from "@/components/pinkbyte/primitives";
import { useOpenBrief } from "@/components/pinkbyte/brief-context";
import hero from "@/assets/citymebel-hero.webp.asset.json";
import about from "@/assets/citymebel-about.webp.asset.json";
import project from "@/assets/citymebel-project.webp.asset.json";
import process from "@/assets/citymebel-process.webp.asset.json";
import works from "@/assets/citymebel-portfolio.webp.asset.json";
import m1 from "@/assets/citymebel-mobile-1.webp.asset.json";
import m2 from "@/assets/citymebel-mobile-2.webp.asset.json";

const TITLE = "CityMebel MSK: сайт корпусной мебели на заказ · кейс Pink Byte";
const DESC =
  "Как мы сделали сайт производства корпусной мебели CityMebel MSK: реализованные проекты с материалами и ценой, портфолио с фильтрами, этапы работы и мобильная версия.";

export const Route = createFileRoute("/portfolio_/citymebel")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/portfolio/citymebel" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/portfolio/citymebel" }],
  }),
  component: CityMebelCase,
});

const FACTS = [
  { k: "Клиент", v: "CityMebel MSK, мебель на заказ" },
  { k: "Тип проекта", v: "Корпоративный сайт" },
  { k: "Что делали", v: "Дизайн, вёрстка, портфолио, адаптив" },
  { k: "Сайт", v: "citymebel.online" },
];

const Shot = ({ src, alt, w, h }: { src: string; alt: string; w: number; h: number }) => (
  <img src={src} alt={alt} width={w} height={h} loading="lazy" decoding="async" className="h-auto w-full rounded-2xl border border-border shadow-[0_24px_60px_-30px_color-mix(in_oklab,var(--ink)_45%,transparent)]" />
);

function CityMebelCase() {
  const openBrief = useOpenBrief();
  return <>
    <Header tone="light" />
    <main>
      <article>
        <header className="container-pb pt-8 md:pt-10">
          <Link to="/portfolio" preload="intent" className="text-sm font-semibold text-muted-foreground underline underline-offset-4">Все проекты</Link>
          <h1 className="pb-service-title mt-4 font-display font-extrabold">CityMebel MSK</h1>
          <p className="mt-4 max-w-3xl text-2xl font-semibold leading-tight md:text-4xl">Сайт московского производства корпусной мебели, где каждая кухня и шкаф показаны с материалами, размерами и итоговой ценой.</p>
          <dl className="mt-8 grid gap-4 border-y border-border py-6 sm:grid-cols-2 lg:grid-cols-4">
            {FACTS.map((f) => <div key={f.k}><dt className="text-sm text-muted-foreground">{f.k}</dt><dd className="mt-1 font-semibold">{f.v}</dd></div>)}
          </dl>
          <figure className="mt-10"><Shot src={hero.url} w={1440} h={900} alt="Главная страница CityMebel MSK: корпусная мебель на заказ в Москве с 2009 года" /></figure>
        </header>

        <section className="container-pb mt-16 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <h2 className="font-display text-3xl font-extrabold md:text-5xl">Задача</h2>
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>CityMebel MSK с 2009 года делает в Москве кухни, шкафы, гардеробные и другую корпусную мебель на своём производстве. Человек, который выбирает мебель на заказ, хочет понять две вещи: как это будет выглядеть и сколько стоит.</p>
            <p>Сайт должен был отвечать на оба вопроса сразу, без звонка менеджеру. А ещё передавать характер производства: строгий, аккуратный, с вниманием к материалам.</p>
          </div>
        </section>

        <section className="container-pb mt-16">
          <Reveal><Shot src={project.url} w={1440} h={900} alt="Реализованный проект CityMebel MSK: кухонный гарнитур с материалами, размерами, фурнитурой и стоимостью" /></Reveal>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <h2 className="font-display text-3xl font-extrabold md:text-5xl">Проекты с ценой</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">Главный приём сайта: реализованные проекты прямо на главной. Рядом с фотографией кухни или шкафа указаны материал корпуса и фасадов, размеры, столешница, фурнитура и итоговая стоимость. Посетитель видит реальную работу и реальную цену, а кнопка «Рассчитать проект» ведёт к заявке на похожий вариант.</p>
          </div>
        </section>

        <section className="container-pb mt-16">
          <Reveal><Shot src={works.url} w={1440} h={900} alt="Портфолио CityMebel MSK с фильтрами: кухни, шкафы и гардеробные, прихожие, гостиные, детские" /></Reveal>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <h2 className="font-display text-3xl font-extrabold md:text-5xl">Портфолио с фильтрами</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">Все работы собраны на отдельной странице и разложены по типам мебели: кухни, шкафы и гардеробные, прихожие, гостиные, детские. В карточке сразу видны стиль, цена и срок изготовления, поэтому подходящий пример находится за пару кликов.</p>
          </div>
        </section>

        <section className="container-pb mt-16">
          <Reveal><Shot src={process.url} w={1440} h={900} alt="Этапы работы CityMebel MSK: замер, проект, производство, доставка и монтаж" /></Reveal>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <h2 className="font-display text-3xl font-extrabold md:text-5xl">Путь от замера до монтажа</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">Этапы показаны схемой из четырёх шагов: бесплатный замер, 3D-проект со сметой, изготовление на своём производстве, доставка и установка. Рядом короткие цифры о компании. Клиент заранее знает, что его ждёт и сколько это займёт.</p>
          </div>
        </section>

        <section className="container-pb mt-16 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-extrabold md:text-5xl">Удобно с телефона</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">Мебель часто выбирают с телефона, поэтому мобильную версию собирали отдельно. Преимущества идут крупными карточками, а в проектах характеристики стоят над фотографией, чтобы цену и материалы было видно без лишней прокрутки.</p>
            <h2 className="mt-12 font-display text-3xl font-extrabold md:text-5xl">О производстве</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">Отдельная страница рассказывает о цехе, станках и материалах. Чёрно-белые фотографии производства подтверждают главное обещание компании: мебель делают сами, без посредников.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Shot src={m1.url} w={600} h={1298} alt="Мобильная версия сайта CityMebel MSK: преимущества компании" />
            <Shot src={m2.url} w={600} h={1298} alt="Мобильная версия проекта кухни на сайте CityMebel MSK" />
          </div>
        </section>

        <section className="container-pb mt-16">
          <Reveal><Shot src={about.url} w={1440} h={900} alt="Страница о производстве CityMebel MSK с фотографиями цеха" /></Reveal>
        </section>

        <section className="container-pb mt-16 flex flex-col items-start gap-6 border-t border-border pt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-2xl font-semibold leading-tight">Нужен сайт для вашего производства?</p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={openBrief} className={`${btn.lime} h-auto px-10 py-4`}>Рассчитать стоимость сайта</Button>
            <Button asChild variant="outline" className="h-auto rounded-full px-8 py-4 font-semibold">
              <a href="https://citymebel.online/" target="_blank" rel="noreferrer">Смотреть сайт</a>
            </Button>
          </div>
        </section>
      </article>
      <div className="mt-16"><Contact /></div>
    </main>
    <Footer />
  </>;
}
