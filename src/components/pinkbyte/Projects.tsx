import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import citymebel from "@/assets/slide-citymebel.webp.asset.json";
import nikitsky from "@/assets/slide-nikitsky.webp.asset.json";
import chinar from "@/assets/slide-chinar.webp.asset.json";
import gold from "@/assets/slide-gold.webp.asset.json";
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
  const n = SLIDES.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);
  const cur = SLIDES[i]!;

  return (
    <section id="projects" aria-labelledby="projects-title" className="container-pb scroll-mt-6 pt-24 md:pt-28">
      <Reveal className="text-center">
        <h2 id="projects-title" className="display text-[clamp(2.2rem,6vw,5.6rem)]">
          Проекты крупным планом.
        </h2>
      </Reveal>

      <Reveal className="relative mt-12 [perspective:1800px]">
        <div className="relative mx-auto aspect-[16/9] w-full max-w-[1480px] [transform-style:preserve-3d]">
          {SLIDES.map((s, k) => {
            let off = k - i;
            if (off > n / 2) off -= n;
            if (off < -n / 2) off += n;
            const abs = Math.abs(off);
            return (
              <div
                key={s.src}
                aria-hidden={off !== 0}
                className="absolute inset-0 overflow-hidden rounded-[2rem] bg-ink shadow-md transition-all duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
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
        </div>

        <div className="mx-auto mt-6 flex w-full max-w-[1480px] flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div aria-live="polite">
            <p className="text-2xl font-bold tracking-tight md:text-3xl">{cur.title}</p>
            <p className="mt-1 text-muted-foreground">{cur.desc}</p>
            <p className="mt-2 text-sm font-medium text-muted-foreground">{cur.scope}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="mr-2 flex items-center gap-1.5" aria-label={`Проект ${i + 1} из ${n}`}>
              {SLIDES.map((s, k) => (
                <button key={s.src} type="button" aria-label={s.title} aria-current={k === i} onClick={() => setI(k)} className={`h-1.5 rounded-full transition-all duration-300 ${k === i ? "w-8 bg-foreground" : "w-3 bg-foreground/25 hover:bg-foreground/50"}`} />
              ))}
            </div>
            <button type="button" aria-label="Предыдущий проект" onClick={() => go(-1)} className="grid size-11 place-items-center rounded-full border border-foreground/20 transition-colors hover:border-foreground/60">
              <ArrowLeft className="size-4" />
            </button>
            <button type="button" aria-label="Следующий проект" onClick={() => go(1)} className="grid size-11 place-items-center rounded-full border border-foreground/20 transition-colors hover:border-foreground/60">
              <ArrowRight className="size-4" />
            </button>
            <button type="button" onClick={() => dialog.current?.showModal()} className="group inline-flex items-center gap-3 rounded-full bg-foreground py-2 pl-6 pr-2 text-sm font-semibold text-background transition-transform duration-300 hover:-translate-y-0.5">
              Смотреть проект
              <span className="grid size-8 place-items-center rounded-full bg-background/15 transition-transform duration-300 group-hover:rotate-[-45deg]">
                <ArrowRight className="size-4" />
              </span>
            </button>
          </div>
        </div>
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
