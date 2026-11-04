import { describe, expect, it } from "vitest";
import { contactRequestSchema } from "./contact-request-model";

describe("contact request", () => {
  it("rejects a request without consent", () => {
    expect(contactRequestSchema.safeParse({ name: "Анна", contact: "+79990000000", consent: false }).success).toBe(false);
  });
  it("accepts name, contact and consent", () => {
    expect(contactRequestSchema.safeParse({ name: "Анна", contact: "+79990000000", consent: true }).success).toBe(true);
  });
});
