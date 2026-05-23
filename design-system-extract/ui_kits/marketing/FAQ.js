function FAQ() {
  const [openIdx, setOpenIdx] = React.useState(0);
  const items = [
    { q: 'Os cursos têm certificado reconhecido?', a: 'Sim. Todos os nossos cursos profissionalizantes são reconhecidos por órgãos competentes e o certificado é aceito em qualquer processo seletivo do país.' },
    { q: 'Posso fazer EAD e ainda assim conseguir emprego?', a: 'Pode. Mais de 60% dos alunos colocados no último ano fizeram EAD. O que conta é o conteúdo, o projeto final e o suporte do nosso time de empregabilidade — disponível para os dois formatos.' },
    { q: 'E se eu travar ou precisar trancar?', a: 'A gente conversa. Você pode pausar o curso por até 90 dias sem custo, ou remarcar a turma. Sem multa surpresa.' },
    { q: 'Como funciona o suporte para conseguir emprego?', a: 'Revisão de currículo + LinkedIn, simulação de entrevista, e indicação direta para nossas +120 empresas parceiras. Tudo incluso, sem upsell.' },
    { q: 'Tem desconto para grupo ou para empresa?', a: 'Tem. Empresas podem matricular times com até 35% off. Grupos de amigos a partir de 3 pessoas ganham 15%. Fala com a gente que a gente monta.' },
  ];
  return (
    <section className="faq">
      <div className="container faq-grid">
        <div>
          <span className="eyebrow">Perguntas frequentes</span>
          <h2>A gente <span className="script">te conta</span> tudo antes.</h2>
          <p className="sub">Sem letras miúdas, sem surpresa no boleto.</p>
          <a href="#" className="help" onClick={(e)=>e.preventDefault()}><i className="ph ph-whatsapp-logo"></i> Falar pelo WhatsApp</a>
        </div>
        <div className="faq-list">
          {items.map((it, i) => (
            <div key={i} className={`faq-item ${openIdx === i ? 'open' : ''}`}>
              <button className="q" onClick={() => setOpenIdx(openIdx === i ? -1 : i)}>
                {it.q}
                <span className="icon"><i className="ph ph-plus"></i></span>
              </button>
              <div className="a">{it.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.FAQ = FAQ;