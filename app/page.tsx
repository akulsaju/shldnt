import { ArrowRight, ArrowUpRight, Binary, GitCommitHorizontal, Globe, Network, Trophy } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { ChampionshipLiveBanner } from '@/components/championship-live-banner'
import { DeveloperLinks } from '@/components/developer-links'
import { HomeFixtureBoard } from '@/components/home-fixture-board'
import { HomeLedgerStats } from '@/components/home-ledger-stats'
import { LedgerTerminal } from '@/components/ledger-terminal'
import { SystemStatus } from '@/components/system-status'
import { PrizeLedger } from '@/components/prize-ledger'
import { championshipFixtures, disqualifiedCountries } from '@/lib/championship-fixtures'
import { divisionMatches } from '@/lib/championship-results'
import { CHAMPION_PRIZE_USD, MATCH_WIN_PRIZE_USD, formatUsd, formatUsdCompact } from '@/lib/prize-money'
import { siteConfig } from '@/lib/site-config'
import { teamCode } from '@/lib/team-codes'

const activeTeams = new Set(championshipFixtures.flatMap(({ home, away }) => [home, away])).size
const activeGroups = new Set(championshipFixtures.map(({ group }) => group)).size

const marqueeItems: Array<{ text: string; alert?: boolean; prize?: boolean }> = [
  { text: `Purse: ${formatUsdCompact(CHAMPION_PRIZE_USD)} champion · ${formatUsdCompact(MATCH_WIN_PRIZE_USD)} per match win`, prize: true },
  { text: `Statutes ${siteConfig.statutesVersion} · Ledger ${siteConfig.ledgerVersion}` },
  { text: 'Scoring: W 3 · D 1 · L 0' },
  { text: 'Tiebreak: Pts → Diff → PF → W' },
  { text: 'Build window 06:00:00' },
  { text: 'Divisions U19 / U25 / U40 · T+0h / +8h / +16h' },
  { text: `DQ: ${Array.from(disqualifiedCountries).map(teamCode).join(', ')} · excluded from standings`, alert: true },
  { text: 'Fixtures pinned to local wall-clock · ledger in UTC' },
  { text: 'Confeds: AHC · CAH · CONCACAH · CONMEHA · OFC · WEU' },
]

const pillars = [
  {
    icon: GitCommitHorizontal,
    number: '01',
    title: 'Git-verified submission hashing',
    body: 'When the six-hour build window closes, each team’s HEAD commit is hashed and written to the ledger. Commits pushed after the bell are never read by the scorer — no referee judgment call required.',
    ref: ['Art. 30 · Workspace & continuity', '/rulebook#article-30'],
  },
  {
    icon: Binary,
    number: '02',
    title: 'Deterministic scoring pipeline',
    body: 'Same match ID + same judge inputs = same score on every re-run. Standings sort by points, score difference, points for, then wins. Corrections are appended with a reason, never overwritten.',
    ref: ['Art. 35 · Judging & scoring', '/rulebook#article-35'],
  },
  {
    icon: Network,
    number: '03',
    title: 'Regional confederation bylaws',
    body: 'Six confederations run qualifiers from one bylaw template: published quotas, local-time fixtures, a fixed protest window, and results reported to WHF in a single format.',
    ref: ['Art. 16 · Confederation duties', '/rulebook#article-16'],
  },
]

