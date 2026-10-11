const sections = [
  {
    title: 'Preamble & definitions',
    items: [
      ['0.1 Preamble', 'The World Hackathon Federation (WHF) is an international non-governmental organization founded on technological equity, global collaboration, human ingenuity, and decentralized governance. The WHF seeks to standardize, regulate, and elevate competitive hackathons worldwide.'],
      ['0.2 Mission statement', 'To foster global technological advancement through structured, fair, and rigorously governed competitive engineering, ensuring talent from every nation has an equal opportunity to compete, innovate, and be recognized, while upholding digital ethics and open-source collaboration.'],
      ['0.3 Definitions', 'WHF means World Hackathon Federation. NHA means National Hackathon Association. WHC means World Hackathon Championship. CAH means Court of Arbitration for Hackathons. A sanctioned event operates under the direct jurisdiction and rules of the WHF.'],
    ],
  },
  {
    title: 'Book I · Institutional framework and statutes',
    items: [
      ['Article 1 · Name, form, and decentralized structure', 'The organization shall be named the World Hackathon Federation. The WHF is an international non-governmental organization (INGO). It operates without a permanent physical headquarters through a globally distributed administrative network. The Secretariat rotates every four years to a different host city.'],
      ['Article 2 · Objectives of the federation', 'The WHF governs, promotes, and regulates competitive hackathons; organizes international competitions; drafts and enforces ethical codes; prevents algorithmic plagiarism, intellectual property theft, malicious cyber-interference, and unauthorized autonomous AI; promotes humanitarian technology and open-source digital infrastructure; and protects competitor welfare.'],
      ['Article 3 · Neutrality, non-discrimination, and digital rights', 'The WHF is neutral in matters of politics, religion, and state-sponsored cyber-conflict. Discrimination on the basis of race, national or social origin, gender, disability, language, religion, political opinion, wealth, birth, sexual orientation, or operating system preference is prohibited.'],
      ['Article 4 · Official languages and documentation', 'The official spoken languages are English, French, Spanish, Arabic, and Mandarin. English is the working language for source-code documentation, variable names, commit messages, API endpoint designations, and final pitch presentations.'],
      ['Article 5 · Admission of member nations', 'A National Hackathon Association may apply for membership. Only one NHA is recognized per sovereign nation or recognized territory. Applicants submit national statutes, executive and financial disclosures, proof of operational capacity, a CAH jurisdiction declaration, and an infrastructure and cybersecurity audit.'],
      ['Article 6 · Member rights and obligations', 'Members in good standing may vote in the General Assembly, submit proposals, nominate leadership candidates, participate in sanctioned competitions, and apply for development grants. Members must comply with WHF decisions, pay annual dues, maintain a public athlete registry, and report on inclusion efforts.'],
      ['Article 7 · Suspension, resignation, and expulsion', 'Members may resign with notice and settled obligations. The General Assembly may suspend a member by absolute majority or expel a member by two-thirds majority for a catastrophic breach of the Code of Ethics.'],
      ['Article 8 · The General Assembly', 'The General Assembly is the supreme legislative body. It meets annually, with extraordinary meetings available under the stated member threshold. Each NHA in good standing has exactly one vote.'],
      ['Article 9 · The Executive Council', 'The Executive Council is the strategic and executive body, consisting of the President, six Vice-Presidents representing the continental confederations, and twelve elected members. Terms last four years, with a maximum of three consecutive terms.'],
      ['Article 10 · President and Secretary General', 'The President represents the WHF and chairs the General Assembly and Executive Council. The Secretary General manages the decentralized Secretariat and executes Executive Council decisions.'],
      ['Article 11 · Standing committees', 'Standing committees cover Finance & Audit; Technical & Infrastructure; Referees, Judges & Proctors; Medical, Welfare & Anti-Doping; Players’ Status & Transfer; Commercial, Media & IP Rights; Diversity, Equity & Inclusion; Ethics and Integrity; and Artificial Intelligence Governance.'],
    ],
  },
  {
    title: 'Book II · Continental confederations and tiers',
    items: [
      ['Article 12 · Recognition of confederations', 'The WHF recognizes AHC, CAH, CONCACAH, CONMEHA, OFC, and WEU. Confederation statutes must be submitted to the Secretariat for approval and may not conflict with the master rulebook.'],
      ['Article 13 · Confederation responsibilities', 'Confederations organize regional qualification tournaments, distribute development funds subject to audit, and maintain continental coefficient rankings.'],
      ['Article 14 · World ranking system', 'The WHF maintains a rolling four-year ranking based on sanctioned events. Tier 1 receives 1000 base points to the winner; Tier 2 receives 500; Tier 3 receives 250; and Tier 4 receives 100.'],
    ],
  },
  {
    title: 'Book III · International eligibility and national teams',
    items: [
      ['Article 15 · Standard divisions', 'The divisions are Cadet (U-16), Junior (U-19), University/Collegiate (U-25), Senior (adult/pro), and Masters (O-40), with age-appropriate event durations and welfare requirements.'],
      ['Article 16 · Eligibility for national teams', 'A person holding legal nationality verified by a government-issued passport may play for that country’s NHA. A competitor who has represented one NHA may not represent another except under the transfer provisions.'],
      ['Article 17 · Dual nationality and transfers', 'A competitor with more than one nationality chooses an NHA before their first international cap. A lifetime transfer is possible only when passport, residency, and recent senior championship requirements are met, followed by a mandatory 12-month cooling-off period.'],
      ['Article 18 · Stateless individuals and refugees', 'A recognized refugee or stateless person may represent the NHA of their country of asylum after two years of continuous residency, or compete under the WHF Independent Refugee Hackathon Team.'],
    ],
  },
  {
    title: 'Book IV · World Hackathon Championship',
    items: [
      ['Article 19 · WHC cycle and host selection', 'The Senior WHC is held every two years in an odd-numbered year. NHAs submit a formal bid dossier five years before the event. Host venues must provide network redundancy, power resilience, climate control, and visa guarantees.'],
      ['Article 20 · National quotas and final phase', 'The Senior WHC Final Phase consists of 64 National Teams. Each team consists of four active hackers and one non-coding team manager or coach. Slots are allocated across the host, defending champion, WEU, AHC, CONCACAH, CONMEHA, CAH, and OFC.'],
      ['Article 21 · Schedule mechanics', 'The group stage places 64 teams into 16 groups of four for three consecutive eight-hour Sprint Challenges. The top two teams from each group advance to a single-elimination Endurance knockout stage.'],
    ],
  },
]

