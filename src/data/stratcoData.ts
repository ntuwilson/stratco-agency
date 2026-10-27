export type ProjectIntent = 'tvc' | 'brand' | 'live' | 'strategy';

export type WorkFilterCategory =
  | 'All Work'
  | 'Live & Broadcast'
  | 'Film & TVC'
  | 'Brand & Identity'
  | 'Strategy & Campaigns';

export const WORK_FILTERS: WorkFilterCategory[] = [
  'All Work',
  'Live & Broadcast',
  'Film & TVC',
  'Brand & Identity',
  'Strategy & Campaigns',
];

export interface HeroReelMode {
  id: string;
  index: string;
  label: string;
  headline: string;
  meta: string;
  image: string;
  specs: string[];
}

export interface CaseGalleryItem {
  src: string;
  caption: string;
  tag?: string;
  aspect?: 'landscape' | 'portrait';
  planTitle?: string;
  planSpec?: string;
}

export interface CaseCredit {
  role: string;
  name: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  index: string;
  shortName: string;
  titleLines: [string, string];
  tabTagline: string;
  sector: string;
  badge: string;
  filterCategories: WorkFilterCategory[];
  status: 'FULL PROJECT' | 'CASE BRIEF';
  title: string;
  summary: string;
  insight: string;
  client: string;
  partners?: string;
  timeline?: string;
  industry: string;
  location: string;
  scaleSpec: string;
  heroMetric: {
    number: string;
    sup: string;
    gridLabel: string;
  };
  thesisTitle: string;
  thesisParagraphs: [string, string];
  execution: string[];
  credits: CaseCredit[];
  footerMeta: string;
  image: string;
  gallery: CaseGalleryItem[];
  challenge: string;
  solution: string;
  deliverables: string[];
  metrics: { label: string; value: string }[];
  intent: ProjectIntent;
}

export interface InteractiveService {
  id: string;
  num: string;
  title: string;
  anchor: string;
  summary: string;
  description: string;
  image: string;
  caption: string;
  capabilities: string[];
  intent: ProjectIntent;
}

export interface ProductionStep {
  step: string;
  phase: string;
  title: string;
  description: string;
  output: string;
  deliverables: string[];
  image: string;
  caption: string;
  projectLabel: string;
  projectSlug: string;
}

