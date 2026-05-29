export default function TopBar({ title, badge, searchPlaceholder = 'Buscar nodos...' }) {
  return (
    <header className="h-16 w-full fixed top-0 z-40 bg-surface border-b border-outline-variant backdrop-blur-md bg-opacity-90 flex justify-between items-center px-gutter pl-[280px]">
      <div className="flex items-center gap-4">
        <h2 className="font-headline-sm text-headline-sm font-black text-on-surface tracking-tight">{title}</h2>
        {badge && (
          <span className="bg-surface-variant px-3 py-1 rounded-full font-label-sm text-label-sm text-primary">
            {badge}
          </span>
        )}
      </div>
      <div className="flex items-center gap-6">
        <div className="relative">
          <input
            className="bg-surface-container-highest border-none rounded-full px-4 py-1.5 text-body-md w-64 focus:ring-1 focus:ring-primary transition-all outline-none"
            placeholder={searchPlaceholder}
            type="text"
          />
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
        </div>
        <div className="flex items-center gap-4 text-on-surface-variant">
          <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">notifications</span>
          <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">settings</span>
          <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">help</span>
          <div className="h-8 w-8 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center font-label-md text-label-md text-primary">
            DA
          </div>
        </div>
      </div>
    </header>
  );
}
