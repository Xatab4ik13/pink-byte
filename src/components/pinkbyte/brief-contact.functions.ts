import { createServerFn } from "@tanstack/react-start";
import { briefContactSchema } from "./brief-contact-model";
import { contactRequestSchema } from "./contact-request-model";

export const submitBriefContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => briefContactSchema.parse(input))
  .handler(async ({ data }) => {
    const { createPublicDb } = await import("./public-db.server");
    const id = crypto.randomUUID();
    const { error } = await createPublicDb().from("brief_submissions").insert({
      id,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      brief: data.brief,
      consent_version: "2026-10-24",
    });
    if (error) {
      console.error("brief insert failed", error.message);
      throw new Error("Не удалось отправить заявку. Попробуйте ещё раз.");
    }
    return { id };
  });

export const submitContactRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactRequestSchema.parse(input))
  .handler(async ({ data }) => {
    const { createPublicDb } = await import("./public-db.server");
    const id = crypto.randomUUID();
    const { error } = await createPublicDb().from("contact_requests").insert({
      id,
      name: data.name,
      contact: data.contact,
      service: data.service || null,
      about: data.about || null,
      file_names: data.fileNames,
    });
    if (error) {
      console.error("contact insert failed", error.message);
      throw new Error("Не удалось отправить заявку. Попробуйте ещё раз.");
    }
    return { id };
  });
