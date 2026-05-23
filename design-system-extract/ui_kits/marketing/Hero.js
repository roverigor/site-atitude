function Hero({ onCTA }) {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">Cursos profissionalizantes · Presencial e EAD</span>
          <h1>
            <span className="underline">A atitude</span> que você precisa<br/>
            para <span className="accent">mudar o seu futuro.</span>
          </h1>
          <p className="lead">Ensino, Emprego, Idiomas e Tecnologia num só lugar. Da primeira matrícula ao primeiro contracheque novo — a gente caminha junto.</p>
          <div className="hero-ctas">
            <button className="btn btn-primary btn-lg" onClick={onCTA}>Ver cursos <i className="ph ph-arrow-right"></i></button>
            <button className="btn btn-ghost btn-lg" onClick={onCTA}>Falar com um consultor</button>
            <span className="micro"><b>+18 mil</b> alunos colocados desde 2018</span>
          </div>
        </div>

        <div className="hero-bento">
          <div className="bento-tile navy">
            <div>
              <div className="label" style={{opacity:1, color:'rgba(255,255,255,0.7)'}}>Aumento médio de salário<br/>dos nossos formados</div>
            </div>
            <div className="num">+74<span className="small">%</span></div>
          </div>
          <div className="bento-tile lime">
            <div className="num">92<span className="small">%</span></div>
            <div className="label">empregados em até 6 meses</div>
          </div>
          <div className="bento-tile next">
            <div>
              <div className="label" style={{color:'var(--navy-500)'}}>Próxima turma</div>
              <div className="date" style={{marginTop:'6px'}}>18 mar<span>noite · presencial</span></div>
            </div>
            <div style={{fontSize:'13px', fontWeight:700, color:'var(--orange-500)'}}>últimas 7 vagas →</div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.Hero = Hero;