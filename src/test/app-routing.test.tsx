import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { NAV, SERVICE_LINKS } from "@/components/pinkbyte/primitives";
import { postBySlug } from "@/components/pinkbyte/blog-data";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches the requested CRM entry at /admin", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes('/admin').at(-1)?.routeId).toBe('/admin');
  });
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
  it("matches the Blog page at /blog", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes("/blog").at(-1)?.routeId).toBe("/blog");
  });
  // The shared article loader rejects removed records even though the route matches.
  it.each([
    "/blog/stoimost-internet-magazina",
    "/blog/chto-podgotovit-pered-razrabotkoj-sajta",
    "/blog/gotovaya-crm-ili-svoya",
    "/blog/kak-podgotovit-prilozhenie-k-publikacii",
    "/blog/chto-dolzhno-byt-v-tehnicheskom-zadanii",
    "/blog/peredacha-sajta-posle-zapuska",
  ])("removed article %s has no route of its own", (path) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(postBySlug(path.split("/").at(-1) ?? "")).toBeUndefined();
  });


  it("omits the separate home navigation item", () => {
    expect(NAV.some((item) => item.href === "/")).toBe(false);
  });
  it("provides all four service destinations", () => {
    expect(SERVICE_LINKS.map((item) => item.href)).toEqual([
      "/uslugi/internet-magazin", "/uslugi/korporativny-sait",
      "/uslugi/crm-sistema", "/uslugi/mobilnoe-prilozhenie",
    ]);
  });
  it.each([
    "/uslugi/internet-magazin", "/uslugi/korporativny-sait",
    "/uslugi/crm-sistema", "/uslugi/mobilnoe-prilozhenie",
  ])("matches the service page at %s", (path) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes(path).at(-1)?.routeId).toBe(path);
  });
});
