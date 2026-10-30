import { useRef } from "react";
import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { useBriefViewport } from "@/components/pinkbyte/use-brief-viewport";

function Window({ open }: { open: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useBriefViewport(open, ref);
  return <div ref={ref} data-testid="viewport" />;
}

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

it("follows the visible viewport when the keyboard opens and pans, and removes listeners on close", () => {
  const viewport = Object.assign(new EventTarget(), { height: 844, offsetTop: 0 });
  vi.stubGlobal("visualViewport", viewport);
  const { rerender } = render(<Window open />);
  const element = screen.getByTestId("viewport");
  expect(element.style.getPropertyValue("--brief-viewport-height")).toBe("844px");
  act(() => {
    viewport.height = 420;
    viewport.dispatchEvent(new Event("resize"));
    viewport.offsetTop = 35;
    viewport.dispatchEvent(new Event("scroll"));
  });
  expect(element.style.getPropertyValue("--brief-viewport-height")).toBe("420px");
  expect(element.style.getPropertyValue("--brief-viewport-top")).toBe("35px");
  rerender(<Window open={false} />);
  act(() => { viewport.height = 844; viewport.dispatchEvent(new Event("resize")); });
  expect(element.style.getPropertyValue("--brief-viewport-height")).toBe("");
});