import { createServerFn } from "@tanstack/react-start";
import { briefContactSchema } from "./brief-contact-model";

export const submitBriefContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => briefContactSchema.parse(input))
  .handler(async ({ data }) => {
    const { getDbClient } = await import("./db.server");
    const { data: row, error } = await getDbClient()
      .from("brief_submissions")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        brief: data.brief,
        consent_version: "2026-10-24",
      })
      .select("id")
      .single();
    if (error || !row) throw new Error("Не удалось отправить заявку. Попробуйте ещё раз.");
    return { id: row.id };
  });
