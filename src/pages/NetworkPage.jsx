import { useState } from 'react';
import TopBar from '../components/layout/TopBar';
import NetworkMap from '../components/network/NetworkMap';
import { networkStats, presencePoints, interfacesByPoint, ringData, capacityData } from '../data/mockData';

function kpiAccentColor(value, max) {
  const pct = max ? (value / max) * 100 : value;
  if (pct >= 85) return 'border-status-critical';
  if (pct >= 65) return 'border-status-warning';
  return 'border-primary';
}

function barColor(value, max) {
  const pct = max ? (value / max) * 100 : value;
  if (pct >= 85) return 'bg-status-critical';
  if (pct >= 65) return 'bg-status-warning';
  return 'bg-primary';
}

function utilColor(pct) {
  if (pct >= 85) return 'bg-status-critical';
  if (pct >= 65) return 'bg-status-warning';
  return 'bg-primary';
}

export default function NetworkPage() {
  const [selectedPoint, setSelectedPoint] = useState(presencePoints[0]);
  const s = networkStats;
  const pointData = interfacesByPoint[selectedPoint];

  const kpis = [
    { label: 'Capacidad usada / total', value: `${s.capacityUsed}`, sub: `/ ${s.capacityTotal} TB`, pct: (s.capacityUsed / s.capacityTotal) * 100, max: s.capacityTotal },
    { label: 'Interfaces Utilizadas', value: `${s.interfacesUsed}`, sub: `/ ${s.interfacesTotal}`, pct: (s.interfacesUsed / s.interfacesTotal) * 100, max: s.interfacesTotal },
    { label: 'Ocupación promedio anillo Norte', value: `${s.ringNorthAvg}`, sub: '%', pct: s.ringNorthAvg, segmented: true },
    { label: 'Ocupación promedio anillo Sur', value: `${s.ringSouthAvg}`, sub: '%', pct: s.ringSouthAvg, segmented: true },
  ];

  return (
    <div className="ml-64 pt-20 p-gutter min-h-screen">
      <TopBar title="Dashboard XCIEN - Red e interfaces" badge="MONITOR EN VIVO" />
      <div className="max-w-container-max mx-auto space-y-gutter">

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className={`bg-surface-card border-t-2 ${kpiAccentColor(kpi.pct, null)} p-card-padding flex flex-col gap-2 hover:bg-surface-container-high transition-all`}
            >
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">{kpi.label}</span>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-lg text-headline-lg text-on-surface">{kpi.value}</span>
                <span className="font-headline-sm text-headline-sm text-on-surface-variant">{kpi.sub}</span>
              </div>
              {kpi.segmented ? (
                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`h-1 flex-1 ${i < Math.round(kpi.pct / 20) ? barColor(kpi.pct, null) : 'bg-surface-container-highest'}`} />
                  ))}
                </div>
              ) : (
                <div className="w-full bg-surface-container-highest h-1.5 mt-2 overflow-hidden">
                  <div className={`${barColor(kpi.pct, null)} h-full`} style={{ width: `${kpi.pct}%` }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Puntos de Presencia */}
        <div className="bg-surface-card p-card-padding border border-outline-variant">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[24px]">router</span>
              <h3 className="font-headline-sm text-headline-sm">Puntos de presencia</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">Punto:</span>
              <div className="relative">
                <select
                  value={selectedPoint}
                  onChange={(e) => setSelectedPoint(e.target.value)}
                  className="bg-surface-container-highest border border-outline-variant rounded px-3 py-1.5 text-body-md appearance-none pr-8 focus:ring-1 focus:ring-primary outline-none cursor-pointer"
                >
                  {presencePoints.map((p) => <option key={p}>{p}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[18px]">expand_more</span>
              </div>
              <div className="flex gap-1 ml-2">
                <button className="p-2 border border-outline-variant hover:bg-surface-variant transition-colors"><span className="material-symbols-outlined text-[20px]">filter_list</span></button>
                <button className="p-2 border border-outline-variant hover:bg-surface-variant transition-colors"><span className="material-symbols-outlined text-[20px]">download</span></button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Total Interfaces', value: pointData.total, className: 'text-on-surface' },
              { label: 'Interfaces Activas', value: pointData.active, className: 'text-status-online' },
              { label: 'Capacidad en Uso', value: pointData.capacityInUse, className: 'text-on-surface' },
            ].map((s) => (
              <div key={s.label} className="bg-surface-container-low border border-outline-variant p-4 flex flex-col">
                <span className="font-label-sm text-on-surface-variant uppercase">{s.label}</span>
                <span className={`font-headline-sm text-headline-sm ${s.className}`}>{s.value}</span>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant text-on-surface-variant font-label-md text-label-md">
                  {['Interfaz', 'Capacidad', 'Tráfico', 'Utilización', 'Estado'].map((h) => (
                    <th key={h} className="pb-4 font-medium uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-body-md text-body-md divide-y divide-outline-variant/30">
                {pointData.interfaces.map((iface) => (
                  <tr key={iface.name} className="hover:bg-surface-container-low transition-colors">
                    <td className="py-4 font-bold text-on-surface">{iface.name}</td>
                    <td className="py-4 font-label-md">{iface.capacity}</td>
                    <td className="py-4 font-label-md">{iface.traffic}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1 bg-surface-container-highest">
                          <div className={`${utilColor(iface.utilization)} h-full`} style={{ width: `${iface.utilization}%` }} />
                        </div>
                        <span className={`text-label-sm ${iface.utilization >= 65 ? 'text-status-warning' : ''}`}>{iface.utilization}%</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-0.5 rounded font-label-sm
                        ${iface.status === 'UP' ? 'bg-status-online/15 text-status-online' : 'bg-status-warning/15 text-status-warning'}`}>
                        {iface.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Network Map */}
        <NetworkMap />

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
          {/* Saturación de enlaces */}
          <div className="bg-surface-card p-card-padding border border-outline-variant">
            <h3 className="font-headline-sm text-headline-sm mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">analytics</span>
              Saturación de enlaces de anillos
            </h3>
            <div className="space-y-6">
              {ringData.map((ring) => {
                const color = ring.utilization >= 65 ? 'bg-status-warning' : 'bg-primary';
                const textColor = ring.utilization >= 65 ? 'text-status-warning' : 'text-primary';
                return (
                  <div key={ring.name} className="space-y-2">
                    <div className="flex justify-between font-label-md text-label-md">
                      <span>{ring.name}</span>
                      <span className={textColor}>{ring.utilization}%</span>
                    </div>
                    <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                      <div className={`${color} h-full`} style={{ width: `${ring.utilization}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Capacidad Prometida vs Usada */}
          <div className="bg-surface-card p-card-padding border border-outline-variant flex flex-col">
            <h3 className="font-headline-sm text-headline-sm mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">equalizer</span>
              Capacidad Prometida vs. Usada
            </h3>
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                  <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">Ratio de Sobresuscripción</span>
                  <span className="font-headline-lg text-primary leading-none mt-1">{capacityData.subscriptionRatio}</span>
                </div>
                <div className="text-right">
                  <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">Uso de Red</span>
                  <div className="flex items-baseline justify-end gap-1">
                    <span className="font-headline-md text-headline-md">{capacityData.networkUsage}</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface-variant">%</span>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between font-label-md">
                    <span className="text-on-surface-variant">Capacidad Real Usada</span>
                    <span className="text-on-surface font-bold">{capacityData.realUsed}</span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-3 rounded-full overflow-hidden">
                    <div className="bg-primary h-full" style={{ width: `${capacityData.realUsedPercent}%` }} />
                  </div>
                </div>
                <div className="bg-surface-container-low border border-outline-variant p-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-on-surface-variant uppercase">Capacidad Prometida</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface">{capacityData.promised}</span>
                  </div>
                  {capacityData.limitExceeded && (
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-[20px]">info</span>
                      <span className="text-label-sm italic">Límite de venta excedido</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
