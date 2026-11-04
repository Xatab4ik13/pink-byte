import { describe, expect, it } from 'vitest';
import { canOpenSection } from './staff-access';

describe('staff access', () => {
  it('manager cannot open settings', () => expect(canOpenSection('manager', 'settings')).toBe(false));
  it('manager opens finance', () => expect(canOpenSection('manager', 'finance')).toBe(true));
  it('admin opens settings', () => expect(canOpenSection('admin', 'settings')).toBe(true));
});
