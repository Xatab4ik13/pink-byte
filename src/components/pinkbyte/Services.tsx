import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal, btn } from "./primitives";
import { useOpenBrief } from "./brief-context";
import { SERVICES } from "./service-data";
import tablet from "@/assets/service-tablet-ipad.webp.asset.json";
import macbook from "@/assets/macbook-lsystems.webp.asset.json";
import monitor from "@/assets/service-crm-monitor.webp.asset.json";
import phone from "@/assets/service-app-iphone.webp.asset.json";

const DEVICES = [
  { src: tablet.url, width: 1280, height: 879, cls: "" },
  { src: macbook.url, width: 1280, height: 879, cls: "" },
  { src: monitor.url, width: 1280, height: 853, cls: "pb-service-monitor" },
  { src: phone.url, width: 768, height: 1152, cls: "pb-service-phone" },
] as const;

export function Services() {
  const [active, setActive] = useState(0);
  const layers = useRef<Array<HTMLDivElement | null>>([]);
  const current = useRef(0);
  const requested = useRef(0);
  const running = useRef(false);
  const mounted = useRef(true);
  const openBrief = useOpenBrief();
  const tab = SERVICES[active] ?? SERVICES[0];

  useEffect(() => {
    mounted.current = true;
    // Decode the small renders before the first switch, not during its frames.
    layers.current.forEach((layer) => {
      void layer?.querySelector("img")?.decode().catch(() => undefined);
    });
    return () => {
      mounted.current = false;
      layers.current.forEach((layer) => {
        layer?.querySelector(".pb-device-motion")?.getAnimations().forEach((animation) => animation.cancel());
      });
    };
  }, []);

  const go = async (i: number) => {
    requested.current = i;
    if (running.current || i === current.current) return;
    running.current = true;
    try {
      // Finish one movement, then take only the latest choice. Never restart
      // four large layers midway through their transition on every click.
      while (mounted.current && requested.current !== current.current) {
        const next = requested.current;
        const incoming = layers.current[next];
        const outgoing = layers.current[current.current];
        const enter = incoming?.querySelector<HTMLElement>(".pb-device-motion");
        const exit = outgoing?.querySelector<HTMLElement>(".pb-device-motion");
        if (!incoming || !outgoing || !enter || !exit) break;
        await incoming.querySelector("img")?.decode().catch(() => undefined);
        if (!mounted.current) break;
        if (requested.current !== next) continue;
        const direction = next > current.current ? 1 : -1;
        const distance = window.matchMedia("(max-width: 900px)").matches ? 14 : 90;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        // All layers stay painted on their own GPU layers (opacity 0 when idle),
        // so a switch never triggers layout, decode or shadow rasterization.
        const options = { duration: reduced ? 0 : 650, easing: "cubic-bezier(.22, 1, .36, 1)", fill: "both" as const };
        const entering = enter.animate([
          { transform: `translate3d(${direction * distance}px, 0, 0) scale(.94)`, opacity: 0 },
          { transform: "translate3d(0, 0, 0) scale(1)", opacity: 1 },
        ], options);
        const leaving = exit.animate([
          { transform: "translate3d(0, 0, 0) scale(1)", opacity: 1 },
          { transform: `translate3d(${-direction * distance}px, 0, 0) scale(.94)`, opacity: 0 },
        ], options);
        setActive(next);
        await Promise.all([entering.finished, leaving.finished]).catch(() => undefined);
        if (!mounted.current) break;
        enter.style.opacity = "1";
        exit.style.opacity = "0";
        entering.cancel();
        leaving.cancel();
        current.current = next;
      }
    } finally {
      running.current = false;
    }
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const nextIndex = (i + d + SERVICES.length) % SERVICES.length;
    const next = SERVICES[nextIndex];
    if (!next) return;
    go(nextIndex);
    document.getElementById(`tab-${next.id}`)?.focus();
  };

  return (
    <section id="services" aria-labelledby="services-title" className="container-pb pb-services scroll-mt-6 pt-24 md:pt-28">
      <Reveal>
        <h2 id="services-title" className="text-4xl font-extrabold leading-tight md:text-5xl">
          Что создадим для вас?
        </h2>
        <div role="tablist" aria-label="Услуги" className="pb-service-tabs mt-6">
          {SERVICES.map((t, i) => (
            <Button
              key={t.id}
              id={`tab-${t.id}`}
              role="tab"
              type="button"
              variant="ghost"
              aria-selected={active === i}
              aria-controls={`service-panel-${t.id}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => go(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "pb-service-tab",
                active === i ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </Button>
          ))}
        </div>
      </Reveal>

      <div className="pb-service-stage pb-service-stage-tablet mt-9">
        <div className="pb-service-backdrop" aria-hidden="true" />
        <div className="pb-service-copy">
          <div key={tab.id} id={`service-panel-${tab.id}`} role="tabpanel" aria-labelledby={`tab-${tab.id}`} className="pb-service-text">
            <p className="text-xs font-medium text-ink-muted md:text-sm">{tab.keyword}</p>
            <h3 className="mt-4 text-3xl font-medium leading-[1.1] text-ink-foreground md:text-4xl">{tab.title}</h3>
            <p className="mt-5 text-sm leading-relaxed text-ink-muted md:text-base">{tab.text}</p>
          </div>
          <Button onClick={openBrief} className={cn(btn.paper, "mt-7 h-auto self-start hover:opacity-90")}>
            Обсудить решение
          </Button>
          {tab.id === "shop" && (
            <a href="/uslugi/internet-magazin" className="mt-4 self-start text-sm font-semibold text-ink-foreground underline underline-offset-4 max-[900px]:text-foreground">
              Подробнее об услуге
            </a>
          )}
        </div>
        <div className="pb-service-device" role="img" aria-label={`${tab.device === "phone" ? "Смартфон" : tab.device === "laptop" ? "Ноутбук" : tab.device === "desktop" ? "Монитор" : "Планшет"}: ${tab.project}${tab.concept ? ", концепция интерфейса" : ", реальный сайт"}`}>
          {DEVICES.map((d, i) => (
            <div
              key={d.src}
              ref={(node) => { layers.current[i] = node; }}
              aria-hidden={i !== active}
              className={cn("pb-service-tablet", d.cls)}
            >
              <div className="pb-device-motion" style={{ opacity: i === 0 ? 1 : 0 }}>
                <img src={d.src} width={d.width} height={d.height} loading="eager" decoding="async" alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
