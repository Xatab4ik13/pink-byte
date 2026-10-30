import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/pinkbyte/Hero";
import { Contact, Footer } from "@/components/pinkbyte/Closing";
import { Reveal, btn } from "@/components/pinkbyte/primitives";
import { useOpenBrief } from "@/components/pinkbyte/brief-context";
import home from "@/assets/brionilux-home.webp.asset.json";
import collections from "@/assets/brionilux-collections.webp.asset.json";
import catalog from "@/assets/brionilux-catalog.webp.asset.json";
import product from "@/assets/brionilux-product.webp.asset.json";
import mHome from "@/assets/brionilux-mobile-home.webp.asset.json";
import mProduct from "@/assets/brionilux-mobile-product.webp.asset.json";

const TITLE = "Brionilux: интернет-магазин розеток и выключателей · кейс Pink Byte";
const DESC =
  "Как мы сделали интернет-магазин электрофурнитуры Brionilux: три коллекции, каталог с подбором цвета рамки и механизма, карточки с артикулами и разделы для дизайнеров, оптовиков и электриков.";

export const Route = createFileRoute("/portfolio_/brionilux")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/portfolio/brionilux" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/portfolio/brionilux" }],
  }),
  component: BrioniluxCase,
});

const FACTS = [
  { k: "Клиент", v: "Brionilux, бренд электроустановочных изделий" },
  { k: "Тип проекта", v: "Интернет-магазин" },
  { k: "Что делали", v: "Дизайн, вёрстка, каталог, корзина, адаптив" },
  { k: "Сайт", v: "brionilux.ru" },
];

const Shot = ({ src, alt, w, h }: { src: string; alt: string; w: number; h: number }) => (
  <img src={src} alt={alt} width={w} height={h} loading="lazy" decoding="async" className="h-auto w-full rounded-2xl border border-border shadow-[0_24px_60px_-30px_color-mix(in_oklab,var(--ink)_45%,transparent)]" />
);

function BrioniluxCase() {
  const openBrief = useOpenBrief();
  return <>
    <Header tone="light" />
    <main>
      <article>
        <header className="container-pb pt-8 md:pt-10">
          <Link to="/portfolio" preload="intent" className="text-sm font-semibold text-muted-foreground underline underline-offset-4">Все проекты</Link>
          <h1 className="pb-service-title mt-4 font-display font-extrabold">Brionilux</h1>
          <p className="mt-4 max-w-3xl text-2xl font-semibold leading-tight md:text-4xl">Интернет-магазин розеток и выключателей, в котором фурнитуру выбирают как деталь интерьера.</p>
          <dl className="mt-8 grid gap-4 border-y border-border py-6 sm:grid-cols-2 lg:grid-cols-4">
            {FACTS.map((f) => <div key={f.k}><dt className="text-sm text-muted-foreground">{f.k}</dt><dd className="mt-1 font-semibold">{f.v}</dd></div>)}
          </dl>
          <figure className="mt-10"><Shot src={home.url} w={1440} h={900} alt="Главная страница интернет-магазина Brionilux с коллекциями и категориями товаров" /></figure>
        </header>

        <section className="container-pb mt-16 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <h2 className="font-display text-3xl font-extrabold md:text-5xl">Задача</h2>
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Brionilux продаёт розетки, выключатели, рамки и механизмы в нескольких цветах и фактурах: бархат, глянец, стекло. Покупатель здесь выбирает не просто «розетку», а цвет под стены, двери и мебель, поэтому обычный каталог со списком товаров бренду не подходил.</p>
            <p>Нужен был магазин, где видно фактуру и цвет, легко собрать комплект из рамки и механизма и не запутаться в артикулах. И отдельно: понятный вход для дизайнеров, оптовых покупателей и электриков, у которых свои вопросы.</p>
          </div>
        </section>

        <section className="container-pb mt-16">
          <Reveal><Shot src={collections.url} w={1440} h={620} alt="Три коллекции Brionilux: Series Z золотой бархат, G Glass чёрное стекло, G Plast белый бархат" /></Reveal>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <h2 className="font-display text-3xl font-extrabold md:text-5xl">Коллекции вместо скучного списка</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">Ассортимент разделили на три коллекции: Series Z в золотом бархате, G Glass в чёрном стекле и G Plast в белом бархате. Каждая открывается с главной в один клик. Ниже идут категории: выключатели, розетки, рамки, светорегуляторы, терморегуляторы, управление жалюзи, вывод кабеля, механизмы и накладки. Тот, кто знает, что ищет, попадает в нужный раздел сразу, а тот, кто выбирает по стилю, начинает с коллекции.</p>
          </div>
        </section>

        <section className="container-pb mt-16">
          <Reveal><Shot src={catalog.url} w={1440} h={780} alt="Витрина Brionilux: карточки выключателей и розеток с выбором цвета и ценой" /></Reveal>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <h2 className="font-display text-3xl font-extrabold md:text-5xl">Каталог, где цвет меняется прямо в карточке</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">В карточке товара на витрине есть цветные точки: нажимаешь и видишь ту же модель в другом исполнении, без перехода на новую страницу. Рядом артикулы комплекта, наличие и цена. Кнопка корзины стоит в самой карточке, чтобы электрик, собирающий заказ на объект, не открывал каждую позицию отдельно.</p>
          </div>
        </section>

        <section className="container-pb mt-16">
          <Reveal><Shot src={product.url} w={1440} h={900} alt="Карточка товара Brionilux: выключатель с LED подсветкой, артикулы комплекта, другие цвета и совместимые накладки" /></Reveal>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <h2 className="font-display text-3xl font-extrabold md:text-5xl">Совместимость без ошибок</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">Самая частая проблема в электрофурнитуре: купили механизм, а накладка к нему не подходит. На странице товара мы вывели блок совместимости с подходящими накладками и все цвета модели. В коллекциях есть подбор: сначала цвет рамки, затем цвет механизма, и сайт показывает, как будет выглядеть комплект.</p>
          </div>
        </section>

        <section className="container-pb mt-16 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-extrabold md:text-5xl">Удобно с телефона</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">Розетки часто выбирают прямо на ремонте, с телефоном в руке. В мобильной версии поиск, корзина и меню всегда под пальцем, категории листаются горизонтально, а карточка товара показывает фото, артикулы и цену без лишней прокрутки.</p>
            <h2 className="mt-12 font-display text-3xl font-extrabold md:text-5xl">Для дизайнеров, оптовиков и электриков</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">У каждой аудитории свой раздел и своя заявка. Дизайнерам подбирают серии и цвета под интерьер, оптовикам готовят условия и документы, электрикам помогают собрать комплекты под объект. На главной собраны отзывы покупателей.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Shot src={mHome.url} w={600} h={1298} alt="Мобильная версия главной страницы Brionilux" />
            <Shot src={mProduct.url} w={600} h={1298} alt="Мобильная карточка товара Brionilux" />
          </div>
        </section>

        <section className="container-pb mt-16 flex flex-col items-start gap-6 border-t border-border pt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-2xl font-semibold leading-tight">Нужен похожий магазин для вашего ассортимента?</p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={openBrief} className={`${btn.lime} h-auto px-10 py-4`}>Рассчитать стоимость магазина</Button>
            <Button asChild variant="outline" className="h-auto rounded-full px-8 py-4 font-semibold">
              <a href="https://brionilux.ru/" target="_blank" rel="noreferrer">Смотреть сайт</a>
            </Button>
          </div>
        </section>
      </article>
      <div className="mt-16"><Contact /></div>
    </main>
    <Footer />
  </>;
}
