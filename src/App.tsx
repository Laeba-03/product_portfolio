import { useEffect, useState, type MouseEvent } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ExternalLink,
  Linkedin,
  Mail,
  Menu,
  Play,
  Sparkles,
  X,
} from 'lucide-react';

const portrait = '/images/1770921807021.png';
const profilePhoto = '/images/128a160e-0b58-46fb-8409-dc036839e700.jpeg';
const resume = '/documents/Laeba_Resume_ATS_(1).pdf';

const projects = [
  {
    id: '01',
    status: 'SHIPPED',
    category: 'AI × SPORTS TECH × WORKFLOW DESIGN',
    title: 'AI MAKES THE FIRST MOVE.\nTHE COACH MAKES THE CALL.',
    accent: 'orange',
    intro: 'Coach Plan Modification gives a coach the speed of an AI draft without giving away the judgment that makes coaching valuable.',
    story: 'RunPlayGo coaches were managing trainees across WhatsApp, Excel, notebooks and scattered feedback. I spoke with up to 30 coaches before designing a weekly plan review loop around the reality of their work.',
    decision: 'AI generates a weekly training plan from the trainee’s goal. The coach reviews, edits, approves or creates their own before it reaches the trainee.',
    stats: ['~50 coaches onboarded', '30 days to ship', 'Team of 5'],
    features: ['AI-generated weekly plans', 'Run data beside the plan', 'Pace, distance, time + heart rate', 'Approve, edit or start from scratch'],
    tradeoffs: 'Automation vs human judgment · Speed vs review effort · Structure vs flexibility',
  },
  {
    id: '02',
    status: 'MVP DEFINED / NOT SHIPPED',
    category: 'PRODUCT SCOPE × RUNNER NUTRITION',
    title: 'RUNNING NEEDS FUEL.\nNOT ANOTHER CALORIE COUNTER.',
    accent: 'lime',
    intro: 'A nutrition experience designed around the runner’s next session, not a generic food diary.',
    story: 'I reviewed Fuelin, Hexis, Precision Fuel & Hydration and HealthifyMe. The gap was clear: run-linked fueling, Indian food support and a coach who sees the same picture.',
    decision: 'Focus the MVP on run-linked fueling first instead of building a broad calorie tracker or full nutrition ecosystem.',
    stats: ['4 competitors reviewed', '15 idea areas mapped', 'MVP defined'],
    features: ['Diet profile + daily carb target', 'Meals around training sessions', 'AI meal scanner: photo, voice or search', 'Coach-visible nutrition summary'],
    tradeoffs: 'Narrow MVP vs complete suite · Fast logging vs scan accuracy · Guidance vs safety',
  },
  {
    id: '03',
    status: 'SCOPED / WIREFRAMED',
    category: 'BUSINESS PRODUCT × COACH APP',
    title: 'COACH THE RUNNER.\nGROW THE BUSINESS.',
    accent: 'ink',
    intro: 'A business dashboard that helps coaches understand the commercial side of coaching.',
    story: 'The coach app already held the relationship. This initiative extended it from managing training to managing the coaching business in the same place.',
    decision: 'Start with the signals a coach can act on: earnings, lead conversion projections and trainee upsell opportunities.',
    stats: ['Scoped initiative', 'Wireframes ready', 'Not yet shipped'],
    features: ['Earnings overview', 'Revenue projections from lead conversion', 'Trainee upsell opportunities', 'Early-stage dashboard flows'],
    tradeoffs: 'Useful signal vs dashboard noise · Coach context vs business complexity',
  },
  {
    id: '04',
    status: 'PERSONAL BUILD / WORKING PROTOTYPE',
    category: 'AI × FINTECH × WORKFLOW DESIGN',
    title: 'AI CAN MAKE THE RECOMMENDATION.\nBUT WHO SIGNS OFF?',
    accent: 'blue',
    intro: 'CreditBridge is a human-in-the-loop SME credit workflow where AI-generated underwriting proposals stay drafts until a credit officer reviews every value.',
    story: 'Claude reads bank statement information and proposes terms, rationale, covenants and evidence externally through MCP. CreditBridge receives that proposal as an editable draft; no AI runs autonomously inside the app.',
    decision: 'Keep the original AI values, make changes auditable and block publishing until a human confirms the offer.',
    stats: ['Python + FastAPI', 'MCP integration', 'Private workspaces'],
    features: ['Analyze → draft → review → approve → offer → sign', 'Token-based Claude connection', 'Audit logging + locked signed facilities', 'Borrower-facing offer and signing flow'],
    tradeoffs: 'Automation vs accountability · Speed vs risk · Flexibility vs auditability',
  },
  {
    id: '05',
    status: 'INDEPENDENT PRODUCT CASE STUDY',
    category: 'CONSUMER EV × URBAN MOBILITY × PRODUCT STRATEGY',
    title: 'A SAFER STEP UP\nFROM THE SCOOTER.',
    accent: 'orange',
    intro: 'A compact four-seat electric family car for India’s commuters, priced by the month and backed by a 24-hour fix-or-replace promise.',
    story: 'The assignment focused on working professionals in congested Indian cities who commute 10–30 km on a two-wheeler and often carry a child, parent or colleague. The product must protect them from traffic and weather without becoming too expensive or too wide for Indian roads.',
    decision: 'Choose a compact four-seat EV over a narrow two-seater: capacity matters more than scooter-like agility for the user who is upgrading to carry someone safely.',
    stats: ['120–150 km real-world range', '₹5–6 lakh upfront', '24-hour fix or replace'],
    features: ['Monsoon Mode: live waterlogging map', 'Steel safety cell + airbags for all 4 seats', 'Battery subscription + all-inclusive monthly plan', 'North Star: weekly commute trips per active car'],
    tradeoffs: 'Capacity vs agility · Monthly affordability vs upfront cost · Launch essentials vs later battery swapping',
  },
  {
    id: '06',
    status: 'INDEPENDENT PRODUCT ANALYSIS',
    category: 'TRUST × PAYMENTS × AI',
    title: 'WHEN MONEY DISAPPEARS,\nTRUST SHOULD NOT.',
    accent: 'orange',
    intro: 'A PhonePe teardown exploring failed and pending UPI payments as a trust moment.',
    story: 'When money leaves an account and the user cannot tell where it is, the payment app is judged on the one transaction that did not work.',
    decision: 'AI explains. The system resolves. Use transaction state for plain-language updates, resolution windows, proactive status and escalation to support.',
    stats: ['Independent teardown', 'Not PhonePe work', 'Resolution layer proposed'],
    features: ['Problem and competitive context', 'AI-assisted payment explanations', 'Expected resolution windows', 'Grounded escalation to support'],
    tradeoffs: 'Trust vs AI accuracy · Transparency vs false certainty · Speed vs reliability',
  },
  {
    id: '07',
    status: 'INDEPENDENT PRODUCT ANALYSIS',
    category: 'MUSIC × AI × GROWTH',
    title: 'LET FREE USERS\nTASTE THE MAGIC.',
    accent: 'lime',
    intro: 'A Spotify teardown proposing a metered Prompted Playlist for free listeners.',
    story: 'Spotify’s strongest new AI experience is a Premium differentiator. The opportunity: let the largest audience try the magic, then decide if it earns an upgrade.',
    decision: 'AI drafts, the listener steers. Give free users a limited Prompted Playlist trial with reasoning, controls and a clear Premium conversion path.',
    stats: ['Independent teardown', 'Not Spotify work', 'Holdout-led success metric'],
    features: ['Prompted playlist concept', 'A daily or weekly refresh', 'Reasoning for every track', 'Premium conversion experiment'],
    tradeoffs: 'Discovery vs conversion · AI cost vs upgrade value · Personal taste vs control',
  },
];

