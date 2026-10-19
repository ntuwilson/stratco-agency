export interface HeroModeSpec {
  badge: string;
  img: string;
  alt: string;
  caption: string;
  sla: string;
  title: string;
  desc: string;
  pills: string[];
  metric: string;
  linkText: string;
  linkHref: string;
}

export interface CaseStudy {
  id: string;
  index: string;
  sector: string;
  badge: string;
  categories: ('branding' | 'events' | 'environments')[];
  title: string;
  summary: string;
  footerMeta: string;
  image: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  intent: 'branding' | 'events';
}

export const HERO_MODES: Record<'branding' | 'events', HeroModeSpec> = {
  branding: {
    badge: '01 / Corporate Identity & Environmental Rollout',
    img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=85',
    alt: 'Stratco corporate branding and identity architecture session',
    caption: 'Boardroom Identity Architecture · Brand Manuals · Fleet & Signage',
    sla: 'Full Governance',
    title: 'Systems that hold together from the letterhead to the highway totem.',
    desc: 'We build complete corporate identity systems—logos, typography, Pantone/CMYK governance, executive stationery, commercial vehicle wraps, and 3D architectural signage.',
    pills: [
      'Brand Manuals',
      'Corporate Stationery',
      '3D Signage & Totems',
      'Vehicle Fleet Livery',
      'Executive Merch',
    ],
    metric: '100% CMYK, RGB & Spot-Color Governed',
    linkText: 'Explore Corporate Branding ↗',
    linkHref: '#branding',
  },
  events: {
    badge: '02 / Multi-Camera Event Coverage & Stage Production',
    img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=85',
    alt: 'Stratco live corporate summit multi-camera coverage',
    caption: 'Multi-Camera 4K Switching · Executive Photography · Same-Day Reels',
    sla: '< 24h Media Turnaround',
    title: 'Broadcast-grade event coverage that extends your room to the nation.',
    desc: 'From national summits and AGMs to product launches, our crew designs your stage environment, directs 4K multi-camera coverage, and delivers same-day press & social edits.',
    pills: [
      'Multi-Cam 4K Video',
      'Executive Stills',
      'Same-Day Highlight Reels',
      'Stage & Media Walls',
      'Hybrid Livestream',
    ],
    metric: 'Same-Day Press & Social Reels Delivered On-Site',
    linkText: 'Explore Events Coverage ↗',
    linkHref: '#events',
  },
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'kayoola',
    index: '01',
    sector: 'MOBILITY & CLEAN TECH',
    badge: 'Film + Launch Branding',
    categories: ['events', 'branding'],
    title: 'Kayoola EV — “The Smarter Way” Campaign & Launch Coverage',
    summary:
      'Script-to-screen commercial production and launch event coverage contrasting legacy Kampala commuter friction with clean, air-conditioned electric mass transit.',
    footerMeta: 'Multi-Location Shoot · Brand Film · PR Stills',
    image:
      'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=900&q=80',
    challenge:
      'Position Uganda’s flagship electric mass-transit bus (Kayoola EV) not just as an engineering milestone, but as the everyday smart choice over chaotic, hot, and unpredictable commuter traffic.',
    solution:
      'Stratco developed the narrative screenplay, visual storyboard, and multi-location film production contrasting high-stress taxi park bottlenecks with the calm, air-conditioned, zero-emission Kayoola EV experience—paired with full launch event media coverage.',
    deliverables: [
      'Hero Commercial Film (“The Smarter Way”)',
      'Split-Screen Social & Broadcast Cutdowns',
      'Launch Event Multi-Camera Coverage & VIP Stills',
      'Outdoor Campaign Key Visuals & Commuter Messaging',
    ],
    intent: 'events',
  },
  {
    id: 'finovate',
    index: '02',
    sector: 'FINANCIAL SERVICES',
    badge: 'Identity + Brand Manual',
    categories: ['branding', 'environments'],
    title: 'Regional Corporate Identity, Stationery & Branch Totem Rollout',
    summary:
      'Complete corporate rebrand including a 24-page Brand Manual, executive stationery templates, staff ID cards, and 96-inch illuminated branch monolith totems.',
    footerMeta: 'Brand Governance · Print Suite · 3D Signage',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
    challenge:
      'Unify a growing financial institution across multiple branches where legacy logos, inconsistent stationery, and aging outdoor signage were undermining executive trust.',
    solution:
      'Engineered a complete corporate identity system anchored by a 24-page Brand Manual, locked CMYK/Pantone color tokens, editable stationery & proforma templates, staff signatory ID badges, and 96-inch illuminated branch monolith totems.',
    deliverables: [
      'Full Logotype, Monogram & 24-Page Brand Manual',
      'Executive Business Cards, Letterheads & Folders',
      '96″ × 48″ Outdoor Branch Monolith Totems',
      'Staff Signatory ID System & Corporate Apparel',
    ],
    intent: 'branding',
  },
  {
    id: 'summit',
    index: '03',
    sector: 'INSTITUTIONAL SUMMIT',
    badge: 'Multi-Cam + Stage Design',
    categories: ['events'],
    title: 'East African Leadership Summit & Annual Stakeholder Gala',
    summary:
      'End-to-end stage backdrop fabrication, delegate branding kits, 4-camera live switching, executive portrait lounge, and same-day highlight reels for 600+ leaders.',
    footerMeta: '4K Broadcast · Same-Day Edits · Stage Fabrication',
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80',
    challenge:
      'Deliver broadcast-grade live coverage and cohesive physical stage branding for a 600+ delegate regional summit requiring instant press photography and same-day video recaps.',
    solution:
      'Deployed a 4-camera 4K production unit, on-site editorial photo desk, and full venue branding suite (custom stage backdrop, podiums, step-and-repeat walls, and teardrop flags), delivering daily highlight reels before closing remarks.',
    deliverables: [
      '4-Camera 4K Live Switching & Hybrid Stream',
      'Custom Stage Backdrop, Podium & Media Walls',
      'Real-Time Press Wire Stills & VIP Portraits',
      'Same-Day 60-Second Closing Plenary Highlight Reel',
    ],
    intent: 'events',
  },
  {
    id: 'fleet',
    index: '04',
    sector: 'INFRASTRUCTURE & LOGISTICS',
    badge: 'Fleet Livery + Apparel',
    categories: ['environments', 'branding'],
    title: 'National Utility Fleet Livery, Field Apparel & Wayfinding',
    summary:
      'High-durability commercial pickup and SUV vehicle wraps paired with weather-resistant field uniforms, safety gear, and regional depot signage.',
    footerMeta: '40+ Vehicle Wraps · Field Kits · Depot Totems',
    image:
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=80',
    challenge:
      'Transform 40+ commercial pickups and field SUVs into unmistakable mobile brand ambassadors capable of withstanding harsh East African road conditions.',
    solution:
      'Designed and applied precision cast-vinyl vehicle livery pairing crisp door wordmarks with an oversized rear-quarter brand monogram, complemented by field uniforms, notebooks, and regional depot signage.',
    deliverables: [
      'Double-Cab Pickup & SUV Fleet Livery Blueprints',
      'Weatherproof Cast-Vinyl Vehicle Wrapping',
      'Field Crew Shirts, Caps, Umbrellas & Backpacks',
      'Depot Wayfinding & Safety Signage System',
    ],
    intent: 'branding',
  },
];

export const BRANDING_SCOPES = [
  'Logo & Brand Manual',
  'Corporate Stationery Suite',
  '3D Signage & 96″ Totems',
  'Vehicle Fleet Livery',
  'Staff IDs & Executive Merch',
  'Campaign / Commercial Film',
];

export const EVENT_SCOPES = [
  'Multi-Camera 4K Video',
  'Executive & Press Photography',
  'Same-Day Highlight Reel',
  'Hybrid Livestreaming',
  'Stage Backdrop & Media Walls',
  'Delegate Kits & Badges',
];
