import styles from './Badge.module.css';

const variantMap = {
  Activo: 'success',
  Inactivo: 'danger',
  Mantenimiento: 'warning',
  UP: 'success',
  CONGESTIONADO: 'warning',
  DOWN: 'danger',
  Corporativo: 'blue',
  PyME: 'purple',
  Residencial: 'teal',
};

export default function Badge({ label }) {
  const variant = variantMap[label] || 'default';
  return <span className={`${styles.badge} ${styles[variant]}`}>{label}</span>;
}
