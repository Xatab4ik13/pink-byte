import { Link } from "@tanstack/react-router";
import { readingMinutes, type BlogPost } from "./blog-data";

export function BlogCard({ post }: { post: BlogPost }) {
  return <article className="min-w-0 border-b border-border pb-6">
    <Link to="/blog/$slug" params={{ slug: post.slug }} preload="intent" className="group block">
      <img src={post.cover} alt={post.coverAlt} width={1200} height={800} loading="lazy" decoding="async" className="aspect-[3/2] w-full rounded-lg object-cover" />
      <div className="mt-4 flex gap-3 text-sm text-muted-foreground"><span>{post.category}</span><span>·</span><span>{readingMinutes(post)} мин</span></div>
      <h2 className="mt-3 break-words font-display text-2xl font-extrabold leading-tight group-hover:underline group-hover:underline-offset-4">{post.title}</h2>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">{post.description}</p>
    </Link>
  </article>;
}