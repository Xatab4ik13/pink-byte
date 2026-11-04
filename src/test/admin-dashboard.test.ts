import { describe, expect, it } from 'vitest';
import { paymentPlan, debtAmount, stageCounts, initialLeads, type Lead } from '@/components/admin/dashboard-model';

const lead = (patch: Partial<Lead>): Lead => ({ id: 'x', name: 'X', service: '', source: 'Сайт', kind: 'new', stage: 3, manager: '', note: '', amount: 100000, scheme: '40/40/20', paidParts: 0, contract: true, ...patch });

describe('dashboard payments', () => {
  it('splits 50/50 into two halves', () => { expect(paymentPlan(100000, '50/50')).toEqual([50000, 50000]); });
  it('splits 40/40/20 into three parts', () => { expect(paymentPlan(100000, '40/40/20')).toEqual([40000, 40000, 20000]); });
  it('counts debt after the first 40% part is paid', () => { expect(debtAmount(lead({ paidParts: 1 }))).toBe(60000); });
  it('excludes lost leads from funnel stages', () => { expect(stageCounts(initialLeads).reduce((a, b) => a + b, 0)).toBe(initialLeads.filter(l => !l.lost).length); });
});
