import { useEffect, useRef, type ReactNode } from "react";
import logo from "@/assets/logo.png.asset.json";
import logoDark from "@/assets/logo-dark.png.asset.json";
import { cn } from "@/lib/utils";
import shopIcon from "@/assets/nav-shop.webp.asset.json";
import corporateIcon from "@/assets/nav-corporate.webp.asset.json";
import crmIcon from "@/assets/nav-crm.webp.asset.json";
import appIcon from "@/assets/nav-app.webp.asset.json";

export const SERVICE_LINKS = [
  { href: "/uslugi/internet-magazin", label: "Интернет-магазин", image: shopIcon.url },
  { href: "/uslugi/korporativny-sait", label: "Корпоративный сайт", image: corporateIcon.url },
  { href: "/uslugi/crm-sistema", label: "CRM-система", image: crmIcon.url },
  { href: "/uslugi/mobilnoe-prilozhenie", label: "Мобильное приложение", image: appIcon.url },
] as const;

export const NAV: { href: string; label: string; children?: typeof SERVICE_LINKS }[] = [
  { href: "/#services", label: "Услуги", children: SERVICE_LINKS },
  { href: "/#projects", label: "Проекты" },
  { href: "/#studio", label: "Студия" },
  { href: "/journal", label: "Журнал" },
  { href: "/#contact", label: "Контакты" },
];

export const TELEGRAM_URL = "https://t.me/noirdig";

/** Light logo for dark surfaces; dark logo with the lime eyes kept for light surfaces. */
export function Logo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  if (tone === "light") {
    return <img src={logo.url} alt="pink byte" width={600} height={212} className={cn("h-auto w-32", className)} />;
  }
  // Dark variant has an extra 18px of canvas on the left for the circle, so the mark keeps the home logo's exact size and position.
  return (
    <span className={cn("relative inline-block aspect-[600/212] w-32", className)}>
      <img
        src={logoDark.url}
        alt="pink byte"
        width={618}
        height={212}
        className="absolute top-0 h-auto max-w-none"
        style={{ left: "-3%", width: "103%" }}
      />
    </span>
  );
}

const btnBase =
  "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0";

export const btn = {
  lime: cn(btnBase, "bg-primary text-primary-foreground px-7 py-3.5 text-base hover:bg-primary hover:shadow-[0_10px_30px_-10px_var(--lime)]"),
  ink: cn(btnBase, "bg-ink text-ink-foreground px-6 py-3 text-sm hover:bg-ink hover:opacity-90"),
  paper: cn(btnBase, "bg-background text-foreground px-6 py-3 text-sm hover:bg-background"),
};

export function Reveal({ children, className, as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "section" }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.dataset["visible"] = "true";
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={cn("reveal", className)}>
      {children}
    </Tag>
  );
}
