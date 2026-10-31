import { describe, expect, it } from 'vitest';
import { filterDeals, initialDeals, moveDeal } from '@/components/admin/sales-model';

describe('CRM mock sales', () => {
  it('starts with eight open deals from the reference', () => {
    expect(initialDeals.filter(deal => !deal.completed)).toHaveLength(8);
    expect(initialDeals.filter(deal => deal.stage === 0)).toHaveLength(3);
  });
  it('finds the one deal without a next action', () => {
    const result = filterDeals(initialDeals, { search: '', service: '', source: '', completed: false, missingAction: true });
    expect(result.map(deal => deal.name)).toEqual(['Магазин оборудования']);
  });
  it('moves only the selected deal without changing its budget', () => {
    const result = moveDeal(initialDeals, 'service', 2);
    expect(result.find(deal => deal.id === 'service')).toMatchObject({ stage: 2, budget: 90000 });
    expect(result.find(deal => deal.id === 'decor')?.stage).toBe(0);
    expect(initialDeals.find(deal => deal.id === 'service')?.stage).toBe(1);
  });
  it('rejects stages outside the five reference columns', () => {
    expect(moveDeal(initialDeals, 'service', 5)).toBe(initialDeals);
  });
  it('combines name, service and source filters', () => {
    expect(filterDeals(initialDeals, { search: 'магазин', service: 'Интернет-магазин', source: 'Форма сайта', completed: false, missingAction: false }).map(deal => deal.id)).toEqual(['decor', 'clothes', 'equipment']);
  });
});