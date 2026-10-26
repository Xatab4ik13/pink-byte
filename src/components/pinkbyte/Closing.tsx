import robotBrief from "@/assets/robot-brief-seated.webp";
import { Button } from "@/components/ui/button";
import { Logo, NAV, Reveal, btn } from "./primitives";
import { useOpenBrief } from "./brief-context";

export function Contact({ title, text }: { title?: string; text?: string } = {}) {
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
          <Button onClick={openBrief} className={`${btn.lime} mt-8 h-auto`}>
            Обсудить проект
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="container-pb mt-16">
      <div className="flex flex-col gap-6 border-t border-border py-8 md:flex-row md:items-center md:justify-between">
        <a href="#top" aria-label="Pink Byte, наверх">
          <Logo tone="dark" className="w-32" />
        </a>
        <nav aria-label="Навигация в подвале">
          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-foreground/80 hover:text-foreground">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
