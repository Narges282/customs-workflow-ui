import { useState } from 'react';
import {
  Activity, ArrowDown, ArrowRight, Bell, Boxes, CalendarDays, Check,
  ChevronDown, CircleHelp, ClipboardCheck, Clock3, FileText, Filter,
  LayoutDashboard, MoreHorizontal, Plus, Search, Settings2, ShieldCheck,
  Ship, SlidersHorizontal, Users, X,
} from 'lucide-react';

type Order = {
  id: string; customer: string; route: string; service: string; milestone: string;
  owner: string; deadline: string; status: 'In progress' | 'Needs attention' | 'On track'; initials: string;
};

const initialOrders: Order[] = [
  { id: 'CUS-28491', customer: 'Northstar Medical GmbH', route: 'Shanghai → Rotterdam', service: 'Import clearance', milestone: 'Validate consignment', owner: 'Maya Chen', deadline: 'Today, 14:30', status: 'Needs attention', initials: 'NM' },
  { id: 'CUS-28488', customer: 'Atlas Components BV', route: 'Shenzhen → Hamburg', service: 'Import clearance', milestone: 'Compliance review', owner: 'Jonas Weber', deadline: 'Today, 16:00', status: 'In progress', initials: 'AC' },
  { id: 'CUS-28476', customer: 'Evergreen Retail Ltd', route: 'New York → Antwerp', service: 'Transit declaration', milestone: 'Ready for assignment', owner: 'Unassigned', deadline: 'Nov 04, 10:00', status: 'On track', initials: 'ER' },
  { id: 'CUS-28465', customer: 'Helio Energy SAS', route: 'Busan → Le Havre', service: 'Import clearance', milestone: 'Awaiting customer', owner: 'Amir Patel', deadline: 'Nov 04, 12:00', status: 'Needs attention', initials: 'HE' },
  { id: 'CUS-28453', customer: 'Westbridge Trading AB', route: 'Singapore → Gothenburg', service: 'Export declaration', milestone: 'Order setup', owner: 'Sofia Lind', deadline: 'Nov 05, 09:30', status: 'In progress', initials: 'WT' },
];

const workflow = ['Receive & validate booking', 'Order setup', 'Consignment details', 'Risk assessment', 'Order assignment'];
const nav = [
  { label: 'Overview', icon: LayoutDashboard }, { label: 'Customs orders', icon: Boxes, count: '24' },
  { label: 'Compliance', icon: ShieldCheck, count: '3' }, { label: 'Team capacity', icon: Users },
];

