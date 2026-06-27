export interface Course {
  id: string;
  title: string;
  urduTitle: string;
  description: string;
  icon: string;
  badge?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  priceUSD: string;
  pricePKR: string;
  billing: string;
  features: string[];
  isPopular: boolean;
  audience: 'international' | 'local' | 'all';
}

export interface Inquiry {
  id: string;
  studentName: string;
  parentName?: string;
  phone: string;
  email: string;
  ageGroup: string;
  courseInterest: string;
  preferredFormat?: string;
  preferredDays?: string;
  preferredTime: string;
  message: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
}