const pathway = [
  ['01', 'Register a roster in the NHA Portal', 'One recognized NHA per jurisdiction. Two players per division (U19, U25, U40), eligibility-checked before any fixture is allocated.'],
  ['02', 'Play the group stage', 'Round-robin groups of four. Every match is a six-hour build window; divisions tip off at T+0h, T+8h and T+16h from the fixture’s local start time.'],
  ['03', 'Qualify for the 64-team final phase', `16 groups of four, three eight-hour Sprint Challenges, then single-elimination Endurance knockouts for the top two per group (Art. 28). The champion takes the ${formatUsd(CHAMPION_PRIZE_USD)} purse.`],
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

        <div className="home-container home-hero__inner">
          <SystemStatus />
          <div className="home-hero__layout">
            <div className="animate-rise">
              <h1 className="home-h1">
                Rules, fixtures,<br />
                and a public <span className="home-grad">points ledger.</span>
              </h1>
              <p className="home-lede">
                WHF publishes the competition rulebook, schedules {divisionMatches.length} division matches
                across {activeTeams} national teams, and scores every result through one deterministic
                pipeline. Every match win pays {formatUsd(MATCH_WIN_PRIZE_USD)}; the world champion takes{' '}
                {formatUsd(CHAMPION_PRIZE_USD)}.
              </p>
              <div className="home-cta-row">
                <a href="/live-matches" className="home-btn home-btn--primary">
                  <span className="home-live-dot" aria-hidden="true" />
                  Open fixture board
                </a>
                <a href="/leaderboard" className="home-btn home-btn--ghost">
                  Standings table <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
              <DeveloperLinks className="home-hero__devlinks" />
            </div>
            <div className="animate-rise delay-150">
              <LedgerTerminal />
            </div>
          </div>

          <HomeLedgerStats />
        </div>
      </section>

      {/* ── Ticker ───────────────────────────────────────────── */}
      <div className="home-marquee" aria-hidden="true">
        <div className="home-marquee__track">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={index} className={`home-marquee__item${item.alert ? ' home-marquee__item--alert' : ''}${item.prize ? ' home-marquee__item--prize' : ''}`}>
              {item.text} <span className="home-marquee__diamond">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Mission ──────────────────────────────────────────── */}
      <section id="mission" className="home-section">
        <div className="home-container">
          <p className="home-kicker"><span>01</span> Why we exist</p>
          <h2 className="home-statement animate-rise">
            A hackathon result should be as reproducible as a <em>build artifact</em>: same inputs,
            same score, same standings — <em>on any machine, in any country.</em>
          </h2>
          <div className="home-split">
            <p>
              WHF maintains the shared infrastructure national associations plug into: the rulebook,
              the fixture scheduler, and the results ledger. Every score change is recorded with the
              reason, the authorizing official, and its effect on standings (Art. 35). Rankings age out
              after four years and every correction ships with a public change note (Art. 18).
            </p>
            <a href="/about" className="home-text-link">
              Statutes &amp; governance <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Pillars ──────────────────────────────────────────── */}
      <section id="standards" className="home-section home-section--alt">
        <div className="home-container">
          <div className="home-section-head">
            <div>
              <p className="home-kicker"><span>02</span> The protocol</p>
              <h2 className="home-h2">Rules you can diff,<br />replay, and audit.</h2>
            </div>
            <p className="home-section-note">
              Every sanctioned event runs on the same three primitives. Each maps to a numbered
              rulebook article.
            </p>
          </div>
          <div className="home-pillars">
            {pillars.map(({ icon: Icon, number, title, body, ref: [refLabel, refHref] }) => (
              <div key={number} className="home-pillar">
                <div className="home-pillar__top">
                  <span className="home-pillar__icon"><Icon size={20} aria-hidden="true" /></span>
                  <span className="home-pillar__number">{number}</span>
                </div>
                <h3 className="home-pillar__title">{title}</h3>
                <p className="home-pillar__body">{body}</p>
                <a href={refHref} className="home-pillar__ref">ref: {refLabel} <ArrowRight size={11} aria-hidden="true" /></a>
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
            <p className="home-kicker home-kicker--light"><span>03</span> Qualification path</p>
            <h2 className="home-h2">From roster<br />to world final.</h2>
            <a href="/rulebook#article-28" className="home-btn home-btn--outline">
              Art. 28 · Schedule &amp; format <ArrowUpRight size={15} aria-hidden="true" />
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
              <p className="home-kicker home-kicker--light"><span>04</span> Match day</p>
              <h2 className="home-h2">World Hackathon<br />Championship 2026</h2>
              <p className="home-champ__body">
                {divisionMatches.length} division matches across {activeGroups} groups and three age
                divisions. Every match win pays {formatUsd(MATCH_WIN_PRIZE_USD)} the moment the result
                commits; the world champion takes {formatUsd(CHAMPION_PRIZE_USD)}.
              </p>
            </div>
            <div className="home-champ__actions">
              <a href="/championship" className="home-btn home-btn--primary">
                Bracket &amp; groups <ArrowRight size={15} aria-hidden="true" />
              </a>
              <a href="/leaderboard" className="home-btn home-btn--ghost">
                Standings
              </a>
            </div>
            <div className="home-champ__board">
              <PrizeLedger className="home-champ__prize" />
              <HomeFixtureBoard />
            </div>
          </div>
        </div>
      </section>

      {/* ── Join CTA ─────────────────────────────────────────── */}
      <section className="home-section home-join">
        <div className="home-container home-join__inner">
          <p className="home-kicker"><span>05</span> Onboarding</p>
          <h2 className="home-h2 home-h2--xl">
            Put your federation<br />on the <span className="home-grad">ledger.</span>
          </h2>
          <p className="home-join__steps">
            recognition request (Art. 5) → roster: 2 players × 3 divisions (Art. 25) → fixture allocation
          </p>
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
            <p>Open rulebook, deterministic scoring, and a public results ledger.</p>
          </div>
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="home-footer__col">
              <p>{column.title}</p>
              {column.links.map(([name, href]) => (
                <a key={href} href={href}>{name}</a>
              ))}
            </nav>
          ))}
          <div className="home-footer__col">
            <p>Developers</p>
            <DeveloperLinks className="dev-links--stack" label="Developer resources (footer)" />
          </div>
        </div>
        <div className="home-container home-footer__base">
          <span>© 2026 World Hackathon Federation · Statutes {siteConfig.statutesVersion} · Ledger {siteConfig.ledgerVersion}</span>
          <SystemStatus className="sys-status--compact" />
        </div>
      </footer>
    </div>
  )
}
