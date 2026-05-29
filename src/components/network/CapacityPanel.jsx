import { capacityData } from '../../data/mockData';
import ProgressBar from '../shared/ProgressBar';
import styles from './CapacityPanel.module.css';

export default function CapacityPanel() {
  const d = capacityData;
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
        </svg>
        <h3 className={styles.title}>Capacidad Prometida vs. Usada</h3>
      </div>

      <div className={styles.metricsRow}>
        <div className={styles.metric}>
          <p className={styles.metricLabel}>RATIO DE SOBRESUSCRIPCIÓN</p>
          <p className={styles.metricValue} style={{ color: 'var(--primary-light)' }}>{d.subscriptionRatio}</p>
        </div>
        <div className={styles.metric}>
          <p className={styles.metricLabel}>USO DE RED</p>
          <p className={styles.metricValue}>{d.networkUsage} %</p>
        </div>
      </div>

      <div className={styles.usageBlock}>
        <div className={styles.usageHeader}>
          <span className={styles.usageLabel}>Capacidad Real Usada</span>
          <span className={styles.usageValue}>{d.realUsed}</span>
        </div>
        <ProgressBar value={d.realUsedPercent} size="lg" color="var(--primary)" />
      </div>

      <div className={styles.promisedBlock}>
        <div className={styles.promisedHeader}>
          <div>
            <p className={styles.promisedLabel}>CAPACIDAD PROMETIDA</p>
            <p className={styles.promisedValue}>{d.promised}</p>
          </div>
          {d.limitExceeded && (
            <div className={styles.warning}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>Límite de venta excedido</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
