import { useState, type FormEvent } from 'react';
import { Link, useSearch } from '@tanstack/react-router';
import { Bell, Bot, CalendarDays, ChartNoAxesColumnIncreasing, Check, ChevronRight, Coins, FileText, Folder, ListChecks, MoreHorizontal, Plus, Search, Settings, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Logo } from '@/components/pinkbyte/primitives';
import { AdminToday } from './AdminToday';
import { AdminSales } from './AdminSales';
import { AdminProject } from './AdminProject';
import { AdminAgents } from './AdminAgents';
import { AgentReview } from './AgentReview';
import { AdminOperations } from './AdminOperations';
import { initialTasks, payments as initialPayments } from './mock-data';
import { sectionLabels, type AdminSection, type WorkspaceTask } from './workspace-model';
import { initialReviews, pendingReviews, resolveReview } from './agents-model';

const navigation: { label: string; icon: typeof Folder; section: AdminSection }[] = [
  { label: 'Сегодня', icon: CalendarDays, section: 'today' }, { label: 'Продажи', icon: ChartNoAxesColumnIncreasing, section: 'sales' },
  { label: 'Проекты', icon: Folder, section: 'project' }, { label: 'Задачи', icon: ListChecks, section: 'tasks' },
  { label: 'Клиенты', icon: Users, section: 'clients' }, { label: 'Финансы', icon: Coins, section: 'finance' }, { label: 'Агенты', icon: Bot, section: 'agents' },
  { label: 'Контент сайта', icon: FileText, section: 'content' }, { label: 'Настройки', icon: Settings, section: 'settings' },
];
export function AdminApp() {
  const { section } = useSearch({ from: '/admin' });
  const isSales = section === 'sales';
  const isProject = section === 'project';
  const isAgents = section === 'agents';
  const [reviews, setReviews] = useState(initialReviews);
  const [selectedReview, setSelectedReview] = useState<string | null>(null);
  const [agentCreate, setAgentCreate] = useState(0);
  const reviewCount = pendingReviews(reviews).length;
  const currentReview = reviews.find(review => review.id === selectedReview);
  const activeLabel = sectionLabels[section];
  const [tasks, setTasks] = useState<WorkspaceTask[]>(initialTasks);
  const [payments, setPayments] = useState(initialPayments.map(item => ({ ...item, paid: false })));
  const isOperations = !['today', 'sales', 'project', 'agents'].includes(section);
  const [projectCreate, setProjectCreate] = useState(0);
  const [salesCreate, setSalesCreate] = useState(0);
  const [search, setSearch] = useState('');
  const [dialog, setDialog] = useState<'create' | 'review' | 'more' | null>(null);
  const [notifications, setNotifications] = useState(false);
  const [notice, setNotice] = useState('');
  const [created, setCreated] = useState<string[]>([]);
  const notify = (message: string) => setNotice(message);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = String(new FormData(event.currentTarget).get('title') ?? '').trim();
    if (!title) return;
    const data = new FormData(event.currentTarget);
    setTasks(current => [...current, { id: Math.max(0, ...current.map(item => item.id)) + 1, title, description: '', project: String(data.get('project') ?? ''), due: String(data.get('date') ?? '') || 'Без срока', tone: 'neutral', done: false }]);
    setCreated(current => [...current, title]); setDialog(null); notify(`Задача «${title}» добавлена`);
  };
  const resolve = (id: string, status: 'approved' | 'returned', comment: string) => { setReviews(current => resolveReview(current, id, status, comment)); notify(status === 'approved' ? 'Черновик утверждён. Клиенту ничего не отправлено.' : 'Черновик возвращён с замечанием'); };
  const openReview = () => { setSelectedReview(pendingReviews(reviews)[0]?.id ?? reviews[0]?.id ?? null); setDialog('review'); };
  const openCreate = () => isAgents ? setAgentCreate(value => value + 1) : isProject ? setProjectCreate(value => value + 1) : isSales ? setSalesCreate(value => value + 1) : setDialog('create');
  return <div className={`crm-app ${isSales ? 'crm-sales-active' : ''}`}>
    <aside className="crm-sidebar"><Link to="/admin" search={{ section: 'today' }} className="crm-logo"><Logo tone="dark" /></Link><span className="crm-sidebar-caption">Рабочее пространство</span><nav aria-label="Разделы CRM">{navigation.map(({ label, icon: Icon, section: target }, index) => <Button key={label} variant="ghost" asChild className={`crm-nav-item ${label === activeLabel ? 'is-active' : ''} ${index === 7 ? 'crm-nav-divider' : ''}`}><Link to="/admin" search={{ section: target }}><Icon /><span>{label}</span>{target === 'agents' && reviewCount > 0 && <b>{reviewCount}</b>}</Link></Button>)}</nav><Button variant="ghost" className="crm-profile" onClick={() => notify('Андрей · Владелец рабочего пространства')}><span className="crm-avatar">А</span><span><strong>Андрей</strong><small>Владелец</small></span><ChevronRight /></Button></aside>
    <div className="crm-workspace"><header className="crm-topbar"><span className="crm-breadcrumb">Рабочее пространство <span>/</span><strong>{isProject ? 'Магазин света' : activeLabel}</strong></span><Link to="/admin" search={{ section: 'today' }} className="crm-mobile-logo"><Logo tone="dark" /></Link><label className="crm-search"><Search /><input aria-label="Поиск по CRM" placeholder="Поиск по CRM" value={search} onChange={event => setSearch(event.target.value)} /><kbd>⌘ K</kbd></label><div className="crm-top-actions"><span className="crm-demo"><span className="crm-desktop-demo">Демо-данные</span><span className="crm-mobile-demo">Демо</span></span><Button variant="ghost" size="icon" aria-label="Уведомления" onClick={() => setNotifications(value => !value)}><Bell /></Button><Button variant="ghost" className="crm-desktop-avatar crm-avatar" onClick={() => notify('Андрей · Владелец рабочего пространства')}>А</Button><Button className="crm-button crm-mobile-create" size="icon" aria-label={isAgents ? "Новый агент" : isProject ? "Новая задача проекта" : isSales ? "Новая сделка" : "Создать"} onClick={openCreate}><Plus /></Button></div>{notifications && <div className="crm-notifications"><strong>Уведомления</strong><p>{reviewCount} материала от агентов готовы к проверке.</p>{created.map((title, index) => <p key={`${title}-${index}`}><Check size={14} />Добавлена задача: {title}</p>)}<Button className="crm-button" size="sm" onClick={() => { setNotifications(false); openReview(); }}>Посмотреть результаты</Button></div>}</header>
      <main className="crm-main"><div hidden={section !== 'today'}><AdminToday tasks={tasks} setTasks={setTasks} payments={payments} search={search} openCreate={() => setDialog('create')} openReview={openReview} reviewCount={reviewCount} notify={notify} /></div><div hidden={!isSales}><AdminSales search={search} createRequest={salesCreate} notify={notify} /></div><div hidden={!isProject}><AdminProject search={search} createRequest={projectCreate} notify={notify} /></div><div hidden={!isAgents}><AdminAgents reviews={reviews} setReviewsAction={resolve} selectedId={selectedReview} onSelect={setSelectedReview} createRequest={agentCreate} notify={notify} search={search} /></div><div hidden={!isOperations}><AdminOperations section={section} search={search} tasks={tasks} setTasks={setTasks} payments={payments} setPayments={setPayments} openCreate={() => setDialog('create')} notify={notify} /></div></main>
    </div>
    <nav className="crm-bottom-nav" aria-label="Мобильная навигация">{navigation.filter(item => ['today', 'sales', 'project', 'agents'].includes(item.section)).map(item => <Button key={item.label} variant="ghost" asChild className={item.label === activeLabel ? 'is-active' : ''}><Link to="/admin" search={{ section: item.section }} onClick={() => setDialog(null)}><item.icon /><span>{item.label}</span></Link></Button>)}<Button variant="ghost" className={isOperations ? 'is-active' : ''} onClick={() => setDialog('more')}><MoreHorizontal /><span>Ещё</span></Button></nav>
    {notice && <div className="crm-notice" role="status"><Check /><span>{notice}</span><Button variant="ghost" size="icon-xs" aria-label="Закрыть уведомление" onClick={() => setNotice('')}><X /></Button></div>}
    <Dialog open={dialog !== null} onOpenChange={open => { if (!open) setDialog(null); }}><DialogContent className="crm-app crm-dialog"><DialogTitle>{dialog === 'create' ? 'Новая задача' : dialog === 'more' ? 'Рабочее пространство' : 'Проверка результата'}</DialogTitle><DialogDescription className="sr-only">{dialog === 'create' ? 'Добавление задачи в демо-данные' : dialog === 'more' ? 'Разделы CRM' : 'Проверка черновика предложения'}</DialogDescription>{dialog === 'create' && <form onSubmit={submit} className="crm-create-form"><label className="crm-field">Название задачи<input name="title" placeholder="Что нужно сделать?" required maxLength={150} /></label><label className="crm-field">Проект<select name="project"><option>Магазин света</option><option>Сайт производства</option><option>CRM отдела продаж</option><option>Приложение бронирования</option></select></label><label className="crm-field">Срок<input type="date" name="date" defaultValue="2026-10-30" /></label><Button type="submit" className="crm-button"><Plus />Добавить задачу</Button></form>}{dialog === 'review' && currentReview && <AgentReview review={currentReview} onBack={() => setDialog(null)} onResolve={(status, comment) => { if (selectedReview) resolve(selectedReview, status, comment); }} />}{dialog === 'more' && <nav>{navigation.map(({ label, icon: Icon, section: target }) => <Button key={label} variant="ghost" asChild className="crm-nav-item"><Link to="/admin" search={{ section: target }} onClick={() => setDialog(null)}><Icon />{label}</Link></Button>)}</nav>}</DialogContent></Dialog>
  </div>;
}