function App() {
  const [orders, setOrders] = useState(initialOrders);
  const [query, setQuery] = useState('');
  const [activeNav, setActiveNav] = useState('Overview');
  const [showCreate, setShowCreate] = useState(false);
  const [newCustomer, setNewCustomer] = useState('');
  const visibleOrders = orders.filter(o => `${o.id} ${o.customer} ${o.milestone} ${o.owner}`.toLowerCase().includes(query.toLowerCase()));

  function createOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!newCustomer.trim()) return;
    const order: Order = { id: `CUS-${28500 + orders.length}`, customer: newCustomer.trim(), route: 'Route to be confirmed', service: 'Import clearance', milestone: workflow[0], owner: 'Unassigned', deadline: 'Not set', status: 'In progress', initials: newCustomer.trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase() };
    setOrders([order, ...orders]); setNewCustomer(''); setShowCreate(false);
  }

  return <div className="app-shell">
    <aside className="sidebar">
      <a className="brand" href="#" aria-label="Clearpath home"><span className="brand-mark"><Ship size={19} /></span><span>clearpath<span className="brand-dot">.</span><small>CUSTOMS OPERATIONS</small></span></a>
      <div className="workspace"><div className="workspace-icon">E</div><div><strong>Europe Operations</strong><small>Rotterdam office</small></div><ChevronDown size={15} /></div>
      <div className="nav-label">WORKSPACE</div>
      <nav>{nav.map(item => <button key={item.label} onClick={() => setActiveNav(item.label)} className={`nav-item ${activeNav === item.label ? 'active' : ''}`}><item.icon size={18} /><span>{item.label}</span>{item.count && <span className="nav-count">{item.count}</span>}</button>)}</nav>
      <div className="nav-label tools-label">TOOLS</div>
      <nav><button className="nav-item" onClick={() => setActiveNav('Milestones')}><ClipboardCheck size={18} /><span>Milestones</span></button><button className="nav-item" onClick={() => setActiveNav('Reports')}><Activity size={18} /><span>Reports</span></button></nav>
      <div className="sidebar-bottom"><button className="nav-item"><Settings2 size={18} /><span>Settings</span></button><button className="nav-item"><CircleHelp size={18} /><span>Help center</span></button><div className="profile"><div className="avatar profile-avatar">MC</div><div><strong>Maya Chen</strong><small>Customs specialist</small></div><MoreHorizontal size={18} /></div></div>
    </aside>

    <main className="main-content">
      <header className="topbar"><div className="breadcrumbs">Workspace <span>/</span> <strong>{activeNav}</strong></div><div className="top-actions"><button className="icon-button" aria-label="Notifications"><Bell size={18} /><i /></button><div className="avatar top-avatar">MC</div></div></header>
      <div className="page-wrap">
        <section className="page-heading"><div><div className="eyebrow"><span className="live-dot" /> TUESDAY, NOVEMBER 3, 2026</div><h1>Good morning, Maya <span>✦</span></h1><p>Here’s what’s happening across your customs operations today.</p></div><button className="primary-button" onClick={() => setShowCreate(true)}><Plus size={17} /> Create order</button></section>

        <section className="metrics" aria-label="Order summary">
          <Metric label="Active orders" value="128" note="Across 6 service types" icon={<Boxes size={18} />} tone="blue" />
          <Metric label="Needs attention" value="12" note="4 due within 2 hours" icon={<Activity size={18} />} tone="orange" />
          <Metric label="Awaiting customer" value="08" note="3 requests sent today" icon={<Clock3 size={18} />} tone="purple" />
          <Metric label="Completed today" value="36" note="↑ 12% vs. last week" icon={<Check size={18} />} tone="green" />
        </section>

        <section className="content-grid">
          <div className="orders-panel panel">
            <div className="panel-heading"><div><h2>Orders in progress</h2><p>Track milestones and move work forward.</p></div><button className="text-button">View all orders <ArrowRight size={15} /></button></div>
            <div className="table-toolbar"><label className="search-box"><Search size={16} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search orders, customers..." /></label><button className="filter-button"><Filter size={15} /> Filters <span className="filter-count">2</span></button><button className="filter-button date-button"><CalendarDays size={15} /> All deadlines <ChevronDown size={14} /></button></div>
            <div className="table-scroll"><table><thead><tr><th>ORDER / CUSTOMER</th><th>CURRENT MILESTONE</th><th>OWNER</th><th>DEADLINE</th><th>STATUS</th><th></th></tr></thead><tbody>
              {visibleOrders.map(order => <tr key={order.id}><td><div className="customer-cell"><div className="customer-avatar">{order.initials}</div><div><strong>{order.customer}</strong><small>{order.id} <span>·</span> {order.route}</small></div></div></td><td><span className="milestone-name">{order.milestone}</span><small className="service-name">{order.service}</small></td><td><div className="owner-cell"><div className={`avatar owner-avatar ${order.owner === 'Unassigned' ? 'unassigned' : ''}`}>{order.owner === 'Unassigned' ? '?' : order.owner.split(' ').map(x => x[0]).join('')}</div>{order.owner}</div></td><td><span className={`deadline ${order.deadline.startsWith('Today') && order.status === 'Needs attention' ? 'urgent' : ''}`}>{order.deadline}</span></td><td><Status status={order.status} /></td><td><button className="row-more" aria-label={`More options for ${order.id}`}><MoreHorizontal size={18} /></button></td></tr>)}
              {visibleOrders.length === 0 && <tr><td className="empty-state" colSpan={6}>No orders match “{query}”. Try another search.</td></tr>}
            </tbody></table></div>
            <div className="table-footer"><span>Showing <strong>{visibleOrders.length}</strong> of <strong>{orders.length}</strong> orders</span><button>View order queue <ArrowRight size={14} /></button></div>
          </div>

          <aside className="right-column">
            <div className="workflow-card panel"><div className="panel-heading compact"><div><h2>Workflow overview</h2><p>Orders by current stage</p></div><button className="icon-button subtle"><MoreHorizontal size={18} /></button></div><div className="workflow-total"><strong>128</strong><span>active orders</span><span className="trend">↑ 8.4%</span></div><div className="workflow-bars">{workflow.map((label, i) => { const vals = [28, 19, 34, 16, 31]; return <button className="workflow-row" key={label} onClick={() => setQuery(label.split(' ')[0])}><span className="workflow-label"><i className={`stage-dot stage-${i}`} />{label}</span><span className="bar-track"><i style={{ width: `${vals[i] * 2.2}%` }} /></span><strong>{vals[i]}</strong><ArrowRight size={13} /></button>})}</div><button className="full-link">View workflow details <ArrowRight size={15} /></button></div>
            <div className="attention-card panel"><div className="attention-title"><div className="attention-icon"><Clock3 size={17} /></div><div><h2>Needs your attention</h2><p>Items that may need a follow-up</p></div><span className="attention-badge">3</span></div><div className="attention-item"><div className="attention-marker orange-marker" /><div><strong>Missing HS codes</strong><p>Northstar Medical · CUS-28491</p><small>Due in 45 min</small></div><button aria-label="Open item"><ArrowRight size={15} /></button></div><div className="attention-item"><div className="attention-marker purple-marker" /><div><strong>POA approval pending</strong><p>Helio Energy · CUS-28465</p><small>Waiting for Compliance</small></div><button aria-label="Open item"><ArrowRight size={15} /></button></div><button className="full-link">See all attention items <ArrowRight size={15} /></button></div>
          </aside>
        </section>
        <footer className="page-footer"><span><span className="footer-status" /> All systems operational</span><span>Last synced just now <ArrowDown size={12} /></span></footer>
      </div>
    </main>

    {showCreate && <div className="modal-backdrop" onClick={() => setShowCreate(false)}><div className="modal" onClick={e => e.stopPropagation()}><div className="modal-head"><div><span className="modal-icon"><FileText size={18} /></span><h2>Create customs order</h2><p>Start a new order in the workflow.</p></div><button className="icon-button" onClick={() => setShowCreate(false)} aria-label="Close"><X size={18} /></button></div><form onSubmit={createOrder}><label>Customer name<input autoFocus value={newCustomer} onChange={e => setNewCustomer(e.target.value)} placeholder="e.g. Acme Imports Ltd" required /></label><label>Service<select defaultValue="Import clearance"><option>Import clearance</option><option>Export declaration</option><option>Transit declaration</option></select></label><div className="modal-note"><SlidersHorizontal size={15} /> You can add booking and consignment details after creating the order.</div><div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setShowCreate(false)}>Cancel</button><button className="primary-button" type="submit"><Plus size={16} /> Create order</button></div></form></div></div>}
  </div>;
}

function Metric({ label, value, note, icon, tone }: { label: string; value: string; note: string; icon: React.ReactNode; tone: string }) {
  return <div className="metric-card panel"><div className={`metric-icon ${tone}`}>{icon}</div><span className="metric-label">{label}</span><div className="metric-value">{value}</div><div className="metric-note">{note}</div></div>;
}
function Status({ status }: { status: Order['status'] }) { return <span className={`status-pill ${status === 'Needs attention' ? 'status-attention' : status === 'On track' ? 'status-track' : 'status-progress'}`}><i />{status}</span>; }

export default App;
