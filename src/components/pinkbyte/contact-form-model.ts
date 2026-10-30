import { z } from "zod";

export const contactRequestSchema = z.object({
  name: z.string().trim().min(2).max(120),
  contact: z.string().trim().min(5).max(254),
  service: z.string().trim().max(120).default(""),
  about: z.string().trim().min(10).max(4000),
  files: z.array(z.string().trim().max(255)).max(12).default([]),
  consent: z.literal(true),
});

export type ContactRequest = z.infer<typeof contactRequestSchema>;
