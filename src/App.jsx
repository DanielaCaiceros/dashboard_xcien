import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import NetworkPage from './pages/NetworkPage';
import ClientsPage from './pages/ClientsPage';
import ConfigPage from './pages/ConfigPage';
import styles from './App.module.css';

const pages = {
  red: NetworkPage,
  clientes: ClientsPage,
  configuracion: ConfigPage,
};

export default function App() {
  const [activePage, setActivePage] = useState('red');
  const Page = pages[activePage];

  return (
    <div className={styles.app}>
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className={styles.main}>
        <Page />
      </main>
    </div>
  );
}
