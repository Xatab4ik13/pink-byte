import { describe, expect, it } from "vitest";
import { contactRequestSchema } from "../components/pinkbyte/contact-form-model";

const request = {
  name: "Андрей",
  contact: "+7 999 000-00-00",
  service: "Корпоративный сайт",
  about: "Нужен сайт для студии с портфолио и заявками",
  files: [],
  consent: true,
};

describe("contact form rules", () => {
  it("accepts a complete request", () => {
    expect(contactRequestSchema.safeParse(request).success).toBe(true);
  });
  it("requires explicit personal data consent", () => {
    expect(contactRequestSchema.safeParse({ ...request, consent: false }).success).toBe(false);
  });
  it("requires a name", () => {
    expect(contactRequestSchema.safeParse({ ...request, name: "" }).success).toBe(false);
  });
  it("requires a reachable contact", () => {
    expect(contactRequestSchema.safeParse({ ...request, contact: "a" }).success).toBe(false);
  });
  it("requires a task description", () => {
    expect(contactRequestSchema.safeParse({ ...request, about: "корот" }).success).toBe(false);
  });
  it("leaves the service optional", () => {
    expect(contactRequestSchema.safeParse({ ...request, service: "" }).success).toBe(true);
  });
});
