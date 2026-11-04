import { useState, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { isOverdueTask, isUrgentTask, outstandingAmount, sortTasks, taskHorizon, taskOwners, type TaskHorizon, type WorkspacePayment, type WorkspaceTask } from './workspace-model';
import type { Dispatch, SetStateAction } from 'react';
import { CircleCheck, FileText } from 'lucide-react';
import { IconArrow as ArrowRight, IconCheck as Check, IconCoins as Coins, IconDoc, IconFolder as Folder, IconLead, IconMore as MoreHorizontal, IconPlus as Plus, IconReview as ShieldCheck, IconSpark, IconTasks as ListChecks, IconUser as UserRound } from './crm-icons';
import { CountUp } from './CountUp';
import iconTasks from '@/assets/crm-icon-tasks.webp';
import iconLeads from '@/assets/crm-icon-leads.webp';
import iconDebt from '@/assets/crm-icon-debt.webp';
import iconReview from '@/assets/crm-icon-review.webp';
import { Button } from '@/components/ui/button';
import tray from '@/assets/crm-decision-tray.webp.asset.json';
import { money, projects } from './mock-data';
import { DashboardFunnel, DashboardSources } from './AdminDashboard';
import { debtAmount, initialLeads, paidAmount } from './dashboard-model';

export function Panel({ title, action, children, className = '' }: { title: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return <section className={`crm-panel ${className}`}><div className="crm-panel-heading"><h2>{title}</h2>{action}</div>{children}</section>;
}

const tabs = [{ key: 'urgent', label: 'Срочно' }, { key: 'week', label: 'На неделе' }, { key: 'all', label: 'Все' }] as const;
type TaskTab = typeof tabs[number]['key'];
const groupTitles: { key: TaskHorizon; label: string }[] = [{ key: 'overdue', label: 'Просрочено' }, { key: 'today', label: 'Сегодня' }, { key: 'week', label: 'На неделе' }, { key: 'later', label: 'Позже' }];

export function AdminToday({ openCreate, openReview, notify, search, reviewCount, tasks, setTasks, payments }: { tasks: WorkspaceTask[]; setTasks: Dispatch<SetStateAction<WorkspaceTask[]>>; payments: WorkspacePayment[]; openCreate: () => void; openReview: () => void; notify: (message: string) => void; search: string; reviewCount: number }) {
  const [tab, setTab] = useState<TaskTab>('urgent');
  const [owner, setOwner] = useState('all');
  const [leads, setLeads] = useState(initialLeads);
  const [closing, setClosing] = useState<string[]>([]);
  const toggle = (id: WorkspaceTask['id']) => { const key = String(id); if (closing.includes(key)) return; setClosing(c => [...c, key]); window.setTimeout(() => { setTasks(current => current.map(item => item.id === id ? { ...item, done: !item.done } : item)); setClosing(c => c.filter(k => k !== key)); }, 650); };
  const mine = owner === 'all' ? tasks : tasks.filter(task => task.owner === owner);
  const open = mine.filter(task => !task.done);
  const urgentCount = open.filter(isUrgentTask).length;
  const weekCount = open.filter(task => taskHorizon(task) !== 'later').length;
  const inTab = (task: WorkspaceTask) => tab === 'all' ? true : tab === 'urgent' ? isUrgentTask(task) : taskHorizon(task) !== 'later';
  const visible = sortTasks(open.filter(inTab)).filter(task => `${task.title} ${task.project} ${task.owner}`.toLowerCase().includes(search.toLowerCase()));
  const ownerCount = (value: string) => (value === 'all' ? tasks : tasks.filter(task => task.owner === value)).filter(task => !task.done && inTab(task)).length;
  const groups = groupTitles.map(group => ({ ...group, items: visible.filter(task => taskHorizon(task) === group.key) })).filter(group => group.items.length);
  const newLeads = leads.filter(lead => !lead.lost && lead.stage === 0).length;
  const talks = leads.filter(lead => !lead.lost && lead.stage === 1).length;
  const debt = leads.filter(lead => lead.contract).reduce((sum, lead) => sum + debtAmount(lead), 0);
  const received = leads.reduce((sum, lead) => sum + paidAmount(lead), 0);
  const total = outstandingAmount(payments);
  const metrics = [
    { icon: ListChecks, img: iconTasks, label: owner === 'all' ? 'Задачи в работе' : `Задачи · ${owner}`, value: String(open.length), note: `Просрочено: ${open.filter(isOverdueTask).length}` },
    { icon: IconLead, img: iconLeads, label: 'Новые заявки', value: String(newLeads), note: `В переговорах: ${talks}` },
    { icon: Coins, img: iconDebt, label: 'Долг клиентов', value: money(debt), note: `по ${leads.filter(lead => lead.contract).length} договорам` },
    { icon: ShieldCheck, img: iconReview, label: 'На проверке у агентов', value: String(reviewCount), note: 'Открыть результаты' },
  ];
  return <div className="crm-today crm-enter">
    <div className="crm-page-heading"><div><h1>Дашборд</h1><p className="crm-desktop-copy">Задачи команды, заявки и деньги в одном месте.</p><p className="crm-mobile-date">30 октября</p></div><div className="crm-heading-actions"><span>30 октября 2026</span><Button onClick={openCreate} className="crm-button"><Plus />Создать</Button></div></div>
    <div className="crm-kpi-strip">{metrics.map(({ icon: Icon, img, label, value, note }: { icon: typeof ListChecks; img?: string; label: string; value: string; note: string }, index) => <div className={`crm-kpi crm-kpi-${index} crm-reveal`} style={{ animationDelay: `${index * 60}ms` }} key={label}><span className={`crm-kpi-icon ${img ? 'has-art' : ''}`}>{img ? <img src={img} alt="" width={44} height={44} /> : <Icon />}</span><div><span>{label}</span><strong><CountUp value={value} /></strong><small>{note}</small></div></div>)}</div>
    <div className="crm-dashboard-main">
      <Panel title="Задачи" className="crm-tasks crm-reveal" action={<Button className="crm-button" size="sm" onClick={openCreate}><Plus />Добавить</Button>}>
        <div className="crm-task-toolbar">
          <div className="crm-tabs">{tabs.map(({ key, label }) => <Button key={key} variant="ghost" size="sm" aria-pressed={tab === key} onClick={() => setTab(key)}>{label} ({key === 'urgent' ? urgentCount : key === 'week' ? weekCount : open.length})</Button>)}</div>
          <div className="crm-owner-bar"><span>Кто делает</span>{['all', ...taskOwners].map(value => <Button key={value} variant="ghost" size="sm" aria-pressed={owner === value} onClick={() => setOwner(value)}>{value === 'all' ? 'Все' : value}<b>{ownerCount(value)}</b></Button>)}</div>
        </div>
        <div className="crm-task-list">{groups.map(group => <div className="crm-task-group" key={group.key}>
          <div className={`crm-task-group-title ${group.key === 'overdue' ? 'is-overdue' : ''}`}>{group.label}<b><CountUp value={String(group.items.length)} duration={300} /></b></div>
          {group.items.map(task => <div className={`crm-task ${task.done ? 'crm-task-done' : ''} ${closing.includes(String(task.id)) ? 'is-closing' : ''} ${taskHorizon(task) === 'overdue' ? 'is-overdue' : ''}`} key={task.id}>
            <Button variant="ghost" className="crm-check" role="checkbox" aria-label={task.title} aria-checked={task.done || closing.includes(String(task.id))} onClick={() => toggle(task.id)}><Check /></Button>
            <div className="crm-task-copy"><strong>{task.title}</strong><small className="crm-task-description">{task.description}</small><small className="crm-task-mobile-project">{task.project} · {task.owner}</small></div>
            <span className="crm-task-project"><Folder />{task.project}</span>
            <span className="crm-task-owner"><span className="crm-avatar">{task.owner[0]}</span>{task.owner}</span>
            <span className={`crm-badge crm-badge-${task.tone}`}>{task.due}</span>
          </div>)}
        </div>)}{visible.length === 0 && <p className="crm-empty">Задач в этом списке нет</p>}</div>
      </Panel>
      <div className="crm-today-rail crm-reveal" style={{ animationDelay: '120ms' }}>
        <section className="crm-decisions"><div><h2>Нужны решения</h2><p>{reviewCount} материала от агентов готовы<br />к проверке.</p><Button variant="outline" className="crm-button crm-decision-button" onClick={openReview}>Посмотреть<ArrowRight /></Button></div><img src={tray.url} alt="Материалы на проверке" width={214} height={157} /></section>
        <Panel title="Деньги" className="crm-money" action={<Button variant="link" size="sm" className="crm-text-link" asChild><Link to="/admin" search={{ section: 'finance' }}>Все оплаты<ArrowRight /></Link></Button>}>
          <div className="crm-money-split"><div><span>Получено</span><strong><CountUp value={money(received)} /></strong></div><div><span>Ожидается</span><strong><CountUp value={money(total)} /></strong></div></div>
          <div>{payments.filter(payment => !payment.paid).map(payment => <div className="crm-payment" key={payment.project}><span>{payment.project}</span><strong>{money(payment.amount)}</strong><small>{payment.note}</small></div>)}</div>
                  </Panel>
        <DashboardSources leads={leads} />
      </div>
    </div>
    <DashboardFunnel leads={leads} setLeads={setLeads} notify={notify} />
    <div className="crm-dashboard-grid">
      <Panel title="Проекты в работе" className="crm-projects" action={<Button variant="link" size="sm" className="crm-text-link" asChild><Link to="/admin" search={{ section: 'project' }}>Все проекты<ArrowRight /></Link></Button>}><div className="crm-table-wrap"><table><thead><tr><th>Проект</th><th>Этап</th><th>Ближайший срок</th><th>Ответственный</th><th /></tr></thead><tbody>{projects.filter(project => project.name.toLowerCase().includes(search.toLowerCase())).map(project => <tr key={project.name}><td><div className="crm-project-name"><span className="crm-avatar">{project.name[0]}</span><div><strong>{project.name}</strong><small>{project.type}</small></div></div></td><td><span className={`crm-badge crm-badge-${project.tone}`}><i />{project.stage}</span></td><td>{project.deadline}</td><td><span className="crm-owner"><span className="crm-avatar"><UserRound /></span>{project.owner}</span></td><td><Button variant="ghost" size="icon-xs" aria-label={`Действия: ${project.name}`} onClick={() => notify(`${project.name}: ${project.stage.toLowerCase()}, срок ${project.deadline}`)}><MoreHorizontal /></Button></td></tr>)}</tbody></table>{!projects.some(project => project.name.toLowerCase().includes(search.toLowerCase())) && <p className="crm-empty">Ничего не найдено</p>}</div></Panel>
      <Panel title="Последние события" className="crm-events" action={<Button variant="link" size="sm" className="crm-text-link" onClick={() => notify('Показаны все события за сегодня')}>Все события<ArrowRight /></Button>}><div className="crm-timeline">{[{ icon: IconLead, title: 'Новая заявка с сайта', detail: 'Корпоративный сайт', note: 'Имя: Олег · Контакт указан в заявке', time: '10:24' }, { icon: IconDoc, title: 'ТЗ заполнено', detail: 'Магазин света', note: 'Агент подготовил техническое задание.', time: '09:17' }, { icon: IconSpark, title: 'Черновик предложения готов', detail: 'Нужна проверка', note: 'Агент AI подготовил черновик КП.', time: 'Вчера, 18:42' }].map(({ icon: Icon, ...event }) => <div className="crm-event" key={event.title}><span className="crm-icon-tile"><Icon /></span><div><strong>{event.title}</strong><small>{event.detail}</small><p>{event.note}</p></div><time>{event.time}</time></div>)}</div></Panel>
    </div>
  </div>;
}

export function ReviewPreview({ notify }: { notify: (message: string) => void }) {
  const [result, setResult] = useState('');
  return <div className="crm-review"><span className="crm-subtle">Подготовка предложений</span><h2>Магазин декора</h2><span className="crm-badge crm-badge-violet">На проверке</span><Panel title="Черновик предложения"><p>Интернет-магазин: каталог, корзина, оплата и доставка.</p><h3>Нужно уточнить</h3><p>Количество товаров и необходимые интеграции.</p><p>Стоимость не согласована.</p></Panel><Panel title="На основе"><p><FileText size={16} />Ответы из ТЗ</p><p><FileText size={16} />Условия студии</p></Panel><label className="crm-field">Комментарий к правкам<textarea placeholder="Напишите комментарий..." /></label>{result ? <p className="crm-review-result"><CircleCheck />{result}</p> : <><Button className="crm-button" onClick={() => { setResult('Черновик утверждён'); notify('Черновик утверждён. Клиенту ничего не отправлено.'); }}>Утвердить черновик</Button><Button variant="outline" className="crm-button" onClick={() => setResult('Черновик возвращён с замечанием')}>Вернуть с замечанием</Button></>}<small className="crm-subtle">Отправка клиенту: отдельное действие.</small></div>;
}
