function Courses({ filter, onOpen }) {
  const all = [
    { id: 'ingles',   pillar: 'idiomas',    color: 'var(--idiomas)',    icon: 'ph-translate',     name: 'Inglês para o trabalho', blurb: 'Do "good morning" à reunião com a matriz. Aulas ao vivo, turmas de até 8.', dur: '6 meses', mod: 'Presencial · EAD', price: '149', tag: 'Mais procurado' },
    { id: 'excel',    pillar: 'tecnologia', color: 'var(--tecnologia)', icon: 'ph-microsoft-excel-logo', name: 'Excel do zero ao avançado', blurb: 'PROCV, dashboards, automações. Sai do curso fazendo planilha que ninguém da sua área faz.', dur: '4 meses', mod: 'EAD', price: '89', tag: '' },
    { id: 'admin',    pillar: 'ensino',     color: 'var(--ensino)',     icon: 'ph-clipboard-text', name: 'Administração', blurb: 'O básico que toda empresa exige: rotinas, financeiro, RH e atendimento. Para começar com o pé direito.', dur: '8 meses', mod: 'Presencial', price: '169', tag: '' },
    { id: 'vendas',   pillar: 'emprego',    color: 'var(--emprego)',    icon: 'ph-handshake',     name: 'Liderança e vendas', blurb: 'Para quem já vende e quer chegar em coordenação. Negociação, gestão de time, fechamento.', dur: '3 meses', mod: 'Presencial · noite', price: '199', tag: 'Promoção rápida' },
    { id: 'marketing', pillar: 'tecnologia', color: 'var(--tecnologia)', icon: 'ph-megaphone',     name: 'Marketing digital', blurb: 'Tráfego pago, conteúdo, IA aplicada. Termina o curso com 3 campanhas no portfólio.', dur: '5 meses', mod: 'EAD', price: '139', tag: 'Novo' },
    { id: 'espanhol', pillar: 'idiomas',    color: 'var(--idiomas)',    icon: 'ph-translate',     name: 'Espanhol em 6 meses', blurb: 'Conversação desde a primeira aula. Conteúdo focado em entrevistas e atendimento.', dur: '6 meses', mod: 'EAD ao vivo', price: '119', tag: '' },
  ];
  const visible = filter ? all.filter(c => c.pillar === filter) : all;
  return (
    <section className="section">
      <div className="container">
        <div className="courses-head">
          <div>
            <span className="eyebrow">Cursos em destaque</span>
            <h2>{filter ? `Cursos de ${filter}` : 'Comece pelo que muda seu próximo mês.'}</h2>
          </div>
          <a href="#" className="btn btn-ghost btn-sm" onClick={(e)=>e.preventDefault()}>Ver os 48 cursos <i className="ph ph-arrow-right"></i></a>
        </div>
        <div className="courses-grid">
          {visible.map(c => (
            <a key={c.id} className="course-card" onClick={(e)=>{e.preventDefault(); onOpen(c.id);}}>
              <div className="stripe" style={{ background: c.color }}></div>
              <div className="header">
                <span className={`chip chip-${c.pillar}`}><span className="dot"></span>{c.pillar.charAt(0).toUpperCase()+c.pillar.slice(1)}</span>
                {c.tag && <span className="chip chip-light" style={{ fontSize: '12px' }}>{c.tag}</span>}
              </div>
              <div className="body">
                <h3>{c.name}</h3>
                <p className="blurb">{c.blurb}</p>
                <div className="meta">
                  <span><i className="ph ph-clock" style={{verticalAlign:'-2px',marginRight:4}}></i><b>{c.dur}</b></span>
                  <span><i className="ph ph-monitor-play" style={{verticalAlign:'-2px',marginRight:4}}></i><b>{c.mod}</b></span>
                </div>
              </div>
              <div className="footer">
                <div className="price">a partir de <b>R$ {c.price},90</b><span>/mês</span></div>
                <span className="go">Conhecer <i className="ph ph-arrow-right"></i></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Courses = Courses;