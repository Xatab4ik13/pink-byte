import { createServerFn } from "@tanstack/react-start";
import {
  AGENT_LIMITS,
  AGENT_SYSTEM_PROMPT,
  agentRequestSchema,
  parseAgentReply,
  userMessageCount,
} from "./brief-agent-model";

const DEFAULT_MODEL = "google/gemini-2.5-flash";

export const askBriefAgent = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => agentRequestSchema.parse(input))
  .handler(async ({ data }) => {
    const key = process.env['OPENROUTER_API_KEY'];
    // No key yet: the dialog falls back to fixed questions.
    if (!key) return { ok: false as const, reason: "not_configured" as const };
    const model = process.env['OPENROUTER_MODEL'] || DEFAULT_MODEL;
    const send = () =>
      fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://pinkbyte.pro",
          "X-Title": "Pink Byte brief",
        },
        body: JSON.stringify({
          model,
          temperature: 0.6,
          max_tokens: 2500,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: AGENT_SYSTEM_PROMPT },
            ...data.messages,
            ...(userMessageCount(data.messages) >= AGENT_LIMITS.maxUserMessages
              ? [{ role: "system", content: "Это последнее сообщение клиента. Заверши бриф сейчас: done: true." }]
              : []),
          ],
        }),
      });
    try {
      let res = await send();
      if (res.status === 429 || res.status >= 500) {
        await new Promise((r) => setTimeout(r, 1200));
        res = await send();
      }
      if (!res.ok) {
        console.error("openrouter error", res.status, (await res.text()).slice(0, 300));
        return { ok: false as const, reason: "error" as const };
      }
      const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      const reply = parseAgentReply(json.choices?.[0]?.message?.content ?? "");
      if (!reply) return { ok: false as const, reason: "error" as const };
      return { ok: true as const, reply };
    } catch (error) {
      console.error("openrouter request failed", error);
      return { ok: false as const, reason: "error" as const };
    }
  });
