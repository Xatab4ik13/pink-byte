import { describe, expect, it } from "vitest";
import { AGENT_LIMITS, agentRequestSchema, parseAgentReply } from "@/components/pinkbyte/brief-agent-model";

describe("brief agent", () => {
  it("rejects more than 20 client messages", () => {
    const messages = Array.from({ length: 21 }, () => ({ role: "user" as const, content: "текст" }));
    expect(agentRequestSchema.safeParse({ messages }).success).toBe(false);
    expect(agentRequestSchema.safeParse({ messages: messages.slice(0, 20) }).success).toBe(true);
  });
  it("rejects a client message longer than 2000 characters", () => {
    const messages = [{ role: "user" as const, content: "а".repeat(AGENT_LIMITS.maxMessageChars + 1) }];
    expect(agentRequestSchema.safeParse({ messages }).success).toBe(false);
  });
  it("does not finish without a brief and caps progress at 95 until done", () => {
    expect(parseAgentReply('{"reply":"Ок","progress":100,"done":true,"brief":null}')).toMatchObject({ done: false, progress: 95 });
  });
  it("finishes at 100 with a brief, even inside a code fence", () => {
    const raw = '```json\n{"reply":"Готово","progress":80,"done":true,"brief":"# Черновик технического задания\\nЦель"}\n```';
    expect(parseAgentReply(raw)).toMatchObject({ done: true, progress: 100 });
  });
  it("returns null for non-JSON output", () => {
    expect(parseAgentReply("привет")).toBeNull();
  });
});
