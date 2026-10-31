export const projectInfo = { name: 'Магазин света', type: 'Интернет-магазин', deadline: '6 ноября', cost: 60000 };
export const projectStages = [
  { name: 'Дизайн', note: 'Макеты согласованы' }, { name: 'Разработка', note: 'Каталог и корзина' },
  { name: 'Проверка', note: 'Функции и адаптив' }, { name: 'Передача', note: 'Код и обучение' },
];
export const taskStatuses = ['В работе', 'К выполнению', 'На проверке', 'Готово'];
export type ProjectTask = { id: string; name: string; status: string; owner: string; due: string; done: boolean };
export const projectTasks: ProjectTask[] = [
  { id: 'catalog', name: 'Настроить каталог и фильтры', status: 'В работе', owner: 'Разработчик', due: '2 ноября', done: false },
  { id: 'payment', name: 'Подключить оплату и доставку', status: 'К выполнению', owner: 'Разработчик', due: '3 ноября', done: false },
  { id: 'mobile', name: 'Проверить мобильную версию', status: 'На проверке', owner: 'Дизайнер', due: '4 ноября', done: false },
];
export type ProjectMaterial = { id: string; name: string; description: string; kind: string; approved: boolean };
export const projectMaterials: ProjectMaterial[] = [
  { id: 'brief', name: 'Техническое задание.pdf', description: 'Документ, 1,2 МБ', kind: 'Документ', approved: true },
  { id: 'design', name: 'Макеты интерфейса', description: 'Ссылка на дизайн', kind: 'Ссылка', approved: false },
  { id: 'client', name: 'Материалы клиента', description: 'Фотографии и описания', kind: 'Папка', approved: false },
];
export const handoverItems = [
  { name: 'Исходный код', note: 'Передача исходного кода проекта' }, { name: 'Доступы', note: 'Передача доступов к хостингу и сервисам' },
  { name: 'Инструкция', note: 'Документация по управлению сайтом' }, { name: 'Обучение', note: 'Проведение обучения для команды клиента' },
];
export const paymentPlan = [{ id: 'advance', name: 'Аванс', amount: 30000, paid: true }, { id: 'acceptance', name: 'После приёмки', amount: 30000, paid: false }];
export function projectBalance(plan: typeof paymentPlan) {
  const received = plan.filter(payment => payment.paid).reduce((total, payment) => total + payment.amount, 0);
  return { received, remaining: projectInfo.cost - received };
}
export function toggleProjectTask(tasks: ProjectTask[], id: string) {
  return tasks.map(task => task.id === id ? { ...task, done: !task.done, status: task.done ? 'К выполнению' : 'Готово' } : task);
}