import styles from './StatCard.module.css';

export default function StatCard({ label, value, subValue, progress, progressColor = 'var(--primary)', children }) {
  return (
    <div className={styles.card}>
      <p className={styles.label}>{label}</p>
      <div className={styles.valueRow}>
        <span className={styles.value}>{value}</span>
        {subValue && <span className={styles.subValue}>{subValue}</span>}
      </div>
      {progress !== undefined && (
        <div className={styles.progressTrack}>
          <div
            className={styles.progressBar}
            style={{ width: `${Math.min(progress, 100)}%`, background: progressColor }}
          />
        </div>
      )}
      {children}
    </div>
  );
}
