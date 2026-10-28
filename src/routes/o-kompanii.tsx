import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/pinkbyte/Hero";
import { Projects } from "@/components/pinkbyte/Projects";
import { Contact, Footer } from "@/components/pinkbyte/Closing";
import { Reveal, btn } from "@/components/pinkbyte/primitives";
import team from "@/assets/about-team.webp.asset.json";
import teamMobile from "@/assets/about-team-m.webp.asset.json";
import award from "@/assets/about-award.webp.asset.json";
import handoff from "@/assets/about-handoff.webp.asset.json";

const TITLE = "О компании Pink Byte · студия разработки сайтов и приложений";
const DESC =
  "Pink Byte: студия разработки сайтов и приложений. Создаём корпоративные сайты, интернет-магазины, CRM-системы и мобильные приложения для бизнеса по всей России.";

const FACTS = [
  { title: "Собственный код", text: "Разрабатываем под задачи проекта." },
  { title: "Исходники у вас", text: "Передаём код после разработки." },
  { title: "Месяц поддержки", text: "Исправляем ошибки и небольшие недочёты." },
];

const SKILLS = [
  {
    title: "Дизайн интерфейсов",
    text: "Проектируем структуру сайта и пользовательские сценарии: поиск товара, оформление заказа, отправку заявки. Готовим дизайн для компьютеров и смартфонов, чтобы интерфейс был понятным на разных экранах.",
  },
  {
    title: "Веб-разработка и CRM",
    text: "Разрабатываем корпоративные сайты, интернет-магазины и CRM-системы на собственном коде. Создаём панели управления, формы, каталоги и рабочие инструменты. Подключаем внешние сервисы под задачи проекта.",
  },
  {
    title: "Мобильные приложения",
    text: "Создаём приложения для iOS и Android, включая кроссплатформенные решения. Разрабатываем экраны, серверную часть и панель управления, подключаем авторизацию, уведомления и необходимые интеграции.",
  },
];

const RATINGS = [
  "ТОП-10 разработчиков интернет-магазинов России по «Рейтингу Рунета».",
  "ТОП-10 разработчиков e-commerce по «Рейтингу Рунета 2026».",
  "9-е место в категории магазинов средней сложности, 2026 год.",
  "7-е место среди разработчиков интернет-магазинов, «Рейтинг Рунета 2026».",
  "10-е место в категории интернет-магазинов средней сложности, 2026 год.",
  "7-е место среди разработчиков магазинов средней сложности, 2026 год.",
  "10-е место в общем рейтинге разработчиков интернет-магазинов, 2026 год.",
];

export const Route = createFileRoute("/o-kompanii")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function Accent() {
  return <span aria-hidden className="block h-1.5 w-12 rounded-full bg-primary" />;
}

