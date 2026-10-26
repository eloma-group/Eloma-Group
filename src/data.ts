export const U = (id: string, w = 2400, q = 80) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`

/* Responsive srcset so phones download a phone-sized photo */
export const SRCSET = (id: string, widths: [number, number][]) =>
  widths.map(([w, q]) => `${U(id, w, q)} ${w}w`).join(', ')

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
    img: '1766785368863-f2188a8c8b32', alt: 'Two semi-trailers on an Australian highway', g: ['#B86A2E', '#2B160A'],
    specs: [['96.2%', 'On-time delivery'], ['24/7', 'GPS tracking'], ['Australia', 'Wide coverage']],
    url: 'https://bivry.com.au', cta: 'Get a Freight Quote', more: 'Bivry',
  },
  {
    id: 'eg-imports', name: 'EG Imports', kick: 'Imports', sub: 'Sourced overseas. Landed properly.',
    img: '1578575437130-527eed3abbec', alt: 'Cargo ships docked at a port', g: ['#1F7A86', '#08262B'],
    specs: [['Sourcing', 'Trusted suppliers'], ['Customs', 'Compliance handled'], ['Landed', 'Ready to sell']],
    url: SECTIONS.services, cta: 'Start Importing', more: 'EG Imports',
  },
  {
    id: 'eg-eloma', name: 'EG Eloma', kick: 'IT Infrastructure', sub: 'Microsoft Partner · Cybersecurity · Digital Growth',
    img: '1791317771424-82cf79f51fb3', alt: 'Two IT specialists smiling at a laptop in a bright office', g: ['#1E4F9A', '#06142B'],
    specs: [['99.9%', 'System uptime'], ['178+', 'Threats blocked daily'], ['14', 'Industries served']],
    url: 'https://egeloma.com.au', cta: 'Book a Free Consultation', more: 'EG Eloma',
  },
  {
    id: 'eg-travels', name: 'EG Travels', kick: 'Travel', sub: 'Corporate and leisure travel, handled.',
    img: '1543797414-a0c3ad076f7c', alt: 'Clouds seen through an aeroplane window', g: ['#5D88B8', '#16253A'],
    specs: [['Flights', '& accommodation'], ['Corporate', 'Travel programs'], ['Holidays', 'Tailored packages']],
    url: SECTIONS.services, cta: 'Plan Your Trip', more: 'EG Travels',
  },
  {
    id: 'eloma-cx', name: 'ELOMA Customer Care', kick: 'Customer Experience', sub: 'The voice your customers remember.',
    img: '1758876018582-e7573baf5306', alt: 'Customer care team member on a phone call at her desk', g: ['#6A4BB8', '#1C1236'],
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
  { t: 'Road Freight', d: 'Bivry moves full and part loads Australia-wide with live GPS tracking.', img: '1766785368863-f2188a8c8b32', to: 'bivry', g: ['#B86A2E', '#2B160A'] },
  { t: 'Warehousing & Distribution', d: "Secure storage, pick-and-pack and distribution from Bivry's network.", img: '1553413077-190dd305871c', to: 'bivry', g: ['#8A6A4A', '#2A2016'] },
  { t: 'Import Sourcing', d: 'EG Imports finds suppliers and manages shipping, customs and landing.', img: '1605732562742-3023a888e56e', to: 'eg-imports', g: ['#1F7A86', '#08262B'] },
  { t: 'IT & Cybersecurity', d: 'EG Eloma delivers Microsoft 365, websites, SEO, toll-free numbers and cybersecurity, with 24/7 support.', img: '1791317771424-82cf79f51fb3', to: 'eg-eloma', g: ['#1E4F9A', '#06142B'] },
  { t: 'Business Travel', d: 'EG Travels books flights, stays and itineraries for teams on the move.', img: '1543797414-a0c3ad076f7c', to: 'eg-travels', g: ['#5D88B8', '#16253A'] },
  { t: 'Customer Care', d: 'Trained teams answering your customers by phone, email and chat.', img: '1758876018582-e7573baf5306', to: 'eloma-cx', g: ['#6A4BB8', '#1C1236'] },
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
