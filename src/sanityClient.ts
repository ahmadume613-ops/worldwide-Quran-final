import { Course, PricingPlan, Inquiry, Testimonial } from './types';

// Hardcoded Sanity credentials as requested
export const SANITY_CONFIG = {
  projectId: '7z1epwzq',
  dataset: 'production',
  title: 'worldwide Quran',
  apiVersion: '2023-05-03',
  useCdn: true,
};

// Initial course data for the 7 specific courses required by the user
export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Madani Qaidah',
    urduTitle: 'مدنی قاعده',
    description: 'The essential foundation booklet for beginners, teaching correct pronunciation (Makharij) and phonics of the Arabic letters with colorful rules.',
    icon: 'BookOpen',
    badge: 'Beginner'
  },
  {
    id: 'course-2',
    title: 'Norani Qaidah',
    urduTitle: 'نورانی قاعده',
    description: 'Classical pronunciation guide focusing on joint letters, harakat (vowels), and initial reading rules to build complete fluency in Quranic words.',
    icon: 'BookOpenCheck',
    badge: 'Popular'
  },
  {
    id: 'course-3',
    title: 'Iqra Book',
    urduTitle: 'اقرا بک',
    description: 'An interactive modern reading syllabus widely used globally to accelerate Arabic syllable recognition and phonetic word formation.',
    icon: 'BookCheck',
    badge: 'Kids favorite'
  },
  {
    id: 'course-4',
    title: 'Tajweed Quran',
    urduTitle: 'تجوید القرآن',
    description: 'Learn the rules of pronunciation, elongation (Madd), stop signs, and nasalization (Ghunnah) to recite the Holy Quran exactly like the Prophet (PBUH).',
    icon: 'GraduationCap',
    badge: 'Highly Recommended'
  },
  {
    id: 'course-5',
    title: 'Quran Memorization / Hifz',
    urduTitle: 'حفظ القرآن',
    description: 'A structured, personalized track designed for both short Surahs and full Quran memorization, complete with active revision and retention strategies.',
    icon: 'Award',
    badge: 'Premium Track'
  },
  {
    id: 'course-6',
    title: 'Islamic Duas',
    urduTitle: 'اسلامک دعائیں',
    description: 'Learn essential daily supplications (Masnoon Duas), manners, Islamic ethics (Akhlaq), and short surahs for daily spiritual development.',
    icon: 'HeartHandshake',
    badge: 'Essentials'
  },
  {
    id: 'course-7',
    title: 'Namaz Learning',
    urduTitle: 'نماز کورس',
    description: 'A comprehensive visual and interactive course detailing correct prayers, Wudu (ablution) steps, Rakaat details, and prayer positions.',
    icon: 'Sparkles',
    badge: 'All Ages'
  }
];

// Initial pricing plans matching international plans
export const INITIAL_PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan-5days',
    name: '5 Days a Week Plan',
    priceUSD: '$60',
    pricePKR: '$50',
    billing: 'monthly',
    features: [
      '5 Classes per week (20/month)',
      '30-minute focused 1-on-1 classes',
      'Male or Female certified teacher',
      'Rapid progress track (ideal for fast Hifz & Tajweed)',
      'Direct feedback from Academy Manager'
    ],
    isPopular: true,
    audience: 'international'
  },
  {
    id: 'plan-3or4days',
    name: '3 or 4 Days a Week Plan',
    priceUSD: '$40',
    pricePKR: '$30',
    billing: 'monthly',
    features: [
      '3 or 4 Classes per week (12-16/month)',
      '30-minute focused 1-on-1 classes',
      'Male or Female certified teacher',
      'Tajweed, Duas, and Namaz learning',
      'Flexible scheduling for any timezone',
      'Monthly progress assessments'
    ],
    isPopular: false,
    audience: 'international'
  },
  {
    id: 'plan-2days',
    name: '2 Days a Week Plan',
    priceUSD: '$30',
    pricePKR: '$25',
    billing: 'monthly',
    features: [
      '2 Classes per week (8/month)',
      '30-minute focused 1-on-1 classes',
      'Perfect for busy kids or working adults',
      'Fundamental Qaida & essential reciting',
      'Flexible rescheduling'
    ],
    isPopular: false,
    audience: 'international'
  },
  {
    id: 'plan-weekend',
    name: 'Weekend Special Plan',
    priceUSD: '$35',
    pricePKR: '$29',
    billing: 'monthly',
    features: [
      'Saturday & Sunday Classes (8/month)',
      '30-minute focused 1-on-1 classes',
      'Designed for tight weekday schedules',
      'Focus on Tajweed Quran and Islamic Duas',
      'Continuous friendly teacher guidance'
    ],
    isPopular: false,
    audience: 'international'
  }
];

