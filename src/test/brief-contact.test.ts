import { describe, expect, it } from "vitest";
import { briefContactSchema, canDownloadBrief } from "../components/pinkbyte/brief-contact-model";

const contact = {
  name: "Андрей",
  email: "test@example.ru",
  phone: "",
  consent: true,
  brief: "Черновик технического задания для проекта",
};
describe("brief completion rules", () => {
  it("requires a name", () => {
    expect(briefContactSchema.safeParse({ ...contact, name: "" }).success).toBe(false);
  });
  it("requires a valid email", () => {
    expect(briefContactSchema.safeParse({ ...contact, email: "invalid" }).success).toBe(false);
  });
  it("allows an optional phone", () => {
    expect(briefContactSchema.safeParse(contact).success).toBe(true);
  });
  it("requires explicit personal data consent", () => {
    expect(briefContactSchema.safeParse({ ...contact, consent: false }).success).toBe(false);
  });
  it("keeps downloading locked until saved", () => {
    expect(canDownloadBrief(false, true)).toBe(false);
    expect(canDownloadBrief(true, true)).toBe(true);
  });
  it("keeps downloading locked without consent", () => {
    expect(canDownloadBrief(true, false)).toBe(false);
  });
});
