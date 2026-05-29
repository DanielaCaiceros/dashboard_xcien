import styles from './ProgressBar.module.css';

function getColor(value) {
  if (value >= 85) return 'var(--danger)';
  if (value >= 65) return 'var(--warning)';
  return 'var(--primary)';
}

export default function ProgressBar({ value, color, showLabel = false, size = 'md' }) {
  const barColor = color || getColor(value);

  return (
    <div className={`${styles.wrapper} ${styles[size]}`}>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${Math.min(value, 100)}%`, background: barColor }} />
      </div>
      {showLabel && <span className={styles.label}>{value}%</span>}
    </div>
  );
}
