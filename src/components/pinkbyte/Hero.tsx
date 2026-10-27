import { useEffect, useState, type CSSProperties } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import robotLeanSrc from "@/assets/robot-hero.webp";
import robotSeated from "@/assets/robot-brief-seated.webp";
import robotEyeLeft from "@/assets/robot-gaze-eye-0.png.asset.json";
import robotEyeRight from "@/assets/robot-gaze-eye-1.png.asset.json";
import { Button } from "@/components/ui/button";
import { Logo, NAV, btn } from "./primitives";
import { useOpenBrief } from "./brief-context";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { navigationActive } from "./navigation-model";

/* The clean base has no baked-in eyes. Only emissive RGBA eye pixels move. */
const EYES = [
  { src: robotEyeLeft.url, left: "39%", top: "36.4269%", width: "14%", height: "20.4176%" },
  { src: robotEyeRight.url, left: "49.7778%", top: "33.0626%", width: "14.1111%", height: "20.7657%" },
];

export function Header({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const light = tone === "light";
  const openBrief = useOpenBrief();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useRouterState({ select: (state) => state.location });
  const isActive = (href: string) => navigationActive(location.pathname, location.hash, href);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); html.style.overflow = prev; };
  }, [open]);

  return (
    <header className="container-pb relative z-30">
      <div className="flex items-center justify-between gap-4 py-5">
        <Link to="/" aria-label="Pink Byte, на главную">
          <Logo tone={light ? "dark" : "light"} className="w-36 md:w-40" />
        </Link>
        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className={`flex gap-1 xl:gap-2 text-[15px] ${light ? "text-foreground" : "text-ink-foreground"}`}>
            {NAV.map((n) => (
              <li key={n.href} className="group relative">
                {n.children ? (
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" aria-current={isActive(n.href) ? "location" : undefined} className={`h-11 rounded-full px-1 xl:px-5 pb-nav-label [&[data-state=open]>svg]:rotate-180 ${light ? "text-foreground hover:bg-muted hover:text-foreground data-[state=open]:bg-muted" : "text-ink-foreground hover:bg-ink-border hover:text-ink-foreground data-[state=open]:bg-ink-border"} ${isActive(n.href) ? (light ? "bg-muted" : "bg-ink-border") : ""}`}>
                        {n.label}<ChevronDown className="size-4 transition-transform" aria-hidden="true" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" sideOffset={10} className={`w-[310px] max-w-[calc(100vw-32px)] rounded-lg p-2 shadow-lg ${light ? "border-border bg-background text-foreground" : "border-ink-border bg-ink text-ink-foreground"}`}>
                      {n.children.map((c) => (
                        <DropdownMenuItem key={c.href} asChild className={`cursor-pointer rounded-md p-3 ${light ? "focus:bg-muted focus:text-foreground" : "focus:bg-ink-border focus:text-ink-foreground"}`}>
                          <Link to={c.href} className="flex min-h-16 items-center gap-4 text-sm font-semibold">
                            <img src={c.image} width={48} height={48} alt="" className="h-12 w-12 shrink-0 object-contain" />
                            <span>{c.label}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : <Button asChild variant="ghost" className={`h-11 rounded-full px-1 xl:px-5 pb-nav-label ${light ? `text-foreground hover:bg-muted hover:text-foreground ${isActive(n.href) ? "bg-muted" : ""}` : `text-ink-foreground hover:bg-ink-border hover:text-ink-foreground ${isActive(n.href) ? "bg-ink-border" : ""}`} `}>
                  <Link to={n.href === "/journal" ? "/journal" : "/"} hash={n.href.split("#")[1] ?? ""} activeOptions={{ exact: true, includeHash: true }} aria-current={isActive(n.href) ? "location" : undefined}>
                    {n.label}
                    {n.children && <ChevronDown className="size-4 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden="true" />}
                  </Link>
                </Button>}
              </li>
            ))}
          </ul>
        </nav>
        <Button onClick={openBrief} variant="secondary" className={light ? `${btn.ink} hidden h-11 lg:inline-flex` : `${btn.paper} hidden h-11 lg:inline-flex hover:bg-background/90`}>
          Обсудить проект
        </Button>
        <button
          type="button"
          className={`pb-burger lg:hidden ${light ? "text-foreground" : "text-ink-foreground"}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Открыть меню"
          onClick={() => setOpen(true)}
        >
          <Menu className="size-9" strokeWidth={2.4} />
        </button>
      </div>
      <div className="pb-drawer lg:hidden" data-open={open} aria-hidden={!open} inert={!open ? true : undefined}>
        <button type="button" tabIndex={-1} aria-label="Закрыть меню" className="pb-drawer-backdrop" onClick={() => setOpen(false)} />
        <nav id="mobile-menu" aria-label="Мобильная навигация" className="pb-drawer-panel text-ink-foreground">
          <div className="pb-drawer-scroll">
            <div className="flex items-center justify-between pb-5">
              <Link to="/" onClick={() => setOpen(false)} aria-label="Pink Byte, на главную"><Logo tone="light" className="w-36" /></Link>
              <button type="button" onClick={() => setOpen(false)} aria-label="Закрыть меню" className="grid size-12 place-items-center rounded-full border border-ink-border transition-colors hover:bg-ink-border">
                <X className="size-6" />
              </button>
            </div>
            <ul className="border-t border-ink-border">
              {NAV.map((n, i) => (
                <li key={n.href} className="pb-drawer-item border-b border-ink-border" style={{ "--i": i } as CSSProperties}>
                  {n.children ? <>
                    <button type="button" aria-expanded={servicesOpen} aria-controls="mobile-services" onClick={() => setServicesOpen((v) => !v)} className="flex w-full items-center gap-3 py-4 text-left text-xl font-bold">
                      <span className={`size-2 rounded-full bg-primary transition-opacity ${isActive(n.href) || servicesOpen ? "opacity-100" : "opacity-0"}`} />
                      <span className="flex-1">{n.label}</span>
                      <ChevronDown className={`size-5 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
                    </button>
                    <div className="pb-drawer-sub" data-open={servicesOpen}>
                      <ul id="mobile-services" className="overflow-hidden">
                        {n.children.map((c) => <li key={c.href} className="border-t border-ink-border first:border-t-0">
                          <Link to={c.href} onClick={() => { setOpen(false); setServicesOpen(false); }} className="flex min-h-16 items-center gap-4 py-2 pl-5 text-[15px] font-semibold">
                            <img src={c.image} alt="" width={48} height={48} className="h-12 w-12 shrink-0 object-contain" />
                            <span>{c.label}</span>
                          </Link>
                        </li>)}
                      </ul>
                    </div>
                  </> : <Link to={n.href === "/journal" ? "/journal" : "/"} hash={n.href.split("#")[1] ?? ""} activeOptions={{ exact: true, includeHash: true }} aria-current={isActive(n.href) ? "location" : undefined} onClick={() => setOpen(false)} className="flex items-center gap-3 py-4 text-xl font-bold">
                    <span className={`size-2 rounded-full bg-primary ${isActive(n.href) ? "opacity-100" : "opacity-0"}`} />
                    {n.label}
                  </Link>}
                </li>
              ))}
            </ul>
          </div>
          <div className="pb-drawer-foot">
            <img src={robotSeated} alt="" width={768} height={832} loading="lazy" decoding="async" className="pb-drawer-robot" />
            <Button onClick={() => { setOpen(false); openBrief(); }} className={`${btn.lime} relative z-10 ml-auto h-12 px-6`}>
              Обсудить проект
            </Button>
          </div>
        </nav>
      </div>
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
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 right-4 w-[clamp(200px,24vw,240px)] translate-y-[14%] lg:w-[clamp(270px,25vw,360px)]">
          <img
            src={robotLeanSrc}
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
