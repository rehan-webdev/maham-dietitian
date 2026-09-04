import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { ArrowRight, ArrowUp, ArrowUpRight, Check, Download, Menu, Minus, Plus, X } from 'lucide-react';
import { Botanical, Brand, InstagramIcon } from './components/Brand';
import { Experiences, GuideBook } from './components/Experiences';
import { Modal } from './components/Modal';
import { articles, faqItems, images, INSTAGRAM_HANDLE, INSTAGRAM_URL, programs } from './data/content';
import { modalUrl, useModalRoute } from './hooks/useModalRoute';
import { usePersistentList } from './hooks/usePersistentList';
import type { DownloadRequest, ModalRoute } from './types';

const navigation = [
  { id: 'about', label: 'The philosophy' },
  { id: 'programs', label: 'Programs' },
  { id: 'journal', label: 'The journal' },
  { id: 'resources', label: 'Free resources' },
  { id: 'faqs', label: 'FAQs' },
];

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -45px 0px' }} transition={{ duration: 0.65, delay, ease: [0.2, 0.65, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

function ExperienceLink({ route, openModal, children, className = '' }: { route: ModalRoute; openModal: (route: ModalRoute) => void; children: ReactNode; className?: string }) {
  return <a className={className} href={modalUrl(route)} onClick={(event) => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); openModal(route); }}>{children}</a>;
}

function Header({ activeSection, scrolled, openModal }: { activeSection: string; scrolled: boolean; openModal: (route: ModalRoute) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="header-inner">
        <a className="brand-link" href="#home" aria-label="Maham, home" onClick={() => setMenuOpen(false)}><Brand /></a>
        <nav className={`primary-nav ${menuOpen ? 'is-open' : ''}`} id="primary-navigation" aria-label="Main navigation">
          {navigation.map((item) => <a key={item.id} className={activeSection === item.id ? 'is-active' : ''} href={`#${item.id}`} onClick={() => setMenuOpen(false)} aria-current={activeSection === item.id ? 'location' : undefined}>{item.label}</a>)}
          <button className="button button-primary mobile-nav-cta" onClick={() => { setMenuOpen(false); openModal({ type: 'quiz' }); }}>Find your glow <ArrowUpRight size={16} /></button>
          <a className="mobile-instagram" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><InstagramIcon size={17} />{INSTAGRAM_HANDLE}</a>
        </nav>
        <div className="header-actions">
          <a className="header-instagram icon-button" href={INSTAGRAM_URL} aria-label="Visit Maham on Instagram" target="_blank" rel="noopener noreferrer"><InstagramIcon size={19} /></a>
          <button className="button button-primary header-cta" onClick={() => openModal({ type: 'quiz' })}>Find your glow <ArrowUpRight size={16} /></button>
          <button className="menu-toggle icon-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={25} strokeWidth={1.4} /> : <Menu size={25} strokeWidth={1.4} />}</button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <motion.img className="hero-image" src={images.hero} alt="An ivory-clad South Asian bride holding a bouquet of blush roses and eucalyptus" fetchPriority="high" initial={{ scale: 1.035 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: [0.2, 0.65, 0.3, 1] }} />
      <div className="hero-wash" />
      <div className="page-width hero-inner">
        <div className="hero-copy">
          <motion.p className="eyebrow hero-eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }}><span />BRIDAL NUTRITION & WELLNESS</motion.p>
          <motion.h1 id="hero-title" initial={{ opacity: 0, y: 19 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.16 }}><span className="hero-brand">The Maham</span><span>kind of <em>glow.</em></span></motion.h1>
          <motion.p className="hero-description" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>Feel nourished, confident, and beautifully you.<br className="desktop-break" /> Thoughtful nutrition for your bridal chapter and beyond.</motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.42 }}><a className="button button-primary" href="#programs">Explore the programs <ArrowRight size={17} strokeWidth={1.6} /></a><a className="text-link hero-secondary" href="#about">Our philosophy <ArrowUpRight size={16} strokeWidth={1.6} /></a></motion.div>
        </div>
      </div>
    </section>
  );
}

