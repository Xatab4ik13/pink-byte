import { createContext, useContext } from "react";

// Keep context identity outside the refreshed dialog component module.
export const BriefContext = createContext<(() => void) | null>(null);

export function useOpenBrief() {
  const open = useContext(BriefContext);
  if (!open) throw new Error("BriefProvider is required");
  return open;
}