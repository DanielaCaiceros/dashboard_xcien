import { useState } from 'react';
import { clients } from '../../data/mockData';
import Badge from '../shared/Badge';
import ProgressBar from '../shared/ProgressBar';
import styles from './ClientsTable.module.css';

const PAGE_SIZE = 5;

function StatusDot({ status }) {
  const colorMap = { Activo: 'var(--primary)', Inactivo: 'var(--danger)', Mantenimiento: 'var(--warning)' };
  return (
    <span className={styles.statusDot} style={{ '--dot-color': colorMap[status] || 'var(--text-muted)' }}>
      <span className={styles.dot} />
      {status}
    </span>
  );
}

export default function ClientsTable() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(clients.length / PAGE_SIZE);
  const pageData = clients.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function getSlaColor(val) {
    if (val >= 98) return 'var(--primary)';
    if (val >= 90) return 'var(--warning)';
    return 'var(--danger)';
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Clientes por Zona</h2>
        <div className={styles.actions}>
          <button className={styles.btn}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filter
          </button>
          <button className={styles.btn}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </button>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>CLIENTE</th>
            <th>PUNTO DE ACCESO</th>
            <th>TIPO</th>
            <th>SLA HEALTH</th>
            <th>ESTADO</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((client) => (
            <tr key={client.id}>
              <td>
                <p className={styles.clientName}>{client.name}</p>
                <p className={styles.clientId}>ID: {client.id}</p>
              </td>
              <td><span className={styles.accessPoint}>{client.accessPoint}</span></td>
              <td><Badge label={client.type} /></td>
              <td>
                <div className={styles.slaRow}>
                  <ProgressBar value={client.slaHealth} size="sm" color={getSlaColor(client.slaHealth)} />
                  <span className={styles.slaValue}>{client.slaHealth}</span>
                </div>
              </td>
              <td><StatusDot status={client.status} /></td>
              <td>
                <button className={styles.menuBtn} title="Opciones">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.footer}>
        <span className={styles.footerInfo}>Showing {pageData.length} of 1,200 clients</span>
        <div className={styles.pagination}>
          <button className={styles.pageBtn} onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>‹</button>
          {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`${styles.pageBtn} ${page === p ? styles.active : ''}`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
          <button className={styles.pageBtn} onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>›</button>
        </div>
      </div>
    </div>
  );
}
