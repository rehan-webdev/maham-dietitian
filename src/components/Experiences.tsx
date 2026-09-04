import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Bookmark, Check, CheckCheck,
  Download, LoaderCircle, Minus, Plus, Search, Share2,
} from 'lucide-react';
import {
  articles, EATWELL_URL, guideSections, images, INSTAGRAM_HANDLE,
  INSTAGRAM_URL, plannerItems, programs,
  type Article, type Program,
} from '../data/content';
import { modalUrl } from '../hooks/useModalRoute';
import type { DownloadRequest, ModalRoute } from '../types';
import { Botanical, InstagramIcon } from './Brand';

interface ExperienceProps {
  route: ModalRoute;
  openModal: (route: ModalRoute) => void;
  savedArticles: string[];
  toggleSaved: (id: string) => void;
  completedSteps: string[];
  toggleStep: (id: string) => void;
  completedPlanner: string[];
  togglePlanner: (id: string) => void;
  resetPlanner: () => void;
  clearData: () => void;
  onDownload: (request: DownloadRequest) => void;
  downloading: boolean;
  notify: (message: string) => void;
}

function DownloadIcon({ busy }: { busy: boolean }) {
  return busy ? <LoaderCircle size={17} className="spin" /> : <Download size={17} />;
}

export function GuideBook({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`guide-book ${compact ? 'guide-book-compact' : ''}`} aria-hidden="true">
      <span className="book-wordmark">maham.</span>
      <span className="book-eyebrow">THE BRIDAL WELLNESS GUIDE</span>
      <span className="book-title">A little<br />nourishment.<br /><em>A lot of glow.</em></span>
      <div className="book-photo"><img src={images.nourish} alt="" loading="lazy" /></div>
      <span className="book-footer">BEFORE. DURING. BEAUTIFULLY BEYOND.</span>
    </div>
  );
}

function AboutExperience({ openModal }: Pick<ExperienceProps, 'openModal'>) {
  return (
    <div className="experience about-experience">
      <p className="eyebrow">THE MAHAM PHILOSOPHY</p>
      <h2 id="modal-title" tabIndex={-1}>For the bride.<br />And the woman <em>beyond.</em></h2>
      <p className="experience-intro">Your wedding is a chapter, not a deadline for your body.</p>
      <img className="experience-banner" src={images.nourish} alt="A nourishing salad and blush rose on a sunlit linen table" />
      <div className="prose">
        <p>Welcome to a softer approach to bridal wellbeing. This space brings together practical food ideas, thoughtful reading, and simple ways to take care of yourself, before your wedding and long after it.</p>
        <h3>Nourishment, not a transformation</h3>
        <p>You do not have to become a different person to deserve a beautiful day. Here, the focus is on making everyday nourishment more possible, not chasing a particular dress size or a promised bridal glow.</p>
        <h3>Real life. Real food.</h3>
        <p>Family meals, cultural traditions, busy days, and celebrations belong in the picture. A useful routine makes room for the food you enjoy and the life you actually live.</p>
        <h3>A little support, at your own pace</h3>
        <p>Explore the free, self-guided learning paths and journal. These are educational resources, not individual clinical care. For Maham's current professional services and details, visit the Instagram profile.</p>
      </div>
      <div className="experience-actions">
        <button className="button button-primary" onClick={() => openModal({ type: 'quiz' })}>Find your starting point <ArrowRight size={17} /></button>
        <a className="text-link" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Meet Maham on Instagram <ArrowUpRight size={16} /></a>
      </div>
    </div>
  );
}

