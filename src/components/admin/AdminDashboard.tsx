import { useState } from 'react';
import { ArrowRight, FileSignature, UserRound, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { money } from './mock-data';
import { debtAmount, funnelStages, paidAmount, paymentPlan, sourceCounts, stageCounts, type Lead } from './dashboard-model';

export function DashboardFunnel({ leads, setLeads, notify }: { leads: Lead[]; setLeads: (update: (current: Lead[]) => Lead[]) => void; notify: (message: string) => void }) {
  const [stage, setStage] = useState(1);
  const counts = stageCounts(leads);
  const max = Math.max(1, ...counts);
  const lost = leads.filter(lead => lead.lost).length;
  const visible = leads.filter(lead => !lead.lost && lead.stage === stage);
  const advance = (lead: Lead) => { setLeads(current => current.map(item => item.id === lead.id ? { ...item, stage: Math.min(item.stage + 1, funnelStages.length - 1) } : item)); notify(`${lead.name}: ${(funnelStages[Math.min(lead.stage + 1, funnelStages.length - 1)] ?? "").toLowerCase()}`); };
  const reject = (lead: Lead) => { setLeads(current => current.map(item => item.id === lead.id ? { ...item, lost: true } : item)); notify(`${lead.name}: отказ`); };
  return <section className="crm-panel crm-funnel">
    <div className="crm-panel-heading"><h2>Воронка</h2><span className="crm-funnel-lost"><XCircle />Отказы: {lost}</span></div>
    <div className="crm-funnel-stages">{funnelStages.map((label, index) => <button type="button" key={label} aria-pressed={stage === index} onClick={() => setStage(index)} className="crm-funnel-stage">
      <span>{label}</span><strong>{counts[index]}</strong><i style={{ width: `${((counts[index] ?? 0) / max) * 100}%` }} />
    </button>)}</div>
    <div className="crm-funnel-list" key={stage}>{visible.map(lead => <article className="crm-lead" key={lead.id}>
      <div className="crm-lead-top"><strong>{lead.name}</strong><span className={`crm-badge ${lead.kind === 'regular' ? 'crm-badge-violet' : 'crm-badge-lime'}`}>{lead.kind === 'regular' ? 'Постоянный' : 'Новый'}</span></div>
      <small>{lead.service} · {lead.sourceDetail ?? lead.source}</small>
      <p className="crm-lead-note"><UserRound />{lead.manager}: {lead.note}</p>
      {lead.amount > 0 && <div className="crm-lead-pay"><span>{money(lead.amount)} · {lead.scheme}</span><div className="crm-lead-parts">{paymentPlan(lead.amount, lead.scheme).map((part, index) => <i key={index} className={index < lead.paidParts ? 'is-paid' : ''} title={money(part)} />)}</div>{lead.contract && <span className="crm-lead-contract"><FileSignature />Договор</span>}</div>}
      {stage < funnelStages.length - 1 && <div className="crm-lead-actions"><Button size="sm" className="crm-button" onClick={() => advance(lead)}>{funnelStages[stage + 1]}<ArrowRight /></Button>{stage <= 1 && <Button size="sm" variant="ghost" onClick={() => reject(lead)}>Отказ</Button>}</div>}
    </article>)}{visible.length === 0 && <p className="crm-empty">На этом этапе пусто</p>}</div>
  </section>;
}

export function DashboardSources({ leads }: { leads: Lead[] }) {
  const sources = sourceCounts(leads);
  const max = Math.max(1, ...sources.map(item => item.count));
  const regular = leads.filter(lead => lead.kind === 'regular').length;
  const debt = leads.filter(lead => lead.contract).reduce((sum, lead) => sum + debtAmount(lead), 0);
  const received = leads.reduce((sum, lead) => sum + paidAmount(lead), 0);
  return <section className="crm-panel crm-sources">
    <div className="crm-panel-heading"><h2>Откуда клиенты</h2></div>
    <div className="crm-source-list">{sources.map(({ source, count }) => <div className="crm-source" key={source}><span>{source}</span><div><i style={{ width: `${(count / max) * 100}%` }} /></div><strong>{count}</strong></div>)}</div>
    <div className="crm-source-split"><div><strong>{leads.length - regular}</strong><span>новых</span></div><div><strong>{regular}</strong><span>постоянных</span></div></div>
    <div className="crm-source-money"><div><span>Получено</span><strong>{money(received)}</strong></div><div><span>Долг по договорам</span><strong className="crm-debt">{money(debt)}</strong></div></div>
  </section>;
}
