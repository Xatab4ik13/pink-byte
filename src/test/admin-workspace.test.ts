import { describe, expect, it } from 'vitest';
import { adminSections, parseAdminSection, outstandingAmount } from '@/components/admin/workspace-model';
describe('mock workspace', () => {
  it.each(adminSections)('opens section %s', section => { expect(parseAdminSection(section)).toBe(section); });
  it('falls back for an unknown section', () => { expect(parseAdminSection('unknown')).toBe('today'); });
  it('excludes received payments from outstanding balance', () => { expect(outstandingAmount([{ project: 'A', amount: 30000, note: '', paid: false }, { project: 'B', amount: 25000, note: '', paid: true }])).toBe(30000); });
});