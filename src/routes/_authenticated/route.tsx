import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';
import type { StaffRole } from '@/components/admin/staff-access';

export const Route = createFileRoute('/_authenticated')({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) throw redirect({ to: '/auth' });
    const [{ data: roles }, { data: profile }] = await Promise.all([
      supabase.from('user_roles').select('role').eq('user_id', data.user.id),
      supabase.from('profiles').select('full_name').eq('id', data.user.id).maybeSingle(),
    ]);
    const role: StaffRole | null = roles?.some(r => r.role === 'admin') ? 'admin' : roles?.some(r => r.role === 'manager') ? 'manager' : null;
    if (!role) {
      await supabase.auth.signOut();
      throw redirect({ to: '/auth', search: { denied: 1 } });
    }
    return { staff: { id: data.user.id, email: data.user.email ?? '', name: profile?.full_name || data.user.email || '', role } };
  },
  component: () => <Outlet />,
});
