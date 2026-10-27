import { describe, expect, it } from "vitest";
import { CORPORATE_OFFER } from "@/components/pinkbyte/corporate-data";

describe("Corporate website offer", () => {
  it("starts at 30 000 rubles", () => { expect(CORPORATE_OFFER.priceFrom).toBe(30000); });
  it("includes at least 5 pages", () => { expect(CORPORATE_OFFER.pagesFrom).toBe(5); });
  it("starts at 8 working days", () => { expect(CORPORATE_OFFER.workingDaysFrom).toBe(8); });
  it("includes one month of support", () => { expect(CORPORATE_OFFER.supportMonths).toBe(1); });
  it("hands over source code", () => { expect(CORPORATE_OFFER.sourceCodeIncluded).toBe(true); });
  it("includes site training", () => { expect(CORPORATE_OFFER.trainingIncluded).toBe(true); });
  it("uses materials supplied by the customer", () => { expect(CORPORATE_OFFER.materialsProvidedBy).toBe("customer"); });
});