function About({ openModal }: { openModal: (route: ModalRoute) => void }) {
  return (
    <section className="about-section section-space" id="about" aria-labelledby="about-title">
      <div className="page-width about-grid">
        <Reveal className="about-visual"><div className="about-image-wrap"><img src={images.nourish} alt="Everyday nourishment: a fresh chickpea salad, lemon water, and a blush rose" loading="lazy" /></div><Botanical className="about-botanical" /></Reveal>
        <Reveal className="about-copy" delay={0.12}>
          <p className="eyebrow">THE MAHAM PHILOSOPHY</p>
          <h2 id="about-title">A beautiful day starts<br />with <em>feeling like you.</em></h2>
          <p>There is so much to look forward to. Your nutrition shouldn't be another thing to worry about.</p>
          <p>Make space for food you love, everyday nourishment, and habits that stay with you long after the celebrations.</p>
          <p className="about-reminder">No crash diets. No pressure. Just a little more care.</p>
          <button className="text-link" onClick={() => openModal({ type: 'about' })}>A little more about our approach <ArrowUpRight size={17} /></button>
        </Reveal>
      </div>
    </section>
  );
}

function Programs({ openModal }: { openModal: (route: ModalRoute) => void }) {
  return (
    <section className="programs-section section-space" id="programs" aria-labelledby="programs-title">
      <div className="page-width">
        <Reveal className="section-heading centered"><p className="eyebrow">YOUR CHAPTER, YOUR PACE</p><h2 id="programs-title">Nourishment for <em>your next chapter.</em></h2><p>Three self-guided paths. Small, thoughtful steps. A kinder way forward.</p></Reveal>
        <div className="program-grid">
          {programs.map((program, index) => <Reveal key={program.id} delay={index * 0.09}><ExperienceLink className="program-card" route={{ type: 'program', id: program.id }} openModal={openModal}><div className="program-image-wrap"><img src={program.image} alt={program.imageAlt} style={{ objectPosition: program.imagePosition }} loading="lazy" /></div><div className="program-label"><span>{program.number}</span><span>{program.tag}</span></div><h3>{program.title}<ArrowUpRight size={21} strokeWidth={1.4} /></h3><p>{program.intro}</p><span className="program-link">Explore this path <ArrowRight size={16} /></span></ExperienceLink></Reveal>)}
        </div>
        <Reveal className="programs-help"><span>Not sure where to begin?</span><button className="text-link" onClick={() => openModal({ type: 'quiz' })}>Let's find your starting point <ArrowRight size={16} /></button></Reveal>
      </div>
    </section>
  );
}

function Resources({ openModal }: { openModal: (route: ModalRoute) => void }) {
  return (
    <section className="resources-section" id="resources" aria-labelledby="resources-title">
      <div className="page-width resource-grid">
        <Reveal className="resource-copy"><p className="eyebrow">A LITTLE GIFT FOR YOUR BRIDAL CHAPTER</p><h2 id="resources-title">Something lovely,<br /><em>just for you.</em></h2><p>A practical little guide to feeling nourished before, during, and after your big day. Yours to keep and make your own.</p><button className="button button-primary" onClick={() => openModal({ type: 'guide' })}>Get the free bridal guide <Download size={16} /></button><span className="resource-note">No email. No sign-up. Just a little support.</span><button className="text-link resource-planner-link" onClick={() => openModal({ type: 'planner' })}>Or make your own wellness checklist <ArrowUpRight size={16} /></button></Reveal>
        <Reveal className="guide-scene" delay={0.12}><Botanical className="guide-botanical" /><button className="book-button" onClick={() => openModal({ type: 'guide' })} aria-label="Preview and download the free bridal wellness guide"><GuideBook /></button></Reveal>
      </div>
    </section>
  );
}

function Journal({ openModal }: { openModal: (route: ModalRoute) => void }) {
  return (
    <section className="journal-section section-space" id="journal" aria-labelledby="journal-title">
      <div className="page-width">
        <Reveal className="section-heading journal-heading"><div><p className="eyebrow">SIMPLE IDEAS. A SOFTER PERSPECTIVE.</p><h2 id="journal-title">A little food <em>for thought.</em></h2></div><button className="text-link" onClick={() => openModal({ type: 'journal' })}>Explore the journal <ArrowUpRight size={17} /></button></Reveal>
        <div className="article-grid">{articles.slice(0, 3).map((article, index) => <Reveal delay={index * 0.09} key={article.id}><ExperienceLink className="article-card" route={{ type: 'article', id: article.id }} openModal={openModal}><div className="article-image-wrap"><img src={article.image} alt={article.imageAlt} style={{ objectPosition: article.imagePosition }} loading="lazy" /></div><div className="article-meta"><span>{article.category}</span><span>{article.readTime}</span></div><h3>{article.title}<ArrowUpRight size={21} strokeWidth={1.4} /></h3><p>{article.excerpt}</p></ExperienceLink></Reveal>)}</div>
      </div>
    </section>
  );
}

