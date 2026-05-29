import { networkStats } from '../data/mockData';
import StatCard from '../components/shared/StatCard';
import PresencePoints from '../components/network/PresencePoints';
import RingSaturation from '../components/network/RingSaturation';
import CapacityPanel from '../components/network/CapacityPanel';
import TopBar from '../components/layout/TopBar';
import styles from './NetworkPage.module.css';

function getProgressColor(value, max) {
  const pct = (value / max) * 100;
  if (pct >= 85) return 'var(--danger)';
  if (pct >= 65) return 'var(--warning)';
  return 'var(--primary)';
}

export default function NetworkPage() {
  const s = networkStats;

  return (
    <div className={styles.page}>
      <TopBar title="Dashboard XCIEN - Red e interfaces" badge="MONITOR EN VIVO" />
      <div className={styles.content}>
        <div className={styles.statsGrid}>
          <StatCard
            label="Capacidad Usada / Total"
            value={`${s.capacityUsed}`}
            subValue={`/ ${s.capacityTotal} TB`}
            progress={(s.capacityUsed / s.capacityTotal) * 100}
            progressColor={getProgressColor(s.capacityUsed, s.capacityTotal)}
          />
          <StatCard
            label="Interfaces Utilizadas"
            value={`${s.interfacesUsed}`}
            subValue={`/ ${s.interfacesTotal}`}
            progress={(s.interfacesUsed / s.interfacesTotal) * 100}
            progressColor="var(--primary)"
          />
          <StatCard
            label="Ocupación Promedio Anillo Norte"
            value={`${s.ringNorthAvg}`}
            subValue="%"
            progress={s.ringNorthAvg}
            progressColor={getProgressColor(s.ringNorthAvg, 100)}
          />
          <StatCard
            label="Ocupación Promedio Anillo Sur"
            value={`${s.ringSouthAvg}`}
            subValue="%"
            progress={s.ringSouthAvg}
            progressColor={getProgressColor(s.ringSouthAvg, 100)}
          />
        </div>

        <PresencePoints />

        <div className={styles.bottomGrid}>
          <RingSaturation />
          <CapacityPanel />
        </div>
      </div>
    </div>
  );
}
