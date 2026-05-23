function LogoCloud() {
  const companies = [
    { name: 'Magalu', c: 'var(--magenta-500)' },
    { name: 'Localiza', c: 'var(--lime-600)' },
    { name: 'iFood', c: 'var(--orange-500)' },
    { name: 'Banco Inter', c: 'var(--orange-600)' },
    { name: 'Nubank', c: 'var(--violet-500)' },
    { name: 'Stone', c: 'var(--lime-500)' },
    { name: 'Itaú', c: 'var(--orange-500)' },
    { name: 'Renner', c: 'var(--magenta-500)' },
    { name: 'Vivo', c: 'var(--violet-500)' },
    { name: 'Ambev', c: 'var(--orange-600)' },
    { name: 'XP Inc.', c: 'var(--lime-600)' },
    { name: 'Suzano', c: 'var(--violet-500)' },
  ];
  // duplicate for seamless marquee
  const row = [...companies, ...companies];
  return (
    <section className="logo-cloud">
      <div className="container">
        <div className="logo-cloud-head">
          <span className="eyebrow">Onde nossos alunos trabalham</span>
          <p className="logo-cloud-sub">+120 empresas parceiras contratam nossos formados todos os meses.</p>
        </div>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {row.map((co, i) => (
            <span key={i} className="company-pill" style={{ borderColor: co.c, color: co.c }}>{co.name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
window.LogoCloud = LogoCloud;