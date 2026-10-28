export function navigationActive(pathname: string, hash: string, href: string): boolean {
  if (href === "/#services") return pathname.startsWith("/uslugi/") || (pathname === "/" && hash === "services");
  const [path, targetHash] = href.split("#");
  return pathname === path && (targetHash ? hash === targetHash : !hash);
}

/** Resolves a NAV href to a typed Link target: hash links go home, page links keep their path. */
export function navigationTarget(href: string): { to: "/" | "/blog" | "/o-kompanii" | "/portfolio"; hash: string } {
  if (href === "/blog") return { to: "/blog", hash: "" };
  if (href === "/o-kompanii") return { to: "/o-kompanii", hash: "" };
  if (href === "/portfolio") return { to: "/portfolio", hash: "" };
  return { to: "/", hash: href.split("#")[1] ?? "" };
}