// Get data helper functions (checks localStorage first, falls back to constants)
export function getCourses(): Course[] {
  const cached = localStorage.getItem('worldwide_quran_courses');
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error(e);
    }
  }
  return INITIAL_COURSES;
}

export function saveCourses(courses: Course[]) {
  localStorage.setItem('worldwide_quran_courses', JSON.stringify(courses));
}

export function getPricingPlans(): PricingPlan[] {
  const cached = localStorage.getItem('worldwide_quran_pricing');
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error(e);
    }
  }
  return INITIAL_PRICING_PLANS;
}

export function savePricingPlans(plans: PricingPlan[]) {
  localStorage.setItem('worldwide_quran_pricing', JSON.stringify(plans));
}

export function getInquiries(): Inquiry[] {
  const cached = localStorage.getItem('worldwide_quran_inquiries');
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error(e);
    }
  }
  return [];
}

export function addInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt'>): Inquiry {
  const list = getInquiries();
  const newInquiry: Inquiry = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  list.unshift(newInquiry);
  localStorage.setItem('worldwide_quran_inquiries', JSON.stringify(list));
  return newInquiry;
}

export function saveInquiries(inquiries: Inquiry[]) {
  localStorage.setItem('worldwide_quran_inquiries', JSON.stringify(inquiries));
}

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: "Yousef Al-Harbi",
    role: "Parent from Dubai, UAE",
    rating: 5,
    quote: "My kids are learning with a fantastic female teacher from this academy. The interactive classes feel like having a private tutor right in our living room! The scheduling is incredibly flexible, accommodating our busy after-school routine perfectly."
  },
  {
    id: 'test-2',
    name: "Amina El-Amin",
    role: "Adult Student from London, UK",
    rating: 5,
    quote: "As a working professional, finding a reliable Quran academy was tough. The professional teachers here are knowledgeable and patient. Their 24/7 availability allows me to take my lessons late in the evening. Highly recommended!"
  },
  {
    id: 'test-3',
    name: "Zayd Mansoor",
    role: "Parent from Toronto, Canada",
    rating: 5,
    quote: "The 1-on-1 focus is outstanding. My son Ahmed started with Madani Qaidah and is now reciting beautifully with Tajweed. The male tutors are incredibly patient and make learning interactive and fun. Zero stress, highly professional!"
  },
  {
    id: 'test-4',
    name: "Fatima Al-Riyami",
    role: "Parent from Riyadh, Saudi Arabia",
    rating: 5,
    quote: "We chose the Group Classes package for my daughters and the interactive atmosphere is great. The price is very reasonable, and they love learning with peers. Our lady instructor is excellent and extremely punctual."
  },
  {
    id: 'test-5',
    name: "Tariq Mahmood",
    role: "Student from Sydney, Australia",
    rating: 5,
    quote: "Having 15 years of professional teaching experience really shows. Every class is structured beautifully. The quality of Tajweed instruction is superior, and the flexibility to adjust lesson days is a lifesaver for our timezone."
  }
];

export function getTestimonials(): Testimonial[] {
  const cached = localStorage.getItem('worldwide_quran_testimonials');
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error(e);
    }
  }
  // Initialize with initial testimonials if not set
  localStorage.setItem('worldwide_quran_testimonials', JSON.stringify(INITIAL_TESTIMONIALS));
  return INITIAL_TESTIMONIALS;
}

export function saveTestimonials(testimonials: Testimonial[]) {
  localStorage.setItem('worldwide_quran_testimonials', JSON.stringify(testimonials));
}

