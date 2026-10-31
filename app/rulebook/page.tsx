import { SiteHeader } from '@/components/site-header'

const sections = [
  {
    title: 'Foundations & definitions',
    kicker: 'The charter',
    articles: [
      {
        number: '0.1',
        title: 'Preamble',
        summary:
          'The World Hackathon Federation (WHF) is an international, non-governmental organization founded on technological equity, global collaboration, human ingenuity, and accountable competition.',
        rules: [
          'This rulebook establishes the common framework for WHF governance and WHF-sanctioned competitions. It is intended to be read together with the event notice and any discipline-specific technical rules.',
          'Every organizer, member association, official, team, and participant is responsible for knowing the provisions that apply to their role.',
          'Where local law provides stronger protection for participants, that law takes precedence. Nothing in this rulebook requires a person to act unlawfully or unsafely.',
        ],
      },
      {
        number: '0.2',
        title: 'Purpose and guiding principles',
        summary:
          'The federation makes competitions more open, comparable, and trustworthy without diminishing the character of local communities.',
        rules: [
          'WHF standards are guided by fairness, transparency, accessibility, human dignity, privacy, technical excellence, and responsible innovation.',
          'Rules must be published before competition begins, applied consistently, and explained in language participants can understand.',
          'Competitive advantage must come from skill, teamwork, and sound engineering—not deception, harassment, unauthorized access, or undisclosed assistance.',
        ],
      },
      {
        number: '0.3',
        title: 'Definitions',
        summary:
          'The following terms have a consistent meaning throughout the rulebook.',
        rules: [
          'WHF means the World Hackathon Federation; NHA means a recognized National Hackathon Association; WHC means the World Hackathon Championship; CAH means the Court of Arbitration for Hackathons.',
          'A sanctioned event is an event approved by WHF or a recognized confederation and listed as sanctioned before it begins.',
          'A participant is any registered competitor, coach, team manager, mentor, judge, volunteer, or official. A team is the registered group entered into a competition.',
          'The event notice is the published set of event-specific rules, schedule, challenge brief, scoring criteria, and operational instructions.',
        ],
      },
      {
        number: '0.4',
        title: 'Which rules apply',
        summary:
          'The rulebook, approved event notice, and applicable law work together as a single competition framework.',
        rules: [
          'The event notice may add operational detail, but may not silently waive a WHF safeguard or contradict a mandatory rule in this book.',
          'If two provisions appear to conflict, the organizer must publish a clarification. Until then, officials must apply the interpretation that is safest and fairest to participants.',
          'A material change after registration requires a clear explanation, reasonable notice, and a chance for affected teams to ask questions or withdraw without penalty.',
        ],
      },
    ],
  },
  {
    title: 'Institutional framework & membership',
    kicker: 'Book I',
    articles: [
      {
        number: '1',
        title: 'Name, form, and decentralized structure',
        summary:
          'The organization is named the World Hackathon Federation and operates as an international non-governmental organization.',
        rules: [
          'The federation has no permanent physical headquarters. Its Secretariat operates as a distributed administrative network.',
          'The Secretariat host city rotates every four years under a published selection process. A change of host must preserve continuity of records, services, and financial controls.',
          'No host, member, sponsor, or technology provider may exercise unilateral control over WHF competition outcomes or published standards.',
        ],
      },
      {
        number: '2',
        title: 'Objectives of the federation',
        summary:
          'WHF coordinates shared standards and supports fair, healthy, and internationally comparable hackathon competition.',
        rules: [
          'The federation recognizes national associations, sanctions competitions, maintains qualification and ranking frameworks, and convenes the WHC.',
          'WHF promotes open-source collaboration, accessible participation, humanitarian technology, and responsible use of emerging tools.',
          'WHF protects participants and the integrity of events by preventing plagiarism, intellectual-property theft, harassment, deceptive judging, and unauthorized use of systems or data.',
        ],
      },
      {
        number: '3',
        title: 'Neutrality, non-discrimination, and digital rights',
        summary:
          'Participation and administration must be free from discrimination and unrelated political or commercial pressure.',
        rules: [
          'Discrimination based on race, national or social origin, gender, disability, language, religion, political opinion, wealth, birth, sexual orientation, or operating-system preference is prohibited.',
          'Selection, judging, discipline, and access decisions must use published criteria relevant to the competition.',
          'Participants retain their rights to privacy, safety, reasonable accessibility accommodations, and respectful treatment.',
          'WHF and organizers must not require participants to disclose personal information that is not necessary for eligibility, safety, event delivery, or a clearly explained legal obligation.',
        ],
      },
      {
        number: '4',
        title: 'Official languages and documentation',
        summary:
          'WHF documentation is designed for international use while allowing local communities to communicate accessibly.',
        rules: [
          'The official spoken languages are English, French, Spanish, Arabic, and Mandarin. The Secretariat publishes authoritative WHF decisions in English and makes reasonable efforts to provide translations.',
          'English is the working language for source-code documentation, variable names, commit messages, API endpoint designations, and final-pitch presentations at WHF finals.',
          'Event organizers must state the working language before registration. They should provide interpretation or translated essential information when reasonably available.',
          'If a translation conflicts with the designated authoritative text, the event notice must identify which version controls and provide a route to request clarification.',
        ],
      },
      {
        number: '5',
        title: 'Admission and recognition of member associations',
        summary:
          'A National Hackathon Association may apply to represent a sovereign nation or recognized territory.',
        rules: [
          'Only one NHA is recognized for each eligible jurisdiction. The applicant must demonstrate independent governance, operational capacity, and a credible commitment to the WHF statutes.',
          'An application includes the association’s statutes, leadership and financial disclosures, evidence of activity, a CAH jurisdiction declaration, and an infrastructure and cybersecurity audit.',
          'The Secretariat acknowledges receipt, identifies missing materials, and provides a reasoned recommendation to the responsible membership committee.',
          'Recognition decisions must give the applicant written reasons and a review route. Recognition does not imply endorsement of a government or political position.',
        ],
      },
      {
        number: '6',
        title: 'Member rights and obligations',
        summary:
          'Members in good standing participate in federation decisions and uphold its common standards.',
        rules: [
          'Members may vote in the General Assembly, submit proposals, nominate eligible candidates, enter sanctioned competitions, and apply for development grants.',
          'Members must comply with published WHF decisions, pay approved dues, maintain accurate participant records, and report on inclusion and safeguarding efforts.',
          'Each NHA is responsible for communicating applicable rules to its teams and for cooperating with properly authorized event investigations.',
          'A member may challenge a decision through the applicable review process without retaliation.',
        ],
      },
      {
        number: '7',
        title: 'Suspension, resignation, and expulsion',
        summary:
          'Membership restrictions require a defined reason, notice, an opportunity to respond, and a proportionate decision.',
        rules: [
          'An NHA may resign by written notice to the Secretariat after settling outstanding obligations. Resignation does not erase responsibility for conduct during membership.',
          'The General Assembly may suspend a member by absolute majority or expel a member by a two-thirds majority for a catastrophic breach of the Code of Ethics.',
          'Before a restriction is imposed, the member receives the allegations and supporting basis, a reasonable opportunity to respond, and a written decision.',
          'Urgent interim restrictions may be used only to protect people, evidence, or event integrity; they must be reviewed promptly and may not substitute for a final decision.',
        ],
      },
    ],
  },
  {
    title: 'Governance, integrity & finance',
    kicker: 'Book II',
    articles: [
      {
        number: '8',
        title: 'The General Assembly',
        summary:
          'The General Assembly is the federation’s supreme legislative body.',
        rules: [
          'The Assembly meets annually. An extraordinary meeting may be called when the threshold in the statutes is met or when a time-sensitive matter requires member consideration.',
          'Each NHA in good standing has exactly one vote. The agenda, supporting papers, and proposed resolutions are circulated in advance.',
          'Meetings may be held in person or through secure remote participation, provided voting eligibility and the recorded result can be verified.',
          'Minutes record decisions, votes, recusals, and declared conflicts. They are made available to members, subject to necessary privacy and safety redactions.',
        ],
      },
      {
        number: '9',
        title: 'The Executive Council',
        summary:
          'The Executive Council directs federation operations between General Assembly meetings.',
        rules: [
          'The Council consists of the President, six Vice-Presidents representing the continental confederations, and twelve elected members.',
          'Terms last four years, with a maximum of three consecutive terms in the same office.',
          'Council decisions must be recorded with the decision, responsible owner, effective date, and any declared dissent or recusal.',
          'The Council may not amend a rule reserved to the General Assembly or reverse a final independent appeal decision.',
        ],
      },
      {
        number: '10',
        title: 'President and Secretary General',
        summary:
          'The President represents WHF; the Secretary General manages the distributed Secretariat.',
        rules: [
          'The President chairs the General Assembly and Executive Council, represents the federation, and ensures that adopted resolutions are carried out.',
          'The Secretary General maintains records, administers approved programs, supports member associations, and executes Council decisions.',
          'Neither office may direct a judge to alter a result or interfere with an independent investigation.',
          'When an officeholder has a conflict of interest, they disclose it and step aside from the affected decision.',
        ],
      },
      {
        number: '11',
        title: 'Committees and independent functions',
        summary:
          'Specialist committees provide oversight in areas that require expertise and independence.',
        rules: [
          'Standing committees cover Finance & Audit; Technical & Infrastructure; Referees, Judges & Proctors; Medical, Welfare & Anti-Doping; Players’ Status & Transfer; Commercial, Media & IP Rights; Diversity, Equity & Inclusion; Ethics and Integrity; and Artificial Intelligence Governance.',
          'Committee membership, remit, decision authority, and conflict rules must be published.',
          'Committees document recommendations and disclose material conflicts. A person may not adjudicate a complaint about their own conduct or decision.',
          'The Ethics and Integrity function may receive confidential reports and must protect good-faith reporters from retaliation.',
        ],
      },
      {
        number: '12',
        title: 'Transparency and public records',
        summary:
          'Public decisions make federation governance understandable and accountable.',
        rules: [
          'WHF publishes current statutes, competition rules, membership criteria, approved fees, ranking methods, and final decisions of general application.',
          'Budgets, audited financial statements, procurement policies, and grant criteria are available to members and summarized publicly.',
          'Personal data, confidential safeguarding reports, and security-sensitive operational details are restricted to people who need them for a defined purpose.',
          'A redaction must be narrow, recorded, and explained where doing so does not create further risk.',
        ],
      },
      {
        number: '13',
        title: 'Conflicts of interest and conduct',
        summary:
          'Officials must be impartial and disclose relationships or interests that could reasonably affect their duties.',
        rules: [
          'A conflict includes a financial, personal, professional, or organizational interest in a team, entrant, sponsor, vendor, or disputed decision.',
          'Officials disclose actual, potential, and perceived conflicts before accepting an assignment and whenever circumstances change.',
          'The event integrity lead decides whether disclosure, recusal, reassignment, or another safeguard is appropriate and records the decision.',
          'Gifts, payments, threats, or private arrangements intended to influence a result must be reported and may lead to discipline.',
        ],
      },
      {
        number: '14',
        title: 'Finance, grants, and procurement',
        summary:
          'Federation funds are administered with documented controls and a clear separation of duties.',
        rules: [
          'Dues, event fees, grants, and sponsorship income must be authorized, recorded, and used for the purpose for which they were approved.',
          'Grant decisions use published eligibility and selection criteria. Applicants receive a written outcome and may request a procedural review.',
          'Procurement decisions document the need, selection basis, and any relationship between decision-makers and suppliers.',
          'An independent audit reviews financial records on a regular schedule. Suspected misuse is referred to an appropriate independent function.',
        ],
      },
    ],
  },
  {
    title: 'Confederations, events & rankings',
    kicker: 'Book III',
    articles: [
      {
        number: '15',
        title: 'Recognition of continental confederations',
        summary:
          'WHF recognizes six continental confederations to coordinate regional competition.',
        rules: [
          'The recognized confederations are AHC, CAH, CONCACAH, CONMEHA, OFC, and WEU.',
          'A confederation submits its statutes, membership criteria, governance structure, financial controls, and competition calendar to the Secretariat.',
          'Confederation rules may add regional detail but may not conflict with the master rulebook or reduce a participant protection.',
          'Recognition is reviewed periodically and may be suspended only through a reasoned process with notice and an opportunity to respond.',
        ],
      },
      {
        number: '16',
        title: 'Confederation responsibilities',
        summary:
          'Regional bodies organize qualification, support members, and report results using shared standards.',
        rules: [
          'Confederations organize regional qualification tournaments, distribute development funds subject to audit, and maintain continental coefficient rankings.',
          'Each season, they publish the event calendar, qualification routes, eligibility checks, team quotas, and points submission procedures.',
          'Results and sanctions are reported to WHF in a consistent format, with corrections and appeals clearly identified.',
          'Development funds must be distributed under published criteria that account for access, need, and verifiable delivery.',
        ],
      },
      {
        number: '17',
        title: 'Sanctioning and event tiers',
        summary:
          'Sanctioning identifies the standards an event has committed to meet.',
        rules: [
          'WHF recognizes four tiers. Tier 1 awards 1,000 base ranking points to the winner; Tier 2 awards 500; Tier 3 awards 250; and Tier 4 awards 100.',
          'An organizer applies before registration opens and provides its format, schedule, challenge and judging plan, safety measures, accessibility information, and responsible contacts.',
          'Sanctioning is confirmed in a public listing. It may be suspended if material conditions are not met; affected entrants must be informed of the practical consequences.',
          'An event must not advertise itself as sanctioned before approval or imply that sanctioning guarantees a particular result or outcome.',
        ],
      },
      {
        number: '18',
        title: 'World ranking system',
        summary:
          'WHF maintains a rolling four-year ranking using results from eligible sanctioned competitions.',
        rules: [
          'The ranking method, event tiers, placement multipliers, tie-breakers, and treatment of withdrawn or disqualified teams are published before the ranking period.',
          'The tier base points in Article 17 are the winner’s starting points. Points for other placements follow the published placement schedule.',
          'Results age out after four years. A correction to an event result is reflected in the ranking with a public change note.',
          'Teams may report a factual ranking error through the listed review channel. Ranking status alone does not determine individual eligibility unless the event notice says so.',
        ],
      },
      {
        number: '19',
        title: 'Event notice and participant information',
        summary:
          'Every sanctioned event supplies one reliable source for the rules participants need to prepare and compete.',
        rules: [
          'The notice identifies the organizer, event dates and time zones, format, eligibility, team size, challenge release, allowed tools, judging criteria, prize terms, and contact channels.',
          'It explains registration, check-in, accessibility requests, privacy practices, code submission, use of infrastructure, appeals, and emergency procedures.',
          'Organizers keep a dated record of material updates and notify registered teams directly when a change affects their preparation or rights.',
          'Participants can ask questions through a published channel and receive consistent answers shared with all teams when the answer affects competition.',
        ],
      },
    ],
  },
  {
    title: 'Eligibility & national representation',
    kicker: 'Book IV',
    articles: [
      {
        number: '20',
        title: 'Standard divisions',
        summary:
          'WHF competitions use common age divisions with age-appropriate event design.',
        rules: [
          'The standard divisions are Cadet (under 16), Junior (under 19), University/Collegiate (under 25), Senior (adult/pro), and Masters (over 40).',
          'The event notice states the date on which age is measured and explains any division-specific documentation requirement.',
          'Cadet and Junior events require age-appropriate schedules, supervision, safeguarding contacts, and communication with a parent or guardian where required by law.',
          'An organizer may offer additional inclusive divisions, but must publish their eligibility rules and ensure they do not conflict with law or WHF protections.',
        ],
      },
      {
        number: '21',
        title: 'Individual eligibility',
        summary:
          'Eligibility checks are consistent, proportionate, and limited to evidence relevant to the event.',
        rules: [
          'The event notice defines who may enter, what proof is accepted, and when eligibility is checked.',
          'A person is not excluded solely because they lack a particular device, paid service, or high-speed connection unless that resource is essential to the published format and an accessible alternative is not reasonably available.',
          'Organizers collect only the minimum evidence needed to verify eligibility and restrict access to staff responsible for that check.',
          'A participant who cannot provide a requested document for a legitimate reason may ask for an alternative verification method.',
        ],
      },
      {
        number: '22',
        title: 'National team representation',
        summary:
          'A competitor may represent the NHA of the country where they are a legal resident; citizenship is not required.',
        rules: [
          'Residency is verified through government-issued documentation or another reliable method approved by the Players’ Status committee.',
          'A competitor who has represented one NHA may not represent another except through the transfer provisions.',
          'An NHA must apply the same published selection process to all eligible applicants and disclose any selection criteria in advance.',
          'Selection decisions identify the criteria applied and provide a route for an affected competitor to request review.',
        ],
      },
      {
        number: '23',
        title: 'Dual nationality and transfers',
        summary:
          'Representation choices are stable, with a limited and reviewable transfer process.',
        rules: [
          'A competitor with more than one nationality chooses an NHA before their first international cap.',
          'A lifetime transfer may be considered only when the passport, residency, and recent senior championship requirements are met.',
          'An approved transfer is followed by a mandatory 12-month cooling-off period before the competitor may represent the new NHA.',
          'The Players’ Status committee confirms requirements in writing, protects supporting documents, and gives reasons for any refusal.',
        ],
      },
      {
        number: '24',
        title: 'Refugees, stateless persons, and independent entrants',
        summary:
          'A person’s displacement or lack of nationality must not close every route to competition.',
        rules: [
          'A recognized refugee or stateless person may represent the NHA of their country of asylum after two years of continuous residency.',
          'A person who cannot reasonably join a national pathway may apply to compete under the WHF Independent Refugee Hackathon Team.',
          'Verification must not require public disclosure of sensitive immigration or protection information.',
          'The independent pathway provides the same access to event information, judging, welfare support, and appeals as other entrants.',
        ],
      },
      {
        number: '25',
        title: 'Team registration and roster changes',
        summary:
          'A roster is fixed transparently so that substitutions do not create an unfair advantage.',
        rules: [
          'The event notice states team size, registration deadlines, required roles, and the circumstances in which a roster change may be approved.',
          'Every roster member must meet the same eligibility and conduct requirements. A person may not compete for two teams in the same event unless the notice explicitly permits it.',
          'After the roster is locked, substitutions are allowed only for a documented welfare, eligibility, or exceptional operational reason and must be approved before the affected round.',
          'The organizer records the change, applies the same standard to comparable requests, and does not penalize a team for seeking an accommodation.',
        ],
      },
    ],
  },
  {
    title: 'World Hackathon Championship',
    kicker: 'Book V',
    articles: [
      {
        number: '26',
        title: 'WHC cycle and host selection',
        summary:
          'The Senior World Hackathon Championship is held every two years in an odd-numbered year.',
        rules: [
          'NHAs submit a formal bid dossier five years before the event. The dossier describes governance, venue, budget, accessibility, safety, connectivity, power, and delivery capacity.',
          'Host venues provide network redundancy, power resilience, climate control, and visa guarantees, with a documented contingency plan for each critical service.',
          'Bid evaluation uses published criteria and records evaluator conflicts. The final decision and a plain-language rationale are made available to members.',
          'If a host cannot meet its commitments, WHF works with the host on remediation or a transfer plan and communicates the effect on teams promptly.',
        ],
      },
      {
        number: '27',
        title: 'National quotas and final phase',
        summary:
          'The Senior WHC Final Phase consists of 64 National Teams.',
        rules: [
          'Each team consists of four active hackers and one non-coding team manager or coach.',
          'Slots are allocated across the host, defending champion, WEU, AHC, CONCACAH, CONMEHA, CAH, and OFC.',
          'The allocation method, qualification events, reserve list, and treatment of an unused slot are published before the qualification cycle begins.',
          'No quota is changed retroactively to benefit a particular team. Any exceptional adjustment must be reasoned, public, and subject to review.',
        ],
      },
      {
        number: '28',
        title: 'Championship schedule and format',
        summary:
          'The group stage and knockout stage reward both consistent engineering and demonstrated performance.',
        rules: [
          'The group stage places 64 teams into 16 groups of four for three consecutive eight-hour Sprint Challenges.',
          'The top two teams from each group advance to a single-elimination Endurance knockout stage.',
          'The schedule publishes challenge release times, submission cutoffs, judging windows, rest periods, and tie-breakers in the event notice.',
          'A schedule change caused by an outage or safety incident must be announced to every affected team, with an equivalent remedy where possible.',
        ],
      },
      {
        number: '29',
        title: 'Challenge design and release',
        summary:
          'Challenges test the published skills, not access to hidden information or a particular private service.',
        rules: [
          'The challenge brief identifies the problem, required deliverables, evaluation criteria, allowed resources, and any external dependency.',
          'Organizers check the brief for ambiguity, inaccessible assumptions, undisclosed conflicts, and unintended dependency on paid services.',
          'If a material clarification is issued, it is shared simultaneously with all teams and added to the official event record.',
          'Challenge authors and judges disclose prior involvement and may not privately coach or supply a team with non-public information.',
        ],
      },
      {
        number: '30',
        title: 'Workspace, network, and event continuity',
        summary:
          'Infrastructure is provided consistently and outages are handled through a documented, neutral process.',
        rules: [
          'The organizer publishes the supported platforms, network limits, available tools, and restrictions before the competition starts.',
          'Teams are told what event-provided systems they may use and how to report a suspected outage or access problem.',
          'Officials preserve relevant service logs and timestamps when needed to review an incident, while limiting collection to what is necessary.',
          'A service interruption affecting teams unevenly triggers an impartial review and a proportionate remedy, which may include additional time or a rerun.',
        ],
      },
    ],
  },
  {
    title: 'Competition conduct & technical standards',
    kicker: 'Book VI',
    articles: [
      {
        number: '31',
        title: 'Fair play and team conduct',
        summary:
          'Competitors act honestly, respect other participants, and follow the published competition conditions.',
        rules: [
          'Teams submit work that they created or are authorized to use, disclose required contributions, and answer officials truthfully.',
          'Harassment, intimidation, discriminatory conduct, sabotage, impersonation, bribery, and deliberate disruption are prohibited.',
          'Participants do not seek or share confidential challenge material before its authorized release.',
          'A team manager or coach may support logistics and wellbeing but may not perform work reserved to the registered hackers.',
        ],
      },
      {
        number: '32',
        title: 'Permitted tools, assistance, and attribution',
        summary:
          'The event notice defines acceptable collaboration and tool use so every team competes under the same conditions.',
        rules: [
          'Organizers state whether internet research, open-source packages, code assistants, generative AI, external APIs, and pre-existing code are allowed.',
          'Unless the notice says otherwise, teams may use publicly available development tools but must disclose material tool-generated contributions when requested by the event.',
          'Participants may not obtain undisclosed human assistance, private challenge solutions, or restricted resources after the competition begins.',
          'Teams keep sufficient records to explain authorship, licenses, and material contributions during a review.',
        ],
      },
      {
        number: '33',
        title: 'Intellectual property and open-source use',
        summary:
          'Participants retain ownership of their work unless they knowingly agree to a separately stated license or assignment.',
        rules: [
          'Registration terms clearly explain any license needed to host, review, display, or promote submitted work.',
          'An organizer may not claim ownership of a participant’s project solely because it was submitted to a competition.',
          'Teams respect third-party licenses, trademarks, privacy rights, and the terms of services they use.',
          'A team discloses material pre-existing work and third-party components in the manner stated in the event notice.',
        ],
      },
      {
        number: '34',
        title: 'Responsible use of systems and data',
        summary:
          'Competition work must stay within the authorized environment and respect people affected by the technology.',
        rules: [
          'Participants use only systems, accounts, datasets, and interfaces they are expressly authorized to access.',
          'Testing that could affect a real service, another participant, or personal data requires explicit written authorization and a defined scope.',
          'Teams minimize personal data, protect credentials, and promptly report suspected exposure or misuse through the event’s designated channel.',
          'Challenge solutions must not facilitate unlawful discrimination or expose people to avoidable harm; judges may ask teams to explain foreseeable risks and safeguards.',
        ],
      },
      {
        number: '35',
        title: 'Judging criteria and scoring',
        summary:
          'Judges evaluate work against clear criteria and record enough reasoning to make results reviewable.',
        rules: [
          'The event notice publishes the scoring dimensions, their relative weighting, any minimum requirements, and tie-breakers before submissions are due.',
          'Criteria may cover relevance to the brief, technical quality, usability, accessibility, reliability, originality, responsible design, and quality of the demonstration.',
          'Judges receive consistent instructions and disclose conflicts. A conflicted judge is recused from the affected team or decision.',
          'Score changes after judging are recorded with the reason, authorizing official, and effect on standings.',
        ],
      },
      {
        number: '36',
        title: 'Demonstrations and technical review',
        summary:
          'Teams must be able to explain and demonstrate their work without being required to reveal unrelated private information.',
        rules: [
          'A team may be asked to explain architecture, key implementation choices, authorship, and how its submission meets the challenge.',
          'Review questions are relevant, consistently administered, and limited to the time and format announced in advance.',
          'Officials do not request personal passwords, private messages, unrelated source code, or access to personal devices.',
          'If a team cannot demonstrate because of an event-system failure, officials assess the available evidence and consider a fair alternative.',
        ],
      },
    ],
  },
  {
    title: 'Judging, complaints & appeals',
    kicker: 'Book VII',
    articles: [
      {
        number: '37',
        title: 'Officials and event integrity',
        summary:
          'Officials administer the rules consistently and separate operational decisions from judging outcomes.',
        rules: [
          'The organizer names an event director, integrity lead, judging lead, and safeguarding contact before the event.',
          'Officials receive role-appropriate training, know the escalation route, and document significant decisions.',
          'An official may not privately promise a team a favorable decision or retaliate against someone who asks a good-faith question.',
          'Where possible, a person who investigated an allegation does not decide the final appeal of that same allegation.',
        ],
      },
      {
        number: '38',
        title: 'Protests and correction requests',
        summary:
          'Teams can ask for a factual or procedural error to be corrected without being penalized for raising it.',
        rules: [
          'The event notice identifies the submission channel, required information, and deadline for a protest or correction request.',
          'A request should identify the challenged decision, the rule or fact at issue, and any supporting evidence reasonably available to the team.',
          'The event integrity lead acknowledges receipt, keeps the request confidential where appropriate, and provides a reasoned response.',
          'A team may correct a clerical or scoring-record error without reopening unrelated parts of the event.',
        ],
      },
      {
        number: '39',
        title: 'Appeals and independent review',
        summary:
          'A participant affected by a material procedural decision has access to a reviewer who was not responsible for the original decision.',
        rules: [
          'The appeal route and deadline are published before competition. The deadline must leave a meaningful opportunity to respond after notice of the decision.',
          'The reviewer considers the applicable rule, evidence, consistency, and whether the process was fair.',
          'The written outcome states the decision, key reasons, remedy if any, and whether the decision is final within the event process.',
          'A review does not automatically pause an event. The reviewer may order a temporary measure when needed to preserve a meaningful remedy.',
        ],
      },
      {
        number: '40',
        title: 'Complaints, safeguarding, and confidentiality',
        summary:
          'Safety concerns can be raised through a route separate from ordinary scoring and technical questions.',
        rules: [
          'The event publishes a confidential contact for harassment, discrimination, threats, accessibility barriers, and other safeguarding concerns.',
          'Reports are handled promptly, sensitively, and only shared with people who need the information to respond.',
          'A report may be made by an affected person or a witness. Good-faith reporting is protected from retaliation.',
          'Immediate safety concerns may require urgent protective action and referral to appropriate local services, consistent with law and participant safety.',
        ],
      },
      {
        number: '41',
        title: 'Evidence and investigation',
        summary:
          'Investigations are proportionate, impartial, and based on evidence rather than rumor or public pressure.',
        rules: [
          'The investigator explains the allegation, requests only relevant information, and gives affected people a fair chance to respond.',
          'Relevant event records are preserved with access limited to authorized reviewers and retained only as long as needed for the process.',
          'A finding identifies the standard applied and the evidence relied upon. Unverified allegations are not presented as established fact.',
          'Investigators avoid unnecessary disclosure of personal or confidential material and record any unavoidable disclosure.',
        ],
      },
      {
        number: '42',
        title: 'Sanctions and remedies',
        summary:
          'Consequences are proportionate to the conduct, its impact, intent, and any prior relevant findings.',
        rules: [
          'Available measures include education, warning, score correction, removal of an advantage, disqualification, temporary suspension, or referral to a competent body.',
          'Before a sanction, the affected person receives notice and an opportunity to respond, except for strictly temporary protective action.',
          'The written decision explains the rule breached, relevant facts, sanction, duration where applicable, and appeal route.',
          'A remedy should restore fairness where practical and avoid penalizing teams that were not responsible for the breach.',
        ],
      },
    ],
  },
  {
    title: 'Welfare, access & participant protection',
    kicker: 'Book VIII',
    articles: [
      {
        number: '43',
        title: 'Participant welfare and rest',
        summary:
          'Performance must not depend on unsafe schedules or pressure to ignore basic needs.',
        rules: [
          'Organizers publish the event schedule, expected working periods, rest opportunities, and welfare contact before the event.',
          'WHC endurance formats include protected Screen-Dark rest cycles. Participants are not penalized for taking a required rest period.',
          'Teams may request a reasonable adjustment for a disability, health need, caregiving responsibility, or religious observance.',
          'Officials may pause or modify activity when continuing would create a credible risk to participant health or safety.',
        ],
      },
      {
        number: '44',
        title: 'Accessibility and inclusion',
        summary:
          'A participant should be able to understand the rules, access the event, and demonstrate their work through an equitable format.',
        rules: [
          'Registration provides a clear way to request accommodations and explains who will receive that information.',
          'Organizers consider accessible venues, assistive technology, captions, readable challenge material, and alternatives to inaccessible interfaces.',
          'Accommodation decisions are individualized, confidential, and based on the event’s essential requirements rather than assumptions about a person.',
          'A request is not denied solely because it is unusual; the organizer discusses practical alternatives with the participant.',
        ],
      },
      {
        number: '45',
        title: 'Safeguarding minors',
        summary:
          'Events involving minors must meet heightened safeguarding and supervision requirements.',
        rules: [
          'The organizer complies with local child-protection law and names a trained safeguarding contact.',
          'The event notice explains supervision, communication, travel, photography, consent, and emergency arrangements in age-appropriate language.',
          'Private one-to-one contact between an adult official and a minor is avoided where practical and handled under the organizer’s safeguarding policy.',
          'A concern involving a minor is escalated promptly to the designated safeguarding lead and handled with the child’s safety as the priority.',
        ],
      },
      {
        number: '46',
        title: 'Health, safety, and incident response',
        summary:
          'Organizers identify foreseeable risks and provide a clear response when an incident occurs.',
        rules: [
          'The host provides emergency contacts, first-aid arrangements, evacuation information, and a way to report an unsafe condition.',
          'Remote events provide accessible contact methods and explain what support can and cannot be offered across jurisdictions.',
          'Incidents are recorded using the minimum information necessary to respond and improve future safety.',
          'An organizer communicates significant disruption or safety instructions promptly and in a format participants can access.',
        ],
      },
      {
        number: '47',
        title: 'Travel, visas, and accommodation',
        summary:
          'International event planning must make practical participation requirements visible before teams commit.',
        rules: [
          'Hosts publish visa support procedures, travel deadlines, venue access details, and any participant costs as early as reasonably possible.',
          'A team that cannot travel because of a visa or host-side issue may ask for a fair alternative, such as remote participation or a qualification adjustment.',
          'Accommodation information identifies accessibility features and the process for requesting a reasonable change.',
          'No team is guaranteed a visa decision; organizers must not make misleading promises about government actions.',
        ],
      },
    ],
  },
  {
    title: 'Data, AI & final provisions',
    kicker: 'Book IX',
    articles: [
      {
        number: '48',
        title: 'Privacy and data handling',
        summary:
          'Personal information is collected for a defined purpose, protected appropriately, and not treated as competition content.',
        rules: [
          'The event privacy notice identifies what is collected, why it is needed, who receives it, how long it is retained, and how participants can raise a concern.',
          'Sensitive eligibility, health, safeguarding, and identity documents are restricted to authorized staff and are not published in team records.',
          'Access credentials and private communications are not requested for routine judging or eligibility checks.',
          'A suspected data incident is reported through the designated contact and handled under applicable law and the organizer’s response plan.',
        ],
      },
      {
        number: '49',
        title: 'Artificial intelligence and automation',
        summary:
          'AI tools may support innovation, but their use must be transparent, permitted, and compatible with human accountability.',
        rules: [
          'Each event states which AI or autonomous tools are allowed, restricted, or prohibited and what disclosure is required.',
          'A team remains responsible for submitted work, including generated output, licenses, accuracy, privacy, and foreseeable effects.',
          'Participants may not use an automated system to impersonate another person, conceal prohibited assistance, or make unauthorized changes to event infrastructure.',
          'Judges evaluate the team’s work against published criteria and do not infer misconduct solely from the use of an allowed tool.',
        ],
      },
      {
        number: '50',
        title: 'Media, sponsorship, and commercial use',
        summary:
          'Commercial relationships must not compromise judging independence, participant consent, or access to competition.',
        rules: [
          'Sponsors and vendors are disclosed. Their support does not grant access to confidential submissions or authority over results.',
          'Photography, recording, and publication terms are explained before registration, with a practical way to raise consent or safety concerns.',
          'Participants are not required to endorse a sponsor or grant broad commercial rights to their work as a condition of ordinary entry.',
          'A commercial partner with a conflict is excluded from the affected judging, selection, or appeal decision.',
        ],
      },
      {
        number: '51',
        title: 'Amendments and interpretation',
        summary:
          'Changes to the common rules follow a recorded process and are communicated before they take effect.',
        rules: [
          'The General Assembly adopts amendments under the voting requirements in the WHF statutes.',
          'The Executive Council may issue a temporary operational interpretation when necessary, but it must publish its basis, scope, and expiration or review date.',
          'No amendment applies retroactively to change a completed result or impose a new sanction for conduct that was permitted when it occurred.',
          'The Secretariat maintains a dated edition history that identifies substantive changes in plain language.',
        ],
      },
      {
        number: '52',
        title: 'Entry into force and severability',
        summary:
          'The rulebook is applied as a complete framework while preserving valid protections if a provision cannot be enforced.',
        rules: [
          'This public edition is identified as WHF Rulebook Version 4.0. The edition history and effective date are published with the official text.',
          'If a provision is invalid under applicable law, it is limited only to the extent necessary; the remaining provisions continue to apply.',
          'The Secretariat may publish an accessible-format copy or translation without changing the authoritative text.',
          'Questions about interpretation may be sent to the Secretariat through the official WHF contact channel.',
        ],
      },
    ],
  },
] as const

