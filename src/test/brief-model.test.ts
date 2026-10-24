import { describe, expect, it } from "vitest";
import { BRIEF_PRICE, BRIEF_QUESTIONS, canSubmitAnswer, createBrief } from "@/components/pinkbyte/brief-model";

describe("Mock project brief", () => {
  it("is free for the visitor", () => { expect(BRIEF_PRICE).toBe(0); });
  it("retains every sequential answer in the resulting brief", () => {
    const answers = BRIEF_QUESTIONS.map((_, i) => ({ text: `Ответ клиента ${i}`, files: [] }));
    const result = createBrief(answers);
    answers.forEach(answer => expect(result).toContain(answer.text));
  });
  it("accepts an attached file without a text answer", () => {
    expect(canSubmitAnswer({ text: "", files: ["brand.pdf"] })).toBe(true);
    expect(createBrief([{ text: "", files: ["brand.pdf"] }])).toContain("brand.pdf");
  });
  it("does not advance on an empty answer", () => {
    expect(canSubmitAnswer({ text: "   ", files: [] })).toBe(false);
  });
});