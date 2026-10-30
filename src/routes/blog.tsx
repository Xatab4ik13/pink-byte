import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/pinkbyte/Hero";
import { Contact, Footer } from "@/components/pinkbyte/Closing";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BLOG_CATEGORIES, filterPosts } from "@/components/pinkbyte/blog-data";
import { BlogCard } from "@/components/pinkbyte/BlogCard";

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
  const [category, setCategory] = useState<(typeof BLOG_CATEGORIES)[number]>("Все статьи");
  const [query, setQuery] = useState("");
  const posts = filterPosts(category, query);
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
          <div className="mt-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2" aria-label="Темы статей">
              {BLOG_CATEGORIES.map((item) => <Button key={item} variant={category === item ? "default" : "outline"} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</Button>)}
            </div>
            <div className="relative w-full lg:max-w-xs"><Search aria-hidden className="absolute left-3 top-3 size-4 text-muted-foreground" /><Input aria-label="Поиск статей" placeholder="Найти статью" value={query} onChange={(event) => setQuery(event.target.value)} className="pl-9" /></div>
          </div>
          <div className="mt-8 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => <BlogCard key={post.slug} post={post} />)}
          </div>
          {posts.length === 0 && <p role="status" className="py-12 text-lg text-muted-foreground">Статей по этому запросу нет.</p>}
        </section>
        <div className="mt-10">
          <Contact title={<>Есть задача?<br />Начнём с ТЗ.</>} text="Ответьте на вопросы о проекте и получите ТЗ бесплатно за 10 минут." buttonLabel="Составить ТЗ" />
        </div>
      </main>
      <Footer />
    </>
  );
}
