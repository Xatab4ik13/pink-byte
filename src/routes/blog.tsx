import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/pinkbyte/Hero";
import { Contact, Footer } from "@/components/pinkbyte/Closing";

const TITLE = "Блог Pink Byte · о сайтах, CRM и мобильных приложениях";
const DESC =
  "Блог веб-студии Pink Byte: о разработке сайтов, интернет-магазинов, CRM и мобильных приложений.";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
});

function Blog() {
  return (
    <>
      <Header tone="light" />
      <main>
        <section className="container-pb pt-8 md:pt-10" aria-labelledby="blog-title">
          <h1 id="blog-title" className="pb-service-title flex items-center gap-4 font-display font-extrabold">
            Блог <span aria-hidden className="h-2 w-14 rounded-full bg-primary" />
          </h1>
          <p className="mt-5 max-w-4xl text-2xl font-semibold leading-tight md:text-4xl">
            О сайтах, CRM и мобильных приложениях. Разбираем задачи, стоимость и процесс разработки.
          </p>
          <p className="mt-10 text-lg text-muted-foreground">Статьи пока не опубликованы.</p>
        </section>
        <div className="mt-10">
          <Contact title={<>Есть задача?<br />Начнём с ТЗ.</>} text="Ответьте на вопросы о проекте и получите ТЗ бесплатно за 10 минут." buttonLabel="Составить ТЗ" />
        </div>
      </main>
      <Footer />
    </>
  );
}
