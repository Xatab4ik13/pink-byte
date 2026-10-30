import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { it } from "vitest";

import { routeTree } from "@/routeTree.gen";

it("probe notFound signalling", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
  const m = router.matchRoutes("/blog/stoimost-internet-magazina").at(-1) as Record<string, unknown>;
  console.log("KEYS", JSON.stringify(Object.keys(m)));
  console.log("STATUS", m.status, "| ROUTEID", m.routeId, "| PATHNAME", m.pathname, "| FULLPATH", m.fullPath);
});
