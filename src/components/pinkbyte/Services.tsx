import { lazy, Suspense, useState } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal, btn } from "./primitives";
import { useOpenBrief } from "./brief-context";
import { SERVICES } from "./service-data";
import tablet from "@/assets/service-tablet-ipad.png.asset.json";

const DeviceScene = lazy(() => import("./ServiceDeviceScene"));

export function Services() {
  const [active, setActive] = useState(0);
  const openBrief = useOpenBrief();
  const tab = SERVICES[active] ?? SERVICES[0];

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const nextIndex = (i + d + SERVICES.length) % SERVICES.length;
    const next = SERVICES[nextIndex];
    if (!next) return;
    setActive(nextIndex);
    document.getElementById(`tab-${next.id}`)?.focus();
  };

  return (
    <section id="services" aria-labelledby="services-title" className="container-pb pb-services scroll-mt-6 pt-24 md:pt-28">
      <Reveal>
        <h2 id="services-title" className="text-4xl font-semibold leading-tight md:text-5xl">
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
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "pb-service-tab",
                active === i ? "border-foreground font-semibold text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </Button>
          ))}
        </div>
      </Reveal>

      <div className="pb-service-stage mt-7">
        <div className="pb-service-backdrop" aria-hidden="true" />
        <div className="pb-service-copy">
          {SERVICES.map((service, i) => (
            <div key={service.id} id={`service-panel-${service.id}`} role="tabpanel" aria-labelledby={`tab-${service.id}`} hidden={i !== active} className="pb-service-text">
              <p className="text-xs font-medium text-ink-muted md:text-sm">{service.keyword}</p>
              <h3 className="mt-4 text-3xl font-medium leading-[1.1] text-ink-foreground md:text-4xl">{service.title}</h3>
              <p className="mt-5 text-sm leading-relaxed text-ink-muted md:text-base">{service.text}</p>
            </div>
          ))}
          <Button onClick={openBrief} className={cn(btn.paper, "mt-7 h-auto self-start hover:opacity-90")}>
            Обсудить решение <ArrowUpRight className="size-4" />
          </Button>
        </div>
        <div className="pb-service-device" role="img" aria-label={`${tab.device === "phone" ? "Смартфон" : tab.device === "laptop" ? "Ноутбук" : tab.device === "desktop" ? "Монитор" : "Планшет"}: ${tab.project}${tab.concept ? ", концепция интерфейса" : ", реальный сайт"}`}>
          {active === 0 ? (
            <img src={tablet.url} width={1513} height={1039} loading="lazy" decoding="async" alt="" className="pb-service-tablet" />
          ) : (
            <ClientOnly fallback={<div className="pb-service-canvas" />}>
              <Suspense fallback={<div className="pb-service-canvas" />}><DeviceScene active={active} /></Suspense>
            </ClientOnly>
          )}
        </div>
        {tab.concept && <div className="pb-service-credit text-xs text-ink-muted">{tab.project} · концепция</div>}
      </div>
    </section>
  );
}
