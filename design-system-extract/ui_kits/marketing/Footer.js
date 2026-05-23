function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="../../assets/logo-atitude-wordmark.png" alt="Atitude" />
            <p>Cursos profissionalizantes pra quem quer mudar de vida — não só de currículo. Desde 2018.</p>
            <div className="socials">
              <a href="#" aria-label="Instagram"><i className="ph ph-instagram-logo"></i></a>
              <a href="#" aria-label="YouTube"><i className="ph ph-youtube-logo"></i></a>
              <a href="#" aria-label="TikTok"><i className="ph ph-tiktok-logo"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="ph ph-linkedin-logo"></i></a>
            </div>
          </div>
          <div>
            <h5>Cursos</h5>
            <ul>
              <li><a href="#">Ensino</a></li>
              <li><a href="#">Emprego</a></li>
              <li><a href="#">Idiomas</a></li>
              <li><a href="#">Tecnologia</a></li>
              <li><a href="#">Ver todos os 48 cursos</a></li>
            </ul>
          </div>
          <div>
            <h5>Atitude</h5>
            <ul>
              <li><a href="#">Quem somos</a></li>
              <li><a href="#">Para empresas</a></li>
              <li><a href="#">Histórias dos alunos</a></li>
              <li><a href="#">Unidades</a></li>
              <li><a href="#">Trabalhe com a gente</a></li>
            </ul>
          </div>
          <div>
            <h5>Ajuda</h5>
            <ul>
              <li><a href="#">Fale conosco</a></li>
              <li><a href="#">Central do aluno</a></li>
              <li><a href="#">Política de privacidade</a></li>
              <li><a href="#">Termos de uso</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Atitude Cursos Profissionalizantes · CNPJ 32.263.491/0001-50</span>
          <span>Feito com atitude no Brasil</span>
        </div>
      </div>
    </footer>
  );
}
window.Footer = Footer;