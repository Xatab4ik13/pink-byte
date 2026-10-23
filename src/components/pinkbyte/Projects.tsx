import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const cur = SLIDES[i] ?? SLIDES[0];
  if (!cur) return null;

  return (
    <section id="projects" aria-labelledby="projects-title" className="mx-auto w-full max-w-[1560px] scroll-mt-6 px-5 pt-24 md:px-10 md:pt-28">
      <Reveal className="relative text-center">
        <svg aria-hidden="true" viewBox="0 0 210 120" className="absolute -top-14 right-0 h-14 w-24 text-primary md:-top-16 md:h-16 md:w-28" fill="none">
          <path d="M205 17C139-5 55 20 20 104M15 77L20 108L43 93" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h2 id="projects-title" className="text-[36px] font-extrabold leading-[1.05] md:text-[56px] xl:text-[72px]">
          Проекты крупным планом.
        </h2>
      </Reveal>

      <div className="relative mt-7 overflow-x-clip md:mt-9 [perspective:1800px]" role="region" aria-roledescription="карусель" aria-label="Проекты">
        <div className="relative mx-auto aspect-[2/1] w-full max-w-[1480px] [transform-style:preserve-3d]">
          {SLIDES.map((s, k) => {
            let off = k - i;
            if (off > n / 2) off -= n;
            if (off < -n / 2) off += n;
            const abs = Math.abs(off);
            return (
              <div
                key={s.src}
                aria-hidden={off !== 0}
                className="absolute inset-0 overflow-hidden rounded-[1.25rem] bg-ink [backface-visibility:hidden] transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none"
                style={{
                  transform: `translateX(${off * 4}%) translateZ(${-abs * 60}px) rotateY(${-off * 6}deg)`,
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

        <div className="mx-auto mt-5 flex w-full max-w-[1480px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div aria-live="polite" className="min-h-[76px] md:min-h-[72px]">
            <p className="text-2xl font-extrabold md:text-4xl">{cur.title}</p>
            <p className="mt-1 text-muted-foreground">{cur.desc}</p>
          </div>
          <Button variant="secondary" type="button" onClick={() => dialog.current?.showModal()} className="h-12 shrink-0 self-start rounded-full px-8 font-semibold shadow-none sm:self-auto">
            Смотреть проект
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
