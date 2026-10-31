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
import { initialReviews, pendingReviews, resolveReview } from './agents-model';

const navigation = [
  { label: 'Сегодня', icon: CalendarDays, iteration: 1 }, { label: 'Продажи', icon: ChartNoAxesColumnIncreasing, iteration: 2 },
  { label: 'Проекты', icon: Folder, iteration: 3 }, { label: 'Задачи', icon: ListChecks, iteration: 5 },
  { label: 'Клиенты', icon: Users, iteration: 5 }, { label: 'Финансы', icon: Coins, iteration: 5 }, { label: 'Агенты', icon: Bot, iteration: 4 },
  { label: 'Контент сайта', icon: FileText, iteration: 5 }, { label: 'Настройки', icon: Settings, iteration: 5 },
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
  const activeLabel = isAgents ? 'Агенты' : isProject ? 'Проекты' : isSales ? 'Продажи' : 'Сегодня';
  const [projectCreate, setProjectCreate] = useState(0);
  const [salesCreate, setSalesCreate] = useState(0);
  const [search, setSearch] = useState('');
  const [dialog, setDialog] = useState<'create' | 'review' | 'more' | null>(null);
  const [notifications, setNotifications] = useState(false);
  const [notice, setNotice] = useState('');
  const [created, setCreated] = useState<string[]>([]);
  const notify = (message: string) => setNotice(message);
  const selectSection = (label: string, iteration: number) => {
    if (label === 'Сегодня') { setDialog(null); return; }
    if (label === 'Агенты') { setDialog(null); return; }
    notify(`«${label}» появится в итерации ${iteration}`);
    setDialog(null);
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = String(new FormData(event.currentTarget).get('title') ?? '').trim();
    if (!title) return;
    setCreated(current => [...current, title]); setDialog(null); notify(`Задача «${title}» добавлена`);
  };
  const resolve = (id: string, status: 'approved' | 'returned', comment: string) => { setReviews(current => resolveReview(current, id, status, comment)); notify(status === 'approved' ? 'Черновик утверждён. Клиенту ничего не отправлено.' : 'Черновик возвращён с замечанием'); };
  const openReview = () => { setSelectedReview(pendingReviews(reviews)[0]?.id ?? reviews[0]?.id ?? null); setDialog('review'); };
  const openCreate = () => isAgents ? setAgentCreate(value => value + 1) : isProject ? setProjectCreate(value => value + 1) : isSales ? setSalesCreate(value => value + 1) : setDialog('create');
  return <div className={`crm-app ${isSales ? 'crm-sales-active' : ''}`}>
    <aside className="crm-sidebar"><Link to="/admin" search={{ section: 'today' }} className="crm-logo"><Logo tone="dark" /></Link><span className="crm-sidebar-caption">Рабочее пространство</span><nav aria-label="Разделы CRM">{navigation.map(({ label, icon: Icon, iteration }, index) => <Button key={label} variant="ghost" asChild={(index < 3 || index === 6)} className={`crm-nav-item ${label === activeLabel ? 'is-active' : ''} ${index === 7 ? 'crm-nav-divider' : ''}`} onClick={(index < 3 || index === 6) ? undefined : () => selectSection(label, iteration)}>{(index < 3 || index === 6) ? <Link to="/admin" search={{ section: index === 6 ? 'agents' : index === 2 ? 'project' : index === 1 ? 'sales' : 'today' }}><Icon /><span>{label}</span>{label === 'Агенты' && reviewCount > 0 && <b>{reviewCount}</b>}</Link> : <><Icon /><span>{label}</span>{label === 'Агенты' && <b>2</b>}</>}</Button>)}</nav><Button variant="ghost" className="crm-profile" onClick={() => notify('Андрей · Владелец рабочего пространства')}><span className="crm-avatar">А</span><span><strong>Андрей</strong><small>Владелец</small></span><ChevronRight /></Button></aside>
    <div className="crm-workspace"><header className="crm-topbar"><span className="crm-breadcrumb">Рабочее пространство <span>/</span><strong>{isProject ? 'Магазин света' : activeLabel}</strong></span><Link to="/admin" search={{ section: 'today' }} className="crm-mobile-logo"><Logo tone="dark" /></Link><label className="crm-search"><Search /><input aria-label="Поиск по CRM" placeholder="Поиск по CRM" value={search} onChange={event => setSearch(event.target.value)} /><kbd>⌘ K</kbd></label><div className="crm-top-actions"><span className="crm-demo"><span className="crm-desktop-demo">Демо-данные</span><span className="crm-mobile-demo">Демо</span></span><Button variant="ghost" size="icon" aria-label="Уведомления" onClick={() => setNotifications(value => !value)}><Bell /></Button><Button variant="ghost" className="crm-desktop-avatar crm-avatar" onClick={() => notify('Андрей · Владелец рабочего пространства')}>А</Button><Button className="crm-button crm-mobile-create" size="icon" aria-label={isAgents ? "Новый агент" : isProject ? "Новая задача проекта" : isSales ? "Новая сделка" : "Создать"} onClick={openCreate}><Plus /></Button></div>{notifications && <div className="crm-notifications"><strong>Уведомления</strong><p>2 материала от агентов готовы к проверке.</p>{created.map((title, index) => <p key={`${title}-${index}`}><Check size={14} />Добавлена задача: {title}</p>)}<Button className="crm-button" size="sm" onClick={() => { setNotifications(false); openReview(); }}>Посмотреть результаты</Button></div>}</header>
      <main className="crm-main"><div hidden={isSales || isProject || isAgents}><AdminToday search={search} openCreate={() => setDialog('create')} openReview={openReview} reviewCount={reviewCount} notify={notify} />{created.length > 0 && <section className="crm-created"><h2>Добавленные задачи</h2>{created.map((title, index) => <p key={`${title}-${index}`}><ListChecks size={16} />{title}<span className="crm-badge crm-badge-lime">Новая</span></p>)}</section>}</div><div hidden={!isSales}><AdminSales search={search} createRequest={salesCreate} notify={notify} /></div><div hidden={!isProject}><AdminProject search={search} createRequest={projectCreate} notify={notify} /></div><div hidden={!isAgents}><AdminAgents reviews={reviews} setReviewsAction={resolve} selectedId={selectedReview} onSelect={setSelectedReview} createRequest={agentCreate} notify={notify} search={search} /></div></main>
    </div>
    <nav className="crm-bottom-nav" aria-label="Мобильная навигация">{[navigation[0], navigation[1], navigation[2], navigation[6], { label: 'Ещё', icon: MoreHorizontal, iteration: 5 }].map(item => item && <Button key={item.label} variant="ghost" asChild={item.iteration < 5} className={item.label === activeLabel ? 'is-active' : ''} onClick={item.iteration < 5 ? () => setDialog(null) : () => item.label === 'Ещё' ? setDialog('more') : selectSection(item.label, item.iteration)}>{item.iteration < 5 ? <Link to="/admin" search={{ section: item.label === 'Агенты' ? 'agents' : item.label === 'Проекты' ? 'project' : item.label === 'Продажи' ? 'sales' : 'today' }}><item.icon /><span>{item.label}</span></Link> : <><item.icon /><span>{item.label}</span></>}</Button>)}</nav>
    {notice && <div className="crm-notice" role="status"><Check /><span>{notice}</span><Button variant="ghost" size="icon-xs" aria-label="Закрыть уведомление" onClick={() => setNotice('')}><X /></Button></div>}
    <Dialog open={dialog !== null} onOpenChange={open => { if (!open) setDialog(null); }}><DialogContent className="crm-app crm-dialog"><DialogTitle>{dialog === 'create' ? 'Новая задача' : dialog === 'more' ? 'Рабочее пространство' : 'Проверка результата'}</DialogTitle><DialogDescription className="sr-only">{dialog === 'create' ? 'Добавление задачи в демо-данные' : dialog === 'more' ? 'Разделы CRM' : 'Проверка черновика предложения'}</DialogDescription>{dialog === 'create' && <form onSubmit={submit} className="crm-create-form"><label className="crm-field">Название задачи<input name="title" placeholder="Что нужно сделать?" required maxLength={150} /></label><label className="crm-field">Проект<select name="project"><option>Магазин света</option><option>Сайт производства</option><option>CRM отдела продаж</option><option>Приложение бронирования</option></select></label><label className="crm-field">Срок<input type="date" name="date" defaultValue="2026-10-30" /></label><Button type="submit" className="crm-button"><Plus />Добавить задачу</Button></form>}{dialog === 'review' && reviews.find(review => review.id === selectedReview) && <AgentReview review={reviews.find(review => review.id === selectedReview) ?? initialReviews[0]} onBack={() => setDialog(null)} onResolve={(status, comment) => { if (selectedReview) resolve(selectedReview, status, comment); }} />}{dialog === 'more' && <nav>{navigation.map(({ label, icon: Icon, iteration }) => <Button key={label} variant="ghost" className="crm-nav-item" onClick={() => selectSection(label, iteration)}><Icon />{label}</Button>)}</nav>}</DialogContent></Dialog>
  </div>;
}