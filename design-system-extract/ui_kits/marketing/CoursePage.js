function CoursePage({ onContact, onHome }) {
  const modules = [
    { n: '01', t: 'Inglês do trabalho — fundamentos', d: 'Saudação, apresentação, e-mail, smalltalk de reunião.', dur: '4 semanas' },
    { n: '02', t: 'Reuniões e calls', d: 'Vocabulário técnico, dúvida, divergência, encerramento.', dur: '5 semanas' },
    { n: '03', t: 'Negociação e atendimento', d: 'Clientes internacionais, follow-up, objeções, fechamento.', dur: '6 semanas' },
    { n: '04', t: 'Entrevista de emprego em inglês', d: 'Pitch pessoal, perguntas clássicas, role-play 1:1 com nativo.', dur: '4 semanas' },
    { n: '05', t: 'Projeto final + certificação', d: 'Apresentação de 12 minutos diante de banca, simulando entrevista real.', dur: '5 semanas' },
  ];
  return (
    <div>
      <section className="course-hero">
        <div className="container">
          <div className="breadcrumbs">
            <a href="#" onClick={(e)=>{e.preventDefault(); onHome();}}>Início</a>
            <i className="ph ph-caret-right"></i>
            <a href="#" onClick={(e)=>e.preventDefault()}>Idiomas</a>
            <i className="ph ph-caret-right"></i>
            <span>Inglês para o trabalho</span>
          </div>
          <div className="course-hero-grid">
            <div>
              <span className="chip chip-idiomas"><span className="dot"></span>Idiomas</span>
              <h1>Inglês <span className="accent">para o trabalho.</span></h1>
              <p className="lead">Do "good morning" à reunião com a matriz. Aulas ao vivo, turmas de até 8 pessoas, professores que já trabalharam fora.</p>
              <div className="course-meta-grid">
                <div className="item"><div className="l">Duração</div><div className="v">6 meses · 96h</div></div>
                <div className="item"><div className="l">Formato</div><div className="v">Presencial ou EAD ao vivo</div></div>
                <div className="item"><div className="l">Nível</div><div className="v">Básico → Intermediário+</div></div>
                <div className="item"><div className="l">Certificado</div><div className="v">Aceito em entrevistas</div></div>
              </div>
              <p style={{fontFamily:'var(--font-accent)',fontSize:'24px',color:'var(--idiomas)',margin:'0 0 8px',transform:'rotate(-1deg)'}}>e tem teste de nível grátis 👇</p>
              <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
                <button className="btn btn-primary btn-lg" onClick={onContact}>Fazer teste de nível</button>
                <button className="btn btn-ghost btn-lg">Baixar a grade completa</button>
              </div>
            </div>

            <aside className="enroll-card">
              <span className="badge"><span className="dot"></span>turma com vagas</span>
              <div className="price-row">
                <span className="from">de R$ 189 por</span>
              </div>
              <div className="price-row">
                <span className="price">R$ 149</span>
                <span className="month">,90 / mês</span>
              </div>
              <div className="full">ou R$ 1.598 à vista (10% off)</div>
              <ul>
                <li><i className="ph ph-check-circle-fill"></i>96h com professores reais</li>
                <li><i className="ph ph-check-circle-fill"></i>Material físico + plataforma digital</li>
                <li><i className="ph ph-check-circle-fill"></i>Revisão de CV + LinkedIn em inglês</li>
                <li><i className="ph ph-check-circle-fill"></i>Garantia de recolocação ou devolução</li>
              </ul>
              <button className="btn btn-accent btn-lg" onClick={onContact}>Matricular agora <i className="ph ph-arrow-right"></i></button>
              <p className="small">Pague na primeira aula. Sem cartão agora.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="modules">
        <div className="container">
          <span className="eyebrow">A grade</span>
          <h2>Cinco módulos. Zero enrolação.</h2>
          <div className="modules-list">
            {modules.map(m => (
              <div key={m.n} className="module-item">
                <span className="n">{m.n}</span>
                <div>
                  <h4>{m.t}</h4>
                  <p>{m.d}</p>
                </div>
                <span className="dur">{m.dur}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
window.CoursePage = CoursePage;