function ProgramExperience({ program, completedSteps, toggleStep, openModal, onDownload, downloading }: {
  program: Program;
} & Pick<ExperienceProps, 'completedSteps' | 'toggleStep' | 'openModal' | 'onDownload' | 'downloading'>) {
  const [openStep, setOpenStep] = useState(0);
  const completed = program.steps.filter((step) => completedSteps.includes(step.id)).length;

  return (
    <div className="experience program-experience">
      <p className="eyebrow">YOUR SELF-GUIDED PATH / {program.number}</p>
      <h2 id="modal-title" tabIndex={-1}>{program.title}</h2>
      <p className="experience-intro">{program.focus}</p>
      <img className="experience-banner" src={program.image} style={{ objectPosition: program.imagePosition }} alt={program.imageAlt} />
      <div className="path-meta"><span>4 gentle steps</span><span>Free & at your own pace</span></div>
      <div className="progress-heading"><span>Your progress</span><span aria-live="polite">{completed} of {program.steps.length} complete</span></div>
      <progress className="wellness-progress" max={program.steps.length} value={completed} aria-label="Learning path progress" />
      <div className="path-steps">
        {program.steps.map((step, index) => {
          const isComplete = completedSteps.includes(step.id);
          const isOpen = openStep === index;
          return (
            <section className={`path-step ${isComplete ? 'is-complete' : ''}`} key={step.id}>
              <h3>
                <button className="path-step-toggle" aria-expanded={isOpen} aria-controls={`step-${step.id}`} onClick={() => setOpenStep(isOpen ? -1 : index)}>
                  <span className="step-number">{isComplete ? <Check size={18} /> : `0${index + 1}`}</span>
                  <span>{step.title}</span>
                  {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div key={step.id} id={`step-${step.id}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.23 }} className="collapsible-body">
                    <div className="path-step-content">
                      <p>{step.body}</p>
                      <p className="little-action"><span>A LITTLE ACTION</span>{step.action}</p>
                      <label className="check-label">
                        <input type="checkbox" checked={isComplete} onChange={() => toggleStep(step.id)} />
                        <span className="custom-check"><Check size={13} /></span>
                        <span>{isComplete ? 'A little care, well kept' : 'Mark this step complete'}</span>
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          );
        })}
      </div>
      {completed === program.steps.length && <p className="completion-message" role="status"><CheckCheck size={20} /> Your path is complete. Carry forward what feels helpful, and revisit whenever you like.</p>}
      <div className="experience-actions">
        <button className="button button-primary" disabled={downloading} onClick={() => onDownload({ kind: 'program', programId: program.id, completed: completedSteps })}>
          {downloading ? 'Preparing your PDF...' : 'Download this path'} <DownloadIcon busy={downloading} />
        </button>
        <button className="text-link" onClick={() => openModal({ type: 'article', id: program.relatedArticle })}>A little further reading <ArrowRight size={16} /></button>
      </div>
      <p className="fine-print">Progress is saved in this browser when storage is available. General education only, not a personalised meal plan or medical advice.</p>
    </div>
  );
}

function JournalExperience({ savedArticles, toggleSaved, openModal }: Pick<ExperienceProps, 'savedArticles' | 'toggleSaved' | 'openModal'>) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All stories');
  const [savedOnly, setSavedOnly] = useState(false);
  const categories = ['All stories', 'Nutrition', 'Bridal Wellbeing', 'Recipes'];
  const results = useMemo(() => articles.filter((article) => {
    const matchesQuery = `${article.title} ${article.excerpt} ${article.category}`.toLowerCase().includes(query.trim().toLowerCase());
    return matchesQuery && (category === 'All stories' || category === article.category) && (!savedOnly || savedArticles.includes(article.id));
  }), [query, category, savedOnly, savedArticles]);

  return (
    <div className="experience journal-experience">
      <p className="eyebrow">THE MAHAM JOURNAL</p>
      <h2 id="modal-title" tabIndex={-1}>A little food <em>for thought.</em></h2>
      <p className="experience-intro">Thoughtful reads, familiar food, and a softer kind of bridal prep.</p>
      <div className="journal-tools">
        <label className="search-field"><Search size={18} /><span className="sr-only">Search the journal</span><input type="search" placeholder="Find a little inspiration..." value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        <button className={`saved-filter ${savedOnly ? 'is-active' : ''}`} aria-pressed={savedOnly} onClick={() => setSavedOnly(!savedOnly)}><Bookmark size={17} fill={savedOnly ? 'currentColor' : 'none'} /> Saved <span>{savedArticles.length}</span></button>
      </div>
      <div className="journal-filters" aria-label="Filter stories by topic">
        {categories.map((item) => <button key={item} className={item === category ? 'is-active' : ''} aria-pressed={item === category} onClick={() => setCategory(item)}>{item}</button>)}
      </div>
      <p className="result-count" aria-live="polite">{results.length} {results.length === 1 ? 'story' : 'stories'}{savedOnly ? ' in your saved collection' : ' to settle into'}</p>
      <div className="journal-results">
        {results.map((article) => (
          <article className="journal-result" key={article.id}>
            <button className="journal-result-main" onClick={() => openModal({ type: 'article', id: article.id })}>
              <img src={article.image} alt={article.imageAlt} style={{ objectPosition: article.imagePosition }} loading="lazy" />
              <span className="journal-result-copy"><span className="eyebrow">{article.category}</span><span className="result-title">{article.title}</span><span className="result-excerpt">{article.excerpt}</span><span className="result-time">{article.readTime} <ArrowUpRight size={15} /></span></span>
            </button>
            <button className={`result-save icon-button ${savedArticles.includes(article.id) ? 'is-saved' : ''}`} aria-label={`${savedArticles.includes(article.id) ? 'Unsave' : 'Save'} ${article.title}`} aria-pressed={savedArticles.includes(article.id)} onClick={() => toggleSaved(article.id)}><Bookmark size={18} fill={savedArticles.includes(article.id) ? 'currentColor' : 'none'} /></button>
          </article>
        ))}
      </div>
      {results.length === 0 && <div className="empty-state"><Botanical /><h3>{savedOnly && !query ? 'Your quiet reading corner awaits.' : 'A fresh search, perhaps?'}</h3><p>{savedOnly ? 'Save a story using its bookmark, and you will find it here.' : 'Try a word like breakfast, wedding, or hydration.'}</p><button className="text-link" onClick={() => { setQuery(''); setCategory('All stories'); setSavedOnly(false); }}>Explore all stories <ArrowRight size={16} /></button></div>}
      <p className="fine-print">Your saved reading list stays on this device. No account needed.</p>
    </div>
  );
}

function ArticleExperience({ article, savedArticles, toggleSaved, openModal, onDownload, downloading, notify }: {
  article: Article;
} & Pick<ExperienceProps, 'savedArticles' | 'toggleSaved' | 'openModal' | 'onDownload' | 'downloading' | 'notify'>) {
  const [servings, setServings] = useState(1);
  const [showShareLink, setShowShareLink] = useState(false);
  const saved = savedArticles.includes(article.id);
  const shareUrl = modalUrl({ type: 'article', id: article.id });

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: `${article.title} | Maham`, url: shareUrl });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        notify('A little inspiration, ready to share. Link copied.');
      } else {
        setShowShareLink(true);
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;
      setShowShareLink(true);
    }
  };

  return (
    <article className="experience article-experience">
      <button className="back-link" onClick={() => openModal({ type: 'journal' })}><ArrowLeft size={16} /> Back to the journal</button>
      <p className="eyebrow">{article.category} <span className="eyebrow-divider">/</span> {article.readTime}</p>
      <h2 id="modal-title" tabIndex={-1}>{article.title}</h2>
      <p className="experience-intro">{article.excerpt}</p>
      <div className="article-actions">
        <button className={`text-link ${saved ? 'is-saved' : ''}`} aria-pressed={saved} onClick={() => toggleSaved(article.id)}><Bookmark size={16} fill={saved ? 'currentColor' : 'none'} />{saved ? 'Saved to your journal' : 'Save for a quiet moment'}</button>
        <button className="text-link" onClick={share}><Share2 size={16} />Share story</button>
      </div>
      {showShareLink && <label className="share-link-field"><span>Copy this link to share the story</span><input readOnly value={shareUrl} onFocus={(event) => event.target.select()} /></label>}
      <img className="article-banner" src={article.image} alt={article.imageAlt} style={{ objectPosition: article.imagePosition }} />
      <div className="prose">{article.sections.map((section) => <section key={section.heading}><h3>{section.heading}</h3><p>{section.body}</p></section>)}</div>
      {article.recipe && (
        <section className="recipe-detail">
          <div className="recipe-heading"><h3>A little of this...</h3><div className="serving-control"><span>Servings</span><button className="icon-button" aria-label="Decrease servings" disabled={servings === 1} onClick={() => setServings(servings - 1)}><Minus size={16} /></button><output aria-live="polite" aria-label="Number of servings">{servings}</output><button className="icon-button" aria-label="Increase servings" disabled={servings === 6} onClick={() => setServings(servings + 1)}><Plus size={16} /></button></div></div>
          <ul className="ingredient-list">{article.recipe.ingredients.map((ingredient) => <li key={ingredient.name}><span className="ingredient-quantity">{ingredient.quantity * servings} {ingredient.unit}</span><span>{ingredient.name}</span></li>)}</ul>
          <h3>And a little time.</h3>
          <ol className="recipe-method">{article.recipe.steps.map((step) => <li key={step}>{step}</li>)}</ol>
          <p className="fine-print">{article.recipe.note}</p>
          <button className="button button-primary" disabled={downloading} onClick={() => onDownload({ kind: 'recipe', articleId: article.id, servings })}>{downloading ? 'Preparing your PDF...' : 'Keep this recipe'} <DownloadIcon busy={downloading} /></button>
        </section>
      )}
      {article.source && <p className="article-source">A little further reading: <a href={article.source.url} target="_blank" rel="noopener noreferrer">{article.source.label} <ArrowUpRight size={13} /></a></p>}
      <p className="fine-print article-disclaimer">General education for adults, not personal medical advice. If you have a health condition, allergies, pregnancy-related needs, or concerns about eating, please seek individual support from a qualified healthcare professional.</p>
      <button className="text-link" onClick={() => openModal({ type: 'journal' })}>Stay a little longer in the journal <ArrowRight size={16} /></button>
    </article>
  );
}

function GuideExperience({ onDownload, downloading, openModal }: Pick<ExperienceProps, 'onDownload' | 'downloading' | 'openModal'>) {
  return (
    <div className="experience guide-experience">
      <p className="eyebrow">A LITTLE SOMETHING, JUST FOR YOU</p>
      <h2 id="modal-title" tabIndex={-1}>Your bridal <em>wellness guide.</em></h2>
      <p className="experience-intro">Practical ideas for a nourished bridal chapter. Yours to read, print, and make your own.</p>
      <div className="guide-preview"><GuideBook compact /><div><p className="eyebrow">INSIDE YOUR LITTLE GUIDE</p><ol>{guideSections.map((section, index) => <li key={section.title}><span>0{index + 1}</span><div><h3>{section.title}</h3><p>{section.intro}</p></div></li>)}</ol></div></div>
      <div className="experience-actions"><button className="button button-primary" disabled={downloading} onClick={() => onDownload({ kind: 'guide' })}>{downloading ? 'Preparing your PDF...' : 'Download the free guide'} <DownloadIcon busy={downloading} /></button><span className="download-details">4-page PDF. No email. No sign-up.</span></div>
      <div className="related-resource"><div><span className="eyebrow">MAKE IT YOUR OWN</span><h3>One small step at a time.</h3><p>A simple checklist you can tick off and keep.</p></div><button className="text-link" onClick={() => openModal({ type: 'planner' })}>Open your wellness checklist <ArrowRight size={16} /></button></div>
      <p className="fine-print">This guide contains general educational information, not a personalised diet plan or treatment.</p>
    </div>
  );
}

function PlannerExperience({ completedPlanner, togglePlanner, resetPlanner, onDownload, downloading }: Pick<ExperienceProps, 'completedPlanner' | 'togglePlanner' | 'resetPlanner' | 'onDownload' | 'downloading'>) {
  const [confirmReset, setConfirmReset] = useState(false);
  const completeCount = plannerItems.filter((item) => completedPlanner.includes(item.id)).length;
  const groups = [...new Set(plannerItems.map((item) => item.group))];

  return (
    <div className="experience planner-experience">
      <p className="eyebrow">SMALL THINGS. A LITTLE MORE CARE.</p>
      <h2 id="modal-title" tabIndex={-1}>Your wellness <em>checklist.</em></h2>
      <p className="experience-intro">A few gentle reminders for your bridal chapter. This is support, not another list to perfect.</p>
      <div className="progress-heading"><span>A little progress, at your pace</span><span aria-live="polite">{completeCount} of {plannerItems.length}</span></div>
      <progress className="wellness-progress" max={plannerItems.length} value={completeCount} aria-label="Wellness checklist progress" />
      {groups.map((group, index) => <section className="planner-group" key={group}><h3><span>0{index + 1}</span>{group}</h3>{plannerItems.filter((item) => item.group === group).map((item) => <label className={`planner-item check-label ${completedPlanner.includes(item.id) ? 'is-complete' : ''}`} key={item.id}><input type="checkbox" checked={completedPlanner.includes(item.id)} onChange={() => togglePlanner(item.id)} /><span className="custom-check"><Check size={14} /></span><span>{item.text}</span></label>)}</section>)}
      {completeCount === plannerItems.length && <p className="completion-message" role="status"><CheckCheck size={20} /> A little care, well kept. Revisit these reminders whenever you need them.</p>}
      <div className="experience-actions"><button className="button button-primary" disabled={downloading} onClick={() => onDownload({ kind: 'planner', completed: completedPlanner })}>{downloading ? 'Preparing your PDF...' : 'Download your checklist'} <DownloadIcon busy={downloading} /></button><button className="text-link muted-link" disabled={completeCount === 0} onClick={() => setConfirmReset(true)}>Start fresh</button></div>
      {confirmReset && <div className="inline-confirm" role="group" aria-label="Confirm checklist reset"><p>Clear your ticks and start with a fresh checklist?</p><button className="text-link" onClick={() => { resetPlanner(); setConfirmReset(false); }}>Yes, start fresh</button><button className="text-link" onClick={() => setConfirmReset(false)}>Keep my progress</button></div>}
      <p className="fine-print">Saved only in this browser when local storage is available. Your PDF includes your current progress. No account or personal details needed.</p>
    </div>
  );
}

const quizQuestions = [
  {
    title: 'What would feel most helpful right now?',
    description: 'There is no right answer. Start with what feels like you.',
    options: [
      { value: 'bridal-foundation', label: 'A simpler food routine', detail: 'Practical nourishment around all the planning.' },
      { value: 'everyday-glow', label: 'A little more everyday care', detail: 'Small, feel-good habits without the pressure.' },
      { value: 'beyond-the-wedding', label: 'Something that lasts', detail: 'Flexible routines for the wedding and beyond.' },
    ],
  },
  {
    title: 'Which chapter are you in?',
    description: 'Your timeline is context, never a deadline for your body.',
    options: [
      { value: 'planning', label: 'The planning has just begun', detail: 'I am making space for the journey ahead.' },
      { value: 'soon', label: 'My big day is getting close', detail: 'I would love to keep things familiar and calm.' },
      { value: 'everyday', label: 'I am here for everyday wellbeing', detail: 'After the wedding, or simply doing this for me.' },
    ],
  },
  {
    title: 'What would you like to begin with?',
    description: 'One useful thing is a lovely place to start.',
    options: [
      { value: 'recipe', label: 'An easy, lovely meal', detail: 'A recipe I can make my own.' },
      { value: 'reading', label: 'A fresh perspective', detail: 'A thoughtful read to quiet the food noise.' },
      { value: 'checklist', label: 'One small action', detail: 'A gentle checklist to keep nearby.' },
    ],
  },
];

function QuizExperience({ openModal }: Pick<ExperienceProps, 'openModal'>) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  useEffect(() => {
    const timer = window.setTimeout(() => document.getElementById('modal-title')?.focus({ preventScroll: true }), 230);
    return () => window.clearTimeout(timer);
  }, [step]);
  const isResult = step === quizQuestions.length;
  const recommendedId = answers[1] === 'everyday' ? 'beyond-the-wedding' : answers[0] || 'bridal-foundation';
  const recommended = programs.find((program) => program.id === recommendedId)!;
  const starter: ModalRoute = answers[2] === 'checklist' ? { type: 'planner' } : { type: 'article', id: answers[2] === 'recipe' ? 'berry-breakfast-bowl' : 'balanced-bridal-plate' };

  return (
    <div className="experience quiz-experience">
      <p className="eyebrow">FIND YOUR LITTLE STARTING POINT</p>
      {!isResult ? (
        <>
          <div className="quiz-progress" aria-label={`Question ${step + 1} of ${quizQuestions.length}`}>{quizQuestions.map((_, index) => <span className={index <= step ? 'is-active' : ''} key={index} />)}<small>0{step + 1} / 03</small></div>
          <AnimatePresence mode="wait" initial={false}><motion.div key={step} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }}><h2 id="modal-title" tabIndex={-1}>{quizQuestions[step].title}</h2><p className="experience-intro">{quizQuestions[step].description}</p><fieldset className="quiz-options"><legend className="sr-only">{quizQuestions[step].title}</legend>{quizQuestions[step].options.map((option) => <label className={`quiz-option ${answers[step] === option.value ? 'is-selected' : ''}`} key={option.value}><input type="radio" name={`question-${step}`} value={option.value} checked={answers[step] === option.value} onChange={() => setAnswers({ ...answers, [step]: option.value })} /><span className="custom-radio"><span /></span><span><strong>{option.label}</strong><small>{option.detail}</small></span></label>)}</fieldset></motion.div></AnimatePresence>
          <div className="quiz-navigation"><button className="text-link" disabled={step === 0} onClick={() => setStep(step - 1)}><ArrowLeft size={16} /> Back</button><button className="button button-primary" disabled={!answers[step]} onClick={() => setStep(step + 1)}>{step === quizQuestions.length - 1 ? 'Find my starting point' : 'A little further'} <ArrowRight size={17} /></button></div>
          <p className="fine-print">A reading-path finder, not a nutrition assessment. Your answers stay in this session and are not submitted anywhere.</p>
        </>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="quiz-result">
          <Botanical className="quiz-botanical" />
          <h2 id="modal-title" tabIndex={-1}>A softer start.<br /><em>Just for your chapter.</em></h2>
          <p className="experience-intro">Based on what you would like to explore, we suggest starting here.</p>
          <div className="quiz-recommendation"><p className="eyebrow">YOUR SUGGESTED READING PATH</p><h3>{recommended.title}</h3><p>{recommended.focus}</p>{answers[1] === 'soon' && <p className="quiz-timeline-note">With your day approaching, focus on familiar meals and small comforts rather than changing everything.</p>}<button className="button button-primary" onClick={() => openModal({ type: 'program', id: recommended.id })}>Explore your path <ArrowRight size={17} /></button></div>
          <button className="text-link quiz-starter" onClick={() => openModal(starter)}>Or start with {answers[2] === 'checklist' ? 'your gentle checklist' : answers[2] === 'recipe' ? 'an easy breakfast' : 'a thoughtful little read'} <ArrowUpRight size={16} /></button>
          <button className="back-link quiz-restart" onClick={() => { setStep(0); setAnswers({}); }}><ArrowLeft size={15} /> Try the questions again</button>
          <p className="fine-print">This is a resource suggestion, not personal dietary advice. All three paths are free to explore.</p>
        </motion.div>
      )}
    </div>
  );
}

function PrivacyExperience({ clearData, savedArticles, completedPlanner, completedSteps }: Pick<ExperienceProps, 'clearData' | 'savedArticles' | 'completedPlanner' | 'completedSteps'>) {
  const [confirm, setConfirm] = useState(false);
  const total = savedArticles.length + completedPlanner.length + completedSteps.length;
  return (
    <div className="experience legal-experience">
      <p className="eyebrow">A LITTLE TRANSPARENCY</p>
      <h2 id="modal-title" tabIndex={-1}>Privacy & <em>your data.</em></h2>
      <div className="prose"><h3>A quiet, account-free space</h3><p>This website does not ask for contact details, take bookings, process payments, or use advertising analytics. There is no mailing list or contact form.</p><h3>What stays on your device</h3><p>If your browser allows it, local storage keeps your saved article IDs, learning-path progress, and wellness-checklist ticks. This information is not sent to us and is not synced to another device. Quiz answers only stay in the current session.</p><h3>Downloads and external services</h3><p>Your PDFs are created in your browser. Fonts are loaded from Google Fonts, and some editorial images are loaded from Pexels; these providers receive normal connection information such as your IP address when their assets load. External links, including Instagram and NHS resources, open their own websites and follow their own privacy policies.</p><h3>You are in control</h3><p>You can remove saved items individually, reset your checklist, clear your browser storage, or use the button below. If browser storage is unavailable, the site still works during your visit but may not remember your progress.</p></div>
      <div className="data-controls"><p aria-live="polite">{total === 0 ? 'You have no saved articles or completed steps in this browser.' : `${savedArticles.length} saved ${savedArticles.length === 1 ? 'article' : 'articles'} and ${completedPlanner.length + completedSteps.length} completed steps in this browser.`}</p><button className="button button-outline" disabled={total === 0} onClick={() => setConfirm(true)}>Clear my saved data</button>{confirm && <div className="inline-confirm"><p>This will remove your saved articles and all checklist progress from this browser.</p><button className="text-link" onClick={() => { clearData(); setConfirm(false); }}>Yes, clear my data</button><button className="text-link" onClick={() => setConfirm(false)}>Keep my data</button></div>}</div>
    </div>
  );
}

function TermsExperience() {
  return (
    <div className="experience legal-experience">
      <p className="eyebrow">A THOUGHTFUL NOTE</p>
      <h2 id="modal-title" tabIndex={-1}>A few things <em>to know.</em></h2>
      <div className="prose"><h3>Education, not individual care</h3><p>The articles, recipes, guides, quiz, and learning paths provide general educational information for adults. They do not establish a clinician-patient relationship and are not a diagnosis, treatment, or personalised nutrition prescription.</p><h3>Your own health comes first</h3><p>Seek advice from a qualified healthcare professional for medical conditions, food allergies, pregnancy-related needs, eating concerns, or persistent symptoms. Follow your own care plan rather than general website guidance. Do not change prescribed medication or supplements based on this content.</p><h3>No guaranteed outcomes</h3><p>Words such as "glow" describe a wellbeing theme, not a promise of weight loss, changes to skin, or any other health or appearance outcome. Your wedding is not a deadline to change your body.</p><h3>Programs and professional services</h3><p>The named paths are free, self-guided website resources. They are not paid service offers. For Maham's current professional services, credentials, and availability, refer to the linked Instagram profile.</p><h3>Editorial imagery and content</h3><p>The imagery is a mixture of stock photography and generated editorial illustration. It is not a gallery of clients or documented results. These resources may be downloaded for personal use; please do not represent the material as individual clinical advice.</p><h3>Further reading</h3><p>The nutrition fundamentals draw on general public guidance such as the <a href={EATWELL_URL} target="_blank" rel="noopener noreferrer">NHS Eatwell Guide</a>. External sites have their own policies and content.</p></div>
      <a className="text-link" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><InstagramIcon size={16} />{INSTAGRAM_HANDLE}<ArrowUpRight size={16} /></a>
    </div>
  );
}

export function Experiences(props: ExperienceProps) {
  const { route } = props;
  switch (route.type) {
    case 'about': return <AboutExperience {...props} />;
    case 'program': {
      const program = programs.find((item) => item.id === route.id);
      return program ? <ProgramExperience key={program.id} program={program} {...props} /> : null;
    }
    case 'article': {
      const article = articles.find((item) => item.id === route.id);
      return article ? <ArticleExperience key={article.id} article={article} {...props} /> : null;
    }
    case 'journal': return <JournalExperience {...props} />;
    case 'guide': return <GuideExperience {...props} />;
    case 'planner': return <PlannerExperience {...props} />;
    case 'quiz': return <QuizExperience {...props} />;
    case 'privacy': return <PrivacyExperience {...props} />;
    case 'terms': return <TermsExperience />;
  }
}