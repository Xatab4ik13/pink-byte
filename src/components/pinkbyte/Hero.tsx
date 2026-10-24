import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import robotLean from "@/assets/robot-clean-face.png.asset.json";
import robotEyeLeft from "@/assets/robot-gaze-eye-0.png.asset.json";
import robotEyeRight from "@/assets/robot-gaze-eye-1.png.asset.json";
import { Button } from "@/components/ui/button";
import { Logo, NAV, btn } from "./primitives";
import { useOpenBrief } from "./brief-context";

/* The clean base has no baked-in eyes. Only emissive RGBA eye pixels move. */
const EYES = [
  { src: robotEyeLeft.url, left: "39%", top: "36.4269%", width: "14%", height: "20.4176%" },
  { src: robotEyeRight.url, left: "49.7778%", top: "33.0626%", width: "14.1111%", height: "20.7657%" },
];

export function Header({ initialActive = "/#projects" }: { initialActive?: string }) {
  const openBrief = useOpenBrief();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(initialActive);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="container-pb relative z-30">
      <div className="flex items-center justify-between gap-4 py-5">
        <a href="/#top" aria-label="Pink Byte — на главную">
          <Logo className="w-36 md:w-40" />
        </a>
        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex gap-2 text-[15px] text-ink-foreground">
            {NAV.map((n) => (
              <li key={n.href}>
                <Button asChild variant="ghost" className={`h-11 rounded-full px-3 xl:px-5 font-normal text-ink-foreground hover:bg-ink-border hover:text-ink-foreground ${active === n.href ? "bg-ink-border" : ""}`}>
                  <a href={n.href} onClick={() => setActive(n.href)} aria-current={active === n.href ? "location" : undefined}>{n.label}</a>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        <Button onClick={openBrief} variant="secondary" className={`${btn.paper} hidden h-11 lg:inline-flex hover:bg-background/90`}>
          Обсудить проект
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="lg:hidden rounded-full text-ink-foreground hover:bg-ink-border hover:text-ink-foreground"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </Button>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Мобильная навигация" className="tab-fade absolute inset-x-5 top-full mt-2 rounded-3xl border border-ink-border bg-ink p-3 lg:hidden">
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => { setActive(n.href); setOpen(false); }} className="block rounded-2xl px-4 py-3 text-lg text-ink-foreground hover:bg-ink-border">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <Button onClick={() => { setOpen(false); openBrief(); }} variant="secondary" className={`${btn.paper} mt-3 w-full hover:bg-background/90`}>
            Обсудить проект
          </Button>
        </nav>
      )}
    </header>
  );
}

export function Hero() {
  return (
    <div id="top" className="relative z-10 bg-ink text-ink-foreground">
      <Header />
      <section className="container-pb relative pb-44 pt-12 md:pb-[10.75rem] md:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:gap-8">
          <div>
            <h1 className="display text-[clamp(2.6rem,7.5vw,7rem)] lg:text-[96px] xl:text-[112px] 2xl:text-[128px]">
              <span className="block">Сложное</span>
              <span className="block pl-[1.8em] sm:pl-[2em]">делаем</span>
              <span className="block text-primary">удобным.</span>
            </h1>
          </div>
          <div className="relative z-10 max-w-[340px] text-ink-foreground lg:pt-1">
            <p className="text-lg leading-[1.35] md:text-xl">Проектируем и разрабатываем сайты, веб-сервисы и CRM для бизнеса. От интерфейса до запуска и поддержки.</p>
            <a href="#projects" className="mt-5 inline-block text-lg text-ink-foreground underline underline-offset-4 md:text-xl">Смотреть проекты</a>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 right-4 w-[clamp(200px,24vw,240px)] translate-y-[14%] lg:w-[clamp(270px,25vw,360px)]">
          <img
            src={robotLean.url}
            alt="Хромированный робот Pink Byte облокотился на край экрана"
            width={900}
            height={862}
            fetchPriority="high"
            className="block h-auto w-full"
          />
          <div className="pb-gaze" aria-hidden="true">
            {EYES.map((eye) => (
              <img
                key={eye.src}
                src={eye.src}
                alt=""
                className="pb-eye"
                style={{ left: eye.left, top: eye.top, width: eye.width, height: eye.height }}
              />
            ))}
          </div>
          <svg aria-hidden="true" viewBox="0 0 210 120" fill="none" className="absolute -left-[43%] bottom-[-13%] h-auto w-[60%] overflow-visible text-primary">
            <path d="M205 17C139-5 55 20 20 104M15 77L20 108L43 93" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>
    </div>
  );
}
