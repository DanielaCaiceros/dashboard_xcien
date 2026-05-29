const navItems = [
  { id: 'red', label: 'Red', icon: 'hub' },
  { id: 'clientes', label: 'Clientes', icon: 'group' },
  { id: 'configuracion', label: 'Configuraci3n', icon: 'settings' },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant flex flex-col z-50">
      <div className="p-6 flex flex-col gap-1">
        <h1 className="font-headline-md text-headline-md font-bold text-primary">XCIEN NetOps</h1>
        <p className="font-label-md text-label-md text-on-surface-variant opacity-70">Admin Console</p>
      </div>
      <nav className="flex-grow mt-4">
        {navItems.map((item) => {
          const active = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full text-left flex items-center gap-3 py-3 transition-colors duration-200 cursor-pointer
                ${active
                  ? 'text-primary font-bold border-l-4 border-primary pl-4 bg-surface-container-high'
                  : 'text-on-surface-variant pl-5 hover:bg-surface-variant hover:text-on-surface'
                }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-label-md text-label-md">{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="p-6 border-t border-outline-variant" />
    </aside>
  );
}
