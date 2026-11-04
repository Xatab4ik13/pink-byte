import whatsappIcon from "@/assets/whatsapp-icon.webp.asset.json";
import telegramIcon from "@/assets/telegram-icon.webp.asset.json";
import maxIcon from "@/assets/max-icon.webp.asset.json";
import mailIcon from "@/assets/mail-icon.webp.asset.json";

const PHONE_DIGITS = "79992167676";
export const PHONE_LABEL = "+7 (999) 216-76-76";
export const PHONE_HREF = `tel:+${PHONE_DIGITS}`;
export const EMAIL = "info@pinkbyte.pro";

export const MAX_CHAT =
  "https://max.ru/u/f9LHodD0cOLBwIyoEd-ExnzQMqCzTx9VtKyn2HKENvXJMpsSyVQZz6EjQ4s";

export const CHANNELS = [
  { name: "WhatsApp", icon: whatsappIcon, href: `https://wa.me/${PHONE_DIGITS}` },
  { name: "Telegram", icon: telegramIcon, href: "https://t.me/pinkbyt" },
  { name: "MAX", icon: maxIcon, href: MAX_CHAT },
  { name: "Почта", icon: mailIcon, href: `mailto:${EMAIL}` },
];

export const COMPANY_SHORT = "ИП Смирнов К. Б.";
export const INN = "772570384204";
export const OGRNIP = "326774600300980";

export const REQUISITES: { label: string; value: string }[] = [
  { label: "Организация", value: "Индивидуальный предприниматель Смирнов Константин Борисович" },
  { label: "Юридический адрес", value: "115487, Россия, г. Москва, ул. Садовники, д. 9, кв. 28" },
  { label: "ИНН", value: INN },
  { label: "ОГРНИП", value: OGRNIP },
  { label: "Расчётный счёт", value: "40802810400009583370" },
  { label: "Банк", value: "АО «ТБанк»" },
  { label: "ИНН банка", value: "7710140679" },
  { label: "БИК банка", value: "044525974" },
  { label: "Корр. счёт", value: "30101810145250000974" },
  { label: "Адрес банка", value: "127287, г. Москва, ул. Хуторская 2-я, д. 38А, стр. 26" },
  { label: "Почта", value: EMAIL },
];
