function Marquee() {
  const quotes = [
    { name: 'Carla',   role: 'analista de marketing',  text: 'mudei de área em 9 meses' },
    { name: 'Jonas',   role: 'técnico em logística',   text: 'duas promoções pelo Excel' },
    { name: 'Rebeca',  role: 'auxiliar administrativa',text: 'primeiro emprego aos 19' },
    { name: 'Diego',   role: 'desenvolvedor júnior',   text: 'larguei a obra pelo código' },
    { name: 'Aline',   role: 'gerente de loja',        text: 'virei gerente em 14 meses' },
    { name: 'Murilo',  role: 'analista financeiro',    text: 'saí do estoque pro escritório' },
    { name: 'Bia',     role: 'professora de inglês',   text: 'agora ensino quem ensinou' },
    { name: 'Felipe',  role: 'atendimento internacional', text: 'falei com cliente em inglês' },
    { name: 'Patrícia',role: 'coordenadora de RH',     text: 'aprendi a contratar gente boa' },
    { name: 'Wesley',  role: 'designer freelancer',    text: 'larguei o uber, virei freela' },
    { name: 'Tati',    role: 'analista de dados',      text: 'do Excel ao Power BI em 6 meses' },
    { name: 'Cleber',  role: 'vendedor sênior',        text: 'dobrei minha comissão' },
    { name: 'Iara',    role: 'recepcionista bilíngue', text: 'agora atendo em três idiomas' },
    { name: 'Pedro',   role: 'analista de tráfego',    text: 'mãe orgulhosa, salário melhor' },
    { name: 'Lívia',   role: 'social media',           text: 'meu portfólio fez tudo' },
    { name: 'Rodrigo', role: 'auxiliar de TI',         text: 'fugi do call center pra sempre' },
  ];
  // Duplicate ONCE for seamless loop; aria-hidden the copies so screen readers don't repeat.
  return (
    <section className="marquee-section">
      <div className="container">
        <div className="marquee-section-head">
          <h2>A vida muda <span className="script">no detalhe.</span></h2>
        </div>
      </div>
      <div className="marquee marquee-reverse">
        <div className="marquee-track">
          {quotes.map((q, i) => (
            <div key={i} className="mini-quote">
              <span className="mq-text">"{q.text}"</span>
              <span className="mq-meta">— {q.name}, <em>{q.role}</em></span>
            </div>
          ))}
          {quotes.map((q, i) => (
            <div key={'b-'+i} className="mini-quote" aria-hidden="true">
              <span className="mq-text">"{q.text}"</span>
              <span className="mq-meta">— {q.name}, <em>{q.role}</em></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Marquee = Marquee;