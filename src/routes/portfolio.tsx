import { useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/pinkbyte/Hero";
import { Contact, Footer } from "@/components/pinkbyte/Closing";
import { Reveal } from "@/components/pinkbyte/primitives";
import { cn } from "@/lib/utils";
import folio from "@/assets/portfolio-folio.webp.asset.json";
import brionilux from "@/assets/slide-gold.webp.asset.json";
import conc from "@/assets/corporate-conc-case.webp.asset.json";
import chinar from "@/assets/slide-chinar.webp.asset.json";
import citymebel from "@/assets/slide-citymebel.webp.asset.json";
import bron from "@/assets/app-booking-panels.webp.asset.json";
import nikitsky from "@/assets/slide-nikitsky.webp.asset.json";

const TITLE = "Портфолио Pink Byte · сайты и приложения, которые мы разработали";
const DESC =
  "Портфолио студии Pink Byte: интернет-магазины, корпоративные сайты и мобильные приложения. В каждом кейсе задача, интерфейсы и выполненная работа.";

type Cat = "shop" | "corp" | "app";
const FILTERS: { id: Cat | "all"; label: string }[] = [
  { id: "all", label: "Все проекты" },
  { id: "shop", label: "Интернет-магазины" },
  { id: "corp", label: "Корпоративные сайты" },
  { id: "app", label: "Мобильные приложения" },
];
const TAG: Record<Cat, string> = { shop: "Интернет-магазин", corp: "Корпоративный сайт", app: "Мобильное приложение" };

const WORKS: { title: string; desc: string; cat: Cat; src: string; to?: "/uslugi/internet-magazin" | "/uslugi/korporativny-sait" | "/uslugi/mobilnoe-prilozhenie" }[] = [
  { title: "Brionilux", desc: "Интернет-магазин электрофурнитуры", cat: "shop", src: brionilux.url, to: "/uslugi/internet-magazin" },
  { title: "Концентрация", desc: "Сайт компании в области химии и фармацевтики", cat: "corp", src: conc.url, to: "/uslugi/korporativny-sait" },
  { title: "CHINAR", desc: "Сайт центра китайского языка", cat: "corp", src: chinar.url },
  { title: "CityMebel MSK", desc: "Сайт мебели на заказ", cat: "corp", src: citymebel.url },
  { title: "Моя Бронь", desc: "Приложение для бронирования отелей", cat: "app", src: bron.url, to: "/uslugi/mobilnoe-prilozhenie" },
  { title: "Никитский-6", desc: "Сайт клубного дома в Москве", cat: "corp", src: nikitsky.url },
];

export const Route = createFileRoute("/portfolio")({
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
  component: PortfolioPage,
});

function PortfolioPage() {
  const [filter, setFilter] = useState<Cat | "all">("all");
  const [view, setView] = useState<(typeof WORKS)[number] | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const list = WORKS.filter((w) => filter === "all" || w.cat === filter);
  const open = (w: (typeof WORKS)[number]) => { setView(w); dialog.current?.showModal(); };

  return <>
    <Header tone="light" />
    <main>
      <section className="container-pb pt-6 md:pt-10" aria-labelledby="portfolio-title">
        <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6">
          <div>
            <h1 id="portfolio-title" className="pb-service-title flex items-center gap-4 font-display font-extrabold">
              Портфолио <span aria-hidden className="h-2 w-14 rounded-full bg-primary" />
            </h1>
            <p className="mt-5 text-2xl font-semibold leading-tight md:text-4xl">Сайты и приложения, которые мы разработали.</p>
            <p className="mt-4 max-w-md text-lg text-muted-foreground">В каждом кейсе: задача, интерфейсы и выполненная работа.</p>
          </div>
          <img src={folio.url} alt="Папка с макетами сайтов и приложений" width={1200} height={845} fetchPriority="high" decoding="async" className="w-full" />
        </div>

        <div role="tablist" aria-label="Категории проектов" className="mt-10 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none]">
          {FILTERS.map((f) => (
            <button key={f.id} role="tab" aria-selected={filter === f.id} type="button" onClick={() => setFilter(f.id)}
              className={cn("shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors", filter === f.id ? "bg-primary text-primary-foreground" : "border border-foreground/15 bg-background text-foreground hover:border-foreground/40")}>
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-x-6 gap-y-10 md:grid-cols-2">
          {list.map((w) => (
            <Reveal key={w.title} className="min-w-0">
              <article>
                <button type="button" onClick={() => open(w)} className="block w-full overflow-hidden rounded-2xl bg-ink" aria-label={`${w.title}, увеличить`}>
                  <img src={w.src} alt={`${w.title}: ${w.desc}`} loading="lazy" decoding="async" className={cn("aspect-video w-full", w.src === conc.url || w.src === bron.url ? "object-contain" : "object-cover", " transition-transform duration-500 hover:scale-[1.02]")} />
                </button>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold">{w.title}</h2>
                    <p className="mt-1 text-muted-foreground">{w.desc}</p>
                    <span className="mt-3 inline-block rounded-full border border-foreground/15 px-3 py-1 text-sm text-muted-foreground">{TAG[w.cat]}</span>
                  </div>
                  {w.to
                    ? <Link to={w.to} preload="intent" className="shrink-0 pt-2 text-sm font-semibold underline underline-offset-4">Смотреть кейс</Link>
                    : <button type="button" onClick={() => open(w)} className="shrink-0 pt-2 text-sm font-semibold underline underline-offset-4">Смотреть кейс</button>}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <Contact />
    </main>
    <Footer />
    <dialog ref={dialog} aria-label={view?.title} onClick={(e) => e.target === dialog.current && dialog.current?.close()}
      className="m-auto w-[min(1100px,94vw)] overflow-hidden rounded-[1.75rem] bg-ink p-0 backdrop:bg-ink/80">
      {view && <div className="relative">
        <img src={view.src} alt={`${view.title}, увеличенный вид`} className="block w-full" />
        <Button variant="secondary" size="icon" type="button" aria-label="Закрыть" onClick={() => dialog.current?.close()} className="absolute right-4 top-4 rounded-full"><X className="size-5" /></Button>
      </div>}
    </dialog>
  </>;
}
