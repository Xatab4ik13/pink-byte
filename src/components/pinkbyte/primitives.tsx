import { useEffect, useRef, type ReactNode } from "react";
import logo from "@/assets/logo.png.asset.json";
import { cn } from "@/lib/utils";

export const NAV = [
  { href: "#projects", label: "Проекты" },
  { href: "#services", label: "Услуги" },
  { href: "#studio", label: "Студия" },
  { href: "#contact", label: "Контакты" },
];

export const TELEGRAM_URL = "https://t.me/noirdig";

/** Original light logo, or a dark monochrome version masked by the logo's alpha. */
export function Logo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  if (tone === "light") {
    return (
      <img src={logo.url} alt="pink byte" width={600} height={212} className={cn("h-auto", className)} />
    );
  }
  return (
    <span
      role="img"
      aria-label="pink byte"
      className={cn("block aspect-[600/212] bg-foreground", className)}
      style={{
        maskImage: `url(${logo.url})`,
        WebkitMaskImage: `url(${logo.url})`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    />
  );
}

const btnBase =
  "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0";

export const btn = {
  lime: cn(btnBase, "bg-primary text-primary-foreground px-7 py-3.5 text-base hover:shadow-[0_10px_30px_-10px_var(--lime)]"),
  ink: cn(btnBase, "bg-ink text-ink-foreground px-6 py-3 text-sm hover:opacity-90"),
  paper: cn(btnBase, "bg-background text-foreground px-6 py-3 text-sm"),
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
