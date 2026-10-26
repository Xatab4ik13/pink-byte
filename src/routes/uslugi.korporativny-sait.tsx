import { createFileRoute } from "@tanstack/react-router";
import { ServicePlaceholder, serviceHead } from "@/components/pinkbyte/ServicePlaceholder";
import image from "@/assets/nav-corporate.webp.asset.json";

export const Route = createFileRoute("/uslugi/korporativny-sait")({
  head: () => serviceHead("Корпоративный сайт", "Разработка корпоративных сайтов в Pink Byte. Страница услуги готовится."),
  component: Page,
});
function Page() { return <ServicePlaceholder title="Корпоративный сайт" image={image.url} />; }