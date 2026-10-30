import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/pinkbyte/Hero";
import { Contact, Footer } from "@/components/pinkbyte/Closing";
import { Reveal, btn } from "@/components/pinkbyte/primitives";
import { useOpenBrief } from "@/components/pinkbyte/brief-context";
import home from "@/assets/chinar-home.webp.asset.json";
import about from "@/assets/chinar-about.webp.asset.json";
import prices from "@/assets/chinar-prices.webp.asset.json";
import schedule from "@/assets/chinar-schedule.webp.asset.json";
import reviews from "@/assets/chinar-reviews.webp.asset.json";
import mHome from "@/assets/chinar-mobile-home.webp.asset.json";
import mSchedule from "@/assets/chinar-mobile-schedule.webp.asset.json";

const TITLE = "CHINAR: сайт центра китайского языка · кейс Pink Byte";
const DESC =
  "Как мы сделали сайт центра китайского языка CHINAR: расписание групповых занятий с записью, карточки преподавателей, тарифы HSK и мобильная версия.";

export const Route = createFileRoute("/portfolio_/chinar")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/portfolio/chinar" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/portfolio/chinar" }],
  }),
  component: ChinarCase,
});

const FACTS = [
  { k: "Клиент", v: "CHINAR, центр китайского языка" },
  { k: "Тип проекта", v: "Корпоративный сайт" },
  { k: "Что делали", v: "Дизайн, вёрстка, расписание, адаптив" },
  { k: "Сайт", v: "onlinechinar.ru" },
];

const Shot = ({ src, alt, w, h }: { src: string; alt: string; w: number; h: number }) => (
  <img src={src} alt={alt} width={w} height={h} loading="lazy" decoding="async" className="h-auto w-full rounded-2xl border border-border shadow-[0_24px_60px_-30px_color-mix(in_oklab,var(--ink)_45%,transparent)]" />
);

function ChinarCase() {
  const openBrief = useOpenBrief();
  return <>
    <Header tone="light" />
    <main>
      <article>
        <header className="container-pb pt-8 md:pt-10">
          <Link to="/portfolio" preload="intent" className="text-sm font-semibold text-muted-foreground underline underline-offset-4">Все проекты</Link>
          <h1 className="pb-service-title mt-4 font-display font-extrabold">CHINAR</h1>
          <p className="mt-4 max-w-3xl text-2xl font-semibold leading-tight md:text-4xl">Сайт центра китайского языка, на котором можно выбрать преподавателя и записаться на занятие за пару минут.</p>
          <dl className="mt-8 grid gap-4 border-y border-border py-6 sm:grid-cols-2 lg:grid-cols-4">
            {FACTS.map((f) => <div key={f.k}><dt className="text-sm text-muted-foreground">{f.k}</dt><dd className="mt-1 font-semibold">{f.v}</dd></div>)}
          </dl>
          <figure className="mt-10"><Shot src={home.url} w={1440} h={900} alt="Главная страница сайта центра китайского языка CHINAR" /></figure>
        </header>

        <section className="container-pb mt-16 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <h2 className="font-display text-3xl font-extrabold md:text-5xl">Задача</h2>
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>CHINAR учит китайскому русскоязычных студентов: групповые курсы по уровням HSK, индивидуальные занятия, подготовка к экзаменам и поступлению. Раньше расписание и запись жили в переписке, и ученику приходилось спрашивать, когда ближайшая группа и кто её ведёт.</p>
            <p>Центру был нужен сайт, который сам отвечает на эти вопросы: какие есть курсы и сколько они стоят, кто преподаёт и когда можно прийти. И при этом выглядит живо, без привычной для языковых школ скуки.</p>
          </div>
        </section>

        <section className="container-pb mt-16">
          <Reveal><Shot src={about.url} w={1440} h={780} alt="Блок о центре CHINAR: коммуникативный метод, опытные педагоги, гибкое расписание, культура Китая" /></Reveal>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <h2 className="font-display text-3xl font-extrabold md:text-5xl">Характер вместо шаблона</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">Визуальный язык собрали вокруг красного и тёплого персикового, крупной типографики и иероглифов на фоне. Появился и маскот: тигрёнок, который встречает в расписании и делает сайт дружелюбнее для детей и родителей. Блок о центре коротко объясняет главное: говорите с первого урока, занимаетесь в удобное время, изучаете не только слова, но и культуру Китая.</p>
          </div>
        </section>

        <section className="container-pb mt-16">
          <Reveal><Shot src={schedule.url} w={1440} h={900} alt="Расписание групповых занятий CHINAR по дням с поиском по номеру группы и выбором преподавателя" /></Reveal>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <h2 className="font-display text-3xl font-extrabold md:text-5xl">Расписание на любую неделю</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">Главная часть сайта: живой календарь групповых занятий. Дни листаются стрелками, у каждого занятия видно время, уровень HSK, длительность и преподавателя. Расписание можно смотреть целиком или по конкретному педагогу, а нужную группу найти по номеру. Из карточки преподавателя тоже ведёт кнопка в его расписание.</p>
          </div>
        </section>

        <section className="container-pb mt-16">
          <Reveal><Shot src={prices.url} w={1440} h={780} alt="Тарифы CHINAR: HSK1 за 3 месяца, HSK2 за 4 месяца и индивидуальный китайский онлайн" /></Reveal>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <h2 className="font-display text-3xl font-extrabold md:text-5xl">Понятные тарифы</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">Курсы описаны так, чтобы сразу было ясно, за что платишь: сколько занятий, в каком составе группы, есть ли пробные экзамены и куратор. HSK1 за 3 месяца, HSK2 за 4 месяца и индивидуальные занятия стоят рядом, цена указана в каждой карточке, кнопка выбора тарифа тут же.</p>
          </div>
        </section>

        <section className="container-pb mt-16 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-extrabold md:text-5xl">Удобно с телефона</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">Большинство учеников открывают сайт со смартфона, поэтому мобильную версию продумывали отдельно. Дни расписания листаются пальцем, переключение между общим расписанием и преподавателями крупное, меню прячется под одну кнопку.</p>
            <h2 className="mt-12 font-display text-3xl font-extrabold md:text-5xl">Преподаватели и отзывы</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">Каждый педагог представлен отдельной карточкой: уровень языка, специализация, где учился, и пара слов от себя. Ниже собраны истории учеников. Ещё до записи понятно, к кому идёшь и чего ждать от занятий.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Shot src={mHome.url} w={600} h={1298} alt="Мобильная версия главной страницы CHINAR" />
            <Shot src={mSchedule.url} w={600} h={1298} alt="Мобильное расписание занятий CHINAR" />
          </div>
        </section>

        <section className="container-pb mt-16">
          <Reveal><Shot src={reviews.url} w={1440} h={780} alt="Отзывы учеников центра китайского языка CHINAR" /></Reveal>
        </section>

        <section className="container-pb mt-16 flex flex-col items-start gap-6 border-t border-border pt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-2xl font-semibold leading-tight">Нужен сайт для вашей школы или студии?</p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={openBrief} className={`${btn.lime} h-auto px-10 py-4`}>Рассчитать стоимость сайта</Button>
            <Button asChild variant="outline" className="h-auto rounded-full px-8 py-4 font-semibold">
              <a href="https://onlinechinar.ru/" target="_blank" rel="noreferrer">Смотреть сайт</a>
            </Button>
          </div>
        </section>
      </article>
      <div className="mt-16"><Contact /></div>
    </main>
    <Footer />
  </>;
}
