export function navigationActive(pathname: string, hash: string, href: string): boolean {
  if (href === "/#services") return pathname.startsWith("/uslugi/") || (pathname === "/" && hash === "services");
  const [path, targetHash] = href.split("#");
  return pathname === path && (targetHash ? hash === targetHash : !hash);
}