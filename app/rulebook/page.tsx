const sections = [
  {
    title: 'Preamble & definitions',
    items: [
      ['1.1 Preamble', 'The World Hackathon Federation (WHF) is an international non-governmental organization founded on technological equity, global collaboration, human ingenuity, and decentralized governance. The WHF seeks to standardize, regulate, and elevate competitive hackathons worldwide.'],
      ['1.2 Mission statement', 'To foster global technological advancement through structured, fair, and rigorously governed competitive engineering, ensuring talent from every nation has an equal opportunity to compete, innovate, and be recognized, while upholding digital ethics and open-source collaboration.'],
      ['1.3 Definitions', 'WHF means World Hackathon Federation. NHA means National Hackathon Association. WHC means World Hackathon Championship. CAH means Court of Arbitration for Hackathons. A sanctioned event operates under the direct jurisdiction and rules of the WHF.'],
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
    <main className="min-h-screen bg-[#f7f8fa] text-[#0b192c]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 lg:px-8">
          <a href="/" className="text-center text-[9px] font-bold leading-[0.9] tracking-[0.16em] text-[#17376e]">WORLD<br />HACKATHON<br />FEDERATION</a>
          <a href="/" className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 hover:text-[#0b192c]">Back to WHF</a>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="border-b border-[#0b192c] pb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#34537e]">Official document · Version 4.0</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">World Hackathon Federation</h1>
          <p className="mt-4 text-xl text-slate-600">Comprehensive statutes, governance, and competition rulebook</p>
          <dl className="mt-10 grid gap-5 border-t border-slate-200 pt-6 text-sm sm:grid-cols-3"><div><dt className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Effective date</dt><dd className="mt-2 font-medium">January 1, 2027</dd></div><div><dt className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Form</dt><dd className="mt-2 font-medium">International NGO</dd></div><div><dt className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Administration</dt><dd className="mt-2 font-medium">Globally decentralized</dd></div></dl>
        </div>
        <div className="divide-y divide-slate-200">
          {sections.map((section) => <section key={section.title} className="py-12"><h2 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">{section.title}</h2><div className="mt-8 space-y-8">{section.items.map(([title, body]) => <article key={title} className="grid gap-3 sm:grid-cols-[240px_1fr]"><h3 className="text-sm font-bold leading-6 text-[#34537e]">{title}</h3><p className="max-w-2xl text-[15px] leading-7 text-slate-700">{body}</p></article>)}</div></section>)}
        </div>
        <div className="border-t border-[#0b192c] pt-8 text-sm leading-7 text-slate-600"><p>This page presents the WHF statutes and competition framework as a readable web document. It is not a download attachment.</p><a href="/" className="mt-4 inline-block font-bold text-[#0b192c] underline underline-offset-4">Return to the WHF homepage</a></div>
      </div>
    </main>
  )
}
