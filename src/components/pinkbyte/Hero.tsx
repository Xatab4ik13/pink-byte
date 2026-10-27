import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import robotLeanSrc from "@/assets/robot-hero.webp";
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
    return () => window.removeEventListener("keydown", onKey);
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
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={`lg:hidden rounded-full ${light ? "text-foreground" : "text-ink-foreground hover:bg-ink-border hover:text-ink-foreground"}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </Button>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Мобильная навигация" className={`tab-fade absolute inset-x-5 top-full mt-2 max-h-[calc(100dvh-100px)] overflow-y-auto rounded-lg border p-3 lg:hidden ${light ? "border-border bg-background text-foreground" : "border-ink-border bg-ink text-ink-foreground"}`}>
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                {n.children ? <Button variant="ghost" aria-expanded={servicesOpen} aria-controls="mobile-services" onClick={() => setServicesOpen((v) => !v)} className={`h-12 w-full justify-between rounded-full px-4 pb-nav-label ${light ? "hover:bg-muted" : "hover:bg-ink-border hover:text-ink-foreground"}`}>
                  {n.label}<ChevronDown className={`size-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                </Button> : <Link to={n.href === "/journal" ? "/journal" : "/"} hash={n.href.split("#")[1] ?? ""} activeOptions={{ exact: true, includeHash: true }} aria-current={isActive(n.href) ? "location" : undefined} onClick={() => setOpen(false)} className={`block rounded-full px-4 py-3 pb-nav-label ${light ? "hover:bg-muted" : "hover:bg-ink-border"}`}>
                  {n.label}
                </Link>}
                {n.children && servicesOpen && <ul id="mobile-services" className="py-1">
                  {n.children.map((c) => <li key={c.href}>
                    <Link to={c.href} onClick={() => { setOpen(false); setServicesOpen(false); }} className={`flex min-h-16 items-center gap-3 rounded-md px-4 py-2 text-sm font-semibold ${light ? "hover:bg-muted" : "hover:bg-ink-border"}`}>
                      <img src={c.image} alt="" width={44} height={44} className="h-11 w-11 shrink-0 object-contain" />
                      <span>{c.label}</span>
                    </Link>
                  </li>)}
                </ul>}
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
