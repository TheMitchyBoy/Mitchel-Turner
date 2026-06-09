export interface Story {
  id: string
  title: string
  excerpt: string
  category: 'politics' | 'community' | 'investigation' | 'maritime'
  date: string
  readTime: string
  featured?: boolean
}

export interface MapPin {
  id: string
  x: number
  y: number
  label: string
  story: string
  category: string
}

export interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  type: 'report' | 'investigation' | 'milestone'
}

export interface TopicNode {
  id: string
  label: string
  x: number
  y: number
  connections: string[]
  color: string
}

export const stories: Story[] = [
  {
    id: 'peacehealth',
    title: 'PeaceHealth in Ketchikan: A Community Dossier',
    excerpt: 'An ongoing investigation into healthcare access, administration, and community impact on the island.',
    category: 'investigation',
    date: '2025',
    readTime: '15 min',
    featured: true,
  },
  {
    id: 'borough-budget',
    title: 'Where the Borough Budget Actually Goes',
    excerpt: 'Breaking down Ketchikan Gateway Borough spending — what residents see and what they don\'t.',
    category: 'politics',
    date: '2025',
    readTime: '8 min',
    featured: true,
  },
  {
    id: 'cruise-season',
    title: 'Cruise Season Economics: Who Wins, Who Waits',
    excerpt: 'The summer influx reshapes downtown every year. A look at the numbers behind the ships.',
    category: 'community',
    date: '2024',
    readTime: '6 min',
  },
  {
    id: 'harbor-expansion',
    title: 'Harbor Expansion and the Working Waterfront',
    excerpt: 'Fishermen, tour operators, and the city weigh in on the future of Ketchikan\'s docks.',
    category: 'maritime',
    date: '2024',
    readTime: '7 min',
  },
  {
    id: 'school-board',
    title: 'School Board Decisions That Shape a Generation',
    excerpt: 'From staffing to curriculum, the choices made in those Tuesday meetings echo for years.',
    category: 'politics',
    date: '2024',
    readTime: '5 min',
  },
  {
    id: 'north-end',
    title: 'Life on the North End',
    excerpt: 'Beyond downtown — the neighborhoods, the weddings, and the people who make Ketchikan home.',
    category: 'community',
    date: '2024',
    readTime: '4 min',
  },
]

export const mapPins: MapPin[] = [
  { id: 'downtown', x: 52, y: 68, label: 'Downtown', story: 'Cruise season economics and downtown development', category: 'community' },
  { id: 'harbor', x: 38, y: 75, label: 'Thomas Basin', story: 'Harbor expansion and working waterfront', category: 'maritime' },
  { id: 'peacehealth', x: 58, y: 42, label: 'PeaceHealth', story: 'Healthcare investigation dossier', category: 'investigation' },
  { id: 'borough', x: 65, y: 55, label: 'Borough Hall', story: 'Budget breakdowns and local governance', category: 'politics' },
  { id: 'schools', x: 48, y: 35, label: 'School District', story: 'School board coverage', category: 'politics' },
  { id: 'north', x: 72, y: 28, label: 'North End', story: 'Community profiles from the north side', category: 'community' },
  { id: 'tongass', x: 25, y: 45, label: 'Tongass Narrows', story: 'Maritime operations and ferry routes', category: 'maritime' },
]

export const timeline: TimelineEvent[] = [
  {
    id: 't1',
    date: '2022',
    title: 'Arrived in Ketchikan',
    description: 'Moved to the island. Started learning the rhythms of rain, tides, and town meetings.',
    type: 'milestone',
  },
  {
    id: 't2',
    date: '2023',
    title: 'First Borough Meeting Coverage',
    description: 'Began attending and reporting on Ketchikan Gateway Borough Assembly sessions.',
    type: 'report',
  },
  {
    id: 't3',
    date: '2024',
    title: 'PeaceHealth Investigation Begins',
    description: 'Started compiling public records and community accounts into a comprehensive dossier.',
    type: 'investigation',
  },
  {
    id: 't4',
    date: '2024',
    title: 'School Board Series',
    description: 'Launched ongoing coverage of Ketchikan School District governance and decisions.',
    type: 'report',
  },
  {
    id: 't5',
    date: '2025',
    title: 'PeaceHealth Dossier Published',
    description: 'Released the full PeaceHealth dossier for public access via Google Drive.',
    type: 'investigation',
  },
  {
    id: 't6',
    date: '2025',
    title: 'Borough Budget Deep Dive',
    description: 'Published detailed analysis of where borough tax dollars are allocated.',
    type: 'report',
  },
]

export const topicNodes: TopicNode[] = [
  { id: 'healthcare', label: 'Healthcare', x: 50, y: 20, connections: ['politics', 'community'], color: '#c4705a' },
  { id: 'politics', label: 'Local Politics', x: 80, y: 45, connections: ['healthcare', 'budget', 'schools'], color: '#4ecdc4' },
  { id: 'budget', label: 'Borough Budget', x: 65, y: 75, connections: ['politics', 'infrastructure'], color: '#d4a853' },
  { id: 'community', label: 'Community', x: 20, y: 50, connections: ['healthcare', 'tourism', 'maritime'], color: '#6b8cae' },
  { id: 'maritime', label: 'Maritime', x: 15, y: 80, connections: ['community', 'tourism'], color: '#2d4a3e' },
  { id: 'tourism', label: 'Tourism', x: 35, y: 30, connections: ['community', 'maritime', 'budget'], color: '#8ba4b8' },
  { id: 'schools', label: 'Education', x: 85, y: 20, connections: ['politics', 'community'], color: '#c084fc' },
  { id: 'infrastructure', label: 'Infrastructure', x: 50, y: 90, connections: ['budget', 'maritime'], color: '#f97316' },
]

export const KETCHIKAN_RAIN_INCHES = 152.3
export const DOSSIER_LINK = 'https://drive.google.com'
