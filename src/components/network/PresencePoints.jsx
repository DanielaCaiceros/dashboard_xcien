import { useState } from 'react';
import { presencePoints, interfacesByPoint } from '../../data/mockData';
import Badge from '../shared/Badge';
import ProgressBar from '../shared/ProgressBar';
import styles from './PresencePoints.module.css';

export default function PresencePoints() {
  const [selected, setSelected] = useState(presencePoints[0]);
  const data = interfacesByPoint[selected];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
            <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" />
            <line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
          </svg>
          <h2 className={styles.title}>Puntos de presencia</h2>
        </div>
        <div className={styles.controls}>
          <span className={styles.label}>PUNTO:</span>
          <select
            className={styles.select}
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {presencePoints.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <button className={styles.iconBtn} title="Filtrar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
          </button>
          <button className={styles.iconBtn} title="Exportar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.summary}>
        <div className={styles.summaryCard}>
          <p className={styles.summaryLabel}>TOTAL INTERFACES</p>
          <p className={styles.summaryValue}>{data.total}</p>
        </div>
        <div className={styles.summaryCard}>
          <p className={styles.summaryLabel}>INTERFACES ACTIVAS</p>
          <p className={`${styles.summaryValue} ${styles.green}`}>{data.active}</p>
        </div>
        <div className={styles.summaryCard}>
          <p className={styles.summaryLabel}>CAPACIDAD EN USO</p>
          <p className={styles.summaryValue}>{data.capacityInUse}</p>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>INTERFAZ</th>
            <th>CAPACIDAD</th>
            <th>TRÁFICO</th>
            <th>UTILIZACIÓN</th>
            <th>ESTADO</th>
          </tr>
        </thead>
        <tbody>
          {data.interfaces.map((iface) => (
            <tr key={iface.name}>
              <td className={styles.mono}>{iface.name}</td>
              <td className={styles.mono}>{iface.capacity}</td>
              <td className={styles.mono}>{iface.traffic}</td>
              <td>
                <div className={styles.utilRow}>
                  <ProgressBar value={iface.utilization} size="md" />
                  <span className={styles.utilLabel}>{iface.utilization}%</span>
                </div>
              </td>
              <td><Badge label={iface.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
