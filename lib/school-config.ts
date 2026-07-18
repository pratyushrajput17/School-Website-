export const schoolConfig = {
  name: 'Adarsh High School',
  tagline: 'Nurturing Minds, Building Futures',
  board: 'MP Board',
  establishedYear: 2010,
  logoPath: '/logo.svg',

  hero: {
    title: 'Quality Education for a Brighter Tomorrow',
    subtitle:
      'Adarsh High School is committed to providing quality education that nurtures academic excellence, character development, and holistic growth for every student.',
  },

  admission: {
    session: '2026–27',
    badge: 'Admissions Open 2026–27',
    applyText: 'Apply Now',
    deadline: '31 March',
    seats: 'Limited',
  },

  description:
    'Adarsh High School is committed to providing quality education that nurtures academic excellence, character development, and holistic growth for every student.',

  url: 'https://adarshhighschool.edu',

  contact: {
    address: 'Gadarwara Road, Sainkheda, Madhya Pradesh',
    phone: '+91 9893652202',
    altPhone: '+91 9993606232',
    email: 'info@adarshhighschool.edu',
    officeHours: 'Mon–Sat: 8:00 AM – 4:00 PM',
  },

  socialLinks: {
    facebook: '#',
    instagram: '#',
    twitter: '#',
    youtube: '#',
    linkedin: '#',
    facebookLabel: 'Facebook',
    instagramLabel: 'Instagram',
    youtubeLabel: 'YouTube',
    linkedinLabel: 'LinkedIn',
  },

  principal: {
    name: 'Principal',
    title: 'Principal, Adarsh High School',
    badge: 'From the Principal',
    experience: 20,
    quote:
      'At Adarsh High School, we believe every child has unique potential. Our mission is to create a nurturing environment where students grow academically, socially, and morally, preparing them to become responsible citizens and future leaders.',
  },

  metadata: {
    siteName: 'Adarsh High School',
    titleTemplate: '%s | Adarsh High School',
    defaultTitle: 'Adarsh High School | Quality Education in Sainkheda, MP',
    locale: 'en_IN',
    country: 'IN',
    themeColor: '#0F172A',
    category: 'education',
    ogImage: '/og-image.png',
    twitterHandle: '@adarshhighschool',
    applicationName: 'Adarsh High School',
    creator: 'Adarsh High School',
    publisher: 'Adarsh High School',
  },

  stats: {
    students: { value: 900, suffix: '+' },
    teachers: { value: 40, suffix: '+' },
    years: { value: 15, suffix: '+' },
    boardResults: { value: 95, suffix: '%' },
    smartClassrooms: { value: 15, suffix: '+' },
    awards: { value: 10, suffix: '+' },
  },
} as const
