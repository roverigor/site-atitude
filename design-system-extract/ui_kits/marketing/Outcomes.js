function Outcomes() {
  return (
    <section className="outcomes">
      <div className="container">
        <span className="eyebrow" style={{color:'var(--lime-500)'}}>Histórias reais</span>
        <h2>Eles tomaram <span className="lime">a atitude.</span> E o salário acompanhou.</h2>
        <p className="sub">Três entre dezenas de milhares. Sem foto de banco de imagens, sem promessa milagrosa.</p>

        <div className="outcomes-grid">
          <div className="story-card featured">
            <div className="who">
              <div className="avatar" style={{ background: 'var(--violet-500)', color: 'var(--paper)' }}>CB</div>
              <div>
                <div className="name">Carla Bernardes</div>
                <div className="role">era operadora de caixa · hoje, analista de marketing</div>
              </div>
            </div>
            <div className="quote">"Eu tinha 24 anos e achava que ia ficar no caixa pra sempre. Entrei no Marketing Digital sem entender nada. Em 9 meses, mudei de área. Mudei a vida."</div>
            <div className="delta">
              <span className="before">R$ 1.412</span>
              <span className="arrow">→</span>
              <span className="after">R$ 4.500/mês</span>
              <span style={{fontSize:'13px', color:'var(--navy-500)', marginLeft:'auto'}}>9 meses depois</span>
            </div>
          </div>

          <div className="story-card">
            <div className="who">
              <div className="avatar" style={{ background: 'var(--orange-500)', color: 'var(--paper)' }}>JS</div>
              <div>
                <div className="name">Jonas Silveira</div>
                <div className="role">soldador · técnico em logística</div>
              </div>
            </div>
            <div className="quote">"O Excel sozinho já me deu duas promoções. Agora tô no escritório."</div>
            <div className="delta">
              <span className="before">R$ 2.100</span>
              <span className="arrow">→</span>
              <span className="after">R$ 3.800</span>
            </div>
          </div>

          <div className="story-card">
            <div className="who">
              <div className="avatar" style={{ background: 'var(--lime-500)', color: 'var(--navy-900)' }}>RM</div>
              <div>
                <div className="name">Rebeca Martins</div>
                <div className="role">primeiro emprego aos 19</div>
              </div>
            </div>
            <div className="quote">"Saí do curso de Administração já com a entrevista marcada. Foi rápido."</div>
            <div className="delta">
              <span className="before">—</span>
              <span className="arrow">→</span>
              <span className="after">R$ 2.350</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.Outcomes = Outcomes;