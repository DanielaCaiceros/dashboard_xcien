import { useState } from 'react';
import TopBar from '../components/layout/TopBar';
import { clientStats, clients } from '../data/mockData';

const PAGE_SIZE = 5;

function typeStyle(type) {
  if (type === 'Corporativo') return 'bg-primary/10 text-primary border border-primary/20';
  if (type === 'PyME') return 'bg-secondary/10 text-secondary border border-secondary/20';
  return 'bg-tertiary/10 text-tertiary border border-tertiary/20';
}

function slaBarColor(val) {
  if (val >= 98) return 'bg-status-online';
  if (val >= 90) return 'bg-status-warning';
  return 'bg-status-critical';
}

function statusDot(status) {
  if (status === 'Activo') return 'bg-status-online';
  if (status === 'Mantenimiento') return 'bg-status-warning';
  return 'bg-status-critical';
}

export default function ClientsPage() {
  const [page, setPage] = useState(1);
  const s = clientStats;
  const totalPages = Math.ceil(clients.length / PAGE_SIZE);
  const pageData = clients.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const kpis = [
    { label: 'Clientes totales', value: s.total.toString(), sub: null, pct: null, growth: s.growth },
    { label: 'Corporate', value: s.corporate.count.toString(), sub: `${s.corporate.percent}%`, pct: s.corporate.percent },
    { label: 'PYME (SMB)', value: s.pyme.count.toString(), sub: `${s.pyme.percent}%`, pct: s.pyme.percent },
    { label: 'Empresarial', value: s.empresarial.count.toString(), sub: `${s.empresarial.percent}%`, pct: s.empresarial.percent },
  ];

  return (
    <div className="ml-64 mt-16 p-gutter min-h-screen">
      <TopBar title="Dashboard XCIEN - Clientes" badge="CLIENTES HUB" searchPlaceholder="Search clients or nodes..." />

      {/* KPI Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-gutter">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="glass-panel p-card-padding rounded-xl status-indicator-green flex flex-col justify-between">
            <div>
              <span className="font-label-md text-label-md text-on-surface-variant block mb-1 uppercase tracking-widest">{kpi.label}</span>
              <div className="flex items-baseline gap-2">
                <h2 className={`text-on-surface font-black ${kpi.growth ? 'font-headline-lg text-headline-lg' : 'font-headline-md text-headline-md font-bold'}`}>{kpi.value}</h2>
                {kpi.sub && <span className="font-label-md text-label-md text-primary">{kpi.sub}</span>}
              </div>
            </div>
            {kpi.growth && (
              <div className="flex items-center gap-2 mt-4 text-primary">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                <span className="font-label-sm text-label-sm">{kpi.growth}</span>
              </div>
            )}
            {kpi.pct !== null && kpi.pct !== undefined && (
              <div className="w-full bg-surface-container-highest h-1 rounded-full mt-6 overflow-hidden">
                <div className="bg-primary h-full" style={{ width: `${kpi.pct}%` }} />
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Clients Table */}
      <section className="glass-panel rounded-xl overflow-hidden border border-outline-variant">
        <div className="px-gutter py-4 border-b border-outline-variant flex justify-between items-center">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Clientes por Zona</h3>
          <div className="flex gap-2">
            <div className="relative flex items-center bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-1.5 w-64 mr-2">
              <span className="material-symbols-outlined text-on-surface-variant text-sm mr-2">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-on-surface font-body-md text-body-md p-0 w-full placeholder:text-on-surface-variant/50 outline-none" placeholder="Search clients or nodes..." type="text" />
            </div>
            <button className="bg-surface-container-high border border-outline-variant text-on-surface px-4 py-2 rounded font-label-md text-label-md hover:bg-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">filter_list</span> Filter
            </button>
            <button className="bg-surface-container-high border border-outline-variant text-on-surface px-4 py-2 rounded font-label-md text-label-md hover:bg-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">download</span> Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-outline-variant">
                {['Cliente', 'Punto de Acceso', 'Tipo', 'SLA Health', 'Estado', 'Actions'].map((h, i) => (
                  <th key={h} className={`px-gutter py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider ${i === 5 ? 'text-right' : ''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {pageData.map((client) => (
                <tr key={client.id} className="hover:bg-surface-container transition-colors">
                  <td className="px-gutter py-4">
                    <div className="flex flex-col">
                      <span className="font-body-md text-body-md text-on-surface font-bold">{client.name}</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">ID: {client.id}</span>
                    </div>
                  </td>
                  <td className="px-gutter py-4">
                    <span className="font-label-md text-label-md text-on-surface bg-surface-container-highest px-2 py-1 rounded">{client.accessPoint}</span>
                  </td>
                  <td className="px-gutter py-4">
                    <span className={`px-2 py-0.5 rounded font-label-sm text-label-sm ${typeStyle(client.type)}`}>{client.type}</span>
                  </td>
                  <td className="px-gutter py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-24 bg-surface-variant rounded-full overflow-hidden">
                        <div className={`h-full ${slaBarColor(client.slaHealth)}`} style={{ width: `${client.slaHealth}%` }} />
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">{client.slaHealth}%</span>
                    </div>
                  </td>
                  <td className="px-gutter py-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${statusDot(client.status)}`} />
                      <span className="font-label-md text-label-md text-on-surface">{client.status}</span>
                    </div>
                  </td>
                  <td className="px-gutter py-4 text-right">
                    <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">more_vert</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-gutter py-4 bg-surface-container-low flex justify-between items-center border-t border-outline-variant">
          <span className="font-label-md text-label-md text-on-surface-variant">Showing {pageData.length} of 1,200 clients</span>
          <div className="flex gap-2">
            <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-on-surface-variant hover:bg-surface-variant disabled:opacity-40">
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 flex items-center justify-center rounded font-label-md text-label-md border
                  ${page === p ? 'border-primary bg-primary/10 text-primary' : 'border-outline-variant text-on-surface-variant hover:bg-surface-variant'}`}
              >
                {p}
              </button>
            ))}
            <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-on-surface-variant hover:bg-surface-variant disabled:opacity-40">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
