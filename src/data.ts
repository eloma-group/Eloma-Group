/* Self-hosted photos in /img (scripts/images.mjs). Widths must match the files that script builds */
export const PHOTO_WIDTHS = { panel: [640, 1080, 1600, 2400], card: [480, 900], office: [640, 1000, 1400] }
export const IMG = (name: string, ext: 'avif' | 'webp', widths: number[]) =>
  widths.map(w => `/img/${name}-${w}.${ext} ${w}w`).join(', ')

/* Clean URL for each homepage section (no #). /about is reserved for a separate About page. */
export const SECTIONS: Record<string, string> = {
  top: '/',
  bivry: '/bivry',
  'eg-imports': '/eg-imports',
  'eg-eloma': '/eg-eloma',
  'eg-travels': '/eg-travels',
  'eloma-cx': '/eloma-customer-care',
  about: '/about-us',
  services: '/services',
  presence: '/offices',
  countries: '/countries',
  community: '/community',
  contact: '/contact',
}

/* Title and description for each section URL; scripts/prerender.mjs writes them into that URL's <head> */
export const SECTION_META: Record<string, { title: string; description: string }> = {
  bivry: {
    title: 'Bivry Logistics: Road Freight & Warehousing | ELOMA Group',
    description: 'Bivry moves full and part loads Australia-wide with 24/7 GPS tracking, plus warehousing and distribution. Part of ELOMA Group.',
  },
  'eg-imports': {
    title: 'EG Imports: Overseas Sourcing & Customs | ELOMA Group',
    description: 'EG Imports handles overseas sourcing, shipping, customs compliance and landing for Australian businesses. Part of ELOMA Group.',
  },
  'eg-eloma': {
    title: 'EG Eloma: Microsoft 365, IT & Cybersecurity | ELOMA Group',
    description: 'Australian-owned Microsoft Partner for Microsoft 365, websites, software, SEO, toll-free numbers and cybersecurity, with 24/7 support.',
  },
  'eg-travels': {
    title: 'EG Travels: Corporate & Leisure Travel | ELOMA Group',
    description: 'EG Travels books flights, accommodation and tailored packages for corporate teams and leisure travellers. Part of ELOMA Group.',
  },
  'eloma-cx': {
    title: 'ELOMA Customer Care: Inbound & Outbound Support',
    description: 'Inbound, outbound and omnichannel customer care to an Australian standard: trained teams answering your customers by phone, email and chat.',
  },
  about: {
    title: 'About ELOMA Group | Five Businesses, One Standard',
    description: 'ELOMA Group brings together five Australian businesses in logistics, imports, IT, travel and customer care under one accountable group.',
  },
  services: {
    title: 'Services: Freight, Imports, IT, Travel & Care | ELOMA Group',
    description: 'Road freight, warehousing, import sourcing, IT and cybersecurity, business travel and customer care from one Australian group.',
  },
  presence: {
    title: 'ELOMA Group Offices: Five Australian Capital Cities',
    description: 'Visit ELOMA Group in Melbourne (head office, Collingwood), Sydney, Brisbane, Adelaide and Perth. Open Monday to Friday, 9am to 6pm.',
  },
  countries: {
    title: 'Where We Work: AU, US, Canada, UK & NZ | ELOMA Group',
    description: 'Australian-owned and serving five countries: Australia, the United States, Canada, the United Kingdom and New Zealand.',
  },
  community: {
    title: 'Community: Supporting Red Cross Lifeblood | ELOMA Group',
    description: "ELOMA Group is proud to support Australian Red Cross Lifeblood through blood donation drives with our people, clients and communities.",
  },
  contact: {
    title: 'Contact ELOMA Group | 1800 054 555 · help@elomagroup.org',
    description: 'Call 1800 054 555, email help@elomagroup.org or send an enquiry. Head office: 71 Gipps Street, Collingwood VIC 3066.',
  },
}

export const PHONE = '1800 054 555'
export const TEL = 'tel:+611800054555'
export const EMAIL = 'help@elomagroup.org'
export const HQ = '71 Gipps Street, Collingwood VIC 3066'
export const ABN = '69 683 543 713'

export interface Company {
  id: string
  name: string
  kick: string
  sub: string
  img: string
  alt: string
  g: [string, string]
  specs: [string, string][]
  url: string
  cta: string
  more: string
}