export default function RulebookPage() {
  return (
    <main className="rulebook-page min-h-screen overflow-x-hidden bg-[#071426] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#071426]/90 text-white backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10">
          <a href="/" className="text-[9px] font-bold leading-[0.9] tracking-[0.18em] text-cyan-200">WORLD<br />HACKATHON<br />FEDERATION</a>
          <div className="flex items-center gap-4">
            <span className="hidden rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-100 sm:inline-flex">Official rules</span>
            <a href="/" className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-300 hover:text-white">Back to WHF</a>
          </div>
        </div>
      </header>

      <section className="rulebook-hero relative overflow-hidden border-b border-white/10 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1fr_280px] lg:px-10 lg:py-24">
          <div>
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-200">WHF / Rulebook / Version 4.0</p>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.055em] sm:text-6xl lg:text-7xl">The rules behind a fairer world of competition.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">The comprehensive statutes, governance framework, and competition standards of the World Hackathon Federation.</p>
            <div className="mt-9 flex flex-wrap gap-3 text-[10px] font-bold uppercase tracking-[0.16em]"><a href="#contents" className="rounded-full bg-cyan-200 px-5 py-3 text-[#071426] hover:bg-white">Explore the rulebook</a></div>
          </div>
          <aside className="self-end rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-200">Document status</p>
            <p className="mt-5 text-4xl font-semibold tracking-[-0.06em]">4.0</p>
            <p className="mt-1 text-sm text-blue-100">Current public edition</p>
            <div className="mt-6 h-px bg-white/15" />
            <dl className="mt-5 grid grid-cols-2 gap-4 text-sm"><div><dt className="text-[10px] uppercase tracking-[0.15em] text-blue-200">Books</dt><dd className="mt-1 font-semibold">04</dd></div><div><dt className="text-[10px] uppercase tracking-[0.15em] text-blue-200">Articles</dt><dd className="mt-1 font-semibold">21</dd></div></dl>
          </aside>
        </div>
      </section>

      <div id="contents" className="scroll-mt-28 mx-auto grid max-w-7xl gap-12 px-5 py-14 lg:grid-cols-[220px_1fr] lg:px-10 lg:py-20">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4266b3]">Contents</p>
          <nav className="mt-5 space-y-2 rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(30,58,95,0.05)]">{sections.map((section, index) => <a key={section.title} href={`#book-${index + 1}`} className="block rounded-xl px-3 py-2 leading-5 transition-colors hover:bg-[#eef4fc] hover:text-[#163c78]"><span className="mr-2 font-mono text-xs text-slate-400">{index === 0 ? '00' : String(index).padStart(2, '0')}</span>{section.title.replace(/^Book [IVX]+ · /, '')}</a>)}</nav>
        </aside>
        <div className="min-w-0">
          {sections.map((section, index) => <section id={`book-${index + 1}`} key={section.title} className="scroll-mt-28 border-t border-slate-300 py-12 first:border-t-0 first:pt-0 sm:py-16">
            <div className="flex items-start gap-4 rounded-[1.25rem] border border-[#d8e3f2] bg-[#eef4fc] px-5 py-5 sm:px-6"><span className="font-mono text-xs font-bold text-[#4266b3]">{index === 0 ? '00' : String(index).padStart(2, '0')}</span><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#4266b3]">{index === 0 ? 'Introduction' : `Book ${index}`}</p><h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-[#10233f] sm:text-4xl">{section.title.replace(/^Book [IVX]+ · /, '')}</h2></div></div>
            <div className="mt-10 space-y-4">{section.items.map(([title, body], itemIndex) => <article key={title} className="grid gap-5 rounded-[1.35rem] border border-slate-200 bg-white px-5 py-6 shadow-[0_10px_30px_rgba(30,58,95,0.06)] transition-shadow hover:shadow-[0_16px_40px_rgba(30,58,95,0.1)] sm:grid-cols-[210px_1fr] sm:gap-10 sm:px-7 sm:py-8"><h3 className="text-sm font-bold leading-6 text-[#234d86]">{title}</h3><div><span className="mb-3 block font-mono text-[10px] font-bold tracking-[0.15em] text-[#6b85aa]">{String(itemIndex + 1).padStart(2, '0')}</span><p className="max-w-3xl text-[15px] leading-7 text-slate-700">{body}</p></div></article>)}</div>
          </section>)}
          <footer className="border-t-2 border-[#10233f] pt-8 text-sm leading-7 text-slate-600"><p>This page presents the WHF statutes and competition framework as a readable web document. It is not a download attachment.</p><a href="/" className="mt-4 inline-block font-bold text-[#163c78] underline underline-offset-4">Return to the WHF homepage</a></footer>
        </div>
      </div>
    </main>
  )
}
