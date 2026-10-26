import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useState } from "react";
import { BriefProvider } from "@/components/pinkbyte/BriefProvider";
import { useOpenBrief } from "@/components/pinkbyte/brief-context";

vi.mock("@/components/pinkbyte/BriefDialog", () => ({
  default: function TestDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
    const [answer, setAnswer] = useState("");
    if (!open) return null;
    return <div role="dialog">
      <input aria-label="Test answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
      <button onClick={() => onOpenChange(false)}>Close test dialog</button>
    </div>;
  },
}));

const renderPage = vi.fn();
function Page() {
  renderPage();
  const open = useOpenBrief();
  return <button onClick={open}>Open test brief</button>;
}

afterEach(() => { cleanup(); vi.clearAllMocks(); });

describe("Lightweight brief provider", () => {
  it("preserves dialog state across close and reopen without rerendering the page", async () => {
    render(<BriefProvider><Page /></BriefProvider>);
    expect(screen.queryByRole("dialog")).toBeNull();
    const initialRenders = renderPage.mock.calls.length;
    fireEvent.click(screen.getByRole("button", { name: "Open test brief" }));
    await screen.findByRole("dialog");
    fireEvent.change(screen.getByRole("textbox", { name: "Test answer" }), { target: { value: "Каталог мебели" } });
    fireEvent.click(screen.getByRole("button", { name: "Close test dialog" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Open test brief" }));
    expect(await screen.findByRole("textbox", { name: "Test answer" })).toHaveValue("Каталог мебели");
    expect(renderPage.mock.calls.length).toBe(initialRenders);
  });
});