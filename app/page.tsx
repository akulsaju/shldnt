import { ArrowRight, ArrowUpRight, BookOpen, Globe, ShieldCheck, Sparkles, Trophy, Users } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { ChampionshipLiveBanner } from '@/components/championship-live-banner'

const stats = [
  ['64', 'Teams at the world final'],
  ['180', 'Member records'],
  ['6', 'Confederations'],
  ['1', 'Shared standard'],
]

const marqueeItems = [
  'Open standards',
  'Fair play',
  'Global access',
  '64-team world final',
  'Human-led judging',
  'National pathways',
]

const pillars = [
  {
    icon: BookOpen,
    number: '01',
    title: 'Open by design',
    body: 'Every sanctioned event publishes its rules, judging model, and participation path before the first commit is ever pushed.',
  },
  {
    icon: ShieldCheck,
    number: '02',
    title: 'Fair by standard',
    body: 'A shared technical baseline makes competitions comparable across borders, time zones, and communities.',
  },
  {
    icon: Users,
    number: '03',
    title: 'Built for people',
    body: 'Participants get room to experiment, collaborate, rest, and grow — without ever sacrificing integrity.',
  },
]

const pathway = [
  ['01', 'Join a national association', 'Start with a recognized NHA and enter the federation’s common competition framework.'],
  ['02', 'Qualify through your region', 'Teams progress through transparent regional pathways designed for local communities.'],
  ['03', 'Meet at the world final', 'The strongest teams come together for a 64-team World Hackathon Championship final.'],
]

const footerColumns = [
  {
    title: 'Federation',
    links: [
      ['About WHF', '/about'],
      ['News', '/news'],
      ['Member nations', '/members'],
      ['Donate', '/donate'],
    ],
  },
  {
    title: 'Competition',
    links: [
      ['Championship', '/championship'],
      ['Leaderboard', '/leaderboard'],
      ['Live matches', '/live-matches'],
      ['Rulebook', '/rulebook'],
      ['NHA Portal', '/portal'],
    ],
  },
]