export const HERO_REEL_MODES: HeroReelMode[] = [
  {
    id: 'live',
    index: '01',
    label: 'National Summits & Live Production',
    headline:
      'UCC & Ministry of ICT — Data Protection & Privacy CEO Conference 2025.',
    meta: 'UGANDA COMMUNICATIONS COMMISSION · MINISTRY OF ICT · LIVE PRODUCTION',
    image: '/images/ucc/0R7A9084.jpg',
    specs: [
      'Custom 3-Screen LED Stage',
      'Multi-Cam Live IMAG Broadcast',
      'Campaign Visuals & Venue Branding',
    ],
  },
  {
    id: 'tvc',
    index: '02',
    label: 'Documentary & Commercial Film',
    headline:
      'Digital Skilling for Women — 50+ District National Documentary Production.',
    meta: 'CLIENT: PENDA · PARTNERS: UCC · UCUSAF · 2024 – 2026',
    image: '/images/dlw/UCC00169.jpg',
    specs: [
      'Documentary Concept & Direction',
      '50+ District Stories & Testimonials',
      'In-House Edit, Color & Sound',
    ],
  },
  {
    id: 'campaigns',
    index: '03',
    label: 'Documentary, Branding & Digital',
    headline:
      'Trust Empowerment Programme (TEP) — 10-District Documentary, Branding & Live Digital Coverage.',
    meta: 'CLIENT: PENDA · PARTNERS: FINANCE TRUST BANK · GROW · PSFU · 2026',
    image: '/images/ftb/6F1A1300.jpg',
    specs: [
      'Documentary Film & Photography',
      'Programme & Venue Branding',
      'Real-Time Session Clips · 10 Districts',
    ],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'ucc-data-protection-2025',
    slug: 'ucc-data-protection-2025',
    index: '01',
    shortName: 'UCC & Ministry of ICT — Data Protection Conference 2025',
    titleLines: ['Data Protection & Privacy', 'CEO Conference 2025'],
    tabTagline: 'Data Protection & Privacy CEO Conference 2025',
    sector: 'UCC · MINISTRY OF ICT & NATIONAL GUIDANCE · PDPO',
    badge: 'Live & Broadcast · Strategy & Campaigns',
    filterCategories: [
      'All Work',
      'Live & Broadcast',
      'Strategy & Campaigns',
      'Brand & Identity',
    ],
    status: 'FULL PROJECT',
    title:
      'UCC & Ministry of ICT — Data Protection and Privacy CEO Conference 2025',
    summary:
      'For the 2025 Data Protection and Privacy CEO Conference convened by the Uganda Communications Commission (UCC), the Ministry of ICT and National Guidance, and the Personal Data Protection Office, Stratco delivered the campaign visual language, custom 3-screen LED stage architecture, outdoor venue branding, and multi-camera live broadcast production.',
    insight:
      'Data privacy is often treated as an abstract compliance checklist. We anchored the entire conference visual system around a human truth—“Privacy isn’t just technical, it’s personal” and “Your Data, Your Right”—turning the stage LED matrices, panel plinths, and live IMAG broadcast feeds into an unmistakable policy campaign.',
    client:
      'Uganda Communications Commission (UCC) & Ministry of ICT and National Guidance',
    partners: 'Personal Data Protection Office (PDPO)',
    timeline: '2025',
    industry: 'Telecommunications, ICT Regulation & Public Policy',
    location: 'Kampala, Uganda · 500+ Executive Delegates',
    scaleSpec: '3-Screen LED Stage · Multi-Cam IMAG · 500+ Executive Delegates',
    heroMetric: {
      number: '500',
      sup: 'CEOs+',
      gridLabel: '3-Screen LED · Multi-Cam Live',
    },
    thesisTitle: 'Policy Made Personal',
    thesisParagraphs: [
      'The stage architecture was engineered as an active communication instrument rather than a static backdrop. By flanking the main conference LED matrix with two dedicated campaign screens and circular institutional crest towers for UCC and the Ministry of ICT, every keynote and panel conversation remained visually anchored to the core statutory message.',
      'From the exterior feather flag arrival array to the six custom-branded panelist plinths and real-time multi-camera IMAG switching, every physical and broadcast touchpoint operated under a single visual discipline—setting a new benchmark for national institutional summits in Uganda.',
    ],
    execution: [
      'Conference Campaign Strategy & Key Visuals',
      '3-Screen LED Stage & Truss Crest Architecture',
      'Branded Podium, 6 Panelist Plinths & Exterior Flags',
      'Multi-Camera 4K Live IMAG Broadcast Switching',
      'Executive Portraiture & Press Wire Documentation',
    ],
    credits: [
      { role: 'Strategic & Creative Direction', name: 'Stratco Strategy Desk' },
      {
        role: 'Stage, LED & Environmental Production',
        name: 'Stratco Live Production Unit',
      },
      {
        role: 'Multi-Camera Broadcast & Executive Stills',
        name: 'Stratco Film & Broadcast Crew',
      },
    ],
    footerMeta: '6 Production Stills · Stage & LED · Live Broadcast',
    image: '/images/ucc/0R7A9106.jpg',
    gallery: [
      {
        src: '/images/ucc/0R7A9106.jpg',
        tag: '01 / STAGE & LED ARCHITECTURE',
        aspect: 'landscape',
        caption:
          'Symmetrical 3-screen LED stage environment featuring the main conference wall, dual side campaign screens (“Privacy isn’t just technical, it’s personal”), circular UCC and Ministry of ICT truss roundels, custom podium, and six branded panelist plinths.',
      },
      {
        src: '/images/ucc/0R7A9084.jpg',
        tag: '02 / MULTI-CAMERA BROADCAST & IMAG',
        aspect: 'portrait',
        caption:
          'Full-room live production view showing the tripod broadcast camera unit on the right, real-time IMAG screen feed on the left, and the “You search, Click, & Sign up! Every action leaves a data trail” campaign wall.',
      },
      {
        src: '/images/ucc/0R7A8854.jpg',
        tag: '03 / EXECUTIVE KEYNOTE ADDRESS',
        aspect: 'portrait',
        caption:
          'Delegate perspective of the keynote address delivered from the custom UCC & Ministry of ICT podium against the main LED backdrop.',
      },
      {
        src: '/images/ucc/0R7A8991.jpg',
        tag: '04 / HIGH-LEVEL CEO PANEL',
        aspect: 'portrait',
        caption:
          'Five-leader executive panel discussion framed by custom-branded conference plinths and the “Myth vs. Fact” Data Protection Act 2019 educational wall.',
      },
      {
        src: '/images/ucc/0R7A8840.jpg',
        tag: '05 / EXTERIOR VENUE WAYFINDING',
        aspect: 'landscape',
        caption:
          'Architectural reflection view of the Uganda Communications Commission (UCC) and partner feather flag array lining the venue arrival.',
      },
      {
        src: '/images/ucc/0R7A8857.jpg',
        tag: '06 / LEADERSHIP PRESS DOCUMENTATION',
        aspect: 'portrait',
        caption:
          'Telephoto executive keynote portrait captured for immediate press wire and institutional communication release.',
      },
    ],
    challenge:
      'Deliver an authoritative national CEO conference for the Uganda Communications Commission (UCC), the Ministry of ICT and National Guidance, and the Personal Data Protection Office (PDPO) under the theme “Your Data, Your Right: Empowering Uganda for a Privacy-Driven Digital Future.”',
    solution:
      'Stratco translated the conference theme into clear public-facing campaign graphics, fabricated the full stage environment—including a wide center LED wall, dual side LED screens, circular UCC and Ministry crest towers, custom podium, and six branded panelist plinths—and directed multi-camera live IMAG switching and executive photography.',
    deliverables: [
      'Conference Theme Visual System & Educational LED Infographics',
      'Custom Center & Dual Side LED Screen Stage Architecture',
      'Branded Podium, 6 Panelist Plinths & Truss Crest Roundels',
      'Exterior UCC Feather Flags, Step-and-Repeat & Table Branding',
      'Multi-Camera Live IMAG Switching & Executive Press Photography',
    ],
    metrics: [
      { label: 'Client', value: 'UCC & Ministry of ICT' },
      { label: 'Production', value: 'Stage · LED · Multi-Cam Live' },
    ],
    intent: 'live',
  },
  {
    id: 'ftb-trust-empowerment',
    slug: 'trust-empowerment-programme',
    index: '02',
    shortName: 'Trust Empowerment Programme (TEP)',
    titleLines: ['Trust Empowerment', 'Programme (TEP)'],
    tabTagline: 'Expert-led women’s financial literacy across 10 districts',
    sector: 'CLIENT: PENDA · PARTNERS: FINANCE TRUST BANK · GROW · PSFU · WORLD BANK',
    badge: 'Film & TVC · Brand & Identity · Digital Coverage',
    filterCategories: [
      'All Work',
      'Film & TVC',
      'Brand & Identity',
      'Strategy & Campaigns',
    ],
    status: 'FULL PROJECT',
    title:
      'Trust Empowerment Programme (TEP) — Documentary, Branding & Live Digital Coverage',
    summary:
      'The Trust Empowerment Programme (TEP) is a financial literacy initiative equipping women across Uganda with practical money management and enterprise skills taught directly by financial experts—delivered with programme partners Finance Trust Bank, the GROW Project, Private Sector Foundation Uganda (PSFU), and The World Bank. Commissioned by implementing client Penda in 2026, Stratco executed the documentary photography and videography, programme branding, digital coverage, and real-time short-form video clips released during the sessions across 10 districts.',
    insight:
      'Financial literacy moves from classroom theory to community action when expert instruction is paired with credible visual presence and immediate storytelling. Across 10 districts, Stratco anchored every venue with cohesive TEP branding while releasing live short-form clips straight from the sessions.',
    client: 'Penda (Implementing Organization)',
    partners:
      'Finance Trust Bank · GROW Project · PSFU · Government of Uganda · The World Bank',
    timeline: '2026',
    industry: 'Financial Literacy, Women Enterprise & Impact Documentary',
    location: '10 Districts Across Uganda',
    scaleSpec:
      '10 Districts · Documentary Film & Stills · Branding · Live Session Clips',
    heroMetric: {
      number: '10',
      sup: 'Districts',
      gridLabel: '10 Districts · 2026',
    },
    thesisTitle: 'Expert Financial Literacy Across 10 Districts',
    thesisParagraphs: [
      'Implemented by Penda alongside Finance Trust Bank, PSFU, the GROW Project, and The World Bank, the Trust Empowerment Programme brought specialist financial educators directly to women entrepreneurs across 10 districts in 2026. Stratco rolled out unified programme branding—stage backdrops, pull-up banners, and participant collateral—ensuring every training hall carried unmistakable institutional authority.',
      'Working alongside the facilitators in each district, our production unit captured the full documentary arc through cinema videography and editorial photography while editing and releasing short-form digital clips during the live sessions—amplifying real-time learning moments online alongside the flagship documentary.',
    ],
    execution: [
      'Documentary Videography & Editorial Photography',
      'Programme & Venue Environmental Branding',
      'Real-Time Short Video Clips Released During Sessions',
      'Multi-District Digital Coverage (10 Districts)',
    ],
    credits: [
      { role: 'Documentary Film & Stills Unit', name: 'Stratco Production Crew' },
      {
        role: 'Programme Branding & Live Digital Clips',
        name: 'Stratco Design & Digital Unit',
      },
    ],
    footerMeta: '9 Production Stills · 10 Districts · 2026 · Client: Penda',
    image: '/images/ftb/6F1A1300.jpg',
    gallery: [
      {
        src: '/images/ftb/6F1A1300.jpg',
        tag: '01 / FULL AUDITORIUM PLENARY',
        aspect: 'landscape',
        caption:
          'Wide plenary view of a Trust Empowerment Programme (TEP) financial literacy session implemented by Penda with partners Finance Trust Bank, GROW, PSFU, and The World Bank.',
      },
      {
        src: '/images/ftb/6F1A1420.jpg',
        tag: '02 / EXPERT FINANCIAL LITERACY SESSION',
        aspect: 'portrait',
        caption:
          'Women entrepreneurs actively engaging with financial literacy specialists during one of the 10-district Trust Empowerment Programme sessions in 2026.',
      },
      {
        src: '/images/ftb/6F1A1487.jpg',
        tag: '03 / PROGRAMME BRANDING & BACKDROP',
        aspect: 'landscape',
        caption:
          'Venue branding and pull-up display system (“Enabling Women through Financial Literacy”) deployed for the Trust Empowerment Programme.',
      },
      {
        src: '/images/ftb/6F1A1298.jpg',
        tag: '04 / PARTNER COALITION IN SESSION',
        aspect: 'portrait',
        caption:
          'Packed training hall highlighting the partnership uniting Penda, Finance Trust Bank, GROW Project, PSFU, Government of Uganda, and The World Bank.',
      },
      {
        src: '/images/ftb/6F1A1391.jpg',
        tag: '05 / DOCUMENTARY PORTRAITURE',
        aspect: 'portrait',
        caption:
          'Documentary still of a woman entrepreneur studying financial planning materials during a district TEP workshop.',
      },
      {
        src: '/images/ftb/6F1A1615.jpg',
        tag: '06 / PRACTICAL FINANCIAL & MOBILE TOOLS',
        aspect: 'landscape',
        caption:
          'Hands-on guidance walking participants through practical savings, enterprise bookkeeping, and digital banking tools.',
      },
      {
        src: '/images/ftb/6F1A2487.jpg',
        tag: '07 / DOCUMENTARY AUDIO & LIVE CLIP CAPTURE',
        aspect: 'landscape',
        caption:
          'Expert facilitator miked for documentary videography and real-time short session clip turnarounds across the 10-district rollout.',
      },
      {
        src: '/images/ftb/6F1A1402.jpg',
        tag: '08 / INTERACTIVE Q&A COVERAGE',
        aspect: 'portrait',
        caption:
          'Participants raising hands during an expert-led Q&A—captured for same-session digital coverage and documentary storytelling.',
      },
      {
        src: '/images/ftb/6F1A2122.jpg',
        tag: '09 / COHORT CERTIFICATION & GRADUATION',
        aspect: 'landscape',
        caption:
          'Graduation portrait celebrating women who completed the Trust Empowerment Programme financial literacy curriculum.',
      },
    ],
    challenge:
      'Deliver cohesive programme branding, broadcast-grade documentary production, and real-time digital clip turnarounds for Penda across 10 districts during the 2026 Trust Empowerment Programme.',
    solution:
      'Stratco combined portable venue branding with an agile documentary film, photography, and live-edit digital unit—releasing short-form session clips in real time while capturing the overarching 10-district documentary.',
    deliverables: [
      '10-District Documentary Videography & Photography',
      'Programme Branding, Backdrops & Pull-Up Displays',
      'Real-Time Short-Form Session Video Clips',
      'Live Session Digital Coverage Suite',
    ],
    metrics: [
      { label: 'Client', value: 'Penda' },
      { label: 'Coverage', value: '10 Districts · 2026' },
    ],
    intent: 'tvc',
  },
  {
    id: 'ucc-digital-literacy-women',
    slug: 'digital-skilling-for-women',
    index: '03',
    shortName: 'Digital Skilling for Women in the Informal Sector',
    titleLines: ['Digital Skilling for Women', 'in the Informal Sector'],
    tabTagline: '50+ district documentary on women adapting to the digital age',
    sector: 'CLIENT: PENDA · PARTNERS: UCC · UCUSAF · MINISTRY OF ICT · ZIMBA WOMEN',
    badge: 'Film & TVC · Strategy & Campaigns',
    filterCategories: [
      'All Work',
      'Film & TVC',
      'Strategy & Campaigns',
      'Live & Broadcast',
    ],
    status: 'FULL PROJECT',
    title:
      'Digital Skilling for Women in the Informal Sector — 50+ District Documentary Production',
    summary:
      'Running from 2024 to 2026 for the Uganda Communications Commission (UCC), UCUSAF, the Ministry of ICT and National Guidance, and partners, Digital Skilling for Women in the Informal Sector taught women across Uganda practical digital skills to adapt and thrive in the digital age. Commissioned by implementing client Penda, Stratco developed the documentary concepts, travelled across 50+ districts to capture participant stories and video testimonials, and produced the full documentary chronicling how the sessions unfolded.',
    insight:
      'Documenting digital transformation in the informal economy means looking beyond attendance numbers—developing authentic documentary storylines around market vendors, tailors, and community entrepreneurs using digital tools for the first time.',
    client: 'Penda (Implementing Organization)',
    partners:
      'Uganda Communications Commission (UCC) · UCUSAF · Ministry of ICT & National Guidance · Zimba Women',
    timeline: '2024 – 2026',
    industry: 'Digital Inclusion, Telecommunications & Documentary Film',
    location: '50+ Districts Across Uganda',
    scaleSpec:
      '50+ Districts · Documentary Ideation · Stories & Testimonials · Full Film',
    heroMetric: {
      number: '50+',
      sup: 'Districts',
      gridLabel: '50+ Districts · 2024–2026',
    },
    thesisTitle: '50+ Districts. Stories of Digital Adaptation.',
    thesisParagraphs: [
      'Spanning 2024 to 2026 across more than 50 districts, this flagship UCC and UCUSAF initiative equipped women in the informal sector with hands-on smartphone, tablet, and digital business skills. Tasked by implementing client Penda, Stratco originated the creative documentary concepts and story arcs before deploying film and photography crews into regional communities nationwide.',
      'In every district cluster, our directors and cinematographers captured both the live classroom energy and intimate participant testimonials—weaving personal stories of digital adaptation into a comprehensive documentary film of the programme.',
    ],
    execution: [
      'Documentary Concept Development & Story Ideation',
      'Participant Human-Interest Stories & Video Testimonials',
      'Full Programme Session Documentary Production',
      '50+ District Field Cinematography & Photography (2024–2026)',
    ],
    credits: [
      {
        role: 'Documentary Concept & Direction',
        name: 'Stratco Film & Strategy Desk',
      },
      {
        role: '50+ District Field Cinematography & Stills',
        name: 'Stratco Documentary Crew',
      },
    ],
    footerMeta: '9 Production Stills · 50+ Districts · 2024–2026 · Client: Penda',
    image: '/images/dlw/UCC00169.jpg',
    gallery: [
      {
        src: '/images/dlw/UCC00169.jpg',
        tag: '01 / HANDS-ON DIGITAL ADAPTATION',
        aspect: 'landscape',
        caption:
          'Women in the informal sector practicing practical tablet and smartphone skills during the 2024–2026 national skilling rollout.',
      },
      {
        src: '/images/dlw/UCC0362.jpg',
        tag: '02 / DISTRICT SESSION DOCUMENTARY',
        aspect: 'portrait',
        caption:
          'Full community hall training session for UCC, Ministry of ICT, and UCUSAF—documented by Stratco for implementing client Penda across 50+ districts.',
      },
      {
        src: '/images/dlw/UCC0C130.jpg',
        tag: '03 / PEER-TO-PEER DIGITAL LEARNING',
        aspect: 'landscape',
        caption:
          'Close-up documentary frame of participants guiding one another through touch-screen digital literacy exercises.',
      },
      {
        src: '/images/dlw/UCC00269.jpg',
        tag: '04 / SESSION MILESTONES & ENERGY',
        aspect: 'portrait',
        caption:
          'Participants celebrating new digital milestones inside one of the regional training halls.',
      },
      {
        src: '/images/dlw/UCC0117.jpg',
        tag: '05 / APPLIED DIGITAL TOOLS LAB',
        aspect: 'portrait',
        caption:
          'Small-group circle exploring mobile commerce and communication tools to adapt informal businesses to the digital age.',
      },
      {
        src: '/images/dlw/UCCB114.jpg',
        tag: '06 / GRASSROOTS DISTRICT ARRIVAL',
        aspect: 'landscape',
        caption:
          'Community participant registration outside a regional training site during the 50+ district documentary tour.',
      },
      {
        src: '/images/dlw/UCC0C111.jpg',
        tag: '07 / MOBILE MEDIA & CONTENT SKILLS',
        aspect: 'landscape',
        caption:
          'Cohort members testing tablet photography and digital communication workflows together.',
      },
      {
        src: '/images/dlw/UCC00158.jpg',
        tag: '08 / STORIES & MENTORSHIP CIRCLES',
        aspect: 'portrait',
        caption:
          'Mentorship and story-gathering session capturing how women entrepreneurs apply digital tools in daily trade.',
      },
      {
        src: '/images/dlw/UCC3.jpg',
        tag: '09 / NATIONWIDE DISTRICT FOOTPRINT',
        aspect: 'landscape',
        caption:
          'Exterior view of one of more than 50 district community venues covered across Uganda between 2024 and 2026.',
      },
    ],
    challenge:
      'Conceptualize and produce an authentic, human-centred documentary for Penda chronicling UCC and UCUSAF’s Digital Skilling for Women in the Informal Sector across more than 50 districts from 2024 to 2026.',
    solution:
      'Stratco developed the overarching documentary ideas and interview frameworks, deployed field crews across 50+ districts to record participant stories and testimonials, and produced the complete documentary of the sessions.',
    deliverables: [
      'Documentary Creative Concepts & Narrative Treatment',
      'Multi-District Participant Stories & Video Testimonials',
      'Full-Length Session & Impact Documentary Film',
      '50+ District Documentary Photography Archive',
    ],
    metrics: [
      { label: 'Client', value: 'Penda (for UCC & UCUSAF)' },
      { label: 'Coverage', value: '50+ Districts · 2024–2026' },
    ],
    intent: 'tvc',
  },
];

