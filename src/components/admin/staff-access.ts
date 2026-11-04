import type { AdminSection } from './workspace-model';

export type StaffRole = 'admin' | 'manager';
export type Staff = { id: string; email: string; name: string; role: StaffRole };

export const roleLabels: Record<StaffRole, string> = { admin: 'Главный админ', manager: 'Менеджер' };

/** Менеджер видит всё, кроме Настроек. */
export function canOpenSection(role: StaffRole, section: AdminSection) {
  return role === 'admin' || section !== 'settings';
}
