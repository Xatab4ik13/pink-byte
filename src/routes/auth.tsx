import { useState, type FormEvent } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/pinkbyte/primitives';
import adminCss from '@/components/admin/admin.css?url';

export const Route = createFileRoute('/auth')({
  validateSearch: (search: Record<string, unknown>): { denied?: 1 } => (search['denied'] ? { denied: 1 } : {}),
  head: () => ({
    meta: [
      { title: 'Вход · Pink Byte CRM' },
      { name: 'description', content: 'Вход в рабочее пространство Pink Byte.' },
      { property: 'og:title', content: 'Вход · Pink Byte CRM' },
      { property: 'og:description', content: 'Вход в рабочее пространство Pink Byte.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
    links: [{ rel: 'stylesheet', href: adminCss }],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { denied } = Route.useSearch();
  const navigate = useNavigate();
  const [error, setError] = useState(denied ? 'У этого аккаунта нет доступа к CRM.' : '');
  const [busy, setBusy] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setBusy(true); setError('');
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: String(data.get('email')).trim(), password: String(data.get('password')) });
    setBusy(false);
    if (signInError) { setError('Неверная почта или пароль.'); return; }
    navigate({ to: '/admin', search: { section: 'today' }, replace: true });
  };
  return <main className="crm-app crm-auth">
    <form className="crm-auth-card" method="post" action="/auth" onSubmit={submit}>
      <Logo tone="dark" />
      <h1>Вход в CRM</h1>
      <label className="crm-field">Почта<input name="email" type="email" autoComplete="email" required maxLength={255} /></label>
      <label className="crm-field">Пароль<input name="password" type="password" autoComplete="current-password" required maxLength={128} /></label>
      {error && <p className="crm-auth-error" role="alert">{error}</p>}
      <Button type="submit" className="crm-button" disabled={busy}>{busy ? 'Входим…' : 'Войти'}</Button>
    </form>
  </main>;
}
