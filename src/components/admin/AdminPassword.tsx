import { useState, type FormEvent } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Panel } from './AdminToday';

export function AdminPassword() {
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const current = String(data.get('current'));
    const next = String(data.get('next'));
    if (next.length < 8) { setMessage('Новый пароль: минимум 8 символов.'); return; }
    if (next !== String(data.get('repeat'))) { setMessage('Пароли не совпадают.'); return; }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: next, current_password: current } as { password: string });
    setBusy(false);
    if (error) { setMessage('Не удалось сменить пароль. Проверьте текущий пароль.'); return; }
    form.reset(); setMessage('Пароль изменён.');
  };
  return <Panel title="Пароль"><form className="crm-create-form" onSubmit={submit}>
    <label className="crm-field">Текущий пароль<input name="current" type="password" autoComplete="current-password" required maxLength={128} /></label>
    <label className="crm-field">Новый пароль<input name="next" type="password" autoComplete="new-password" required minLength={8} maxLength={128} /></label>
    <label className="crm-field">Повторите пароль<input name="repeat" type="password" autoComplete="new-password" required minLength={8} maxLength={128} /></label>
    {message && <p className="crm-subtle" role="status">{message}</p>}
    <Button type="submit" className="crm-button" disabled={busy}>{busy ? 'Сохраняем…' : 'Сменить пароль'}</Button>
  </form></Panel>;
}
