import { useEffect, type RefObject } from "react";

// Geometry belongs on the dialog itself, avoiding React updates while the keyboard animates.
export function useBriefViewport(open: boolean, dialog: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (!open) return;
    const viewport = window.visualViewport;
    const update = () => {
      const element = dialog.current;
      if (!element) return;
      element.style.setProperty("--brief-viewport-height", `${viewport?.height ?? window.innerHeight}px`);
      element.style.setProperty("--brief-viewport-top", `${viewport?.offsetTop ?? 0}px`);
    };
    update();
    viewport?.addEventListener("resize", update);
    viewport?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      viewport?.removeEventListener("resize", update);
      viewport?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      dialog.current?.style.removeProperty("--brief-viewport-height");
      dialog.current?.style.removeProperty("--brief-viewport-top");
    };
  }, [open, dialog]);
}