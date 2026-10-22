import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import robotBase from "@/assets/robot-base.png.asset.json";
import robotEyesA from "@/assets/robot-eyes-a.png.asset.json";
import robotEyesB from "@/assets/robot-eyes-b.png.asset.json";
import { Logo, NAV, btn } from "./primitives";

/* Глаза робота вынесены в отдельные слои над корпусом — так их можно анимировать.
   Координаты заданы в процентах от размера корпуса, поэтому глаза остаются на месте
   при любой ширине экрана. */
const ROBOT_EYES = [
  {
    src: robotEyesA.url,
    width: 210,
    height: 265,
    left: "48.73%",
    top: "26.28%",
    size: ["17.83%", "28.31%"],
    origin: "50.5% 57.8%",
  },
  {
    src: robotEyesB.url,
    width: 192,
    height: 300,
    left: "38.37%",
    top: "30.24%",
    size: ["16.30%", "32.05%"],
    origin: "51.3% 50.9%",
  },
];

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="container-pb relative z-30">
      <div className="flex items-center justify-between border-b border-ink-border py-5">
        <a href="#top" aria-label="Pink Byte — на главную">
          <Logo className="w-36 md:w-40" />
        </a>
        <nav aria-label="Основная навигация" className="hidden md:block">
          <ul className="flex gap-10 text-[15px] text-ink-foreground">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="opacity-85 transition-opacity hover:opacity-100">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className="md:hidden rounded-full p-2 text-ink-foreground"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Мобильная навигация" className="tab-fade absolute inset-x-5 top-full mt-2 rounded-3xl border border-ink-border bg-ink p-3 md:hidden">
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-lg text-ink-foreground hover:bg-ink-border">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export function Hero() {
  return (
    <div id="top" className="relative z-10 bg-ink text-ink-foreground">
      <Header />
      <section className="container-pb relative pb-40 pt-8 md:pb-14 md:pt-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-8">
          <div>
            <h1 className="display text-[clamp(2.6rem,7.5vw,7rem)]">
              <span className="block">Ваши идеи.</span>
              <span className="block pl-[0.9em] sm:pl-[1.55em]">Наш код.</span>
              <span className="block text-primary">Новый продукт.</span>
            </h1>
          </div>
          <div className="flex flex-col items-start gap-6 lg:pt-16">
            <p className="max-w-xs text-lg leading-snug text-ink-foreground/90">
              Проектируем и разрабатываем цифровые продукты для бизнеса.
            </p>
            <a href="#contact" className={btn.lime}>
              Обсудить задачу
            </a>
            <a href="#projects" className="border-b border-ink-muted pb-1 text-[15px] text-ink-foreground/90 transition-colors hover:border-primary">
              Смотреть проекты
            </a>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 right-4 w-[200px] translate-y-[4.5%] sm:w-[240px] lg:right-2 lg:w-[250px] xl:-right-4 xl:w-[270px]">
          <img
            src={robotBase.url}
            alt="Хромированный робот Pink Byte облокотился на край экрана"
            width={1178}
            height={936}
            fetchPriority="high"
            className="block h-auto w-full"
          />
          {ROBOT_EYES.map((eye) => (
            <span
              key={eye.src}
              className="pb-eyes"
              style={{ left: eye.left, top: eye.top, width: eye.size[0], height: eye.size[1] }}
            >
              <img
                src={eye.src}
                alt=""
                aria-hidden="true"
                width={eye.width}
                height={eye.height}
                className="pb-eyes-img"
                style={{ transformOrigin: eye.origin }}
              />
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