export const INTERACTIVE_SERVICES: InteractiveService[] = [
  {
    id: 'strategy',
    num: '01',
    title: 'Strategy & Positioning',
    anchor: 'Think',
    summary:
      'Market positioning, audience insight, and 360° campaign architecture.',
    description:
      'We work directly with leadership teams to define the commercial problem, audience truth, and creative blueprint before a single frame is shot.',
    image: '/images/ucc/0R7A8991.jpg',
    caption:
      'UCC & Ministry of ICT — Executive Policy & Campaign Positioning',
    capabilities: [
      'Brand & Market Positioning',
      '360° Campaign Architecture',
      'Audience & Cultural Research',
      'Commercial Screenplays & Treatments',
      'Brand Architecture & Naming',
      'Communication & Media Roadmaps',
    ],
    intent: 'strategy',
  },
  {
    id: 'tvc',
    num: '02',
    title: 'Film, TVCs & Documentaries',
    anchor: 'Shoot',
    summary:
      'Television commercials, cinema direction, and 50+ district documentaries.',
    description:
      'Stratco directs, shoots, edits, grades, and masters commercial spots and nationwide documentaries in-house—from prime-time TVCs to 50+ district story tours.',
    image: '/images/dlw/UCC00169.jpg',
    caption:
      'Digital Skilling for Women — 50+ District Documentary Production',
    capabilities: [
      'Television Commercials (TVCs)',
      'Multi-District Documentary Films',
      'Cinema Direction & Location Crew',
      'In-House Edit, Color & Sound Mix',
      'Participant Stories & Testimonials',
      'Key-Visual Campaign Photography',
    ],
    intent: 'tvc',
  },
  {
    id: 'campaigns',
    num: '03',
    title: 'Brand & Campaign Systems',
    anchor: 'Build',
    summary:
      'Visual identity systems, national OOH, and programme branding.',
    description:
      'Once strategy is locked, we build the visual system around it—spanning corporate identity manuals, national billboards, and cohesive venue branding across districts.',
    image: '/images/ftb/6F1A1487.jpg',
    caption:
      'Trust Empowerment Programme (TEP) — Venue & Campaign Branding',
    capabilities: [
      'Visual Identity & Brand Manuals',
      'National Outdoor (OOH) & Print',
      'Programme & Venue Branding',
      'Real-Time Digital Session Clips',
      'Executive Stationery & Reports',
      'Campaign Collateral Systems',
    ],
    intent: 'brand',
  },
  {
    id: 'live',
    num: '04',
    title: 'Live & Broadcast Production',
    anchor: 'Stage',
    summary:
      'Custom LED stage fabrication, show calling, and multi-camera broadcast.',
    description:
      'For flagship summits and launches, our technical producers fabricate the physical stage and 3-screen LED environment while our broadcast crew directs live IMAG switching.',
    image: '/images/ucc/0R7A9106.jpg',
    caption:
      'Data Protection CEO Conference 2025 — 3-Screen LED Stage & Broadcast',
    capabilities: [
      'Summit & Launch Show Production',
      'Custom Stage & 3-Screen LED Walls',
      'Multi-Camera 4K Live IMAG Broadcast',
      'Concert-Grade Lighting & Audio',
      'Branded Podiums, Plinths & Flags',
      'Executive Press & Live Turnarounds',
    ],
    intent: 'live',
  },
];

