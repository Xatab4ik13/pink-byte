import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import robotLean from "@/assets/robot-lean.png.asset.json";
import robotGlow from "@/assets/robot-glow.png.asset.json";
import { Logo, NAV } from "./primitives";

/* Свечение и веки — отдельные слои над исходной картинкой робота: сам робот не
   меняется, оживает только свет глаз. Координаты — в процентах от размера картинки. */
const EYE_LIDS = [
  { left: "56.77%", top: "43.32%", size: ["8.4%", "19.1%"] },
  { left: "46.03%", top: "46.50%", size: ["8.2%", "18.6%"] },
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
          <img
            src={robotGlow.url}
            alt=""
            aria-hidden="true"
            width={900}
            height={862}
            className="pb-glow"
          />
          {EYE_LIDS.map((lid) => (
            <span
              key={lid.left}
              className="pb-lid"
              style={{ left: lid.left, top: lid.top, width: lid.size[0], height: lid.size[1] }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
