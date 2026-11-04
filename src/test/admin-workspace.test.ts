import { describe, expect, it } from 'vitest';
import { adminSections, parseAdminSection, outstandingAmount, sortTasks, taskHorizon, type WorkspaceTask } from '@/components/admin/workspace-model';
import { initialTasks } from '@/components/admin/mock-data';
const task = (patch: Partial<WorkspaceTask>): WorkspaceTask => ({ id: 1, title: '', description: '', project: '', due: 'Сегодня', tone: 'neutral', done: false, owner: 'Андрей', ...patch });
describe('mock workspace', () => {
  it.each(adminSections)('opens section %s', section => { expect(parseAdminSection(section)).toBe(section); });
  it('falls back for an unknown section', () => { expect(parseAdminSection('unknown')).toBe('today'); });
  it('excludes received payments from outstanding balance', () => { expect(outstandingAmount([{ project: 'A', amount: 30000, note: '', paid: false }, { project: 'B', amount: 25000, note: '', paid: true }])).toBe(30000); });
  it('splits task due dates into horizons', () => {
    expect(taskHorizon(task({ due: 'Просрочено' }))).toBe('overdue');
    expect(taskHorizon(task({ due: 'Сегодня, 11:00' }))).toBe('today');
    expect(taskHorizon(task({ due: '2 ноября' }))).toBe('week');
    expect(taskHorizon(task({ due: '12 ноября' }))).toBe('later');
  });
  it('puts the overdue task first and the far deadline last', () => {
    const sorted = sortTasks(initialTasks);
    expect(sorted[0]?.title).toBe('Проверить формы обращений');
    expect(sorted[sorted.length - 1]?.title).toBe('Проверить оплату');
  });
  it('keeps finished tasks below open ones even when overdue', () => {
    const sorted = sortTasks([task({ id: 1, due: 'Просрочено', done: true }), task({ id: 2, due: '12 ноября' })]);
    expect(sorted.map(item => item.id)).toEqual([2, 1]);
  });
});
