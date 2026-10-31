export const adminSections = ['today', 'sales', 'project', 'tasks', 'clients', 'finance', 'agents', 'content', 'settings'] as const;
export type AdminSection = typeof adminSections[number];
export const sectionLabels: Record<AdminSection, string> = { today: 'Сегодня', sales: 'Продажи', project: 'Проекты', tasks: 'Задачи', clients: 'Клиенты', finance: 'Финансы', agents: 'Агенты', content: 'Контент сайта', settings: 'Настройки' };
export const parseAdminSection = (value: unknown): AdminSection => adminSections.find(section => section === value) ?? 'today';
export type WorkspaceTask = { id: number; title: string; description: string; project: string; due: string; tone: string; done: boolean };
export type WorkspacePayment = { project: string; amount: number; note: string; paid: boolean };
export const outstandingAmount = (items: WorkspacePayment[]) => items.reduce((sum, item) => sum + (item.paid ? 0 : item.amount), 0);