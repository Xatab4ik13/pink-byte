import { z } from "zod";

export const briefContactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z
    .string()
    .trim()
    .max(40)
    .refine((value) => !value || /^[+\d\s()\-]{7,40}$/.test(value)),
  consent: z.literal(true),
  brief: z.string().min(20).max(30000),
});

export function canDownloadBrief(saved: boolean, consent: boolean) {
  return saved && consent;
}
