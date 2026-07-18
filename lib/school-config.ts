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
    thirdPhone: '+91 9993794981',
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
    badge: "Principal's Message",
    experience: 20,
    quote:
      'Education is not only about achieving academic success, but also about becoming a responsible and compassionate human being.',
  },

  schoolValues: [
    { value: 'सत्य', meaning: 'सत्य के मार्ग पर चलना सभी सीखने की नींव है। हम प्रत्येक विद्यार्थी में ईमानदारी, सत्यनिष्ठा और नैतिक मूल्यों का विकास करते हैं।' },
    { value: 'अनुशासन', meaning: 'अनुशासन सफलता की पहली सीढ़ी है। हम विद्यार्थियों में आत्म-अनुशासन, समय का सम्मान और लक्ष्य के प्रति समर्पण की भावना विकसित करते हैं।' },
    { value: 'सम्मान', meaning: 'माता-पिता, गुरुजनों, बड़ों और समाज के प्रति सम्मान हमारे विद्यालय की मूल पहचान है। सम्मान ही श्रेष्ठ चरित्र का आधार है।' },
    { value: 'करुणा', meaning: 'दूसरों के प्रति दया, सहानुभूति और संवेदनशीलता एक अच्छे इंसान की पहचान है। हम विद्यार्थियों को मानवीय मूल्यों के साथ आगे बढ़ना सिखाते हैं।' },
    { value: 'सेवा', meaning: 'समाज सेवा और दूसरों की सहायता करना सच्ची शिक्षा का महत्वपूर्ण भाग है। हम विद्यार्थियों को जिम्मेदार और सहयोगी नागरिक बनने के लिए प्रेरित करते हैं।' },
    { value: 'राष्ट्रप्रेम', meaning: 'अपने राष्ट्र, संस्कृति और विरासत के प्रति सम्मान और गर्व की भावना प्रत्येक विद्यार्थी में विकसित की जाती है ताकि वे एक जिम्मेदार नागरिक बन सकें।' },
  ],

  whyChooseFamilies: [
    { title: 'Quality Education', description: 'Strong academic focus aligned with MP Board curriculum.' },
    { title: 'Discipline & Values', description: 'Students are encouraged to develop respect, responsibility and positive character.' },
    { title: 'Experienced & Caring Teachers', description: 'Teachers guide students with personal attention and continuous support.' },
    { title: 'Safe Learning Environment', description: 'Classrooms are monitored with CCTV cameras to help maintain a safe and disciplined environment.' },
    { title: 'School Transport Facility', description: 'Pick-up and drop service available for students from nearby areas.' },
    { title: 'Green & Peaceful Campus', description: 'A natural environment surrounded by greenery that supports focused learning and student wellbeing.' },
  ],

  futureGrowth: {
    title: 'Growing for a Better Tomorrow',
    description: 'Adarsh High School continuously works to improve learning facilities and educational opportunities for students.',
    labNote: 'A Smart Learning Lab is currently under development and will be introduced in the future.',
  },

  parentTrust: [
    { title: 'Individual Attention', description: 'Every student receives personal guidance and support for academic and personal growth.' },
    { title: 'Experienced Teachers', description: 'Our dedicated and experienced teachers help students build strong foundations for the future.' },
    { title: 'Discipline & Character', description: 'We focus on discipline, responsibility and strong moral values alongside education.' },
    { title: 'Safe & Caring Environment', description: 'We provide a secure, positive and supportive atmosphere for every child.' },
    { title: 'Academic Excellence', description: 'We encourage students to achieve their highest potential through quality teaching and continuous learning.' },
    { title: 'Cultural & Sports Activities', description: 'Students actively participate in cultural, social and sports activities for all-round development.' },
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
