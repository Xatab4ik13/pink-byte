// Sends a Yandex Metrica goal; silently does nothing where the counter is not loaded.
export function reachGoal(goal: string) {
  if (typeof window === "undefined") return;
  const ym = (window as unknown as { ym?: (...args: unknown[]) => void }).ym;
  try { ym?.(113930699, "reachGoal", goal); } catch { /* ignore */ }
}
