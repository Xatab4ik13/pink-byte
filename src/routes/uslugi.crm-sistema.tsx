import { createFileRoute } from "@tanstack/react-router";
import { ServicePlaceholder, serviceHead } from "@/components/pinkbyte/ServicePlaceholder";
import image from "@/assets/nav-crm.webp.asset.json";

export const Route = createFileRoute("/uslugi/crm-sistema")({
  head: () => serviceHead("CRM-система", "Разработка CRM-систем в Pink Byte. Страница услуги готовится."),
  component: Page,
});
function Page() { return <ServicePlaceholder title="CRM-система" image={image.url} />; }