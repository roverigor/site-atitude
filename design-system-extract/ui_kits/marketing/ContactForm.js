function ContactForm({ onSubmitted }) {
  const [state, setState] = React.useState({ nome: '', email: '', tel: '', interesse: 'Idiomas', objetivo: 'Conseguir o primeiro emprego', msg: '' });
  const set = (k) => (e) => setState({ ...state, [k]: e.target.value });
  const submit = (e) => { e.preventDefault(); onSubmitted(state); };

  return (
    <section className="contact">
      <div className="container contact-grid">
        <div>
          <span className="eyebrow">Fala com a gente</span>
          <h2>Conta o seu <span className="accent">próximo passo.</span></h2>
          <p className="lead">A gente liga, escuta e indica o curso certo. Sem ligação chata de vendedor — promessa.</p>
          <div className="contact-info">
            <div className="row">
              <div className="icon-cap"><i className="ph ph-whatsapp-logo"></i></div>
              <div><strong>(11) 0000-0000</strong><span>WhatsApp · resposta em até 1h, dias úteis</span></div>
            </div>
            <div className="row">
              <div className="icon-cap"><i className="ph ph-envelope-simple"></i></div>
              <div><strong>oi@atitudeensino.com.br</strong><span>Para dúvidas com mais detalhe.</span></div>
            </div>
            <div className="row">
              <div className="icon-cap"><i className="ph ph-map-pin"></i></div>
              <div><strong>5 unidades · SP, RJ, BH, POA, REC</strong><span>Plus EAD em todo o Brasil.</span></div>
            </div>
          </div>
        </div>
        <form className="form-card" onSubmit={submit}>
          <div className="field"><label>Seu nome</label><input value={state.nome} onChange={set('nome')} placeholder="Como podemos te chamar?" required/></div>
          <div className="field-row">
            <div className="field"><label>E-mail</label><input type="email" value={state.email} onChange={set('email')} placeholder="voce@email.com" required/></div>
            <div className="field"><label>WhatsApp</label><input value={state.tel} onChange={set('tel')} placeholder="(11) 99999-0000"/></div>
          </div>
          <div className="field-row">
            <div className="field"><label>Área de interesse</label>
              <select value={state.interesse} onChange={set('interesse')}>
                <option>Ensino</option><option>Emprego</option><option>Idiomas</option><option>Tecnologia</option><option>Ainda não decidi</option>
              </select>
            </div>
            <div className="field"><label>Seu objetivo</label>
              <select value={state.objetivo} onChange={set('objetivo')}>
                <option>Conseguir o primeiro emprego</option>
                <option>Aumentar meu salário</option>
                <option>Ganhar uma promoção</option>
                <option>Trocar de área</option>
                <option>Aprender por curiosidade</option>
              </select>
            </div>
          </div>
          <div className="field"><label>Quer contar mais? (opcional)</label><textarea value={state.msg} onChange={set('msg')} placeholder="Aonde você quer chegar? A gente lê tudo."></textarea></div>
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>Quero saber mais <i className="ph ph-arrow-right"></i></button>
          <p style={{fontSize:'12px',color:'var(--navy-500)',textAlign:'center',margin:'12px 0 0'}}>Ao enviar você aceita receber contato pelos canais informados.</p>
        </form>
      </div>
    </section>
  );
}

function ContactSuccess({ data, onBack }) {
  return (
    <section className="contact">
      <div className="container" style={{ maxWidth: '640px', textAlign: 'center' }}>
        <div style={{ width: '96px', height: '96px', borderRadius: '999px', background: 'var(--lime-500)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '52px', color: 'var(--navy-900)', marginBottom: '24px' }}>
          <i className="ph ph-check"></i>
        </div>
        <h2 style={{ font: '900 56px/1.02 var(--font-display)', letterSpacing: '-0.025em', color: 'var(--navy-900)', margin: '0 0 16px' }}>Recebido, {data.nome ? data.nome.split(' ')[0] : 'beleza'}.</h2>
        <p style={{ fontSize: '20px', color: 'var(--navy-500)', lineHeight: '1.5', margin: '0 0 32px' }}>Seu próximo passo já está no nosso radar. A gente chama no WhatsApp em até 1h útil — sem ligação chata.</p>
        <button className="btn btn-primary btn-lg" onClick={onBack}>Voltar pro início</button>
      </div>
    </section>
  );
}
window.ContactForm = ContactForm;
window.ContactSuccess = ContactSuccess;