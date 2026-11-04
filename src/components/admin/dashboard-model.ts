export const funnelStages = ['Новая заявка', 'Переговоры', 'Ждём оплату', 'Разработка', 'Тестирование', 'Закрыт'] as const;
export const leadSources = ['Сайт', 'Фриланс-биржи', 'Telegram', 'Сарафан', 'Реклама'] as const;
export type PaymentScheme = '50/50' | '40/40/20';
export type Lead = {
  id: string; name: string; service: string; source: typeof leadSources[number]; sourceDetail?: string;
  kind: 'new' | 'regular'; stage: number; lost?: boolean; manager: string; note: string;
  amount: number; scheme: PaymentScheme; paidParts: number; contract: boolean;
};

export function paymentPlan(amount: number, scheme: PaymentScheme) {
  const shares = scheme === '50/50' ? [50, 50] : [40, 40, 20];
  return shares.map(share => Math.round(amount * share / 100));
}
export const paidAmount = (lead: Lead) => paymentPlan(lead.amount, lead.scheme).slice(0, lead.paidParts).reduce((a, b) => a + b, 0);
export const debtAmount = (lead: Lead) => lead.amount - paidAmount(lead);
export const stageCounts = (leads: Lead[]) => funnelStages.map((_, index) => leads.filter(lead => !lead.lost && lead.stage === index).length);
export const sourceCounts = (leads: Lead[]) => leadSources.map(source => ({ source, count: leads.filter(lead => lead.source === source).length }));

export const initialLeads: Lead[] = [
  { id: 'decor', name: 'Магазин декора', service: 'Интернет-магазин', source: 'Сайт', kind: 'new', stage: 0, manager: 'Анна', note: 'Заполнила бриф, ждёт звонка.', amount: 0, scheme: '50/50', paidParts: 0, contract: false },
  { id: 'logistics', name: 'Сайт логистики', service: 'Корпоративный сайт', source: 'Фриланс-биржи', sourceDetail: 'Профи.ру', kind: 'new', stage: 0, manager: 'Илья', note: 'Отклик на Профи.ру, просит пример работ.', amount: 0, scheme: '50/50', paidParts: 0, contract: false },
  { id: 'clothes', name: 'Магазин одежды', service: 'Интернет-магазин', source: 'Telegram', kind: 'new', stage: 1, manager: 'Анна', note: 'Сравнивает с Тильдой, отправили кейс Brionilux. Созвон завтра в 12:00.', amount: 65000, scheme: '50/50', paidParts: 0, contract: false },
  { id: 'service', name: 'CRM сервиса', service: 'CRM-система', source: 'Сарафан', kind: 'new', stage: 1, manager: 'Илья', note: 'Нужна интеграция с 1С, уточняют бюджет у директора.', amount: 90000, scheme: '40/40/20', paidParts: 0, contract: false },
  { id: 'education', name: 'Учебный центр', service: 'Корпоративный сайт', source: 'Реклама', kind: 'new', stage: 2, manager: 'Анна', note: 'Договор подписан, счёт на аванс выставлен.', amount: 50000, scheme: '50/50', paidParts: 0, contract: true },
  { id: 'light', name: 'Магазин света', service: 'Интернет-магазин', source: 'Сайт', kind: 'new', stage: 3, manager: 'Илья', note: 'Каталог в работе, согласуем фильтры.', amount: 120000, scheme: '40/40/20', paidParts: 1, contract: true },
  { id: 'factory', name: 'Сайт производства', service: 'Корпоративный сайт', source: 'Сарафан', kind: 'regular', stage: 3, manager: 'Анна', note: 'Постоянный клиент, ведём SEO. Делаем раздел продукции.', amount: 45000, scheme: '50/50', paidParts: 1, contract: true },
  { id: 'booking', name: 'Приложение записи', service: 'Мобильное приложение', source: 'Фриланс-биржи', sourceDetail: 'Kwork', kind: 'new', stage: 4, manager: 'Илья', note: 'Тестируем запись и оплату на iOS.', amount: 180000, scheme: '40/40/20', paidParts: 2, contract: true },
  { id: 'seo', name: 'SEO для CityMebel', service: 'SEO-продвижение', source: 'Сарафан', kind: 'regular', stage: 5, manager: 'Анна', note: 'Ежемесячный отчёт отправлен.', amount: 30000, scheme: '50/50', paidParts: 2, contract: true },
  { id: 'tiles', name: 'Магазин плитки', service: 'Интернет-магазин', source: 'Реклама', kind: 'new', stage: 1, lost: true, manager: 'Илья', note: 'Отказ: выбрали готовую платформу.', amount: 0, scheme: '50/50', paidParts: 0, contract: false },
];
