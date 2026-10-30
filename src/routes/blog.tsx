import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Header } from "@/components/pinkbyte/Hero";
import { Contact, Footer } from "@/components/pinkbyte/Closing";
import { Reveal } from "@/components/pinkbyte/primitives";
import { BLOG_CATS, CAT_LABEL, POSTS, filterPosts, type BlogCat } from "@/components/pinkbyte/blog-data";
import { cn } from "@/lib/utils";

const TITLE = "Блог Pink Byte · о сайтах, CRM и мобильных приложениях";
const DESC =
  "Статьи веб-студии Pink Byte: из чего складывается стоимость сайта и интернет-магазина, как составить ТЗ, выбрать CRM и опубликовать приложение.";

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
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Блог Pink Byte",
        description: DESC,
        blogPost: POSTS.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `/blog/${p.slug}`, datePublished: p.date })),
      }),
    }],
  }),
  component: Blog,
});

function Blog() {
  const [cat, setCat] = useState<BlogCat | "all">("all");
  const [query, setQuery] = useState("");
  const list = filterPosts(cat, query);
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

          <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div role="tablist" aria-label="Темы статей" className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none]">
              {BLOG_CATS.map((c) => (
                <button key={c.id} role="tab" aria-selected={cat === c.id} type="button" onClick={() => setCat(c.id)}
                  className={cn("shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors", cat === c.id ? "bg-primary text-primary-foreground" : "border border-foreground/15 bg-background text-foreground hover:border-foreground/40")}>
                  {c.label}
                </button>
              ))}
            </div>
            <label className="relative block lg:w-72">
              <span className="sr-only">Поиск по статьям</span>
              <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Поиск по статьям"
                className="w-full rounded-full border border-foreground/15 bg-background py-2.5 pl-11 pr-4 text-sm outline-none focus:border-foreground/40" />
            </label>
          </div>

          <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <Reveal key={p.slug} className="min-w-0">
                <article>
                  <Link to="/blog/$slug" params={{ slug: p.slug }} preload="intent" className="group block">
                    <div className="overflow-hidden rounded-2xl bg-muted">
                      <img src={p.image} alt={p.imageAlt} width={900} height={600} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-muted-foreground">{CAT_LABEL[p.cat]}</p>
                    <h2 className="mt-1 text-xl font-extrabold leading-snug md:text-2xl">{p.title}</h2>
                    <p className="mt-2 text-muted-foreground">{p.lead}</p>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
          {list.length === 0 && <p className="mt-8 text-lg text-muted-foreground">По этому запросу статей нет.</p>}
        </section>
        <div className="mt-10">
          <Contact title={<>Есть задача?<br />Начнём с ТЗ.</>} text="Ответьте на вопросы о проекте и получите ТЗ бесплатно за 10 минут." buttonLabel="Составить ТЗ" />
        </div>
      </main>
      <Footer />
    </>
  );
}
