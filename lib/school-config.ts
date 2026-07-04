export const schoolConfig = {
  name: 'School Name',
  tagline: 'Shaping Future Leaders',
  board: 'CBSE',
  establishedYear: 2005,
  logoPath: '/logo.svg',

  hero: {
    title: 'Building Future Leaders Through Excellence in Education',
    subtitle:
      'Providing world-class education that nurtures creativity, critical thinking, and character development for the leaders of tomorrow.',
  },

  admission: {
    session: '2026–27',
    badge: 'Admissions Open 2026–27',
    applyText: 'Apply for 2026–27',
    deadline: '31 March',
    seats: 'Limited',
  },

  description:
    'Providing world-class education that nurtures creativity, critical thinking, and character development for the leaders of tomorrow.',

  url: 'https://schoolname.edu',

  contact: {
    address: '123 Education Lane, Knowledge City, State – 400001',
    phone: '+91 98765 43210',
    email: 'info@schoolname.edu',
    officeHours: 'Mon–Sat: 8:00 AM – 4:00 PM',
  },

  socialLinks: {
    facebook: 'https://facebook.com/schoolname',
    instagram: 'https://instagram.com/schoolname',
    twitter: 'https://twitter.com/schoolname',
    youtube: 'https://youtube.com/@schoolname',
    linkedin: 'https://linkedin.com/school/schoolname',
    facebookLabel: 'Facebook',
    instagramLabel: 'Instagram',
    youtubeLabel: 'YouTube',
    linkedinLabel: 'LinkedIn',
  },

  principal: {
    name: 'Dr. Sarah Mitchell',
    title: 'Principal, School Name',
    badge: 'Leadership',
    experience: 20,
    quote:
      'Education is not just about academic excellence; it is about shaping character, nurturing curiosity, and preparing students to become compassionate leaders of tomorrow.',
  },

  metadata: {
    siteName: 'School Name',
    titleTemplate: '%s | School Name',
    defaultTitle: 'School Name | Excellence in Education',
    locale: 'en_IN',
    country: 'IN',
    themeColor: '#0F172A',
    category: 'education',
    ogImage: '/og-image.png',
    twitterHandle: '@schoolname',
    applicationName: 'School Name',
    creator: 'School Name',
    publisher: 'School Name',
  },

  stats: {
    students: { value: 1500, suffix: '+' },
    teachers: { value: 75, suffix: '+' },
    years: { value: 20, suffix: '+' },
    boardResults: { value: 100, suffix: '%' },
    smartClassrooms: { value: 30, suffix: '+' },
    awards: { value: 15, suffix: '+' },
  },
} as const
