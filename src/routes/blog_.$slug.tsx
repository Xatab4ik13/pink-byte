import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/pinkbyte/Hero";
import { Contact, Footer } from "@/components/pinkbyte/Closing";
import { BlogCard } from "@/components/pinkbyte/BlogCard";
import { formatPostDate, postBySlug, readingMinutes, relatedPosts } from "@/components/pinkbyte/blog-data";

export const Route = createFileRoute("/blog_/$slug")({
  loader: ({ params }) => {
    const post = postBySlug(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Статья не найдена · Pink Byte" }, { name: "robots", content: "noindex" }] };
    const title = `${loaderData.title} · Блог Pink Byte`;
    const path = `/blog/${loaderData.slug}`;
    return {
      meta: [
        { title }, { name: "description", content: loaderData.description },
        { property: "og:title", content: title }, { property: "og:description", content: loaderData.description },
        { property: "og:type", content: "article" }, { property: "og:url", content: path },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: path }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org", "@type": "BlogPosting", headline: loaderData.title,
        description: loaderData.description, datePublished: `${loaderData.publishedAt}T22:58:00Z`,
        inLanguage: "ru-RU", author: { "@type": "Organization", name: "Pink Byte" },
        publisher: { "@type": "Organization", name: "Pink Byte" },
      }) }],
    };
  },
  component: BlogArticle,
});

function BlogArticle() {
  const post = Route.useLoaderData();
  return <>
    <Header tone="light" />
    <main>
      <article>
        <header className="container-pb pt-8 md:pt-10">
          <Link to="/blog" preload="intent" className="text-sm font-semibold text-muted-foreground underline underline-offset-4">Все статьи</Link>
          <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground"><span>{post.category}</span><span>·</span><time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time><span>·</span><span>{readingMinutes(post)} мин чтения</span></div>
          <h1 className="mt-5 max-w-5xl break-words font-display text-3xl font-extrabold leading-tight md:text-5xl lg:text-6xl">{post.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">{post.description}</p>
          <p className="mt-4 text-sm text-muted-foreground">Автор: студия Pink Byte</p>
          <figure className="mt-8"><img src={post.cover} alt={post.coverAlt} width={1200} height={800} decoding="async" fetchPriority="high" className="aspect-[3/2] max-h-[560px] w-full rounded-lg object-cover" /><figcaption className="mt-2 text-xs text-muted-foreground">Редакционная иллюстрация</figcaption></figure>
        </header>
        <div className="container-pb mt-10 grid gap-10 lg:grid-cols-[240px_minmax(0,760px)] lg:gap-16">
          <nav aria-label="Содержание статьи" className="self-start border-y border-border py-5 lg:sticky lg:top-8">
            <p className="font-semibold">Содержание</p><ol className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">{post.sections.map((section) => <li key={section.id}><a href={`#${section.id}`} className="hover:text-foreground hover:underline">{section.title}</a></li>)}</ol>
          </nav>
          <div className="min-w-0 space-y-10 text-lg leading-relaxed">
            <div className="border-l-4 border-primary pl-5 font-semibold">{post.takeaway}</div>
            <div className="space-y-5">{post.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            {post.sections.map((section) => <section key={section.id} id={section.id} className="scroll-mt-8 space-y-5">
              <h2 className="break-words font-display text-2xl font-extrabold leading-tight md:text-3xl">{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul className="list-disc space-y-3 pl-6 marker:text-muted-foreground">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
              {section.table && <div className="overflow-x-auto rounded-lg border border-border"><table className="w-full text-left text-sm leading-relaxed"><thead className="bg-muted"><tr>{section.table.headers.map((heading) => <th key={heading} scope="col" className="min-w-[130px] px-4 py-3 font-semibold">{heading}</th>)}</tr></thead><tbody>{section.table.rows.map((row, index) => <tr key={index} className="border-t border-border">{row.map((cell, column) => <td key={column} className="px-4 py-3 align-top">{cell}</td>)}</tr>)}</tbody></table></div>}
            </section>)}
            {post.sources && <section className="border-t border-border pt-6"><h2 className="font-display text-2xl font-extrabold">Первоисточники</h2><ul className="mt-4 space-y-3 text-base">{post.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{source.label}</a></li>)}</ul></section>}
            <section className="border-y border-border py-7"><h2 className="font-display text-2xl font-extrabold">Обсудим вашу задачу</h2><p className="mt-4">Подробности предложения, состав работ и условия: <Link to={post.service} preload="intent" className="font-semibold underline underline-offset-4">{post.serviceLabel.toLocaleLowerCase("ru-RU")}</Link>. Перед оценкой согласуем задачи, ограничения и критерии готовности.</p></section>
          </div>
        </div>
      </article>
      <section className="container-pb mt-16"><h2 className="font-display text-3xl font-extrabold md:text-4xl">Читайте также</h2><div className="mt-8 grid gap-8 md:grid-cols-3">{relatedPosts(post).map((related) => <BlogCard key={related.slug} post={related} />)}</div></section>
      <div className="mt-12"><Contact title={<>Есть задача?<br />Начнём с ТЗ.</>} text="Расскажите, что нужно вашему бизнесу, и обсудим подходящий объём разработки." buttonLabel="Обсудить проект" /></div>
    </main>
    <Footer />
  </>;
}