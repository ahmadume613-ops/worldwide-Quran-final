import { Course, PricingPlan, Inquiry, Testimonial, BlogPost } from './types';

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
    title: 'Learn Madani Qaida Online',
    urduTitle: 'مدنی قاعده',
    description: 'Learn Madani Qaida online with Tajweed. The essential foundation booklet for beginners, teaching correct pronunciation (Makharij) and basic Arabic alphabet learning with colorful rules.',
    icon: 'BookOpen',
    badge: 'With Tajweed'
  },
  {
    id: 'course-2',
    title: 'Online Noorani Qaida Course',
    urduTitle: 'نورانی قاعده',
    description: 'Our specialized Online Noorani Qaida course for kids focuses on classical pronunciation, joint letters, harakat (vowels), and initial reading rules to build complete fluency in Quranic words.',
    icon: 'BookOpenCheck',
    badge: 'For Kids'
  },
  {
    id: 'course-3',
    title: 'Online Iqra Book Reading',
    urduTitle: 'اقرا بک',
    description: 'Online Iqra book reading classes. An interactive modern reading syllabus widely used globally to accelerate Arabic syllable recognition and phonetic word formation.',
    icon: 'BookCheck',
    badge: 'Classes'
  },
  {
    id: 'course-4',
    title: 'Learn Quran with Tajweed Online',
    urduTitle: 'تجوید القرآن',
    description: 'Learn Quran with Tajweed online. Master the rules of pronunciation, elongation (Madd), stop signs, and nasalization (Ghunnah) to recite the Holy Quran exactly like the Prophet (PBUH).',
    icon: 'GraduationCap',
    badge: 'Highly Recommended'
  },
  {
    id: 'course-5',
    title: 'Online Quran Memorization (Hifz)',
    urduTitle: 'حفظ القرآن',
    description: 'Online Quran memorization course (Hifz). A structured, personalized track designed for both short Surahs and full Quran memorization, complete with active revision and retention strategies.',
    icon: 'Award',
    badge: 'Premium Track'
  },
  {
    id: 'course-6',
    title: 'Islamic Duas',
    urduTitle: 'اسلامک دعائیں',
    description: 'Learn essential daily supplications (Masnoon Duas), manners, Islamic ethics (Akhlaq), and short surahs for daily spiritual development under the guidance of certified tutors.',
    icon: 'HeartHandshake',
    badge: 'Essentials'
  },
  {
    id: 'course-7',
    title: 'Namaz Learning',
    urduTitle: 'نماز کورس',
    description: 'A comprehensive visual and interactive course detailing correct prayers, Wudu (ablution) steps, Rakaat details, and prayer positions for all ages.',
    icon: 'Sparkles',
    badge: 'All Ages'
  }
];