export default function Page() {
  return (
    <div className="home-v2">
      <div className="top-0 z-50" style={{ position: 'sticky' }}>
        <SiteHeader />
      </div>
      <ChampionshipLiveBanner />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section id="top" className="home-hero">
        <div className="home-hero__grid" aria-hidden="true" />
        <div className="home-orb home-orb--cyan" aria-hidden="true" />
        <div className="home-orb home-orb--violet" aria-hidden="true" />
        <div className="home-ring" aria-hidden="true" />

        <div className="home-container home-hero__inner">
          <div className="animate-rise">
            <p className="home-badge">
              <Sparkles size={13} aria-hidden="true" />
              The global federation for competitive hackathons
            </p>
            <h1 className="home-h1">
              Where the world<br />
              comes to <span className="home-grad">build.</span>
            </h1>
            <p className="home-lede">
              A clearer route from local invention to global recognition. WHF gives national
              associations the standards, structure, and confidence to run competitions that matter.
            </p>
            <div className="home-cta-row">
              <a href="/about" className="home-btn home-btn--primary">
                Explore the federation <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <a href="/live-matches" className="home-btn home-btn--ghost">
                <span className="home-live-dot" aria-hidden="true" />
                Watch live matches
              </a>
            </div>
          </div>

          <div className="home-hero__stats animate-rise delay-150">
            {stats.map(([value, label]) => (
              <div key={label} className="home-stat">
                <p className="home-stat__value">{value}</p>
                <p className="home-stat__label">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ticker ───────────────────────────────────────────── */}
      <div className="home-marquee" aria-hidden="true">
        <div className="home-marquee__track">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={index} className="home-marquee__item">
              {item} <span className="home-marquee__diamond">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Mission ──────────────────────────────────────────── */}
      <section id="mission" className="home-section">
        <div className="home-container">
          <p className="home-kicker"><span>01</span> Why we exist</p>
          <h2 className="home-statement animate-rise">
            Hackathons are where <em>unfinished ideas</em> become useful things. We give ambitious
            people a difficult problem, a trusted room, and the <em>freedom to surprise</em> themselves.
          </h2>
          <div className="home-split">
            <p>
              The best competitions are engines of opportunity. WHF coordinates the shared language
              between national associations so local energy can become global opportunity — without
              flattening the character of each community.
            </p>
            <a href="/about" className="home-text-link">
              Our mission and statutes <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Pillars ──────────────────────────────────────────── */}
      <section id="standards" className="home-section home-section--alt">
        <div className="home-container">
          <div className="home-section-head">
            <div>
              <p className="home-kicker"><span>02</span> The standard</p>
              <h2 className="home-h2">Built on standards,<br />not spectacle.</h2>
            </div>
            <p className="home-section-note">
              A common foundation for every sanctioned competition — from local qualifiers to the
              world final.
            </p>
          </div>
          <div className="home-pillars">
            {pillars.map(({ icon: Icon, number, title, body }) => (
              <div key={number} className="home-pillar">
                <div className="home-pillar__top">
                  <span className="home-pillar__icon"><Icon size={20} aria-hidden="true" /></span>
                  <span className="home-pillar__number">{number}</span>
                </div>
                <h3 className="home-pillar__title">{title}</h3>
                <p className="home-pillar__body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pathway ──────────────────────────────────────────── */}
      <section id="pathway" className="home-section home-section--dark">
        <div className="home-orb home-orb--pathway" aria-hidden="true" />
        <div className="home-container home-pathway">
          <div className="home-pathway__intro">
            <p className="home-kicker home-kicker--light"><span>03</span> The pathway</p>
            <h2 className="home-h2">From local spark<br />to global stage.</h2>
            <a href="/rulebook" className="home-btn home-btn--outline">
              Read the rulebook <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
          <div className="home-steps">
            {pathway.map(([number, title, body]) => (
              <div key={number} className="home-step">
                <span className="home-step__number" aria-hidden="true">{number}</span>
                <div>
                  <h3 className="home-step__title">{title}</h3>
                  <p className="home-step__body">{body}</p>
                </div>
                <ArrowRight size={18} className="home-step__arrow" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Championship band ────────────────────────────────── */}
      <section className="home-section">
        <div className="home-container">
          <div className="home-champ">
            <div className="home-champ__glow" aria-hidden="true" />
            <div className="home-champ__icon"><Trophy size={26} aria-hidden="true" /></div>
            <div className="home-champ__copy">
              <p className="home-kicker home-kicker--light"><span>04</span> The main event</p>
              <h2 className="home-h2">The World Hackathon<br />Championship</h2>
              <p className="home-champ__body">
                Sixty-four national teams. Six-hour matches. One world champion. Follow every
                fixture, group, and result as it happens.
              </p>
            </div>
            <div className="home-champ__actions">
              <a href="/championship" className="home-btn home-btn--primary">
                View the bracket <ArrowRight size={15} aria-hidden="true" />
              </a>
              <a href="/live-matches" className="home-btn home-btn--ghost">
                Live matches <span className="home-live-dot" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Join CTA ─────────────────────────────────────────── */}
      <section className="home-section home-join">
        <div className="home-container home-join__inner">
          <p className="home-kicker"><span>05</span> Join the network</p>
          <h2 className="home-h2 home-h2--xl">
            Make your country part<br />of the <span className="home-grad">standard.</span>
          </h2>
          <a href="/portal" className="home-btn home-btn--dark">
            Open the NHA Portal <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="home-footer">
        <div className="home-container home-footer__grid">
          <div className="home-footer__brand">
            <div className="home-footer__logo">
              <span className="home-footer__mark"><Globe size={18} aria-hidden="true" /></span>
              <span>WORLD<br />HACKATHON FEDERATION</span>
            </div>
            <p>An independent framework for fair, open, and globally connected hackathons.</p>
          </div>
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="home-footer__col">
              <p>{column.title}</p>
              {column.links.map(([name, href]) => (
                <a key={href} href={href}>{name}</a>
              ))}
            </nav>
          ))}
        </div>
        <div className="home-container home-footer__base">
          <span>© 2026 World Hackathon Federation · Statutes v4.0</span>
          <span>Built for builders, everywhere.</span>
        </div>
      </footer>
    </div>
  )
}
