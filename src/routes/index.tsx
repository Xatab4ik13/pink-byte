import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/pinkbyte/Hero";
import { Projects } from "@/components/pinkbyte/Projects";
import { Services } from "@/components/pinkbyte/Services";
import { Contact, Footer } from "@/components/pinkbyte/Closing";
import { StudioSections } from "@/components/pinkbyte/StudioSections";

const TITLE = "Pink Byte · разработка сайтов и веб-сервисов";
const DESC =
  "Проектируем и разрабатываем сайты, личные кабинеты, CRM и веб-сервисы для бизнеса. Обсудите свой проект с командой Pink Byte.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <main>
        <Projects />
        <Services />
        <StudioSections />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
