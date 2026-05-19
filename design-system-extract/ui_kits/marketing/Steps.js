function Steps() {
  const items = [
    { n: '01', t: 'Você escolhe', d: 'Conta o que quer mudar — primeiro emprego, promoção, troca de área. A gente sugere o curso certo.' },
    { n: '02', t: 'A gente ensina', d: 'Aulas ao vivo ou no seu tempo. Materiais físicos e digitais. Suporte real com pessoas, não bot.' },
    { n: '03', t: 'Você pratica', d: 'Projetos com cara de mercado, não exercício de livro. Sai do curso com portfólio e currículo prontos.' },
    { n: '04', t: 'Trabalha', d: 'Nosso time de empregabilidade indica você para as empresas parceiras. +400 vagas/mês.' },
  ];
  return (
    <section className="steps">
      <div className="container">
        <div className="steps-head">
          <span className="eyebrow">Como funciona</span>
          <h2>Quatro passos. Sem letra miúda.</h2>
        </div>
        <div className="steps-grid">
          {items.map(s => (
            <div key={s.n} className="step">
              <span className="n">{s.n}</span>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Steps = Steps;