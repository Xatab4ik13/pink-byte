import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import citymebel from "@/assets/slide-citymebel.webp.asset.json";
import nikitsky from "@/assets/slide-nikitsky.webp.asset.json";
import chinar from "@/assets/slide-chinar.webp.asset.json";
import gold from "@/assets/slide-gold.webp.asset.json";
import { Reveal, btn } from "./primitives";

const SLIDES = [
  { src: citymebel.url, title: "CityMebel", desc: "Интернет-витрина мебельной фабрики" },
  { src: nikitsky.url, title: "Никитский, 6", desc: "Многостраничный сайт клубного дома" },
  { src: chinar.url, title: "CHINAR", desc: "Сайт с расписанием и фирменным талисманом" },
  { src: gold.url, title: "Проект", desc: "Адаптивный сайт для компьютера и смартфона" },
];

export function Projects() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [position, setPosition] = useState(1);
  const [animate, setAnimate] = useState(true);
  const moving = useRef(false);
  const pending = useRef<number | null>(null);
  const startX = useRef<number | null>(null);
  const n = SLIDES.length;
  const i = (position - 1 + n) % n;
  const go = (d: number) => {
    if (moving.current) { pending.current = d; return; }
    moving.current = true;
    setPosition((v) => v + d);
  };
  const finish = () => {
    if (position === 0 || position === n + 1) {
      setAnimate(false);
      setPosition(position === 0 ? n : 1);
    }
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setAnimate(true);
      moving.current = false;
      const next = pending.current;
      pending.current = null;
      if (next !== null) go(next);
    }));
  };
  const cur = SLIDES[i] ?? SLIDES[0];
  if (!cur) return null;
  const frames = [SLIDES[n - 1], ...SLIDES, SLIDES[0]].filter((s) => s !== undefined);

  return (
    <section id="projects" aria-labelledby="projects-title" className="container-pb pb-projects scroll-mt-6 pt-24 md:pt-28">
      <Reveal className="text-center">
        <h2 id="projects-title" className="text-[36px] font-extrabold leading-[1.05] md:text-[56px] xl:text-[72px]">
          Проекты крупным планом.
        </h2>
      </Reveal>

      <div className="relative mt-8 md:mt-10" role="region" aria-roledescription="карусель" aria-label="Проекты" onKeyDown={(e) => {
        if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
        if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      }}>
        <div aria-live="polite" className="pb-project-caption flex min-w-0 flex-wrap items-end justify-between gap-x-6 gap-y-3 pb-5">
          <div className="min-w-0">
            <p className="text-2xl font-extrabold md:text-4xl">{cur.title}</p>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">{cur.desc}</p>
          </div>
        </div>
        <div className="relative">
        <div className="pb-project-frame relative overflow-hidden rounded-2xl bg-ink">
        <div
          className="relative w-full touch-pan-y select-none overflow-hidden"
          onPointerDown={(e) => { if (e.pointerType !== "mouse") startX.current = e.clientX; }}
          onPointerUp={(e) => {
            if (startX.current === null) return;
            const dx = e.clientX - startX.current;
            startX.current = null;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          }}
          onPointerCancel={() => { startX.current = null; }}
        >
          <div className="pb-project-track flex" style={{ transform: `translate3d(${-position * 100}%,0,0)`, transition: animate ? undefined : "none" }} onTransitionEnd={(e) => {
            if (e.target === e.currentTarget && e.propertyName === "transform") finish();
          }}>
          {frames.map((s, k) => (
              <div
                key={`${s.src}-${k}`}
                aria-hidden={k !== position}
                className="min-w-0 w-full shrink-0"
              >
                <img src={s.src} alt={`${s.title}, слайд проекта`} width={1600} height={900} loading="eager" decoding="async" draggable={false} className="block aspect-video w-full object-contain" />
              </div>
          ))}
          </div>
        </div>
        <Button type="button" variant="secondary" onClick={() => dialog.current?.showModal()} className={cn(btn.paper, "pb-project-cta absolute bottom-4 right-4 z-10 max-sm:hidden hover:opacity-90 sm:bottom-6 sm:right-6")}>
          Смотреть проект
        </Button>
        </div>
            <button type="button" title="Предыдущий проект" aria-label="Предыдущий проект" onClick={() => go(-1)} className="pb-project-prev absolute max-sm:hidden left-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full text-ink-foreground/85 transition-[translate,opacity,color] duration-300 hover:opacity-100 hover:-translate-x-1 motion-reduce:transition-none opacity-90 sm:size-12 sm:text-foreground/75 sm:hover:text-foreground">
              <ChevronLeft className="size-6 drop-shadow-[0_0_8px_rgba(18,22,19,0.45)] sm:size-7 sm:drop-shadow-none" strokeWidth={1.75} />
            </button>
            <button type="button" title="Следующий проект" aria-label="Следующий проект" onClick={() => go(1)} className="pb-project-next absolute max-sm:hidden right-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full text-ink-foreground/85 transition-[translate,opacity,color] duration-300 hover:opacity-100 hover:translate-x-1 motion-reduce:transition-none opacity-90 sm:size-12 sm:text-foreground/75 sm:hover:text-foreground">
              <ChevronRight className="size-6 drop-shadow-[0_0_8px_rgba(18,22,19,0.45)] sm:size-7 sm:drop-shadow-none" strokeWidth={1.75} />
            </button>
        </div>
        <Button type="button" variant="secondary" onClick={() => dialog.current?.showModal()} className={cn(btn.paper, "pb-project-cta mt-3 w-full hover:opacity-90 sm:hidden")}>
          Смотреть проект
        </Button>
      </div>

      <dialog
        ref={dialog}
        aria-label={cur.title}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-auto w-[min(1100px,94vw)] overflow-hidden rounded-[1.75rem] bg-ink p-0 text-ink-foreground backdrop:bg-ink/80"
      >
        <div className="relative">
          <img src={cur.src} alt={`${cur.title}, увеличенный вид`} width={1600} height={900} className="block w-full" />
          <Button variant="secondary" size="icon" type="button" autoFocus aria-label="Закрыть" onClick={() => dialog.current?.close()} className="absolute right-4 top-4 rounded-full">
            <X className="size-5" />
          </Button>
        </div>
      </dialog>
    </section>
  );
}
