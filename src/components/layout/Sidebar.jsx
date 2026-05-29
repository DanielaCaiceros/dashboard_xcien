import styles from './Sidebar.module.css';

const navItems = [
  { id: 'red', label: 'Red', icon: '⬡' },
  { id: 'clientes', label: 'Clientes', icon: '👥' },
  { id: 'configuracion', label: 'Configuraci3n', icon: '⚙' },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.brandName}>XCIEN NetOps</span>
        <span className={styles.brandSub}>Admin Console</span>
      </div>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`${styles.navItem} ${activePage === item.id ? styles.active : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