function FAQs() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);
  return (
    <section className="faq-section section-space" id="faqs" aria-labelledby="faq-title">
      <div className="page-width faq-grid">
        <Reveal className="faq-intro"><p className="eyebrow">A LITTLE CLARITY</p><h2 id="faq-title">You might<br />be <em>wondering.</em></h2><p>A few thoughtful answers<br />before you find your own pace.</p><Botanical className="faq-botanical" /></Reveal>
        <Reveal className="faq-list" delay={0.1}>{faqItems.map((item, index) => <section className={`faq-item ${openQuestion === index ? 'is-open' : ''}`} key={item.question}><h3><button id={`faq-question-${index}`} aria-expanded={openQuestion === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpenQuestion(openQuestion === index ? null : index)}><span>{item.question}</span>{openQuestion === index ? <Minus size={19} strokeWidth={1.4} /> : <Plus size={19} strokeWidth={1.4} />}</button></h3><AnimatePresence initial={false}>{openQuestion === index && <motion.div className="collapsible-body" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} key={`answer-${index}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.24 }}><p>{item.answer}</p></motion.div>}</AnimatePresence></section>)}</Reveal>
      </div>
    </section>
  );
}

function InstagramSection() {
  const moodboard = [
    { src: images.nourish, alt: 'Colourful food and soft blush roses', position: 'center 65%' },
    { src: images.hero, alt: 'Ivory bridal details and a soft rose bouquet', position: '90% center' },
    { src: images.journal, alt: 'A quiet moment with a journal and white tulips', position: 'center 48%' },
    { src: images.breakfast, alt: 'Berries and yoghurt for a simple breakfast', position: 'center 48%' },
  ];
  return (
    <section className="social-section" aria-labelledby="social-title">
      <div className="page-width">
        <Reveal className="social-heading"><div><p className="eyebrow">A LITTLE NOURISHMENT FOR YOUR FEED</p><h2 id="social-title">Let's grow <em>beautifully, together.</em></h2><p>Find more from Maham, over on Instagram.</p></div><a className="instagram-link" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><InstagramIcon size={21} /><span>{INSTAGRAM_HANDLE}</span><ArrowUpRight size={18} /></a></Reveal>
        <div className="social-grid">{moodboard.map((image, index) => <Reveal key={image.src} delay={index * 0.07}><a className="social-image" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label={`Visit Maham on Instagram. Editorial inspiration: ${image.alt}`}><img src={image.src} alt={image.alt} style={{ objectPosition: image.position }} loading="lazy" /><span className="social-image-overlay"><InstagramIcon size={27} /><span>Visit Instagram</span><ArrowUpRight size={18} /></span></a></Reveal>)}</div>
        <p className="moodboard-note">An editorial moodboard. Visit Instagram for Maham's own posts.</p>
      </div>
    </section>
  );
}

function Footer({ openModal }: { openModal: (route: ModalRoute) => void }) {
  return (
    <footer className="site-footer">
      <div className="page-width">
        <div className="footer-grid">
          <div className="footer-brand"><a href="#home" aria-label="Maham, back to home"><Brand large /></a><p>For your wedding.<br /><em>For your wellbeing.</em></p></div>
          <div className="footer-column"><h2>EXPLORE</h2>{navigation.map((item) => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}</div>
          <div className="footer-column"><h2>A LITTLE SUPPORT</h2><button onClick={() => openModal({ type: 'guide' })}>The free bridal guide</button><button onClick={() => openModal({ type: 'planner' })}>Your wellness checklist</button><button onClick={() => openModal({ type: 'quiz' })}>Find your starting point</button><button onClick={() => openModal({ type: 'journal' })}>Your reading corner</button></div>
          <div className="footer-column footer-social"><h2>LET'S KEEP GROWING</h2><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><InstagramIcon size={18} />Instagram<ArrowUpRight size={15} /></a><p>A softer kind of bridal prep.<br />One little step at a time.</p></div>
        </div>
        <div className="footer-bottom"><p>&copy; {new Date().getFullYear()} Maham. Beautifully nourished.</p><div><button onClick={() => openModal({ type: 'privacy' })}>Privacy & your data</button><button onClick={() => openModal({ type: 'terms' })}>Terms & wellbeing</button></div><a href="#home" className="footer-top-link">Back to the top <ArrowUp size={14} /></a></div>
        <p className="footer-disclaimer">A gentle note: these resources offer general education, not personalised medical advice. For your individual health needs, please consult a qualified healthcare professional. For Maham's current professional services, visit the linked Instagram profile.</p>
      </div>
    </footer>
  );
}

export default function App() {
  const { modal, openModal, closeModal } = useModalRoute();
  const [savedArticles, setSavedArticles] = usePersistentList('maham-saved-articles');
  const [completedSteps, setCompletedSteps] = usePersistentList('maham-completed-steps');
  const [completedPlanner, setCompletedPlanner] = usePersistentList('maham-wellness-checklist');
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
  const notify = useCallback((message: string) => setToast({ id: Date.now(), message }), []);

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 20); setShowTop(window.scrollY > 1000); if (window.scrollY < 240) setActiveSection('home'); };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); }); }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
    navigation.forEach((item) => { const section = document.getElementById(item.id); if (section) observer.observe(section); });
    return () => { window.removeEventListener('scroll', handleScroll); observer.disconnect(); };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 5500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const baseTitle = 'Maham | Bridal Nutrition & Wellness';
    if (modal?.type === 'article') document.title = `${articles.find((article) => article.id === modal.id)?.title || 'The Journal'} | Maham`;
    else if (modal?.type === 'program') document.title = `${programs.find((program) => program.id === modal.id)?.title || 'Your Path'} | Maham`;
    else document.title = baseTitle;
  }, [modal]);

  const toggleSaved = (id: string) => {
    const wasSaved = savedArticles.includes(id);
    setSavedArticles((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    notify(wasSaved ? 'Story removed from your saved collection.' : 'Saved for a quiet moment. Find it in the journal.');
  };

  const toggleStep = (id: string) => setCompletedSteps((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const togglePlanner = (id: string) => setCompletedPlanner((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  const handleDownload = async (request: DownloadRequest) => {
    if (downloading) return;
    setDownloading(true);
    try {
      const { downloadPdf } = await import('./utils/pdf');
      downloadPdf(request);
      notify('Your little guide is ready. Check your downloads.');
    } catch {
      notify('Your PDF could not be prepared. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const clearData = () => {
    setSavedArticles([]);
    setCompletedSteps([]);
    setCompletedPlanner([]);
    notify('Your saved articles and progress have been cleared from this browser.');
  };

  const routeKey = modal ? `${modal.type}${'id' in modal ? `-${modal.id}` : ''}` : '';
  const notification = <AnimatePresence>{toast && <motion.div className="toast" key={toast.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}><Check size={17} /><span>{toast.message}</span><button aria-label="Dismiss notification" onClick={() => setToast(null)}><X size={16} /></button></motion.div>}</AnimatePresence>;

  return (
    <MotionConfig reducedMotion="user">
      <div id="home">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Header activeSection={activeSection} scrolled={scrolled} openModal={openModal} />
        <main id="main-content">
          <Hero />
          <About openModal={openModal} />
          <Programs openModal={openModal} />
          <Resources openModal={openModal} />
          <Journal openModal={openModal} />
          <FAQs />
          <InstagramSection />
        </main>
        <Footer openModal={openModal} />
        <AnimatePresence>{showTop && !modal && <motion.a href="#home" className="back-to-top" aria-label="Back to the top" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}><ArrowUp size={18} strokeWidth={1.5} /></motion.a>}</AnimatePresence>
      </div>
      {modal && <Modal onClose={closeModal} routeKey={routeKey} wide={modal.type === 'journal' || modal.type === 'guide'} notification={notification}><Experiences route={modal} openModal={openModal} savedArticles={savedArticles} toggleSaved={toggleSaved} completedSteps={completedSteps} toggleStep={toggleStep} completedPlanner={completedPlanner} togglePlanner={togglePlanner} resetPlanner={() => setCompletedPlanner([])} clearData={clearData} onDownload={handleDownload} downloading={downloading} notify={notify} /></Modal>}
      {!modal && <div className="toast-region" aria-live="polite" aria-atomic="true">{notification}</div>}
    </MotionConfig>
  );
}