function AboutPage() {
  return <>
    <div id="top" className="relative z-10 bg-ink text-ink-foreground">
      <Header />
      <section className="container-pb pb-8 pt-6 md:pt-8" aria-labelledby="about-title">
        <nav aria-label="Хлебные крошки" className="text-xs text-ink-foreground/70">
          <Link to="/" className="hover:text-ink-foreground">Главная</Link><span className="mx-2">/</span><span>О компании</span>
        </nav>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div>
            <p className="text-sm font-medium text-ink-foreground/80">О компании Pink Byte</p>
            <h1 id="about-title" className="display mt-3 text-[clamp(2.6rem,6.5vw,6rem)] leading-[0.95]">
              Люди, которые делают сложное <span className="text-primary">удобным.</span>
            </h1>
          </div>
          <div className="max-w-md">
            <p className="text-lg leading-[1.4]">Pink Byte: студия разработки сайтов и приложений. Создаём корпоративные сайты, интернет-магазины, CRM-системы и мобильные приложения для бизнеса по всей России.</p>
            <Button asChild className={`${btn.paper} mt-6 h-auto px-8 py-3.5 text-base`}>
              <Link to="/" hash="projects">Посмотреть портфолио</Link>
            </Button>
          </div>
        </div>
        <picture>
          <source media="(max-width: 767px)" srcSet={teamMobile.url} />
          <img src={team.url} width={1920} height={720} alt="Команда Pink Byte обсуждает интерфейс проекта у монитора" fetchPriority="high" decoding="async" className="mt-10 h-auto w-full rounded-3xl object-cover grayscale" />
        </picture>
      </section>
    </div>

    <main>
      <section className="container-pb pt-10" aria-label="Принципы работы">
        <ul className="grid gap-6 border-b border-border pb-10 md:grid-cols-3 md:gap-0">
          {FACTS.map((f, i) => (
            <li key={f.title} className={i ? "md:border-l md:border-border md:pl-8" : "md:pr-8"}>
              <h2 className="text-lg font-bold">{f.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-pb pt-14 md:pt-20" aria-labelledby="team-title">
        <Reveal className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Accent />
            <h2 id="team-title" className="font-display mt-5 text-4xl font-extrabold leading-[1.02] md:text-6xl">Молодая студия.<br />Опытная команда.</h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>Pink Byte появилась, когда мы решили объединить опыт в дизайне и разработке. Каждый пришёл со своей практикой, своим подходом к задачам и пониманием того, как должен работать готовый продукт.</p>
            <p>Теперь мы работаем одной командой: связываем интерфейс, программную часть и запуск проекта. Нам важно, чтобы решения, согласованные на этапе дизайна, сохранялись в разработке, а заказчик понимал, как пользоваться результатом.</p>
          </div>
        </Reveal>
        <p className="mt-10 border-b border-border pb-10 text-xl font-bold md:text-2xl">
          <span className="bg-[linear-gradient(transparent_78%,var(--lime)_78%)]">Репутацию строим</span> на проектах, за которые готовы отвечать.
        </p>
      </section>

      <section className="container-pb pt-14 md:pt-20" aria-labelledby="skills-title">
        <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 id="skills-title" className="font-display text-4xl font-extrabold leading-[1.02] md:text-6xl">Опыт каждого<br />в общем результате.</h2>
          <p className="max-w-xs text-base text-muted-foreground">От структуры интерфейса до работающего продукта.</p>
        </Reveal>
        <ul className="mt-10 grid gap-8 border-b border-border pb-12 md:grid-cols-3 md:gap-0">
          {SKILLS.map((s, i) => (
            <li key={s.title} className={i ? "md:border-l md:border-border md:px-8" : "md:pr-8"}>
              <Accent />
              <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{s.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-pb pt-14 md:pt-20" aria-labelledby="ratings-title">
        <Reveal><h2 id="ratings-title" className="font-display text-4xl font-extrabold leading-[1.02] md:text-6xl">Репутация с подтверждением.</h2></Reveal>
        <div className="mt-8 grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <img src={award.url} width={900} height={896} alt="Серебряная награда на каменном постаменте" loading="lazy" decoding="async" className="mx-auto h-auto w-full max-w-sm" />
          <ul className="divide-y divide-border border-y border-border">
            {RATINGS.map((r) => <li key={r} className="py-3 text-base">{r}</li>)}
          </ul>
        </div>
      </section>

      <Projects title="Наш подход виден в работе." text="Показываем интерфейсы и решения, которые разработали для заказчиков." />

      <section className="container-pb pt-16 md:pt-24" aria-labelledby="handoff-title">
        <div className="grid items-center gap-6 overflow-hidden rounded-3xl bg-muted p-6 md:grid-cols-[1.1fr_1fr] md:p-12">
          <div>
            <h2 id="handoff-title" className="font-display text-3xl font-extrabold leading-[1.02] md:text-5xl">Передаём проект.<br />Помогаем начать работу.</h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">Вы получаете исходный код и обучение работе с готовым продуктом. В течение месяца исправляем ошибки и вносим небольшие правки, которые могли остаться незамеченными при приёмке.</p>
          </div>
          <img src={handoff.url} width={1200} height={800} alt="Три панели: исходный код, обучение и поддержка" loading="lazy" decoding="async" className="h-auto w-full" />
        </div>
      </section>

      <Contact title="Расскажите, что вы задумали." text="Обсудим задачу, необходимые функции и объём разработки." />
    </main>
    <Footer />
  </>;
}
