import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouteContext } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Panel } from './AdminToday';
import { roleLabels, type StaffRole } from './staff-access';

type Member = { id: string; email: string; name: string; role: StaffRole };

/** Отдельный клиент без сохранения сессии: регистрация сотрудника не выкидывает админа из аккаунта. */
function signupClient() {
  return createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false, storageKey: 'pb-staff-signup' },
  });
}

export function AdminStaff() {
  const selfId = useRouteContext({ from: '/_authenticated' }).staff.id;
  const [members, setMembers] = useState<Member[]>([]);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const load = useCallback(async () => {
    const [{ data: roles }, { data: profiles }] = await Promise.all([
      supabase.from('user_roles').select('user_id, role'),
      supabase.from('profiles').select('id, email, full_name'),
    ]);
    setMembers((roles ?? []).map(r => {
      const p = profiles?.find(item => item.id === r.user_id);
      return { id: r.user_id, role: r.role, email: p?.email ?? '', name: p?.full_name || p?.email || '' };
    }));
  }, []);
  useEffect(() => { void load(); }, [load]);

  const create = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name')).trim();
    const email = String(data.get('email')).trim().toLowerCase();
    const password = String(data.get('password'));
    const role = String(data.get('role')) as StaffRole;
    if (password.length < 8) { setMessage('Временный пароль: минимум 8 символов.'); return; }
    setBusy(true); setMessage('');
    const { data: signup, error } = await signupClient().auth.signUp({ email, password, options: { data: { full_name: name } } });
    const userId = signup.user?.identities?.length ? signup.user.id : null;
    if (error || !userId) { setBusy(false); setMessage('Не удалось создать аккаунт. Возможно, эта почта уже зарегистрирована.'); return; }
    const { error: roleError } = await supabase.rpc('admin_add_staff', { _user_id: userId, _role: role, _full_name: name });
    setBusy(false);
    if (roleError) { setMessage('Аккаунт создан, но роль не назначена. Попробуйте ещё раз.'); return; }
    form.reset(); setMessage(`Готово: ${email} может войти с временным паролем.`); void load();
  };

  const remove = async (member: Member) => {
    if (!window.confirm(`Закрыть доступ для ${member.email}?`)) return;
    const { error } = await supabase.from('user_roles').delete().eq('user_id', member.id);
    setMessage(error ? 'Не удалось закрыть доступ.' : `Доступ для ${member.email} закрыт.`); void load();
  };

  return <Panel title="Сотрудники">
    <ul className="crm-staff-list">{members.map(m => <li key={`${m.id}-${m.role}`}>
      <span><strong>{m.name}</strong><small>{m.email} · {roleLabels[m.role]}</small></span>
      {m.id !== selfId && <Button variant="outline" size="sm" onClick={() => remove(m)}>Закрыть доступ</Button>}
    </li>)}</ul>
    <form className="crm-create-form" onSubmit={create}>
      <label className="crm-field">Имя<input name="name" required minLength={2} maxLength={80} /></label>
      <label className="crm-field">Почта<input name="email" type="email" required maxLength={255} autoComplete="off" /></label>
      <label className="crm-field">Временный пароль<input name="password" type="text" required minLength={8} maxLength={128} autoComplete="off" /></label>
      <label className="crm-field">Роль<select name="role" defaultValue="manager"><option value="manager">Менеджер</option><option value="admin">Главный админ</option></select></label>
      {message && <p className="crm-subtle" role="status">{message}</p>}
      <Button type="submit" className="crm-button" disabled={busy}>{busy ? 'Создаём…' : 'Добавить сотрудника'}</Button>
    </form>
  </Panel>;
}
