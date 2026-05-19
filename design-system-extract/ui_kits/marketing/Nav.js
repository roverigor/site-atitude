function Nav({ page, onNav }) {
  const link = (key, label) => (
    <li><a href="#" className={page === key ? 'active' : ''} onClick={(e)=>{e.preventDefault(); onNav(key);}}>{label}</a></li>
  );
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href="#" className="nav-logo" onClick={(e)=>{e.preventDefault(); onNav('home');}}>
          <img src="../../assets/logo-atitude-wordmark.png" alt="Atitude" />
        </a>
        <ul className="nav-links">
          {link('home', 'Início')}
          {link('course', 'Cursos')}
          <li><a href="#" onClick={(e)=>e.preventDefault()}>Para empresas</a></li>
          <li><a href="#" onClick={(e)=>e.preventDefault()}>Histórias</a></li>
          {link('contact', 'Fale com a gente')}
        </ul>
        <div className="nav-cta">
          <button className="btn btn-ghost btn-sm">Entrar</button>
          <button className="btn btn-primary btn-sm" onClick={()=>onNav('contact')}>Matricule-se</button>
        </div>
      </div>
    </nav>
  );
}
window.Nav = Nav;