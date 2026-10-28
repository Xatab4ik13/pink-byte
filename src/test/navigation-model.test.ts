import { describe, expect, it } from "vitest";
import { navigationActive, navigationTarget } from "@/components/pinkbyte/navigation-model";

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
  it("links About to its page instead of home", () => {
    expect(navigationTarget("/o-kompanii")).toEqual({ to: "/o-kompanii", hash: "" });
  });
  it("links Blog to its page instead of home", () => {
    expect(navigationTarget("/blog")).toEqual({ to: "/blog", hash: "" });
  });
  it("keeps anchor items on the home page", () => {
    expect(navigationTarget("/#projects")).toEqual({ to: "/", hash: "projects" });
    expect(navigationTarget("/#contact")).toEqual({ to: "/", hash: "contact" });
  });
});