function CtaBar({ onCTA }) {
  return (
    <div className="cta-bar">
      <div className="container cta-bar-inner">
        <div className="left">
          <span className="ping"></span>
          <span className="text">Próxima turma começa em <b>18 de março</b>.<span>Últimas 7 vagas.</span></span>
        </div>
        <div style={{display:'flex',gap:'12px'}}>
          <button className="btn btn-on-dark btn-sm" onClick={onCTA}>Quero garantir minha vaga <i className="ph ph-arrow-right"></i></button>
        </div>
      </div>
    </div>
  );
}
window.CtaBar = CtaBar;