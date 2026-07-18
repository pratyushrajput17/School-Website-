export const schoolConfig = {
  name: 'Adarsh High School',
  nameHindi: 'आदर्श हाई स्कूल',
  tagline: 'Education with Values, Knowledge with Character',
  board: 'MP Board',
  establishedYear: 2010,
  logoPath: '/logo.svg',

  hero: {
    shloka: 'सा विद्या या विमुक्तये',
    shlokaMeaning: 'True education is that which liberates — from ignorance, from limitations, from darkness.',
    heading: 'Education with Values, Knowledge with Character',
    subtitle:
      'At Adarsh High School, we prepare students not just for examinations, but for life. We nurture academic excellence, discipline, character, and moral values — shaping responsible citizens and future leaders.',
  },

  admission: {
    session: '2026–27',
    badge: 'Admissions Open 2026–27',
    applyText: 'Apply Now',
    deadline: '31 March',
    seats: 'Limited Seats',
  },

  description:
    'Adarsh High School is committed to providing quality English-medium education that nurtures academic excellence, character, discipline, and holistic growth for every student.',

  url: 'https://adarshhighschool.edu',

  contact: {
    address: 'Gadarwara Road, Sainkheda, Madhya Pradesh 484661',
    phone: '+91 9893652202',
    altPhone: '+91 9993606232',
    email: 'adresh2111@gmail.com',
    officeHours: 'Mon–Sat: 8:00 AM – 4:00 PM',
  },

  socialLinks: {
    facebook: '#',
    instagram: '#',
    twitter: '#',
    youtube: '#',
    linkedin: '#',
  },

  principal: {
    name: 'Principal',
    title: 'Principal, Adarsh High School',
    badge: 'From the Principal',
    experience: 20,
    quote:
      'At Adarsh High School, we believe every child has unique potential. Our mission is to create a nurturing environment where students grow academically, socially, and morally, preparing them to become responsible citizens and future leaders.',
  },

  schoolValues: [
    { value: 'Satya (Truth)', meaning: 'Walking the path of truth is the foundation of all learning. We instil honesty and integrity in every student.' },
    { value: 'Anushasan (Discipline)', meaning: 'Discipline is the bridge between goals and achievement. We cultivate self-discipline and focus.' },
    { value: 'Samman (Respect)', meaning: 'Respect for parents, teachers, and elders is a core value that shapes character and builds community.' },
    { value: 'Karuna (Compassion)', meaning: 'Kindness and empathy towards others make us better human beings. We nurture compassionate hearts.' },
    { value: 'Seva (Service)', meaning: 'Service to society is the highest form of education. We encourage students to contribute and give back.' },
    { value: 'Rashtraprem (Patriotism)', meaning: 'Love for the nation and pride in our culture and heritage is instilled in every student.' },
  ],

  whyTrustUs: [
    { title: 'Personal Attention to Every Child', description: 'Each student receives individual care, guidance, and mentoring to reach their full potential.' },
    { title: 'Experienced & Dedicated Teachers', description: 'Our team of 40+ qualified and committed educators ensures high-quality instruction.' },
    { title: 'Disciplined & Nurturing Environment', description: 'A structured environment that balances academic rigour with moral and cultural values.' },
    { title: 'Safe & Secure Campus', description: 'Fully secured campus with round-the-clock monitoring for complete peace of mind.' },
    { title: 'Value-Based Education', description: 'Education that goes beyond textbooks — building character, values, and life skills.' },
    { title: 'Holistic Development', description: 'Equal emphasis on physical, mental, intellectual, and moral development of every child.' },
  ],

  metadata: {
    siteName: 'Adarsh High School',
    titleTemplate: '%s | Adarsh High School',
    defaultTitle: 'Adarsh High School | Best English Medium School in Sainkheda, MP',
    locale: 'en_IN',
    country: 'IN',
    themeColor: '#1B3A5C',
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
  },
} as const
