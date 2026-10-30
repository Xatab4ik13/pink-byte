import type React from "react";
import robotBrief from "@/assets/robot-brief-seated.webp";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Logo, NAV, Reveal, SERVICE_LINKS, btn } from "./primitives";
import { CHANNELS, COMPANY_SHORT, EMAIL, INN, OGRNIP, PHONE_HREF, PHONE_LABEL } from "./company-data";
import { useOpenBrief } from "./brief-context";
import { navigationTarget } from "./navigation-model";

export function Contact({ title, text, buttonLabel }: { title?: React.ReactNode; text?: string; buttonLabel?: string } = {}) {
  const openBrief = useOpenBrief();
  return (
    <section id="contact" aria-labelledby="contact-title" className="container-pb scroll-mt-6 pt-10 pb-[130px] md:pb-[200px]">
      <Reveal className="grid items-end rounded-[2rem] bg-ink text-ink-foreground md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div className="relative order-2 px-6 pt-2 md:order-1 md:px-10 md:pt-10">
          <div aria-hidden className="pb-contact-seat" />
          <img
            src={robotBrief}
            alt="Робот Pink Byte сидит на нижней кромке блока, ноги свисают вниз"
            width={768}
            height={832}
            loading="lazy"
            decoding="async"
            className="pb-contact-robot pointer-events-none"
          />
        </div>
        <div className="order-1 flex flex-col items-center px-6 pt-12 text-center md:order-2 md:items-start md:self-center md:py-14 md:pr-12 md:text-left">
          <h2 id="contact-title" className="display text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.95]">
            {title ?? (<>Расскажите,<br />что вы задумали.</>)}
          </h2>
          {text && <p className="mt-5 max-w-xl text-ink-muted md:text-lg">{text}</p>}
          <Button onClick={openBrief} className={`${btn.lime} mt-8 h-auto px-10 py-4`}>
            {buttonLabel ?? "Обсудить проект"}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  const pages = NAV.filter((n) => !n.children);
  return (
    <footer className="container-pb mt-16">
      <div className="grid gap-10 border-t border-border py-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr] lg:gap-8">
        <div>
          <Link to="/" aria-label="Pink Byte, на главную">
            <Logo tone="dark" className="w-32" />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Студия разработки сайтов, CRM-систем и мобильных приложений. Работаем с заказчиками по всей России.
          </p>
        </div>
        <nav aria-label="Услуги">
          <p className="text-sm font-bold">Услуги</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SERVICE_LINKS.map((s) => (
              <li key={s.href}><Link to={s.href} className="text-foreground/75 transition-colors hover:text-foreground">{s.label}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Студия">
          <p className="text-sm font-bold">Студия</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {pages.map((n) => (
              <li key={n.href}>
                <Link {...navigationTarget(n.href)} className="text-foreground/75 transition-colors hover:text-foreground">{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-sm font-bold">Связаться</p>
          <a href={PHONE_HREF} className="mt-4 block font-display text-xl font-extrabold hover:text-foreground/75">{PHONE_LABEL}</a>
          <a href={`mailto:${EMAIL}`} className="mt-1 block text-sm text-foreground/75 hover:text-foreground">{EMAIL}</a>
          <ul className="mt-5 flex gap-3" aria-label="Мессенджеры и почта">
            {CHANNELS.map((c) => {
              const img = <img src={c.icon.url} alt="" width={44} height={44} loading="lazy" decoding="async" className="size-11 object-contain" />;
              return (
                <li key={c.name}>
                  {c.href
                    ? <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={c.name} title={c.name} className="inline-flex rounded-full transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">{img}</a>
                    : <span title={`${c.name}: скоро`} className="inline-flex opacity-60">{img}</span>}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-t border-border py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Pink Byte · {COMPANY_SHORT} · ИНН {INN} · ОГРНИП {OGRNIP}</p>
        <Link to="/kontakty" hash="rekvizity" className="underline-offset-4 hover:text-foreground hover:underline">Реквизиты</Link>
      </div>
    </footer>
  );
}
