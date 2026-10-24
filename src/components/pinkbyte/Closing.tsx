import robotSitSrc from "@/assets/robot-sit.webp";
import { Button } from "@/components/ui/button";
import { Logo, NAV, Reveal, btn } from "./primitives";
import { useOpenBrief } from "./brief-context";

export function Studio() {
  return (
    <section id="studio" aria-labelledby="studio-title" className="container-pb scroll-mt-6 pt-24 md:pt-28">
      <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 id="studio-title" className="text-[clamp(2rem,4.2vw,3rem)] font-medium leading-[1.05] tracking-[-0.035em]">
          Внимание к деталям.
          <br />
          На каждом этапе.
        </h2>
        <p className="max-w-sm text-lg leading-snug text-muted-foreground">
          От обсуждения задачи до интерфейса, которым удобно пользоваться.
        </p>
      </Reveal>
    </section>
  );
}

export function Contact() {
  const openBrief = useOpenBrief();
  return (
    <section id="contact" aria-labelledby="contact-title" className="container-pb scroll-mt-6 pt-10">
      <Reveal className="grid items-end overflow-hidden rounded-[2rem] bg-ink text-ink-foreground md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div className="order-2 px-6 pt-2 md:order-1 md:px-10 md:pt-10">
          <img
            src={robotSitSrc}
            alt="Сидящий робот Pink Byte приглашает к разговору жестом ладони"
            width={900}
            height={639}
            loading="lazy"
            className="mx-auto block w-full max-w-[460px]"
          />
        </div>
        <div className="order-1 flex flex-col items-center px-6 pt-12 text-center md:order-2 md:items-start md:self-center md:py-14 md:pr-12 md:text-left">
          <h2 id="contact-title" className="display text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.95]">
            Расскажите,
            <br />
            что вы задумали.
          </h2>
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
