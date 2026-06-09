export interface Story {
  id: string
  title: string
  excerpt: string
  category: 'politics' | 'community' | 'investigation' | 'maritime'
  date: string
  readTime: string
  featured?: boolean
  beat: string
}

export interface MapPin {
  id: string
  x: number
  y: number
  label: string
  story: string
  category: string
  beat: string
  storyId?: string
}

export interface PublicMeeting {
  id: string
  body: string
  schedule: string
  location: string
  nextDate: string
  time: string
  agenda: string[]
  coverage: string
}

export interface Beat {
  id: string
  label: string
  description: string
  color: string
  storyIds: string[]
  pinIds: string[]
}

export interface InvestigationFile {
  id: string
  title: string
  status: 'active' | 'published' | 'ongoing'
  summary: string
  documents: { name: string; type: string; date: string }[]
  link?: string
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
    beat: 'healthcare',
  },
  {
    id: 'borough-budget',
    title: 'Where the Borough Budget Actually Goes',
    excerpt: 'Breaking down Ketchikan Gateway Borough spending — what residents see and what they don\'t.',
    category: 'politics',
    date: '2025',
    readTime: '8 min',
    featured: true,
    beat: 'borough',
  },
  {
    id: 'cruise-season',
    title: 'Cruise Season Economics: Who Wins, Who Waits',
    excerpt: 'The summer influx reshapes downtown every year. A look at the numbers behind the ships.',
    category: 'community',
    date: '2024',
    readTime: '6 min',
    beat: 'community',
  },
  {
    id: 'harbor-expansion',
    title: 'Harbor Expansion and the Working Waterfront',
    excerpt: 'Fishermen, tour operators, and the city weigh in on the future of Ketchikan\'s docks.',
    category: 'maritime',
    date: '2024',
    readTime: '7 min',
    beat: 'maritime',
  },
  {
    id: 'school-board',
    title: 'School Board Decisions That Shape a Generation',
    excerpt: 'From staffing to curriculum, the choices made in those Tuesday meetings echo for years.',
    category: 'politics',
    date: '2024',
    readTime: '5 min',
    beat: 'schools',
  },
  {
    id: 'north-end',
    title: 'Life on the North End',
    excerpt: 'Beyond downtown — the neighborhoods, the weddings, and the people who make Ketchikan home.',
    category: 'community',
    date: '2024',
    readTime: '4 min',
    beat: 'community',
  },
]

export const mapPins: MapPin[] = [
  { id: 'downtown', x: 52, y: 68, label: 'Downtown', story: 'Cruise season economics and downtown development', category: 'community', beat: 'community', storyId: 'cruise-season' },
  { id: 'harbor', x: 38, y: 75, label: 'Thomas Basin', story: 'Harbor expansion and working waterfront', category: 'maritime', beat: 'maritime', storyId: 'harbor-expansion' },
  { id: 'peacehealth', x: 58, y: 42, label: 'PeaceHealth', story: 'Healthcare investigation dossier', category: 'investigation', beat: 'healthcare', storyId: 'peacehealth' },
  { id: 'borough', x: 65, y: 55, label: 'Borough Hall', story: 'Budget breakdowns and local governance', category: 'politics', beat: 'borough', storyId: 'borough-budget' },
  { id: 'schools', x: 48, y: 35, label: 'School District', story: 'School board coverage', category: 'politics', beat: 'schools', storyId: 'school-board' },
  { id: 'north', x: 72, y: 28, label: 'North End', story: 'Community profiles from the north side', category: 'community', beat: 'community', storyId: 'north-end' },
  { id: 'tongass', x: 25, y: 45, label: 'Tongass Narrows', story: 'Maritime operations and ferry routes', category: 'maritime', beat: 'maritime', storyId: 'harbor-expansion' },
]

export const beats: Beat[] = [
  {
    id: 'borough',
    label: 'Borough Politics',
    description: 'Assembly meetings, budgets, ordinances, and how local government spends your tax dollars.',
    color: '#4ecdc4',
    storyIds: ['borough-budget'],
    pinIds: ['borough'],
  },
  {
    id: 'schools',
    label: 'School Board',
    description: 'Staffing, curriculum, facilities, and the decisions made in Tuesday night sessions.',
    color: '#c084fc',
    storyIds: ['school-board'],
    pinIds: ['schools'],
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    description: 'Hospital administration, access to care, and community health on the island.',
    color: '#c4705a',
    storyIds: ['peacehealth'],
    pinIds: ['peacehealth'],
  },
  {
    id: 'maritime',
    label: 'Harbor & Maritime',
    description: 'Working waterfront, harbor expansion, ferries, and the boats that keep Ketchikan running.',
    color: '#5a9a7a',
    storyIds: ['harbor-expansion'],
    pinIds: ['harbor', 'tongass'],
  },
  {
    id: 'community',
    label: 'Community',
    description: 'Neighborhood life, tourism economics, and the people who make this town home.',
    color: '#6b8cae',
    storyIds: ['cruise-season', 'north-end'],
    pinIds: ['downtown', 'north'],
  },
]

export const publicMeetings: PublicMeeting[] = [
  {
    id: 'borough-assembly',
    body: 'Borough Assembly',
    schedule: '1st & 3rd Monday',
    location: 'Borough Assembly Chambers',
    nextDate: 'Jun 16, 2025',
    time: '7:00 PM',
    agenda: ['FY26 budget work session', 'Harbor fee schedule', 'Public comment period'],
    coverage: 'I attend most assembly meetings and publish notes on major votes and budget items.',
  },
  {
    id: 'school-board',
    body: 'School Board',
    schedule: '2nd Wednesday monthly',
    location: 'Ketchikan School District Office',
    nextDate: 'Jun 11, 2025',
    time: '6:00 PM',
    agenda: ['Superintendent report', 'Staffing update', 'Facilities planning'],
    coverage: 'Regular coverage of board decisions on staffing, curriculum, and district spending.',
  },
  {
    id: 'city-council',
    body: 'City Council',
    schedule: '1st & 3rd Thursday',
    location: 'City Hall Council Chambers',
    nextDate: 'Jun 19, 2025',
    time: '7:00 PM',
    agenda: ['Downtown infrastructure', 'Cruise ship berthing', 'Municipal code amendments'],
    coverage: 'Coverage focused on downtown development and city-level policy.',
  },
  {
    id: 'planning',
    body: 'Planning Commission',
    schedule: '2nd Tuesday monthly',
    location: 'Borough Planning Office',
    nextDate: 'Jun 10, 2025',
    time: '7:00 PM',
    agenda: ['Rezoning applications', 'Comprehensive plan update', 'Conditional use permits'],
    coverage: 'I track land use decisions that affect neighborhoods and development.',
  },
]

export const investigations: InvestigationFile[] = [
  {
    id: 'peacehealth',
    title: 'PeaceHealth Ketchikan',
    status: 'published',
    summary: 'Public records, meeting minutes, and community accounts compiled into a living dossier on healthcare administration and access on the island.',
    link: 'https://drive.google.com',
    documents: [
      { name: 'Hospital board minutes (2023–2025)', type: 'Public record', date: 'Mar 2025' },
      { name: 'Community impact statements', type: 'Interviews', date: 'Feb 2025' },
      { name: 'FOIA response — staffing levels', type: 'FOIA', date: 'Jan 2025' },
      { name: 'Borough healthcare funding records', type: 'Public record', date: 'Dec 2024' },
    ],
  },
]

export const headlineTicker = stories.filter((s) => s.featured).map((s) => s.title)

export const DOSSIER_LINK = 'https://drive.google.com'
