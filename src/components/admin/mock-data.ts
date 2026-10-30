export const initialTasks = [
  { id: 1, title: 'Уточнить интеграции', description: 'Обсудить с разработчиком API и сервисы.', project: 'Сайт производства', due: 'Сегодня, 11:00', tone: 'lime', done: false },
  { id: 2, title: 'Согласовать структуру каталога', description: 'Проверить разделы и фильтры.', project: 'Магазин света', due: 'Сегодня, 13:00', tone: 'lime', done: false },
  { id: 3, title: 'Проверить формы обращений', description: 'Протестировать отправку и уведомления.', project: 'Сайт услуг', due: 'Просрочено', tone: 'red', done: false },
  { id: 4, title: 'Проверить коммерческое предложение', description: 'Агент подготовил черновик, нужна проверка.', project: 'Агент подготовил черновик', due: 'Сегодня', tone: 'neutral', done: false },
  { id: 5, title: 'Подготовить материалы к передаче', description: 'Собрать доступы и инструкции.', project: 'Приложение бронирования', due: '2 ноября', tone: 'neutral', done: false },
  { id: 6, title: 'Проверить каталог товаров', description: 'Проверить карточки и изображения.', project: 'Магазин света', due: '3 ноября', tone: 'neutral', done: false },
  { id: 7, title: 'Согласовать главную страницу', description: 'Получить обратную связь.', project: 'Сайт производства', due: '4 ноября', tone: 'neutral', done: false },
  { id: 8, title: 'Проверить мобильную версию', description: 'Проверить формы и навигацию.', project: 'Сайт услуг', due: '5 ноября', tone: 'neutral', done: false },
  { id: 9, title: 'Обсудить следующий этап', description: 'Согласовать задачи.', project: 'CRM отдела продаж', due: '9 ноября', tone: 'neutral', done: false },
  { id: 10, title: 'Подготовить прототип', description: 'Собрать основные сценарии.', project: 'Приложение бронирования', due: '10 ноября', tone: 'neutral', done: false },
  { id: 11, title: 'Обновить документацию', description: 'Описать настройки.', project: 'CRM отдела продаж', due: '11 ноября', tone: 'neutral', done: false },
  { id: 12, title: 'Проверить оплату', description: 'Проверить тестовый сценарий.', project: 'Магазин света', due: '12 ноября', tone: 'neutral', done: false },
];
export const projects = [
  { name: 'Магазин света', type: 'Интернет-магазин', stage: 'Разработка', tone: 'blue', deadline: '6 ноября', owner: 'Разработчик' },
  { name: 'Сайт производства', type: 'Корпоративный сайт', stage: 'Дизайн', tone: 'violet', deadline: '4 ноября', owner: 'Дизайнер' },
  { name: 'CRM отдела продаж', type: 'Внутренний сервис', stage: 'Тестирование', tone: 'yellow', deadline: '10 ноября', owner: 'Разработчик' },
  { name: 'Приложение бронирования', type: 'Веб-приложение', stage: 'Дизайн', tone: 'violet', deadline: '18 ноября', owner: 'Дизайнер' },
];
export const payments = [
  { project: 'Магазин света', amount: 30000, note: 'Остаток по проекту' },
  { project: 'Сайт производства', amount: 25000, note: 'Следующий этап' },
  { project: 'CRM отдела продаж', amount: 30000, note: 'Следующий этап' },
];
export const money = (value: number) => `${value.toLocaleString('ru-RU')} ₽`;