import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BriefContext, useOpenBrief } from "@/components/pinkbyte/brief-context";

function Consumer() {
  const open = useOpenBrief();
  return <button onClick={open}>Open brief</button>;
}

describe("Brief context", () => {
  it("keeps the consumer connected when the provider rerenders", () => {
    const first = vi.fn();
    const next = vi.fn();
    const view = render(<BriefContext.Provider value={first}><Consumer /></BriefContext.Provider>);
    fireEvent.click(screen.getByRole("button", { name: "Open brief" }));
    expect(first).toHaveBeenCalledTimes(1);
    view.rerender(<BriefContext.Provider value={next}><Consumer /></BriefContext.Provider>);
    fireEvent.click(screen.getByRole("button", { name: "Open brief" }));
    expect(next).toHaveBeenCalledTimes(1);
    view.unmount();
  });
});