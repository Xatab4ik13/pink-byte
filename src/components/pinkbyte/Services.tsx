import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
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
  const dirRef = useRef(1);
  const openBrief = useOpenBrief();
  const tab = SERVICES[active] ?? SERVICES[0];

  const go = (i: number) => {
    if (i === active) return;
    dirRef.current = i > active ? 1 : -1;
    setActive(i);
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
            Обсудить решение <ArrowUpRight className="size-4" />
          </Button>
        </div>
        <div className="pb-service-device" role="img" aria-label={`${tab.device === "phone" ? "Смартфон" : tab.device === "laptop" ? "Ноутбук" : tab.device === "desktop" ? "Монитор" : "Планшет"}: ${tab.project}${tab.concept ? ", концепция интерфейса" : ", реальный сайт"}`}>
          {DEVICES.map((d, i) => (
            <img
              key={d.src}
              src={d.src}
              width={d.width}
              height={d.height}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              alt=""
              aria-hidden={i !== active}
              className={cn(
                "pb-service-tablet",
                d.cls,
                i !== active && (dirRef.current > 0 ? "pb-device-off-r" : "pb-device-off-l"),
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
