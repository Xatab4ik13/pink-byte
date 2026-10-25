import shop from "@/assets/service-rusdoors.webp.asset.json";
import corporate from "@/assets/service-lsystems.webp.asset.json";
import crm from "@/assets/service-crm.webp.asset.json";
import app from "@/assets/service-app.webp.asset.json";

export const SERVICES = [
  {
    id: "shop", label: "Интернет-магазин", keyword: "Разработка интернет-магазинов",
    title: "От первого выбора до заказа.",
    text: "Создаём интернет-магазины с понятным каталогом и удобным оформлением заказа. Продумываем путь покупателя, дизайн и управление товарами. Состав функций и интеграций определяем под вашу торговлю, чтобы магазин был удобен и клиентам, и вашей команде.",
    image: shop.url, project: "RUSDOORS", source: "https://rusdoors.su/", device: "tablet", concept: false,
  },
  {
    id: "corporate", label: "Корпоративный сайт", keyword: "Создание корпоративных сайтов",
    title: "Ваш бизнес, понятно и убедительно.",
    text: "Разрабатываем корпоративные сайты, которые знакомят с компанией, раскрывают услуги и помогают обратиться к вам. Выстраиваем структуру, проектируем интерфейс и удобное управление контентом. Вашему бизнесу будет что показать, а посетителю будет проще сделать следующий шаг.",
    image: corporate.url, project: "Лазерные системы", source: "https://www.lsystems.ru/", device: "laptop", concept: false,
  },
  {
    id: "crm", label: "CRM-система", keyword: "Разработка CRM-систем",
    title: "Ваши процессы. Одна система.",
    text: "Разрабатываем CRM под процессы вашей компании, а не наоборот. Объединяем работу с клиентами, сделками и задачами в понятном интерфейсе. Начинаем с того, как работает команда, затем определяем логику системы и нужные связи с другими сервисами.",
    image: crm.url, project: "CRM", device: "desktop", concept: true,
  },
  {
    id: "app", label: "Мобильное приложение", keyword: "Разработка мобильных приложений",
    title: "Ваш сервис, всегда под рукой.",
    text: "Создаём мобильные приложения под задачи бизнеса и привычки пользователей. Продумываем ключевые сценарии, проектируем экраны и логику взаимодействия. Вместе определяем функции первой версии, чтобы начать с главного и развивать продукт дальше.",
    image: app.url, project: "Мобильное приложение", device: "phone", concept: true,
  },
] as const;

export type ServiceDevice = typeof SERVICES[number]["device"];