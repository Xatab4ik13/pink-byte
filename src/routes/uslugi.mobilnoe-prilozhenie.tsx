import { createFileRoute } from "@tanstack/react-router";
import { ServicePlaceholder, serviceHead } from "@/components/pinkbyte/ServicePlaceholder";
import image from "@/assets/nav-app.webp.asset.json";

export const Route = createFileRoute("/uslugi/mobilnoe-prilozhenie")({
  head: () => serviceHead("Мобильное приложение", "Разработка мобильных приложений в Pink Byte. Страница услуги готовится."),
  component: Page,
});
function Page() { return <ServicePlaceholder title="Мобильное приложение" image={image.url} />; }