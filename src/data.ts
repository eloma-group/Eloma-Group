export const U = (id: string, w?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w || 2400}&q=80`

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
}

export const COS: Company[] = [
  {
    id: 'bivry', name: 'Bivry', kick: 'Logistics', sub: 'Reliable. Trackable. Trusted.',
    img: '1766785368863-f2188a8c8b32', alt: 'Two semi-trailers on a highway', g: ['#B86A2E', '#2B160A'],
    specs: [['96.2%', 'On-time delivery'], ['24/7', 'GPS tracking'], ['Australia', 'Wide coverage']],
    url: 'https://bivry.com.au', cta: 'Get a Freight Quote',
  },
  {
    id: 'eg-imports', name: 'EG Imports', kick: 'Imports', sub: 'Sourced overseas. Landed properly.',
    img: '1578575437130-527eed3abbec', alt: 'Cargo ships docked at a port', g: ['#1F7A86', '#08262B'],
    specs: [['Sourcing', 'Trusted suppliers'], ['Customs', 'Compliance handled'], ['Landed', 'Ready to sell']],
    url: 'https://elomagroup.com.au/companies/eg-imports', cta: 'Start Importing',
  },
  {
    id: 'eg-digital', name: 'EG Digital', kick: 'IT Infrastructure', sub: 'Microsoft Partner · Cybersecurity · Growth',
    img: '1680992046626-418f7e910589', alt: 'Server racks in a data room', g: ['#1E4F9A', '#06142B'],
    specs: [['99.9%', 'System uptime'], ['178+', 'Threats blocked daily'], ['14', 'Industries served']],
    url: 'https://egdigital.com.au', cta: 'Book a Consultation',
  },
  {
    id: 'eg-travels', name: 'EG Travels', kick: 'Travel', sub: 'Corporate and leisure travel, handled.',
    img: '1543797414-a0c3ad076f7c', alt: 'Clouds through an aeroplane window', g: ['#5D88B8', '#16253A'],
    specs: [['Flights', '& accommodation'], ['Corporate', 'Travel programs'], ['Holidays', 'Tailored packages']],
    url: 'https://elomagroup.com.au/companies/eg-travels', cta: 'Plan Your Trip',
  },
  {
    id: 'eloma-cx', name: 'ELOMA Customer Care', kick: 'Customer Experience', sub: 'The voice your customers remember.',
    img: '1626863905121-3b0c0ed7b94c', alt: 'Customer service agents wearing headsets', g: ['#6A4BB8', '#1C1236'],
    specs: [['Inbound', '& outbound calls'], ['Omnichannel', 'Phone, email, chat'], ['Local', 'Australian standard']],
    url: 'https://elomagroup.com.au/companies/eloma-group', cta: 'Talk to Our Team',
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
  { t: 'Road Freight', d: 'Bivry moves full and part loads Australia-wide with live GPS tracking.', img: '1766785368863-f2188a8c8b32', to: '#bivry', g: ['#B86A2E', '#2B160A'] },
  { t: 'Warehousing & Distribution', d: "Secure storage, pick-and-pack and distribution from Bivry's network.", img: '1553413077-190dd305871c', to: '#bivry', g: ['#8A6A4A', '#2A2016'] },
  { t: 'Import Sourcing', d: 'EG Imports finds suppliers and manages shipping, customs and landing.', img: '1605732562742-3023a888e56e', to: '#eg-imports', g: ['#1F7A86', '#08262B'] },
  { t: 'IT & Cybersecurity', d: 'EG Digital delivers Microsoft 365, Azure, zero-trust security and 24/7 monitoring.', img: '1680992046626-418f7e910589', to: '#eg-digital', g: ['#1E4F9A', '#06142B'] },
  { t: 'Business Travel', d: 'EG Travels books flights, stays and itineraries for teams on the move.', img: '1543797414-a0c3ad076f7c', to: '#eg-travels', g: ['#5D88B8', '#16253A'] },
  { t: 'Customer Care', d: 'Trained teams answering your customers by phone, email and chat.', img: '1517048676732-d65bc937f952', to: '#eloma-cx', g: ['#6A4BB8', '#1C1236'] },
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

export const TOPICS = [
  ...COS.map(c => `${c.name} · ${c.kick}`),
  'Several services',
  'Partnerships or careers',
]
