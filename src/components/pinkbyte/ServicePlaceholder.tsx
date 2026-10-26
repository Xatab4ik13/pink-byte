import { Header } from "./Hero";
import { Footer } from "./Closing";
import { Button } from "@/components/ui/button";
import { btn } from "./primitives";
import { useOpenBrief } from "./brief-context";

export function serviceHead(title: string, description: string) {
  const pageTitle = `${title} · Pink Byte`;
  return { meta: [
    { title: pageTitle },
    { name: "description", content: description },
    { property: "og:title", content: pageTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] };
}

export function ServicePlaceholder({ title, image }: { title: string; image: string }) {
  const openBrief = useOpenBrief();
  return <>
    <Header tone="light" />
    <main className="container-pb min-h-[60vh] py-12 md:py-20">
      <img src={image} width={192} height={192} alt="" className="mb-8 h-28 w-28 object-contain" />
      <h1 className="font-display text-4xl font-extrabold leading-tight md:text-6xl">{title}</h1>
      <p className="mt-7 text-lg text-muted-foreground">Страница готовится.</p>
      <Button onClick={openBrief} className={`${btn.paper} mt-8 border border-border`}>Обсудить проект</Button>
    </main>
    <Footer />
  </>;
}