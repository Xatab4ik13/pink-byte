export const salesStages = ['Новые заявки', 'Уточняем задачу', 'Готовим предложение', 'Предложение отправлено', 'Договор и аванс'] as const;
export const salesServices = ['Интернет-магазин', 'Корпоративный сайт', 'CRM-система', 'Мобильное приложение'] as const;
export const salesSources = ['Форма сайта', 'Бесплатное ТЗ', 'Вручную'] as const;
export type Deal = { id: string; name: string; service: string; source: string; budget: number | null; stage: number; action: string; due: string; completed: boolean };
export const initialDeals: Deal[] = [
  { id: 'decor', name: 'Магазин декора', service: salesServices[0], source: salesSources[0], budget: null, stage: 0, action: 'Связаться сегодня', due: 'Сегодня', completed: false },
  { id: 'logistics', name: 'Сайт логистической компании', service: salesServices[1], source: salesSources[1], budget: null, stage: 0, action: 'Проверить ответы', due: 'Сегодня', completed: false },
  { id: 'booking', name: 'Приложение записи', service: salesServices[3], source: salesSources[2], budget: null, stage: 0, action: 'Назначить встречу', due: 'Завтра', completed: false },
  { id: 'service', name: 'CRM сервиса', service: salesServices[2], source: salesSources[1], budget: 90000, stage: 1, action: 'Уточнить интеграции', due: 'Сегодня', completed: false },
  { id: 'clothes', name: 'Магазин одежды', service: salesServices[0], source: salesSources[0], budget: 65000, stage: 1, action: 'Созвон завтра, 12:00', due: 'Завтра', completed: false },
  { id: 'education', name: 'Сайт учебного центра', service: salesServices[1], source: salesSources[2], budget: 50000, stage: 2, action: 'Подготовить предложение', due: 'Завтра', completed: false },
  { id: 'equipment', name: 'Магазин оборудования', service: salesServices[0], source: salesSources[0], budget: 80000, stage: 3, action: '', due: '', completed: false },
  { id: 'procurement', name: 'CRM отдела закупок', service: salesServices[2], source: salesSources[2], budget: 120000, stage: 4, action: 'Проверить поступление аванса', due: 'Завтра', completed: false },
];
export function filterDeals(deals: Deal[], filters: { search: string; service: string; source: string; completed: boolean; missingAction: boolean }) {
  return deals.filter(deal => deal.completed === filters.completed && (!filters.service || deal.service === filters.service) && (!filters.source || deal.source === filters.source) && (!filters.missingAction || !deal.action) && `${deal.name} ${deal.service}`.toLocaleLowerCase('ru').includes(filters.search.toLocaleLowerCase('ru')));
}
export function moveDeal(deals: Deal[], id: string, stage: number) {
  if (!Number.isInteger(stage) || stage < 0 || stage >= salesStages.length) return deals;
  return deals.map(deal => deal.id === id ? { ...deal, stage } : deal);
}