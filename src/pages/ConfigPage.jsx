import TopBar from '../components/layout/TopBar';
import styles from './ConfigPage.module.css';

export default function ConfigPage() {
  return (
    <div className={styles.page}>
      <TopBar title="Configuraci3n" badge="SETTINGS" />
      <div className={styles.content}>
        <div className={styles.placeholder}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-500)" strokeWidth="1.5">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
          <p>Configuración del sistema</p>
          <span>Esta sección estará disponible próximamente</span>
        </div>
      </div>
    </div>
  );
}
