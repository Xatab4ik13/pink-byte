import { describe, expect, it } from "vitest";
import { navigationActive } from "@/components/pinkbyte/navigation-model";

describe("Navigation location", () => {
  it("does not highlight Projects on the home page", () => {
    expect(navigationActive("/", "", "/#projects")).toBe(false);
  });
  it("highlights Projects only at its home anchor", () => {
    expect(navigationActive("/", "projects", "/#projects")).toBe(true);
    expect(navigationActive("/uslugi/internet-magazin", "projects", "/#projects")).toBe(false);
  });
  it("highlights Services on the shop page", () => {
    expect(navigationActive("/uslugi/internet-magazin", "", "/#services")).toBe(true);
    expect(navigationActive("/", "", "/#services")).toBe(false);
  });
});