import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/pinkbyte/Hero";
import { Footer } from "@/components/pinkbyte/Closing";

const TITLE = "Блог · Pink Byte";
const DESC = "Блог веб-студии Pink Byte о дизайне и разработке цифровых продуктов.";

export const Route = createFileRoute("/blog")({
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
  component: Blog,
});

function Blog() {
  return (
    <>
      <div id="top" className="bg-ink text-ink-foreground">
        <Header />
      </div>
      <main className="container-pb min-h-[60vh] py-16 md:py-24">
        <h1 className="font-display text-5xl font-extrabold leading-tight md:text-7xl">Блог</h1>
        <p className="mt-10 border-t border-border pt-8 text-lg text-muted-foreground">Публикаций пока нет.</p>
      </main>
      <Footer />
    </>
  );
}
