import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import robotLean from "@/assets/robot-lean.png.asset.json";
import robotGlow from "@/assets/robot-eye-glow-alpha.png.asset.json";
import robotDarkVisor from "@/assets/robot-dark-visor.png.asset.json";
import robotEyeLeft from "@/assets/robot-blink-eye-left.png.asset.json";
import robotEyeRight from "@/assets/robot-blink-eye-right.png.asset.json";
import { Logo, NAV } from "./primitives";

/* Тёмная панель убирает блик на лице; её копии работают как веки и плавно
   закрывают глаза сверху вниз. Корпус робота остаётся неизменным. */
const EYES = [
  { src: robotEyeLeft.url, left: "39%", top: "36.4269%", width: "14%", height: "20.4176%" },
  { src: robotEyeRight.url, left: "49.7778%", top: "33.0626%", width: "14.1111%", height: "20.7657%" },
];

const LIDS = [
  { top: "35.4%", right: "46%", left: "38%", open: "64.6%", closed: "42.2%" },
  { top: "32.1%", right: "35.1%", left: "48.8%", open: "67.9%", closed: "45.2%" },
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
        </div>
        <div className="pointer-events-none absolute bottom-0 right-4 w-[200px] translate-y-[14%] sm:w-[240px] lg:right-2 lg:w-[250px] xl:-right-4 xl:w-[270px]">
          <img
            src={robotLean.url}
            alt="Хромированный робот Pink Byte облокотился на край экрана"
            width={900}
            height={862}
            fetchPriority="high"
            className="block h-auto w-full"
          />
          <img src={robotDarkVisor.url} alt="" aria-hidden="true" className="pb-eye-panel" />
          {EYES.map((eye) => (
            <img
              key={eye.src}
              src={eye.src}
              alt=""
              aria-hidden="true"
              className="pb-eye"
              style={{ left: eye.left, top: eye.top, width: eye.width, height: eye.height }}
            />
          ))}
          <img
            src={robotGlow.url}
            alt=""
            aria-hidden="true"
            width={900}
            height={862}
            className="pb-glow"
          />
          {LIDS.map((lid) => (
            <img
              key={lid.left}
              src={robotDarkVisor.url}
              alt=""
              aria-hidden="true"
              className="pb-lid"
              style={{
                "--lid-top": lid.top,
                "--lid-right": lid.right,
                "--lid-left": lid.left,
                "--lid-open": lid.open,
                "--lid-closed": lid.closed,
              } as React.CSSProperties}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
