import { useRef } from "react";
import { X } from "lucide-react";
import motohub from "@/assets/motohub.jpg";
import { Reveal, btn } from "./primitives";

export function Projects() {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <section id="projects" aria-labelledby="projects-title" className="container-pb scroll-mt-6 pt-24 md:pt-28">
      <Reveal className="text-center">
        <h2 id="projects-title" className="text-[clamp(2.2rem,5vw,3.6rem)] font-semibold tracking-[-0.04em]">
          Проекты крупным планом.
        </h2>
        <p className="mt-2 text-muted-foreground">Демонстрационная подача портфолио</p>
      </Reveal>

      <Reveal className="relative mt-10 overflow-hidden rounded-[2rem] bg-ink shadow-showcase">
        <img
          src={motohub}
          alt="Концепция MOTOHUB: десктопный интерфейс сообщества и мобильный экран события"
          width={1920}
          height={1088}
          loading="lazy"
          className="block w-full"
        />
        <p className="absolute left-5 top-5 rounded-full bg-ink/70 px-3 py-1.5 text-[10px] font-semibold tracking-[0.3em] text-ink-foreground md:left-7 md:top-6">
          КОНЦЕПЦИЯ · ПЛАТФОРМА СООБЩЕСТВА
        </p>
        <div className="flex justify-center p-4 md:absolute md:inset-x-0 md:bottom-6 md:p-0">
          <button type="button" onClick={() => dialog.current?.showModal()} className={btn.paper}>
            Смотреть кейс
          </button>
        </div>
      </Reveal>
      <p className="mt-4 text-center text-sm text-muted-foreground">Дизайн · Разработка · Личный кабинет</p>

      <dialog
        ref={dialog}
        aria-labelledby="case-title"
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-auto w-[min(1100px,94vw)] rounded-[1.75rem] bg-ink p-0 text-ink-foreground backdrop:bg-ink/80"
      >
        <div className="relative">
          <img src={motohub} alt="MOTOHUB — увеличенный вид концепции" width={1920} height={1088} className="block w-full" />
          <button
            type="button"
            autoFocus
            aria-label="Закрыть"
            onClick={() => dialog.current?.close()}
            className="absolute right-4 top-4 rounded-full bg-background p-2 text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="p-6 md:p-8">
          <h3 id="case-title" className="text-2xl font-semibold tracking-tight">MOTOHUB</h3>
          <p className="mt-2 max-w-2xl text-ink-muted">
            MOTOHUB — концепция платформы сообщества. Объединяет участников, события и материалы клуба в одном интерфейсе.
          </p>
        </div>
      </dialog>
    </section>
  );
}
