import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { it } from "vitest";

import { routeTree } from "@/routeTree.gen";

it("probe notFound signalling", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
  for (const path of ["/blog", "/blog/stoimost-internet-magazina", "/kakaya-to-stranica"]) {
    const m = router.matchRoutes(path).at(-1) as Record<string, unknown>;
    console.log("PATH", path, "| ROUTEID", m.routeId, "| NOTFOUND", JSON.stringify(m._notFound));
  }
});
