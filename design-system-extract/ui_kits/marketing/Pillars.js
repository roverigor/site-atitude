function Pillars({ active, onSelect }) {
  const items = [
    { id: 'ensino',     name: 'Ensino',     icon: 'ph-graduation-cap' },
    { id: 'emprego',    name: 'Emprego',    icon: 'ph-briefcase' },
    { id: 'idiomas',    name: 'Idiomas',    icon: 'ph-translate' },
    { id: 'tecnologia', name: 'Tecnologia', icon: 'ph-code' },
  ];
  return (
    <section className="pillars-strip">
      <div className="container pillars-row">
        <span className="label">Áreas</span>
        <div className="pillars-pills">
          {items.map(p => (
            <button key={p.id} className={`pillar-pill ${p.id} ${active === p.id ? 'active' : ''}`} onClick={() => onSelect(p.id)}>
              <span className="dot"></span>
              <i className={`ph ${p.icon}`}></i>
              {p.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Pillars = Pillars;