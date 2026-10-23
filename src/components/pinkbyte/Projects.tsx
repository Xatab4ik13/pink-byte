import { useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import citymebel from "@/assets/slide-citymebel.webp.asset.json";
import nikitsky from "@/assets/slide-nikitsky.webp.asset.json";
import chinar from "@/assets/slide-chinar.webp.asset.json";
import gold from "@/assets/slide-gold.webp.asset.json";
import { Reveal } from "./primitives";

const SLIDES = [
  { src: citymebel.url, title: "CityMebel" },
  { src: nikitsky.url, title: "Никитский, 6" },
  { src: chinar.url, title: "CHINAR" },
  { src: gold.url, title: "Проект" },
];

function ArcArrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Предыдущий проект" : "Следующий проект"}
      className="absolute top-1/2 z-30 -translate-y-1/2 rounded-full p-2 text-primary transition-transform duration-300 hover:scale-110"
      style={dir === "prev" ? { left: "max(0.5rem, calc(50% - 560px))" } : { right: "max(0.5rem, calc(50% - 560px))" }}
    >
      <svg viewBox="0 0 210 120" fill="none" className="h-auto w-16 md:w-28 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]" style={dir === "next" ? { transform: "scaleX(-1)" } : undefined}>
        <path d="M205 17C139-5 55 20 20 104M15 77L20 108L43 93" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export function Projects() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState(0);
  const n = SLIDES.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);
  const cur = SLIDES[i]!;

  return (
    <section id="projects" aria-labelledby="projects-title" className="container-pb scroll-mt-6 pt-24 md:pt-28">
      <Reveal className="text-center">
        <h2 id="projects-title" className="display text-[clamp(2.6rem,7.5vw,7rem)]">
          Проекты крупным планом.
        </h2>
      </Reveal>

      <Reveal className="relative mt-12 [perspective:1800px]">
        <div className="relative mx-auto aspect-[16/9] w-full max-w-[1000px] [transform-style:preserve-3d]">
          {SLIDES.map((s, k) => {
            let off = k - i;
            if (off > n / 2) off -= n;
            if (off < -n / 2) off += n;
            const abs = Math.abs(off);
            return (
              <div
                key={s.src}
                aria-hidden={off !== 0}
                className="absolute inset-0 overflow-hidden rounded-[2rem] bg-ink shadow-showcase transition-all duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
                style={{
                  transform: `translateX(${off * 18}%) translateZ(${-abs * 200}px) rotateY(${-off * 22}deg)`,
                  opacity: abs === 0 ? 1 : 0,
                  zIndex: 10 - abs,
                  pointerEvents: off === 0 ? "auto" : "none",
                }}
              >
                <img src={s.src} alt={`${s.title} — слайд проекта`} width={1600} height={900} loading={k === 0 ? "eager" : "lazy"} className="block h-full w-full object-cover" />
              </div>
            );
          })}
          <div className="absolute bottom-5 right-5 z-20 md:bottom-8 md:right-8">
            <button
              type="button"
              onClick={() => dialog.current?.showModal()}
              className="group inline-flex items-center gap-3 rounded-full border border-ink-foreground/70 bg-ink/35 py-2 pl-6 pr-2 text-sm font-semibold text-ink-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-ink/60"
            >
              Смотреть проект
              <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:rotate-[-45deg]">
                <ArrowRight className="size-4" />
              </span>
            </button>
          </div>
        </div>
        <ArcArrow dir="prev" onClick={() => go(-1)} />
        <ArcArrow dir="next" onClick={() => go(1)} />
      </Reveal>

      <dialog
        ref={dialog}
        aria-label={cur.title}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-auto w-[min(1100px,94vw)] overflow-hidden rounded-[1.75rem] bg-ink p-0 text-ink-foreground backdrop:bg-ink/80"
      >
        <div className="relative">
          <img src={cur.src} alt={`${cur.title} — увеличенный вид`} width={1600} height={900} className="block w-full" />
          <button type="button" autoFocus aria-label="Закрыть" onClick={() => dialog.current?.close()} className="absolute right-4 top-4 rounded-full bg-background p-2 text-foreground">
            <X className="size-5" />
          </button>
        </div>
      </dialog>
    </section>
  );
}
