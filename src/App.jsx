import { useState } from 'react';
import './App.css';
import Sidebar from './components/layout/Sidebar';
import NetworkPage from './pages/NetworkPage';
import ClientsPage from './pages/ClientsPage';
import ConfigPage from './pages/ConfigPage';

const pages = {
  red: NetworkPage,
  clientes: ClientsPage,
  configuracion: ConfigPage,
};

export default function App() {
  const [activePage, setActivePage] = useState('red');
  const Page = pages[activePage];

  return (
    <div className="flex min-h-screen bg-background-deep">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <Page />
    </div>
  );
}
