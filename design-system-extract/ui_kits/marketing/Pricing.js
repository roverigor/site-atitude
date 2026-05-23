function Pricing({ onCTA }) {
  const plans = [
    {
      id: 'online',
      name: 'Online',
      tag: 'mais flexível',
      tagColor: 'var(--navy-100)',
      tagText: 'var(--navy-900)',
      price: '89',
      cents: ',90',
      full: '12x sem juros · ou R$ 999 à vista',
      features: ['Aulas gravadas + ao vivo semanais', 'Material digital', 'Comunidade fechada no Discord', 'Certificado reconhecido'],
      highlighted: false,
    },
    {
      id: 'hibrido',
      name: 'Híbrido',
      tag: 'escolha de 7 em 10',
      tagColor: 'var(--lime-500)',
      tagText: 'var(--navy-900)',
      price: '149',
      cents: ',90',
      full: '12x sem juros · ou R$ 1.598 à vista (10% off)',
      features: ['Tudo do Online', 'Aulas presenciais 2x/semana', 'Material físico em casa', 'Mentoria de carreira 1:1', 'Garantia de recolocação'],
      highlighted: true,
    },
    {
      id: 'premium',
      name: 'Premium 1:1',
      tag: 'individual',
      tagColor: 'var(--violet-100)',
      tagText: 'var(--violet-600)',
      price: '299',
      cents: ',90',
      full: '12x sem juros · ou R$ 3.198 à vista',
      features: ['Tudo do Híbrido', 'Aulas particulares com professor', 'Horário flexível', 'Acompanhamento até a contratação'],
      highlighted: false,
    },
  ];
  return (
    <section className="pricing">
      <div className="container">
        <div className="pricing-head">
          <span className="eyebrow">Planos</span>
          <h2>Escolha o ritmo que <span className="script">cabe na sua semana.</span></h2>
          <p className="pricing-sub">Mesmo conteúdo, três modalidades. Sem matrícula. Sem multa. Sem letra miúda.</p>
        </div>
        <div className="pricing-grid">
          {plans.map(p => (
            <div key={p.id} className={`plan ${p.highlighted ? 'plan-hi' : ''}`}>
              {p.highlighted && <span className="plan-badge"><span className="dot"></span>Mais escolhido</span>}
              <div className="plan-head">
                <span className="plan-tag" style={{ background: p.tagColor, color: p.tagText }}>{p.tag}</span>
                <h3>{p.name}</h3>
              </div>
              <div className="plan-price">
                <span className="from">a partir de</span>
                <div className="row">
                  <span className="curr">R$</span>
                  <span className="num">{p.price}</span>
                  <span className="cents">{p.cents}</span>
                  <span className="per">/mês</span>
                </div>
                <span className="full">{p.full}</span>
              </div>
              <ul>
                {p.features.map((f, i) => <li key={i}><i className="ph ph-check-fat"></i>{f}</li>)}
              </ul>
              <button className={`btn ${p.highlighted ? 'btn-primary' : 'btn-ghost'} btn-lg`} style={{ width: '100%', justifyContent: 'center' }} onClick={onCTA}>
                Quero esse plano
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Pricing = Pricing;