const skills = [
  ['Problem solving', 'RunPlayGo: found the review loop worth shipping instead of automating the coach away.'],
  ['Product judgment', 'CreditBridge: kept the human accountable for the final credit offer.'],
  ['User research', 'Up to 30 coach conversations shaped the plan workflow.'],
  ['Prioritization', 'RunFuelGo: evaluated 5+ nutrition features before choosing run-linked fueling.'],
  ['Execution', 'Shipped the plan review flow in 30 days with a 5-person team.'],
  ['AI product thinking', 'Designed where AI drafts, where people decide and what stays auditable.'],
  ['Systems thinking', 'Ola: connected safety, weather, affordability, service and adoption into one product bet.'],
];

const principles = [
  ['01', 'Start with the problem, not the feature.', 'The coach app started with scattered work, not a shiny AI idea.'],
  ['02', 'Talk to users before making assumptions.', 'I spoke with up to 30 coaches about how planning really happened.'],
  ['03', 'Prioritize ruthlessly.', 'Run-linked fueling won over a 15-area nutrition wish list.'],
  ['04', 'Build for clarity.', 'CreditBridge keeps proposed, edited and approved values visible.'],
  ['05', 'Move fast, but think deeply.', 'A focused review loop shipped in 30 days.'],
  ['06', 'AI should assist, not blindly decide.', 'The coach and credit officer keep the final say.'],
  ['07', 'Tradeoffs are product decisions.', 'Every project makes the tension explicit before the build.'],
  ['08', 'Ship, measure, learn, repeat.', 'North Stars and guardrails turn a launch into a learning loop.'],
];

