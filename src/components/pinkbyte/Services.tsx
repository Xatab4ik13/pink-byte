import { useState } from "react";
import serviceUi from "@/assets/service-ui.jpg";
import { cn } from "@/lib/utils";
import { Reveal, btn } from "./primitives";

const TABS = [
  {
    id: "site",
    label: "Сайт",
    title: "Сайт, который помогает выбрать вас.",
    text: "Корпоративные сайты и интернет-магазины с понятной структурой, выразительным дизайном и удобным управлением.",
  },
  {
    id: "service",
    label: "Веб-сервис",
    title: "Когда готового решения недостаточно.",
    text: "Личные кабинеты, CRM и внутренние системы под процессы вашей компании.",
  },
  {
    id: "growth",
    label: "Развитие продукта",
    title: "Развиваем продукт вместе с бизнесом.",
    text: "Добавляем функции, улучшаем интерфейс и поддерживаем работу вашего сервиса.",
  },
];

export function Services() {
  const [active, setActive] = useState("service");
  const tab = TABS.find((t) => t.id === active)!;

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    const next = TABS[(i + d + TABS.length) % TABS.length];
    setActive(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  };

  return (
    <section id="services" aria-labelledby="services-title" className="container-pb scroll-mt-6 pt-24 md:pt-28">
      <Reveal>
        <h2 id="services-title" className="text-[clamp(2.2rem,5vw,3.6rem)] font-semibold tracking-[-0.04em]">
          Что создадим для вас?
        </h2>
        <div role="tablist" aria-label="Услуги" className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              role="tab"
              type="button"
              aria-selected={active === t.id}
              aria-controls="services-panel"
              tabIndex={active === t.id ? 0 : -1}
              onClick={() => setActive(t.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "border-b-2 pb-2 text-[15px] transition-colors",
                active === t.id ? "border-foreground font-semibold text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-6 overflow-hidden rounded-[2rem] bg-card">
        <div
          id="services-panel"
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          className="grid items-center lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
        >
          <div key={active} className="tab-fade flex min-h-[300px] flex-col justify-center p-7 md:p-12 lg:min-h-[380px]">
            <h3 className="text-[clamp(1.8rem,3.2vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.035em]">{tab.title}</h3>
            <p className="mt-4 max-w-md text-muted-foreground">{tab.text}</p>
            <a href="#contact" className={cn(btn.ink, "mt-8 self-start")}>
              Обсудить решение
            </a>
          </div>
          <img
            src={serviceUi}
            alt="Пример интерфейса веб-сервиса: план проекта и карточка задачи"
            width={1536}
            height={1024}
            loading="lazy"
            className="block w-full mix-blend-multiply lg:-mr-10 lg:w-[110%] lg:max-w-none"
          />
        </div>
      </Reveal>
    </section>
  );
}
