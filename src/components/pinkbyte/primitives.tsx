import { useEffect, useRef, type ReactNode } from "react";
import logo from "@/assets/logo.png.asset.json";
import logoDark from "@/assets/logo-dark.png.asset.json";
import { cn } from "@/lib/utils";

export const NAV: { href: string; label: string; children?: { href: string; label: string }[] }[] = [
  { href: "/", label: "Главная" },
  { href: "/#services", label: "Услуги", children: [{ href: "/uslugi/internet-magazin", label: "Интернет-магазин" }] },
  { href: "/#projects", label: "Проекты" },
  { href: "/#studio", label: "Студия" },
  { href: "/journal", label: "Журнал" },
  { href: "/#contact", label: "Контакты" },
];

export const TELEGRAM_URL = "https://t.me/noirdig";

/** Light logo for dark surfaces; dark logo with the lime eyes kept for light surfaces. */
export function Logo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <img
      src={tone === "light" ? logo.url : logoDark.url}
      alt="pink byte"
      width={634}
      height={212}
      className={cn("h-auto w-32", className)}
    />
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
