export const schoolConfig = {
  name: 'Adarsh High School',
  nameHindi: 'आदर्श हाई स्कूल',
  tagline: 'शिक्षा के साथ संस्कार, ज्ञान के साथ चरित्र',
  taglineEnglish: 'Education with Values, Knowledge with Character',
  board: 'MP Board',
  establishedYear: 2010,
  logoPath: '/logo.svg',

  hero: {
    shloka: 'सा विद्या या विमुक्तये',
    shlokaMeaning: '(वही शिक्षा श्रेष्ठ है जो मनुष्य को अज्ञान और बुराइयों से मुक्त करे।)',
    heading: 'शिक्षा के साथ संस्कार, ज्ञान के साथ चरित्र',
    subtitle: 'आदर्श हाई स्कूल में हम विद्यार्थियों को केवल परीक्षा के लिए नहीं, बल्कि जीवन में सफल और संस्कारी बनने के लिए तैयार करते हैं।',
  },

  admission: {
    session: '2026–27',
    badge: 'प्रवेश जारी 2026–27',
    applyText: 'अभी आवेदन करें',
    deadline: '31 मार्च',
    seats: 'सीमित सीटें',
  },

  description:
    'Adarsh High School is committed to providing quality education that nurtures academic excellence, character development, and holistic growth for every student.',

  url: 'https://adarshhighschool.edu',

  contact: {
    address: 'Gadarwara Road, Sainkheda, Madhya Pradesh 484661',
    phone: '+91 9893652202',
    altPhone: '+91 9993606232',
    email: 'adresh2111@gmail.com',
    officeHours: 'सोम–शनि: सुबह 8:00 – शाम 4:00',
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
    badge: 'प्रधानाचार्य का संदेश',
    experience: 20,
    quote:
      'At Adarsh High School, we believe every child has unique potential. Our mission is to create a nurturing environment where students grow academically, socially, and morally, preparing them to become responsible citizens and future leaders.',
  },

  schoolValues: [
    { value: 'सत्य', meaning: 'सत्य के मार्ग पर चलना ही जीवन की सबसे बड़ी शिक्षा है।' },
    { value: 'अनुशासन', meaning: 'अनुशासन सफलता की नींव है।' },
    { value: 'सम्मान', meaning: 'माता-पिता और गुरुजनों का सम्मान करना हमारा परम कर्तव्य है।' },
    { value: 'करुणा', meaning: 'दूसरों की मदद करना और दयालु होना हमें इंसान बनाता है।' },
    { value: 'सेवा', meaning: 'समाज की सेवा ही सच्ची शिक्षा की पहचान है।' },
    { value: 'राष्ट्रप्रेम', meaning: 'देशभक्ति और राष्ट्र के प्रति समर्पण हमारा गौरव है।' },
  ],

  whyTrustUs: [
    { title: 'बच्चों पर व्यक्तिगत ध्यान', description: 'हर छात्र को व्यक्तिगत देखभाल और मार्गदर्शन मिलता है।' },
    { title: 'अनुभवी शिक्षक', description: '40+ अनुभवी और समर्पित शिक्षकों की टीम।' },
    { title: 'अनुशासित वातावरण', description: 'अनुशासन और संस्कार पर आधारित शिक्षा व्यवस्था।' },
    { title: 'सुरक्षित परिसर', description: 'पूर्णतः सुरक्षित और निगरानी युक्त कैंपस।' },
    { title: 'संस्कारयुक्त शिक्षा', description: 'शिक्षा के साथ संस्कार, ज्ञान के साथ चरित्र।' },
    { title: 'समग्र विकास', description: 'शारीरिक, मानसिक और नैतिक विकास पर समान ध्यान।' },
  ],

  metadata: {
    siteName: 'Adarsh High School',
    titleTemplate: '%s | Adarsh High School',
    defaultTitle: 'Adarsh High School | शिक्षा के साथ संस्कार, ज्ञान के साथ चरित्र',
    locale: 'hi_IN',
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
