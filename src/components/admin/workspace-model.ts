export const adminSections = ['today', 'sales', 'project', 'tasks', 'clients', 'finance', 'agents', 'content', 'settings'] as const;
export type AdminSection = typeof adminSections[number];
export const sectionLabels: Record<AdminSection, string> = { today: 'Дашборд', sales: 'Продажи', project: 'Проекты', tasks: 'Задачи', clients: 'Клиенты', finance: 'Финансы', agents: 'Агенты', content: 'Контент сайта', settings: 'Настройки' };
export const parseAdminSection = (value: unknown): AdminSection => adminSections.find(section => section === value) ?? 'today';
export type WorkspaceTask = { id: number; title: string; description: string; project: string; due: string; tone: string; done: boolean; owner: string };
export type WorkspacePayment = { project: string; amount: number; note: string; paid: boolean };
export const outstandingAmount = (items: WorkspacePayment[]) => items.reduce((sum, item) => sum + (item.paid ? 0 : item.amount), 0);

export const taskOwners = ['Андрей', 'Анна', 'Илья'] as const;
export const WORKSPACE_TODAY = new Date(2026, 9, 30);
const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

export function dueDate(due: string) {
  const match = /^(\d{1,2}) (\S+)/.exec(due);
  if (!match) return null;
  const month = MONTHS.indexOf(match[2]);
  return month < 0 ? null : new Date(2026, month, Number(match[1]));
}

export type TaskHorizon = 'overdue' | 'today' | 'week' | 'later';

export function taskHorizon(task: WorkspaceTask): TaskHorizon {
  if (/просрочен/i.test(task.due)) return 'overdue';
  if (/^(сегодня|завтра)/i.test(task.due)) return 'today';
  const date = dueDate(task.due);
  if (!date) return 'later';
  const days = Math.round((date.getTime() - WORKSPACE_TODAY.getTime()) / 86400000);
  if (days < 0) return 'overdue';
  if (days === 0) return 'today';
  return days <= 7 ? 'week' : 'later';
}

export const isUrgentTask = (task: WorkspaceTask) => ['overdue', 'today'].includes(taskHorizon(task));
export const isOverdueTask = (task: WorkspaceTask) => taskHorizon(task) === 'overdue';

const HORIZON_RANK: Record<TaskHorizon, number> = { overdue: 0, today: 1, week: 2, later: 3 };

export const sortTasks = (tasks: WorkspaceTask[]) => [...tasks].sort((a, b) => Number(a.done) - Number(b.done)
  || HORIZON_RANK[taskHorizon(a)] - HORIZON_RANK[taskHorizon(b)]
  || (dueDate(a.due)?.getTime() ?? 0) - (dueDate(b.due)?.getTime() ?? 0)
  || a.id - b.id);