function App() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [activePrinciple, setActivePrinciple] = useState(0);
  const [activeSkill, setActiveSkill] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    const onMove = (event: globalThis.MouseEvent) => setCursor({ x: event.clientX, y: event.clientY });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const tilt = (event: MouseEvent<HTMLElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -4;
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 4;
    card.style.setProperty('--rx', `${rotateX}deg`);
    card.style.setProperty('--ry', `${rotateY}deg`);
  };

  const resetTilt = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--rx', '0deg');
    event.currentTarget.style.setProperty('--ry', '0deg');
  };

  return (
    <div className="site-shell">
      <div className="cursor-dot" style={{ left: cursor.x, top: cursor.y }} />
      <div className="race-progress"><span style={{ width: `${scrollProgress}%` }} /></div>
      <header className="nav-wrap">
        <a className="brand" href="#top" onClick={() => scrollTo('top')}><span>LAEBA</span><small>PRODUCT / 01</small></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <button onClick={() => scrollTo('work')}>WORK <span>07</span></button>
          <button onClick={() => scrollTo('about')}>PLAYER</button>
          <button onClick={() => scrollTo('playbook')}>PLAYBOOK</button>
          <button className="nav-cta" onClick={() => scrollTo('contact')}>LET'S TALK <ArrowUpRight size={15} /></button>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-copy reveal-in">
            <div className="eyebrow"><span className="live-dot" /> CURRENTLY BUILDING / TRUSTWORTHY AI PRODUCTS</div>
            <h1>LESS TALK.<br /><em>MORE PRODUCT.</em></h1>
            <p className="hero-intro">Assistant Product Manager. Curious about people, obsessed with problems, happiest somewhere between an idea and its execution.</p>
            <div className="hero-actions"><button className="button button-dark" onClick={() => scrollTo('work')}>GET IN THE GAME <ArrowDownRight size={18} /></button><button className="button button-outline" onClick={() => scrollTo('playbook')}>MY PLAYBOOK <Play size={15} fill="currentColor" /></button></div>
          </div>
          <div className="hero-visual">
            <div className="hero-sticker sticker-top">PRODUCT PERSON<br /><strong>ON THE FIELD</strong></div>
            <div className="portrait-wrap"><div className="portrait-ring" /><img src={portrait} alt="Laeba, Assistant Product Manager" /><div className="portrait-label">GURUGRAM, INDIA <span>↗</span></div></div>
            <div className="hero-number">01<span>/07</span></div>
            <div className="hero-sticker sticker-bottom">AI × CONSUMER<br /><strong>× EXECUTION</strong></div>
          </div>
          <div className="scoreboard"><div className="scoreboard-head"><span>STARTING LINEUP</span><span>2026 / SEASON 01</span></div><div className="score-grid"><div><strong>223</strong><small>COACHES ONBOARDED</small></div><div><strong>30</strong><small>DAYS TO SHIP</small></div><div><strong>685</strong><small>TRAINEE SIGN-UPS</small></div><div><strong>0→1</strong><small>PRODUCT THINKING</small></div></div></div>
        </section>

        <div className="ticker"><div>PROBLEM FINDER <b>•</b> PRODUCT BUILDER <b>•</b> PROFESSIONAL QUESTION-ASKER <b>•</b> AI EXPERIMENTS <b>•</b> SHIP IT <b>•</b> LEARN <b>•</b> REPEAT <b>•</b></div></div>

        <section id="about" className="about section-pad section-dark">
          <div className="section-kicker">THE PLAYER BEHIND THE PLAYS <span>02 / 07</span></div>
          <div className="about-grid"><div><h2>PRODUCT<br /><em>WITH A PULSE.</em></h2><p className="large-copy">I like getting close to problems, figuring out why people behave the way they do, and turning messy ideas into products that actually make sense.</p><p>I enjoy the early stages of building — asking questions, making decisions, testing ideas and working with teams to bring them to life.</p><a className="text-link" href="mailto:laebah03@gmail.com">SAY HELLO <ArrowUpRight size={16} /></a></div><div className="player-card"><div className="player-card-top"><span>PLAYER PROFILE</span><span>RP / 001</span></div><div className="mini-portrait"><img src={profilePhoto} alt="Laeba outdoors" /><span>LAEBA<br /><b>APM</b></span></div><dl><div><dt>NAME</dt><dd>Laeba</dd></div><div><dt>ROLE</dt><dd>Assistant Product Manager</dd></div><div><dt>ARENA</dt><dd>AI / Consumer / Sports Tech</dd></div><div><dt>SPECIALITY</dt><dd>0→1 Product Development</dd></div><div><dt>PLAY STYLE</dt><dd>Curious / Creative / Ownership</dd></div></dl></div></div>
          <div className="profile-note"><span>BACKGROUND CHECK</span><p>Assistant Product Manager at RunPlayGo · previously RenewBuy and Dave AI · MBA, Chandigarh University</p></div><div className="skills-block"><div className="skills-heading"><span>SKILL SET / NO FAKE PERCENTAGES</span><p>{skills[activeSkill][1]}</p></div><div className="skill-list">{skills.map(([name], index) => <button key={name} className={activeSkill === index ? 'skill active' : 'skill'} onMouseEnter={() => setActiveSkill(index)} onFocus={() => setActiveSkill(index)}><span>0{index + 1}</span><b>{name}</b><ArrowUpRight size={16} /></button>)}</div></div>
        </section>

        <section className="season section-pad"><div className="section-kicker">MY SEASON / RUNPLAYGO <span>03 / 07</span></div><div className="season-head"><h2>FROM AMBIGUITY<br /><em>TO DELIVERY.</em></h2><p>RunPlayGo is a coach-led running platform in India. As an Assistant Product Manager reporting to the Head of Product, I worked across coach research, feature definition, product flows, PRDs, scope prioritization and collaboration with engineering and founders.</p></div><div className="timeline">{['DISCOVER', 'DEFINE', 'PRIORITIZE', 'BUILD', 'SHIP', 'LEARN'].map((step, index) => <div className="timeline-step" key={step}><div className="timeline-number">0{index + 1}</div><div><h3>{step}</h3><p>{['Talk to users. Find the actual problem.', 'Turn ambiguity into flows, wireframes and requirements.', 'Decide what matters now versus later.', 'Work with design, engineering and founders.', 'Get features into users’ hands.', 'Measure, question and improve.'][index]}</p></div></div>)}</div></section>

        <section id="work" className="work section-pad section-cream"><div className="section-kicker">MATCH HIGHLIGHTS <span>04 / 07</span></div><div className="work-heading"><h2>THE WORK<br /><em>IN PLAY.</em></h2><p>Real work. Clear status. No inflated scorecards.</p></div><div className="project-list">{projects.map((project) => <article key={project.id} className={`project-card ${project.accent} ${activeProject === project.id ? 'expanded' : ''}`} onMouseMove={tilt} onMouseLeave={resetTilt}><button className="project-summary" onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}><span className="project-no">{project.id}</span><span className="project-main"><small>{project.status}</small><strong>{project.title.split('\n').map((line) => <span key={line}>{line}</span>)}</strong><em>{project.category}</em></span><span className="project-arrow">{activeProject === project.id ? <ChevronDown /> : <ArrowUpRight />}</span></button>{activeProject === project.id && <div className="project-detail"><div className="detail-lead"><p>{project.intro}</p><p>{project.story}</p></div><div className="detail-grid"><div><span>THE DECISION</span><p>{project.decision}</p></div><div><span>IN THE BOX</span><ul>{project.features.map((feature) => <li key={feature}><Check size={14} />{feature}</li>)}</ul></div><div><span>THE SCORECARD</span><div className="detail-stats">{project.stats.map((stat) => <b key={stat}>{stat}</b>)}</div></div><div><span>TRADEOFFS</span><p>{project.tradeoffs}</p></div></div>{project.id === '04' && <a className="button button-light" href="https://github.com/Laeba-03/CreditBridge" target="_blank" rel="noreferrer">EXPLORE CREDITBRIDGE <ExternalLink size={16} /></a>}{project.id === '05' && <a className="button button-light" href={import.meta.env.BASE_URL + 'documents/Laeba_Ola_Electric_APM_Assignment.pdf'}" target="_blank" rel="noreferrer">READ THE OLA ASSIGNMENT <ExternalLink size={16} /></a>}</div>}</article>)}</div></section>

        <section id="playbook" className="playbook section-pad"><div className="section-kicker">THE PRODUCT PLAYBOOK <span>05 / 07</span></div><div className="playbook-grid"><div><h2>MY<br /><em>GAME PLAN.</em></h2><p className="large-copy">The principles that keep the work useful, honest and moving.</p><div className="principle-feature"><span>{principles[activePrinciple][0]}</span><h3>{principles[activePrinciple][1]}</h3><p>{principles[activePrinciple][2]}</p></div></div><div className="principle-list">{principles.map(([number, title], index) => <button key={number} className={index === activePrinciple ? 'principle active' : 'principle'} onClick={() => setActivePrinciple(index)}><span>{number}</span><b>{title}</b><ArrowUpRight size={16} /></button>)}</div></div></section>

        <section className="toolkit section-pad section-lime"><div className="section-kicker">THE GEAR WALL <span>PRODUCT TOOLKIT</span></div><div className="toolkit-head"><h2>TOOLS FOR<br /><em>THE LONG RUN.</em></h2><p>Enough range to move from first question to shipped experience.</p></div><div className="gear-grid">{[['PRODUCT', 'PRD writing · User research · Wireframing · Feature prioritization · Roadmapping · Success metrics · Edge cases'], ['RESEARCH', 'User interviews · Competitor analysis · Problem discovery · Opportunity mapping · Stakeholder management'], ['DATA', 'North Star metrics · Guardrails · Google Analytics · Mixpanel · SQL · Excel · Power BI'], ['AI / TECHNICAL', 'ChatGPT · Claude · Cursor · Lovable · Replit · Antigravity · Notion AI · Figma AI · LangChain · RAG · MCP · n8n · Zapier'], ['TOOLS', 'Figma · Framer · Notion · Jira · Sheets · Prototyping · UI/UX · Cross-functional execution']].map(([label, value], index) => <div className="gear-item" key={label}><span>0{index + 1}</span><h3>{label}</h3><p>{value}</p></div>)}</div></section>

        <section id="contact" className="contact section-pad"><div className="finish-line"><span>FINISH</span><span>LINE</span></div><div className="contact-copy"><div className="section-kicker">THE NEXT ROUND <span>07 / 07</span></div><h2>NEXT ROUND?<br /><em>I'M IN.</em></h2><p>I'm looking for a team building ambitious products, asking hard questions and giving people the room to take ownership.</p><div className="hero-actions"><a className="button button-dark" href="mailto:laebah03@gmail.com">LET'S TALK <Mail size={16} /></a><a className="button button-outline" href="https://www.linkedin.com/in/laeba-h-77339a25b/" target="_blank" rel="noreferrer">VIEW LINKEDIN <Linkedin size={16} /></a><a className="button button-outline" href={resume} target="_blank" rel="noreferrer">DOWNLOAD RESUME <ExternalLink size={16} /></a></div></div></section>
      </main>
      <footer><div>BUILT WITH CURIOSITY.<br /><strong>POWERED BY TOO MANY QUESTIONS.</strong></div><div>LAEBA / 2026<br /><span>GURUGRAM, INDIA ↗</span></div><div className="footer-mark"><Sparkles size={20} /> KEEP MOVING</div></footer>
    </div>
  );
}

export default App;
