import { z } from "zod";

export const contactRequestSchema = z.object({
  name: z.string().trim().min(1).max(120),
  contact: z.string().trim().min(3).max(254),
  service: z.string().trim().max(120).optional().default(""),
  about: z.string().trim().max(4000).optional().default(""),
  fileNames: z.array(z.string().max(200)).max(20).default([]),
  consent: z.literal(true),
});
