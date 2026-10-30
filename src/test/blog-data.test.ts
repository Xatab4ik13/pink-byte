import { describe, expect, it } from "vitest";
import { BLOG_POSTS, filterPosts, postBySlug } from "@/components/pinkbyte/blog-data";

describe("Blog publication rules", () => {
  it("publishes exactly ten new articles", () => {
    expect(BLOG_POSTS).toHaveLength(10);
    expect(new Set(BLOG_POSTS.map((post) => post.slug)).size).toBe(10);
  });
  it("supports all four services", () => {
    expect([...new Set(BLOG_POSTS.map((post) => post.service))].sort()).toEqual([
      "/uslugi/crm-sistema", "/uslugi/internet-magazin", "/uslugi/korporativny-sait", "/uslugi/mobilnoe-prilozhenie",
    ]);
  });
  it.each(["stoimost-internet-magazina", "chto-podgotovit-pered-razrabotkoj-sajta", "gotovaya-crm-ili-svoya", "kak-podgotovit-prilozhenie-k-publikacii", "chto-dolzhno-byt-v-tehnicheskom-zadanii", "peredacha-sajta-posle-zapuska"])("keeps removed article %s unpublished", (slug) => {
    expect(postBySlug(slug)).toBeUndefined();
  });
  it("combines topic filtering and search", () => {
    expect(filterPosts("CRM", "интеграции").map((post) => post.slug)).toEqual(["integracii-crm-karta-dannyh"]);
    expect(filterPosts("Сайты", "CRM")).toHaveLength(0);
    expect(filterPosts("Все статьи", "   MVP  ").map((post) => post.slug)).toEqual(["mvp-mobilnogo-prilozheniya"]);
  });
});