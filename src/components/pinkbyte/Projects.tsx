import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import citymebel from "@/assets/slide-citymebel.webp.asset.json";
import nikitsky from "@/assets/slide-nikitsky.webp.asset.json";
import chinar from "@/assets/slide-chinar.webp.asset.json";
import gold from "@/assets/slide-gold.webp.asset.json";
import mark from "@/assets/mark-pb.png.asset.json";
import { Reveal } from "./primitives";

const SLIDES = [
  { src: citymebel.url, title: "CityMebel", desc: "Интернет-витрина мебельной фабрики", scope: "Дизайн · Разработка" },
  { src: nikitsky.url, title: "Никитский, 6", desc: "Многостраничный сайт клубного дома", scope: "Дизайн · Разработка" },
  { src: chinar.url, title: "CHINAR", desc: "Сайт с расписанием и фирменным талисманом", scope: "Дизайн · Разработка" },
  { src: gold.url, title: "Проект", desc: "Адаптивный сайт для компьютера и смартфона", scope: "Дизайн · Разработка" },
];

export function Projects() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState(0);
  const startX = useRef<number | null>(null);
  const n = SLIDES.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);
  const cur = SLIDES[i] ?? SLIDES[0];
  if (!cur) return null;

  return (
    <section id="projects" aria-labelledby="projects-title" className="container-pb scroll-mt-6 pt-24 md:pt-28">
      <Reveal className="text-center">
        <h2 id="projects-title" className="text-[36px] font-extrabold leading-[1.05] md:text-[56px] xl:text-[72px]">
          Проекты крупным планом.
        </h2>
      </Reveal>

      <div className="relative mt-7 overflow-x-clip md:mt-9 [perspective:1600px]" role="region" aria-roledescription="карусель" aria-label="Проекты">
        <div
          className="relative mx-auto aspect-[2/1] w-full touch-pan-y select-none [transform-style:preserve-3d]"
          onPointerDown={(e) => { startX.current = e.clientX; }}
          onPointerUp={(e) => {
            if (startX.current === null) return;
            const dx = e.clientX - startX.current;
            startX.current = null;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          }}
          onPointerCancel={() => { startX.current = null; }}
        >
          {SLIDES.map((s, k) => {
            let off = k - i;
            if (off > n / 2) off -= n;
            if (off < -n / 2) off += n;
            const abs = Math.abs(off);
            const sign = Math.sign(off);
            return (
              <div
                key={s.src}
                aria-hidden={off !== 0}
                className="absolute inset-0 overflow-hidden rounded-[1.25rem] bg-ink [backface-visibility:hidden] will-change-[transform,opacity] motion-reduce:!transition-none"
                style={{
                  transition: abs === 0
                    ? "transform 900ms cubic-bezier(0.16,1,0.3,1), opacity 600ms cubic-bezier(0.33,1,0.68,1)"
                    : "transform 900ms cubic-bezier(0.16,1,0.3,1), opacity 450ms cubic-bezier(0.32,0,0.67,0)",
                  transform: abs === 0 ? "translate3d(0,0,0) rotateY(0deg) scale(1)" : `translate3d(${sign * 14}%,0,-180px) rotateY(${-sign * 16}deg) scale(0.96)`,
                  opacity: abs === 0 ? 1 : 0,
                  zIndex: 10 - abs,
                  pointerEvents: off === 0 ? "auto" : "none",
                }}
              >
                <img src={s.src} alt={`${s.title} — слайд проекта`} width={1600} height={900} loading="eager" decoding="async" draggable={false} className="block h-full w-full object-cover" />
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div aria-live="polite" className="min-h-[76px] md:min-h-[72px]">
            <p className="text-2xl font-extrabold md:text-4xl">{cur.title}</p>
            <p className="mt-1 text-muted-foreground">{cur.desc}</p>
          </div>
          <Button variant="secondary" type="button" onClick={() => dialog.current?.showModal()} className="group relative h-12 shrink-0 self-start overflow-hidden rounded-full pl-8 pr-[4.75rem] font-semibold shadow-none sm:self-auto">
            <img src={mark.url} alt="" aria-hidden width={900} height={692} draggable={false} className="pointer-events-none absolute right-1 top-1/2 h-[135%] w-auto -translate-y-1/2 select-none opacity-[0.16] transition-opacity duration-300 ease-out group-hover:opacity-[0.34] motion-reduce:transition-none" />
            <span className="relative">Смотреть проект</span>
          </Button>
        </div>
        <div className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full bg-muted px-2 py-1" aria-label="Управление проектами">
            <Button variant="ghost" size="icon" type="button" title="Предыдущий проект" aria-label="Предыдущий проект" onClick={() => go(-1)} className="size-9 rounded-full hover:bg-foreground/10 hover:text-foreground">
              <ChevronLeft />
            </Button>
            <div className="flex items-center gap-2" aria-label={`Проект ${i + 1} из ${n}`}>
              {SLIDES.map((s, k) => (
                <Button variant="ghost" size="icon" key={s.src} type="button" title={s.title} aria-label={s.title} aria-current={k === i} onClick={() => setI(k)} className="h-8 w-5 rounded-full p-0 hover:bg-transparent">
                  <span className={`block h-2 rounded-full ${k === i ? "w-5 bg-primary" : "w-2 bg-foreground/30"}`} />
                </Button>
              ))}
            </div>
            <Button variant="ghost" size="icon" type="button" title="Следующий проект" aria-label="Следующий проект" onClick={() => go(1)} className="size-9 rounded-full hover:bg-foreground/10 hover:text-foreground">
              <ChevronRight />
            </Button>
        </div>
      </div>

      <dialog
        ref={dialog}
        aria-label={cur.title}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-auto w-[min(1100px,94vw)] overflow-hidden rounded-[1.75rem] bg-ink p-0 text-ink-foreground backdrop:bg-ink/80"
      >
        <div className="relative">
          <img src={cur.src} alt={`${cur.title} — увеличенный вид`} width={1600} height={900} className="block w-full" />
          <Button variant="secondary" size="icon" type="button" autoFocus aria-label="Закрыть" onClick={() => dialog.current?.close()} className="absolute right-4 top-4 rounded-full">
            <X className="size-5" />
          </Button>
        </div>
      </dialog>
    </section>
  );
}
