import { ringData } from '../../data/mockData';
import ProgressBar from '../shared/ProgressBar';
import styles from './RingSaturation.module.css';

export default function RingSaturation() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
        </svg>
        <h3 className={styles.title}>Saturación de enlaces de anillos</h3>
      </div>
      <div className={styles.list}>
        {ringData.map((ring) => (
          <div key={ring.name} className={styles.item}>
            <div className={styles.itemHeader}>
              <span className={styles.ringName}>{ring.name}</span>
              <span className={styles.percent}>{ring.utilization}%</span>
            </div>
            <ProgressBar value={ring.utilization} size="lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
