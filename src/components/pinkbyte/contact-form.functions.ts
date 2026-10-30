import { createServerFn } from "@tanstack/react-start";
import { contactRequestSchema } from "./contact-form-model";

export const submitContactRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactRequestSchema.parse(input))
  .handler(async ({ data }) => {
    const { getDbClient } = await import("./db.server");
    const { error } = await getDbClient()
      .from("contact_submissions")
      .insert({
        name: data.name,
        contact: data.contact,
        service: data.service || null,
        about: data.about,
        files: data.files,
        consent: true,
      });
    if (error) throw new Error("Не удалось отправить заявку. Попробуйте ещё раз.");
    return true;
  });