export const COS: Company[] = [
  {
    id: 'bivry', name: 'Bivry', kick: 'Logistics', sub: 'Reliable. Trackable. Trusted.',
    img: 'truck', alt: 'Two semi-trailers on an Australian highway', g: ['#B86A2E', '#2B160A'],
    specs: [['96.2%', 'On-time delivery'], ['24/7', 'GPS tracking'], ['Australia', 'Wide coverage']],
    url: 'https://bivry.com.au', cta: 'Get a Freight Quote', more: 'Bivry',
  },
  {
    id: 'eg-imports', name: 'EG Imports', kick: 'Imports', sub: 'Sourced overseas. Landed properly.',
    img: 'port', alt: 'Cargo ships docked at a port', g: ['#1F7A86', '#08262B'],
    specs: [['Sourcing', 'Trusted suppliers'], ['Customs', 'Compliance handled'], ['Landed', 'Ready to sell']],
    url: SECTIONS.services, cta: 'Start Importing', more: 'EG Imports',
  },
  {
    id: 'eg-eloma', name: 'EG Eloma', kick: 'IT Infrastructure', sub: 'Microsoft Partner · Cybersecurity · Digital Growth',
    img: 'it-team', alt: 'Two IT specialists smiling at a laptop in a bright office', g: ['#1E4F9A', '#06142B'],
    specs: [['99.9%', 'System uptime'], ['178+', 'Threats blocked daily'], ['14', 'Industries served']],
    url: 'https://egeloma.com.au', cta: 'Book a Free Consultation', more: 'EG Eloma',
  },
  {
    id: 'eg-travels', name: 'EG Travels', kick: 'Travel', sub: 'Corporate and leisure travel, handled.',
    img: 'plane-window', alt: 'Clouds seen through an aeroplane window', g: ['#5D88B8', '#16253A'],
    specs: [['Flights', '& accommodation'], ['Corporate', 'Travel programs'], ['Holidays', 'Tailored packages']],
    url: SECTIONS.services, cta: 'Plan Your Trip', more: 'EG Travels',
  },
  {
    id: 'eloma-cx', name: 'ELOMA Customer Care', kick: 'Customer Experience', sub: 'The voice your customers remember.',
    img: 'care-desk', alt: 'Customer care team member on a phone call at her desk', g: ['#6A4BB8', '#1C1236'],
    specs: [['Inbound', '& outbound calls'], ['Omnichannel', 'Phone, email, chat'], ['Local', 'Australian standard']],
    url: SECTIONS.services, cta: 'Talk to Our Team', more: 'Customer Care',
  },
]

export interface Service {
  t: string
  d: string
  img: string
  to: string
  g: [string, string]
}

export const SERV: Service[] = [
  { t: 'Road Freight', d: 'Bivry moves full and part loads Australia-wide with live GPS tracking.', img: 'truck', to: 'bivry', g: ['#B86A2E', '#2B160A'] },
  { t: 'Warehousing & Distribution', d: "Secure storage, pick-and-pack and distribution from Bivry's network.", img: 'warehouse', to: 'bivry', g: ['#8A6A4A', '#2A2016'] },
  { t: 'Import Sourcing', d: 'EG Imports finds suppliers and manages shipping, customs and landing.', img: 'sourcing', to: 'eg-imports', g: ['#1F7A86', '#08262B'] },
  { t: 'IT & Cybersecurity', d: 'EG Eloma delivers Microsoft 365, websites, SEO, toll-free numbers and cybersecurity, with 24/7 support.', img: 'it-team', to: 'eg-eloma', g: ['#1E4F9A', '#06142B'] },
  { t: 'Business Travel', d: 'EG Travels books flights, stays and itineraries for teams on the move.', img: 'plane-window', to: 'eg-travels', g: ['#5D88B8', '#16253A'] },
  { t: 'Customer Care', d: 'Trained teams answering your customers by phone, email and chat.', img: 'care-desk', to: 'eloma-cx', g: ['#6A4BB8', '#1C1236'] },
]

export interface Office {
  city: string
  tz: string
  address: string
  hq?: boolean
}

export const OFF: Office[] = [
  { city: 'Melbourne', tz: 'Australia/Melbourne', address: '71 Gipps Street, Collingwood VIC 3066', hq: true },
  { city: 'Sydney', tz: 'Australia/Sydney', address: '60 Martin Place, Sydney NSW 2000' },
  { city: 'Brisbane', tz: 'Australia/Brisbane', address: '71 Eagle Street, Brisbane QLD 4000' },
  { city: 'Adelaide', tz: 'Australia/Adelaide', address: '2–3 Greenhill Road, Wayville SA 5034' },
  { city: 'Perth', tz: 'Australia/Perth', address: 'Level 2 East, 300 Murray Street, Perth WA 6000' },
]

export interface Country {
  cc: string
  name: string
  path: string
  d: string
}

export const COUNTRIES: Country[] = [
  { cc: 'AU · AUD', name: 'Australia', path: '/australia/', d: 'All five companies, five capital city offices.' },
  { cc: 'US · USD', name: 'United States', path: '/united-states/', d: 'IT, Microsoft 365, websites and SEO in all 50 states.' },
  { cc: 'CA · CAD', name: 'Canada', path: '/canada/', d: 'Managed IT and bilingual-ready websites across every province.' },
  { cc: 'UK · GBP', name: 'United Kingdom', path: '/united-kingdom/', d: 'Cyber Essentials preparation, SEO and Microsoft 365.' },
  { cc: 'NZ · NZD', name: 'New Zealand', path: '/new-zealand/', d: 'Websites and IT support on trans-Tasman hours.' },
]

export const TOPICS = [
  ...COS.map(c => `${c.name} · ${c.id === 'eg-eloma' ? 'IT & Digital' : c.kick}`),
  'Several services',
  'Partnerships or careers',
]