// Initial pricing plans matching international plans
export const INITIAL_PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan-5days',
    name: '5 Days a Week Plan',
    priceUSD: '$50',
    pricePKR: '$30',
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
    pricePKR: '$22',
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
    pricePKR: '$18',
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
    pricePKR: '$20',
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
  },
  {
    id: 'plan-group-4or5days',
    name: '4 or 5 Days Group Plan',
    priceUSD: '$24',
    pricePKR: '$15',
    billing: 'monthly',
    features: [
      '4 or 5 Classes per week (16-20/month)',
      'Small interactive cohorts (max 3-4 kids/adults)',
      'High motivation & collaborative learning environment',
      'Male or Female certified group tutor',
      'Rapid syllabus progression together',
      'Great budget choice for families'
    ],
    isPopular: true,
    audience: 'international'
  },
  {
    id: 'plan-group-3days',
    name: '3 Days Group Plan',
    priceUSD: '$18',
    pricePKR: '$11',
    billing: 'monthly',
    features: [
      '3 Classes per week (12/month)',
      'Interactive small peer group environment',
      'Tajweed Quran pronunciation exercises',
      'Male or Female certified group tutor',
      'Monthly performance checks',
      'Engaging learning activities'
    ],
    isPopular: false,
    audience: 'international'
  },
  {
    id: 'plan-group-2days',
    name: '2 Days Group Plan',
    priceUSD: '$12',
    pricePKR: '$8',
    billing: 'monthly',
    features: [
      '2 Classes per week (8/month)',
      'Highly economical global pricing rate',
      'Perfect for group revision & entry basics',
      'Male or Female certified group tutor',
      'Fundamental Qaida learning circles',
      'Patient & supportive environment'
    ],
    isPopular: false,
    audience: 'international'
  },
  {
    id: 'plan-group-weekend',
    name: 'Weekend Special Group Plan',
    priceUSD: '$14',
    pricePKR: '$9',
    billing: 'monthly',
    features: [
      'Saturday & Sunday Group Classes (8/month)',
      'Weekend learning circles & quizzes',
      'Duas, Namaz, and Islamic studies focus',
      'Male or Female certified group tutor',
      'Friendly weekend learning routine',
      'Shared group review and practice'
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
      const parsed = JSON.parse(cached);
      // If the cached version doesn't have our SEO optimized title or course names, reset
      const isSEOOptimized = parsed.some((c: any) => c.title.toLowerCase().includes('noorani qaida') || c.title.toLowerCase().includes('madani qaida'));
      if (isSEOOptimized) {
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
  }
  // Initialize/reset with initial courses to apply the comprehensive SEO optimization
  localStorage.setItem('worldwide_quran_courses', JSON.stringify(INITIAL_COURSES));
  return INITIAL_COURSES;
}

export function saveCourses(courses: Course[]) {
  localStorage.setItem('worldwide_quran_courses', JSON.stringify(courses));
}

export function getPricingPlans(): PricingPlan[] {
  const cached = localStorage.getItem('worldwide_quran_pricing');
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      // If the cached version doesn't have group plans or the group price is outdated, reset
      const hasGroupPlans = parsed.some((p: any) => p.id.includes('group'));
      const hasCorrectGroupPrice = parsed.some((p: any) => p.id === 'plan-group-4or5days' && p.priceUSD === '$24');
      if (hasGroupPlans && hasCorrectGroupPrice) {
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
  }
  // Initialize/reset with initial pricing plans
  localStorage.setItem('worldwide_quran_pricing', JSON.stringify(INITIAL_PRICING_PLANS));
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

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'How 1-on-1 Online Lessons Keep Kids Motivated and Engaged',
    category: 'E-Learning Tips',
    date: 'June 24, 2026',
    author: 'Academy Management',
    readTime: '4 min read',
    excerpt: 'Discover why interactive digital boards, personalized milestones, and supportive professional tutors outclass crowded general study environments for children under 12.',
    content: 'Studying online can sometimes feel distant, but the modern 1-on-1 private lesson turns it into an immersive, highly motivating experience. By pairing each kid with a dedicated male or lady tutor, our classes focus entirely on the child\'s current pace. Interactive slides, pronunciation games for Madani Qaidah, and small reward metrics keep kids excited for their weekly classes, achieving continuous progress without any household stress.',
    likes: 42
  },
  {
    id: 'post-2',
    title: 'The Importance of Tajweed: Protecting Quranic Meanings',
    category: 'Tajweed Rules',
    date: 'May 18, 2026',
    author: 'Senior Tajweed Tutor',
    readTime: '5 min read',
    excerpt: 'Arabic is a deeply phonetic language where a minor error in articulation can completely transform a word\'s sacred meaning. Learn simple daily exercises for non-Arab speakers.',
    content: 'Tajweed is not merely an optional decorative accent—it is the correct science of reciting the Holy Quran as it was originally revealed. Simple letters like \'Haa\' (ح) and \'Khaa\' (خ) require precise vocal cord placement. For international students, especially children, our tutors break down the Norani Qaidah letter-by-letter with visual guides, ensuring correct pronunciation is locked in from day one.',
    likes: 58
  },
  {
    id: 'post-3',
    title: 'Setting Up a distraction-free Home Learning Zone',
    category: 'Parent Guidance',
    date: 'April 09, 2026',
    author: 'Academy Manager',
    readTime: '3 min read',
    excerpt: 'Practical ideas for busy parents to establish an ideal, quiet space for children to lock in their focus during their 30-minute online sessions.',
    content: 'A successful online lesson requires more than just high-speed internet. Having a dedicated desk, high-quality headphones, and a quiet environment makes an immense difference in student retention. We advise parents to schedule classes at a consistent time when household noise is minimal, enabling the student and the tutor to build a deep, distraction-free educational connection.',
    likes: 31
  }
];

export function getBlogPosts(): BlogPost[] {
  const cached = localStorage.getItem('worldwide_quran_blog_posts');
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error(e);
    }
  }
  // Initialize with initial blog posts if not set
  localStorage.setItem('worldwide_quran_blog_posts', JSON.stringify(INITIAL_BLOG_POSTS));
  return INITIAL_BLOG_POSTS;
}

export function saveBlogPosts(posts: BlogPost[]) {
  localStorage.setItem('worldwide_quran_blog_posts', JSON.stringify(posts));
}


