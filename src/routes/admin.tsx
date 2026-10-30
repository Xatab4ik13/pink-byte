import { createFileRoute } from '@tanstack/react-router';
import { AdminApp } from '@/components/admin/AdminApp';
import adminCss from '@/components/admin/admin.css?url';

export const Route = createFileRoute('/admin')({
  validateSearch: (search: Record<string, unknown>): { section: 'today' | 'sales' } => ({ section: search.section === 'sales' ? 'sales' : 'today' }),
  head: ({ match }) => ({
    meta: [
      { title: `${match.search.section === 'sales' ? 'Продажи' : 'Сегодня'} · Pink Byte CRM` },
      { name: 'description', content: 'Рабочее пространство Pink Byte: заявки, проекты, задачи и решения.' },
      { property: 'og:title', content: 'Pink Byte CRM · рабочее пространство' },
      { property: 'og:description', content: 'Проекты, задачи и решения студии Pink Byte.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
    links: [{ rel: 'stylesheet', href: adminCss }],
  }),
  component: AdminApp,
});