export const PRODUCTION_STEPS: ProductionStep[] = [
  {
    step: '01',
    phase: 'THE THINKING',
    title: 'Strategy',
    description:
      'We find the one idea worth saying, and who needs to hear it.',
    output: 'Strategic Brief · Positioning Architecture · Campaign Spine',
    deliverables: [
      'Strategic Brief',
      'Positioning Architecture',
      'Audience Insight',
      'Campaign Spine',
    ],
    image: '/images/ucc/0R7A8854.jpg',
    caption: 'Executive Policy & Campaign Positioning — UCC & Ministry of ICT',
    projectLabel: 'UCC Data Protection Summit',
    projectSlug: 'ucc-data-protection-2025',
  },
  {
    step: '02',
    phase: 'THE BLUEPRINT',
    title: 'Creative Direction',
    description:
      'Scripts, story arcs, identity and stage design built around that idea.',
    output: 'Commercial Screenplay · Documentary Story Arc · Stage & LED Plot',
    deliverables: [
      'Commercial Screenplay',
      'Documentary Story Arc',
      'Visual Identity System',
      '3D Stage & LED Plot',
    ],
    image: '/images/dlw/UCC0C130.jpg',
    caption: 'Documentary Story Ideation — 50+ District Digital Skilling Tour',
    projectLabel: 'Digital Skilling (50+ Districts)',
    projectSlug: 'digital-skilling-for-women',
  },
  {
    step: '03',
    phase: 'THE PRODUCTION',
    title: 'Production',
    description:
      'Film crews, fabrication and stage rigging, on location across Uganda.',
    output: 'Principal Photography · Physical Fabrication · Stage Rigging',
    deliverables: [
      'Principal Cinematography',
      'Stage & LED Fabrication',
      'Venue Branding Rollout',
      'Location Audio & Rigging',
    ],
    image: '/images/ftb/6F1A2487.jpg',
    caption: 'On-Location Documentary & Audio Capture — Trust Empowerment (TEP)',
    projectLabel: 'Trust Empowerment Programme',
    projectSlug: 'trust-empowerment-programme',
  },
  {
    step: '04',
    phase: 'THE ROLLOUT',
    title: 'Rollout',
    description:
      'Final edit, live broadcast and launch across TV, outdoor and digital.',
    output: 'Broadcast Masters · Live Transmission · 360° Market Rollout',
    deliverables: [
      'Multi-Cam 4K Live IMAG',
      'Color Grade & Audio Mix',
      'Real-Time Session Clips',
      '360° National Rollout',
    ],
    image: '/images/ucc/0R7A9084.jpg',
    caption: 'Multi-Camera Live IMAG & National Broadcast — Kampala',
    projectLabel: 'UCC Live Broadcast & Summit',
    projectSlug: 'ucc-data-protection-2025',
  },
];