const articleCount = sections.reduce((total, section) => total + section.articles.length, 0)

export default function RulebookPage() {
  return (
    <main className="rulebook-page min-h-screen overflow-x-hidden bg-[#071426] text-slate-900">
      <SiteHeader label="Official rules" />

      <section
        className="rulebook-hero relative overflow-hidden border-b border-white/10 bg-[#071426] text-white"
        style={{
          backgroundColor: '#071426',
          backgroundImage: 'linear-gradient(135deg, #071426 0%, #102d59 60%, #17143f 100%)',
        }}
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1fr_300px] lg:px-10 lg:py-24">
          <div className="self-center">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-200">
              WHF / Rules / Public edition 4.0
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
              A clearer standard for fair competition.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              A practical guide to the federation, sanctioned events, participant rights, judging,
              integrity, and the World Hackathon Championship.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 text-[10px] font-bold uppercase tracking-[0.16em]">
              <a
                href="#contents"
                className="rounded-full bg-cyan-200 px-5 py-3 text-[#071426] hover:bg-white"
              >
                Browse the rules <span aria-hidden="true">↓</span>
              </a>
              <a
                href="#foundations"
                className="rounded-full border border-white/20 px-5 py-3 text-white hover:border-cyan-200"
              >
                Start with the charter
              </a>
            </div>
          </div>
          <aside className="self-end rounded-3xl border border-white/15 bg-white/10 p-6 text-white backdrop-blur-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-200">
              At a glance
            </p>
            <p className="mt-5 text-4xl font-semibold tracking-[-0.06em]">4.0</p>
            <p className="mt-1 text-sm text-blue-100">Public edition</p>
            <div className="mt-6 h-px bg-white/15" />
            <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.15em] text-blue-200">Books</dt>
                <dd className="mt-1 font-semibold">09</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.15em] text-blue-200">Articles</dt>
                <dd className="mt-1 font-semibold">{articleCount}</dd>
              </div>
              <div className="col-span-2 border-t border-white/15 pt-4">
                <dt className="text-[10px] uppercase tracking-[0.15em] text-blue-200">
                  What it covers
                </dt>
                <dd className="mt-1 text-sm leading-6 text-white">
                  Governance · competition · integrity · participant welfare
                </dd>
              </div>
            </dl>
          </aside>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-wrap gap-x-8 gap-y-3 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-100/70 lg:px-10">
            <span>Published standards</span>
            <span aria-hidden="true">·</span>
            <span>Transparent judging</span>
            <span aria-hidden="true">·</span>
            <span>People-first competition</span>
          </div>
        </div>
      </section>

      <div
        id="contents"
        className="scroll-mt-28 mx-auto grid max-w-7xl gap-10 bg-[#f3f7fc] px-5 py-12 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-14 lg:px-10 lg:py-16"
      >
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4266b3]">
            Rulebook contents
          </p>
          <nav
            aria-label="Rulebook contents"
            className="mt-5 grid gap-2 rounded-[1.25rem] border border-slate-200 bg-white p-3 shadow-[0_10px_30px_rgba(30,58,95,0.05)] sm:grid-cols-2 lg:grid-cols-1"
          >
            {sections.map((section, index) => (
              <a
                key={section.title}
                href={`#${index === 0 ? 'foundations' : `book-${index}`}`}
                className="group rounded-xl px-3 py-3 leading-5 text-[#244b78] transition-colors hover:bg-[#eef4fc] hover:text-[#163c78]"
              >
                <span className="mr-2 font-mono text-[10px] font-bold text-[#6b85aa]">
                  {index === 0 ? '00' : `0${index}`}
                </span>
                <span className="text-sm font-medium">{section.title}</span>
                <span className="mt-1 block pl-8 text-[10px] uppercase tracking-[0.13em] text-slate-400">
                  {section.articles.length} articles
                </span>
              </a>
            ))}
          </nav>
          <div className="mt-5 rounded-2xl border border-[#d8e3f2] bg-[#eaf1fa] p-4 text-sm leading-6 text-[#34537e]">
            <p className="font-semibold text-[#163c78]">Using this rulebook</p>
            <p className="mt-2">
              Start with the charter, then check the event notice for the schedule, scoring,
              permitted tools, and event-specific deadlines.
            </p>
          </div>
        </aside>

        <div className="min-w-0">
          {sections.map((section, index) => (
            <section
              id={index === 0 ? 'foundations' : `book-${index}`}
              key={section.title}
              className="scroll-mt-28 border-t border-slate-300 py-12 first:border-t-0 first:pt-0 sm:py-16"
            >
              <div className="rounded-[1.5rem] border border-[#d8e3f2] bg-gradient-to-br from-white to-[#eaf2fc] p-6 sm:p-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#4266b3]">
                  {section.kicker} <span aria-hidden="true">/</span>{' '}
                  {String(index).padStart(2, '0')}
                </p>
                <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                  <h2 className="text-3xl font-semibold tracking-[-0.05em] text-[#10233f] sm:text-4xl">
                    {section.title}
                  </h2>
                  <span className="rounded-full border border-[#cbd9eb] bg-white/80 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#4266b3]">
                    {section.articles.length} articles
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {section.articles.map((article) => (
                  <article
                    id={`article-${article.number.replace('.', '-')}`}
                    key={article.number}
                    className="scroll-mt-32 rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(30,58,95,0.05)] sm:p-7"
                  >
                    <div className="grid gap-4 sm:grid-cols-[70px_minmax(0,1fr)] sm:gap-6">
                      <span className="flex h-9 w-fit items-center rounded-full bg-[#edf3fb] px-3 font-mono text-xs font-bold text-[#4266b3]">
                        {article.number}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold leading-7 text-[#123d73] sm:text-xl">
                          {article.title}
                        </h3>
                        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#304866] sm:text-[15px]">
                          {article.summary}
                        </p>
                        <ul className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                          {article.rules.map((rule) => (
                            <li
                              key={rule}
                              className="grid grid-cols-[12px_minmax(0,1fr)] gap-3 text-sm leading-7 text-slate-600"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-[0.72rem] size-1.5 rounded-full bg-cyan-600"
                              />
                              <span>{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}

          <footer className="border-t-2 border-[#10233f] pt-8 text-sm leading-7 text-[#28496e]">
            <p>
              This page presents the WHF public rulebook as a readable web document. The event
              notice supplies event-specific procedures and deadlines; applicable law and
              safeguarding requirements continue to apply.
            </p>
            <a
              href="/"
              className="mt-4 inline-block font-bold text-[#163c78] underline underline-offset-4"
            >
              Return to the WHF homepage
            </a>
          </footer>
        </div>
      </div>
    </main>
  )
}
