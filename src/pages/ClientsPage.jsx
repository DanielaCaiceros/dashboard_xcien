import { clientStats } from '../data/mockData';
import StatCard from '../components/shared/StatCard';
import ClientsTable from '../components/clients/ClientsTable';
import TopBar from '../components/layout/TopBar';
import styles from './ClientsPage.module.css';

export default function ClientsPage() {
  const s = clientStats;

  return (
    <div className={styles.page}>
      <TopBar title="Dashboard XCIEN - Clientes" badge="CLIENTES HUB" searchPlaceholder="Search clients or nodes..." />
      <div className={styles.content}>
        <div className={styles.statsGrid}>
          <StatCard label="Clientes Totales" value={s.total.toString()}>
            <span className={styles.growth}>{s.growth}</span>
          </StatCard>
          <StatCard
            label={`Corporate`}
            value={s.corporate.count.toString()}
            subValue={`${s.corporate.percent}%`}
            progress={s.corporate.percent}
          />
          <StatCard
            label="PYME (SMB)"
            value={s.pyme.count.toString()}
            subValue={`${s.pyme.percent}%`}
            progress={s.pyme.percent}
          />
          <StatCard
            label="Empresarial"
            value={s.empresarial.count.toString()}
            subValue={`${s.empresarial.percent}%`}
            progress={s.empresarial.percent}
          />
        </div>
        <ClientsTable />
      </div>
    </div>
  );
}
