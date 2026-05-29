import TopBar from '../components/layout/TopBar';

export default function ConfigPage() {
  return (
    <div className="ml-64 pt-20 p-gutter min-h-screen">
      <TopBar title="Configuraci3n" badge="SETTINGS" />
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-4 text-on-surface-variant">
          <span className="material-symbols-outlined text-[64px]">settings</span>
          <p className="font-headline-sm text-headline-sm text-on-surface">Configuración del sistema</p>
          <span className="font-body-md text-body-md">Esta sección estará disponible próximamente</span>
        </div>
      </div>
    </div>
  );
}
