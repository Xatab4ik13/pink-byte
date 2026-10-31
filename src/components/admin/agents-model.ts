export type AgentReview = { id: string; title: string; agent: string; time: string; status: 'pending' | 'approved' | 'returned'; comment: string; body: string; clarification: string; sources: string[] };
export const initialReviews: AgentReview[] = [
  { id: 'proposal', title: 'Магазин декора', agent: 'Подготовка предложений', time: 'Сегодня, 11:30', status: 'pending', comment: '', body: 'Интернет-магазин: каталог, корзина, оплата и доставка.', clarification: 'Количество товаров и необходимые интеграции. Стоимость не согласована.', sources: ['Ответы из ТЗ', 'Условия студии'] },
  { id: 'article', title: 'Материалы для сайта', agent: 'Редактор материалов', time: 'Сегодня, 14:20', status: 'pending', comment: '', body: 'Структура статьи: задача бизнеса, варианты решения, этапы запуска и чек-лист подготовки.', clarification: 'Проверьте факты и формулировки. Источники и окончательный текст требуют согласования.', sources: ['Темы материалов', 'Редакционные требования'] },
];
export type AgentRun = { id: string; agent: string; task: string; state: 'running' | 'done'; result: string; time: string };
export const initialRuns: AgentRun[] = [
  { id: 'lead', agent: 'Разбор заявок', task: 'Корпоративный сайт', state: 'done', result: 'Карточка сделки', time: 'Сегодня, 11:00' },
  { id: 'offer', agent: 'Подготовка предложений', task: 'Магазин декора', state: 'done', result: 'Черновик', time: 'Сегодня, 10:24' },
  { id: 'editor', agent: 'Редактор материалов', task: 'Статья для блога', state: 'running', result: 'Открыть запуск', time: 'Сегодня, 09:17' },
];
export function resolveReview(reviews: AgentReview[], id: string, status: 'approved' | 'returned', comment: string) {
  if (status === 'returned' && !comment.trim()) return reviews;
  return reviews.map(review => review.id === id ? { ...review, status, comment: comment.trim() } : review);
}
export const pendingReviews = (reviews: AgentReview[]) => reviews.filter(review => review.status === 'pending');