import { lazy, Suspense, useCallback, useEffect, useState, type ReactNode } from "react";
import robot from "@/assets/robot-brief-seated.webp";
import { BriefContext } from "./brief-context";

const loadDialog = () => import("./BriefDialog");
const BriefDialog = lazy(loadDialog);

export function BriefProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const openBrief = useCallback(() => {
    setReady(true);
    setOpen(true);
  }, []);

  useEffect(() => {
    // Warm the dialog after the first paint, not in the site's critical imports.
    const moduleTimer = window.setTimeout(() => { void loadDialog().catch(() => {}); }, 1500);
    const imageTimer = window.setTimeout(() => {
      const image = new Image();
      image.src = robot;
      void image.decode().catch(() => {});
    }, 300);
    return () => {
      window.clearTimeout(moduleTimer);
      window.clearTimeout(imageTimer);
    };
  }, []);

  return (
    <BriefContext.Provider value={openBrief}>
      {children}
      <Suspense fallback={null}>
        {ready && <BriefDialog open={open} onOpenChange={setOpen} />}
      </Suspense>
    </BriefContext.Provider>
  );
}