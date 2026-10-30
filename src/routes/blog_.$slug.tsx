import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/pinkbyte/Hero";
import { Contact, Footer } from "@/components/pinkbyte/Closing";
import { CAT_LABEL, POSTS, formatDate, postBySlug } from "@/components/pinkbyte/blog-data";

export const Route = createFileRoute("/blog_/$slug")({
  loader: ({ params }) => {
    const post = postBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    const post = loaderData?.post;
    if (!post) return { meta: [{ title: "Статья не найдена · Pink Byte" }, { name: "robots", content: "noindex" }] };
    const title = `${post.title} · Блог Pink Byte`;
    return {
      meta: [
        { title },
        { name: "description", content: post.description },
        { property: "og:title", content: title },
        { property: "og:description", content: post.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
        { property: "article:published_time", content: post.date },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          author: { "@type": "Organization", name: "Pink Byte" },
          publisher: { "@type": "Organization", name: "Pink Byte" },
          mainEntityOfPage: `/blog/${params.slug}`,
        }),
      }],
    };
  },
  notFoundComponent: () => (
    <>
      <Header tone="light" />
      <main className="container-pb py-20">
        <h1 className="font-display text-4xl font-extrabold">Статья не найдена</h1>
        <Link to="/blog" className="mt-6 inline-block font-semibold underline underline-offset-4">Все статьи</Link>
      </main>
      <Footer />
    </>
  ),
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  return (
    <>
      <Header tone="light" />
      <main>
        <article className="container-pb pt-8 md:pt-10">
          <div className="mx-auto max-w-3xl">
            <Link to="/blog" preload="intent" className="text-sm font-semibold text-muted-foreground underline underline-offset-4">Все статьи</Link>
            <p className="mt-6 text-sm font-semibold text-muted-foreground">
              {CAT_LABEL[post.cat]} · <time dateTime={post.date}>{formatDate(post.date)}</time>
            </p>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] md:text-6xl">{post.title}</h1>
            <p className="mt-5 text-xl text-muted-foreground md:text-2xl">{post.lead}</p>
          </div>
          <img src={post.image} alt={post.imageAlt} width={900} height={600} fetchPriority="high" decoding="async" className="mx-auto mt-10 aspect-[3/2] w-full max-w-4xl rounded-2xl object-cover" />
          <div className="mx-auto mt-12 max-w-3xl space-y-10">
            {post.sections.map((s) => (
              <section key={s.h}>
                <h2 className="font-display text-2xl font-extrabold md:text-3xl">{s.h}</h2>
                {s.p.map((t) => <p key={t} className="mt-4 text-lg leading-relaxed text-foreground/85">{t}</p>)}
                {s.list && <ul className="mt-4 list-disc space-y-2 pl-6 text-lg leading-relaxed text-foreground/85">{s.list.map((li) => <li key={li}>{li}</li>)}</ul>}
              </section>
            ))}
          </div>
        </article>

        <section className="container-pb mt-20 border-t border-border pt-10" aria-labelledby="more-title">
          <h2 id="more-title" className="font-display text-3xl font-extrabold">Читайте также</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} preload="intent" className="group block">
                <img src={p.image} alt={p.imageAlt} width={900} height={600} loading="lazy" decoding="async" className="aspect-[3/2] w-full rounded-2xl object-cover" />
                <p className="mt-3 text-sm font-semibold text-muted-foreground">{CAT_LABEL[p.cat]}</p>
                <h3 className="mt-1 text-xl font-extrabold leading-snug group-hover:underline">{p.title}</h3>
              </Link>
            ))}
          </div>
        </section>
        <div className="mt-10">
          <Contact title={<>Есть задача?<br />Начнём с ТЗ.</>} text="Ответьте на вопросы о проекте и получите ТЗ бесплатно за 10 минут." buttonLabel="Составить ТЗ" />
        </div>
      </main>
      <Footer />
    </>
  );
}