export const SECTOR_TICKER = [
  'UGANDA COMMUNICATIONS COMMISSION (UCC)',
  'PENDA',
  'MINISTRY OF ICT & NATIONAL GUIDANCE',
  'TRUST EMPOWERMENT PROGRAMME (TEP)',
  'UCUSAF · DIGITAL SKILLING FOR WOMEN',
  'FINANCE TRUST BANK · GROW · PSFU',
  'PERSONAL DATA PROTECTION OFFICE',
  'BROADCAST TELEVISION & DOCUMENTARY',
];

export const SCOPE_OPTIONS: Record<ProjectIntent, string[]> = {
  tvc: [
    'Television Commercial (TVC)',
    '360° National Campaign',
    'Corporate / Documentary Film',
    'Script & Creative Direction',
    'Campaign Key Visuals & OOH',
    'Post-Production & Grading',
  ],
  brand: [
    'Brand Strategy & Repositioning',
    'Logo & Brand Manual',
    'Campaign Backdrops & Feather Flags',
    'Regional Activation Collateral',
    'Executive Stationery Suite',
    'Branded Apparel & Corporate Merch',
  ],
  live: [
    'Full Conference / Launch Production',
    'Stage, Set & LED Wall Design',
    'Multi-Camera 4K IMAG & Broadcast',
    'Lighting & Sound Engineering',
    'Same-Day Highlight Film',
    'Venue Flags, Plinths & Media Walls',
  ],
  strategy: [
    'Market & Audience Research',
    'Brand Positioning Architecture',
    'Integrated Campaign Planning',
    'Go-To-Market Strategy',
    'Executive Advisory Workshop',
    'Creative & Show Blueprint',
  ],
};
