import { describe, expect, it } from 'vitest';
import { paymentPlan, projectBalance, projectInfo, projectTasks, toggleProjectTask } from '@/components/admin/project-model';

describe('CRM project mock', () => {
  it('matches the reference project price and received advance', () => {
    expect(projectInfo.cost).toBe(60000);
    expect(projectBalance(paymentPlan)).toEqual({ received: 30000, remaining: 30000 });
  });
  it('updates the balance after the second payment', () => {
    expect(projectBalance(paymentPlan.map(item => ({ ...item, paid: true })))).toEqual({ received: 60000, remaining: 0 });
  });
  it('completes the selected task without modifying another task', () => {
    const tasks = toggleProjectTask(projectTasks, 'catalog');
    expect(tasks[0]).toMatchObject({ done: true, status: 'Готово' });
    expect(tasks[1]).toEqual(projectTasks[1]);
    expect(projectTasks[0]?.done).toBe(false);
  });
  it('returns a completed task to the pending state', () => {
    const tasks = toggleProjectTask(toggleProjectTask(projectTasks, 'catalog'), 'catalog');
    expect(tasks[0]).toMatchObject({ done: false, status: 'К выполнению' });
  });
});