function App() {
  const [page, setPage] = React.useState('home');
  const [filter, setFilter] = React.useState(null);
  const [submitted, setSubmitted] = React.useState(null);

  React.useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const go = (p) => { setPage(p); setSubmitted(null); };
  const openCourse = (id) => { go('course'); };
  const selectPillar = (id) => { setFilter(filter === id ? null : id); };

  return (
    <div className="shell">
      <Nav page={page} onNav={go} />
      {page === 'home' && (
        <>
          <Hero onCTA={() => go('course')} />
          <LogoCloud />
          <Pillars active={filter} onSelect={selectPillar} />
          <Courses filter={filter} onOpen={openCourse} />
          <Outcomes />
          <Marquee />
          <Pricing onCTA={() => go('contact')} />
          <Steps />
          <FAQ />
        </>
      )}
      {page === 'course' && <CoursePage onContact={() => go('contact')} onHome={() => go('home')} />}
      {page === 'contact' && !submitted && <ContactForm onSubmitted={(d) => setSubmitted(d)} />}
      {page === 'contact' && submitted && <ContactSuccess data={submitted} onBack={() => go('home')} />}
      <CtaBar onCTA={() => go('contact')} />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);