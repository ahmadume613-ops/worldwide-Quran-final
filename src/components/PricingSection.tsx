import React, { useState } from 'react';
import { Check, ShieldCheck, Globe, Coins, ArrowRight, Users, User } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

// Smart dynamic currencies including Dubai AED and Riyal SAR with custom conversion factors from GBP base
const CURRENCIES = [
  { code: 'USD', symbol: '$', rateFromGBP: 1.28, name: 'US Dollar', isUSD: true },
  { code: 'GBP', symbol: '£', rateFromGBP: 1.0, name: 'British Pound', isUSD: false },
  { code: 'EUR', symbol: '€', rateFromGBP: 1.18, name: 'Euro', isUSD: false },
  { code: 'AUD', symbol: 'A$', rateFromGBP: 1.93, name: 'Australian Dollar', isUSD: false },
  { code: 'CAD', symbol: 'C$', rateFromGBP: 1.76, name: 'Canadian Dollar', isUSD: false },
  { code: 'AED', symbol: 'AED ', rateFromGBP: 4.71, name: 'Dubai Dirham', isUSD: false },
  { code: 'SAR', symbol: 'SR ', rateFromGBP: 4.81, name: 'Saudi Riyal', isUSD: false }
];

interface PlanTemplate {
  id: string;
  name: string;
  usdPrice: number; // Tier A (USD Premium Rates)
  gbpPrice: number; // Tier B (UK Structure Base Rates)
  features: string[];
  isPopular?: boolean;
}

const ONETOONE_PLANS: PlanTemplate[] = [
  {
    id: 'one-4or5days',
    name: '4 or 5 Days a Week Plan',
    usdPrice: 50,
    gbpPrice: 30,
    features: [
      '4 or 5 Classes per week (16-20/month)',
      '30-minute private 1-on-1 classes',
      'Male or Female certified expert teacher',
      'Rapid progress track (ideal for Hifz & Tajweed)',
      'Direct feedback from Academy Manager',
      'Flexible makeup classes included'
    ],
    isPopular: true
  },
  {
    id: 'one-3days',
    name: '3 Days a Week Plan',
    usdPrice: 40,
    gbpPrice: 22,
    features: [
      '3 Classes per week (12/month)',
      '30-minute private 1-on-1 classes',
      'Male or Female certified expert teacher',
      'Tajweed, Duas, and Namaz learning',
      'Custom scheduling per timezone',
      'Monthly progress assessments'
    ]
  },
  {
    id: 'one-2days',
    name: '2 Days a Week Plan',
    usdPrice: 30,
    gbpPrice: 18,
    features: [
      '2 Classes per week (8/month)',
      '30-minute private 1-on-1 classes',
      'Perfect for busy kids or working adults',
      'Fundamental Qaida & essential reciting',
      'Flexible rescheduling',
      'Friendly and patient teaching pace'
    ]
  },
  {
    id: 'one-weekend',
    name: 'Weekend Special Plan',
    usdPrice: 35,
    gbpPrice: 20,
    features: [
      'Saturday & Sunday Classes (8/month)',
      '30-minute private 1-on-1 classes',
      'Designed for tight weekday schedules',
      'Focus on Tajweed Quran and Islamic Duas',
      'Continuous supportive teacher guidance',
      'Comprehensive study plan'
    ]
  }
];

const GROUP_PLANS: PlanTemplate[] = [
  {
    id: 'group-4or5days',
    name: '4 or 5 Days Group Plan',
    usdPrice: 45,
    gbpPrice: 25,
    features: [
      '4 or 5 Classes per week (16-20/month)',
      'Small interactive cohorts (max 3-4 kids/adults)',
      'High motivation & collaborative learning environment',
      'Male or Female certified group tutor',
      'Rapid syllabus progression together',
      'Great budget choice for families'
    ],
    isPopular: true
  },
  {
    id: 'group-3days',
    name: '3 Days Group Plan',
    usdPrice: 30,
    gbpPrice: 18,
    features: [
      '3 Classes per week (12/month)',
      'Interactive small peer group environment',
      'Tajweed Quran pronunciation exercises',
      'Male or Female certified group tutor',
      'Monthly performance checks',
      'Engaging learning activities'
    ]
  },
  {
    id: 'group-2days',
    name: '2 Days Group Plan',
    usdPrice: 20,
    gbpPrice: 12,
    features: [
      '2 Classes per week (8/month)',
      'Highly economical global pricing rate',
      'Perfect for group revision & entry basics',
      'Male or Female certified group tutor',
      'Fundamental Qaida learning circles',
      'Patient & supportive environment'
    ]
  },
  {
    id: 'group-weekend',
    name: 'Weekend Special Group Plan',
    usdPrice: 25,
    gbpPrice: 15,
    features: [
      'Saturday & Sunday Group Classes (8/month)',
      'Weekend learning circles & quizzes',
      'Duas, Namaz, and Islamic studies focus',
      'Male or Female certified group tutor',
      'Friendly weekend learning routine',
      'Shared group review and practice'
    ]
  }
];

export default function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const [activeTab, setActiveTab] = useState<'1on1' | 'group'>('1on1');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const activeCurrency = CURRENCIES.find(c => c.code === selectedCurrency) || CURRENCIES[0];

  const calculatePrice = (plan: PlanTemplate) => {
    if (activeCurrency.isUSD) {
      return `${activeCurrency.symbol}${plan.usdPrice}`;
    } else {
      const converted = plan.gbpPrice * activeCurrency.rateFromGBP;
      return `${activeCurrency.symbol}${Math.round(converted)}`;
    }
  };

  const currentPlans = activeTab === '1on1' ? ONETOONE_PLANS : GROUP_PLANS;

  return (
    <section id="pricing" className="py-16 bg-[#FDFBF7] relative border-b border-[#E5E1DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-sm font-bold text-[#A4864A] tracking-widest uppercase block mb-3 font-sans">Affordable Investment</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D312A] tracking-tight serif-font">
            Transparent, Low-Cost Tuition Rates
          </h2>
          <p className="text-warm-text/80 mt-3 text-sm sm:text-base leading-relaxed font-light">
            Choose the monthly curriculum plan that fits your family's educational needs. Custom plans with male or female tutors available for international students globally.
          </p>
          <div className="h-1 w-20 bg-gold-accent mx-auto rounded-full mt-5" />
        </div>

        {/* Currency & Package Type Selection Control Block */}
        <div className="max-w-4xl mx-auto mb-12 bg-[#F5F2ED] border border-[#E5E1DA] rounded p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Class Type Selector Tab Buttons */}
            <div className="md:col-span-6 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => setActiveTab('1on1')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded font-bold text-xs uppercase tracking-wider transition border cursor-pointer ${activeTab === '1on1' ? 'bg-emerald-deep text-[#FDFBF7] border-emerald-deep shadow-md' : 'bg-[#FDFBF7] text-warm-text hover:text-gold-accent border-[#E5E1DA]'}`}
              >
                <User className="w-4 h-4 text-gold-accent" />
                <span>Private 1-on-1 Classes</span>
              </button>
              <button
                onClick={() => setActiveTab('group')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded font-bold text-xs uppercase tracking-wider transition border cursor-pointer ${activeTab === 'group' ? 'bg-emerald-deep text-[#FDFBF7] border-emerald-deep shadow-md' : 'bg-[#FDFBF7] text-warm-text hover:text-gold-accent border-[#E5E1DA]'}`}
              >
                <Users className="w-4 h-4 text-gold-accent" />
                <span>Group Class Packages</span>
              </button>
            </div>

            {/* Currency Dropdown */}
            <div className="md:col-span-6 flex flex-col sm:flex-row items-center gap-4 justify-end">
              <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-center">
                <Coins className="w-4.5 h-4.5 text-gold-accent" />
                <span className="text-xs font-bold text-[#2D312A] serif-font">Currency Calculator:</span>
              </div>
              <div className="w-full sm:w-auto">
                <label htmlFor="currency-select" className="sr-only">Select Currency</label>
                <select
                  id="currency-select"
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="w-full sm:w-52 bg-[#FDFBF7] text-[#2D312A] text-xs font-bold px-3 py-2.5 rounded border border-[#E5E1DA] focus:outline-none focus:border-gold-accent cursor-pointer shadow-xs"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} ({c.symbol.trim()}) - {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          <div className="mt-4 pt-4 border-t border-[#E5E1DA] flex items-center gap-1.5 text-[10px] text-warm-text/60 font-mono">
            <Globe className="w-3.5 h-3.5 text-gold-accent" />
            <span>Interactive Exchange: Select a currency to instantly recalculate tuition fees for {activeTab === '1on1' ? 'Individual private study' : 'Discounted group classes'}.</span>
          </div>
        </div>

        {/* Separate Section Header / Info for Group Classes if active tab is Group */}
        {activeTab === 'group' && (
          <div className="mb-8 p-5 bg-emerald-deep text-[#FDFBF7] rounded border border-gold-accent/20 max-w-4xl mx-auto shadow-sm animate-fade-in">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-gold-accent/15 text-gold-accent rounded-full"><Users className="w-5 h-5" /></span>
              <div>
                <h4 className="text-sm font-bold serif-font text-white">Discounted Peer Group Classes</h4>
                <p className="text-xs text-[#E5E1DA] mt-0.5 font-light">Highly interactive, collaborative cohorts with a maximum of 3-4 children or adults. Perfect budget-friendly alternative for multi-child families with structured progression.</p>
              </div>
            </div>
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {currentPlans.map((p) => {
            const calculatedPriceStr = calculatePrice(p);
            return (
              <div 
                key={p.id}
                className={`bg-[#FDFBF7] rounded p-6 border transition-all duration-300 relative flex flex-col justify-between ${p.isPopular ? 'border-gold-accent ring-2 ring-gold-accent/10 shadow-lg' : 'border-[#E5E1DA] shadow-sm hover:shadow-md'}`}
              >
                {p.isPopular && (
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-gold-accent text-white font-extrabold text-[9px] tracking-wider uppercase px-3 py-1 rounded shadow border border-gold-accent/20">
                    Most Popular
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#2D312A] serif-font min-h-[56px] flex items-center">{p.name}</h3>
                    <div className="flex items-baseline mt-2">
                      <span className="text-3xl font-extrabold text-[#2D312A] tracking-tight serif-font">
                        {calculatedPriceStr}
                      </span>
                      <span className="text-warm-text/60 text-xs ml-1.5 font-medium">/ month</span>
                    </div>
                    <p className="text-[10px] text-gold-accent font-semibold mt-1 uppercase tracking-wider">
                      {activeTab === '1on1' ? 'Private 1-on-1 Tutors' : 'Small Peer Group Learning'}
                    </p>
                  </div>

                  <div className="h-px bg-[#E5E1DA]" />

                  {/* Features list */}
                  <ul className="space-y-2.5 text-xs text-warm-text/85 font-medium">
                    {p.features.map((feat, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className={`p-0.5 rounded-full mt-0.5 shrink-0 ${p.isPopular ? 'bg-gold-accent/10 text-gold-accent' : 'bg-emerald-deep/10 text-emerald-deep'}`}>
                          <Check className="w-3 h-3" />
                        </span>
                        <span className="font-light leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E5E1DA]">
                  <button
                    id={`select-plan-${p.id}`}
                    onClick={() => onSelectPlan(`${activeTab === '1on1' ? '1-on-1' : 'Group'} ${p.name} (${calculatedPriceStr}/mo)`)}
                    className={`w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded font-bold transition text-xs cursor-pointer shadow-xs ${p.isPopular ? 'bg-gold-accent hover:bg-gold-accent/90 text-white' : 'bg-emerald-deep hover:bg-emerald-deep/90 text-white'}`}
                  >
                    <span>Enroll In This Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Assurance message */}
        <div className="max-w-3xl mx-auto mt-12 p-4 bg-[#F5F2ED] rounded border border-[#E5E1DA] flex items-start gap-3 text-xs text-emerald-deep leading-relaxed font-medium shadow-2xs">
          <ShieldCheck className="w-5 h-5 text-gold-accent shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold text-[#2D312A]">100% Satisfaction & Safety Guarantee:</strong> All lessons are fully supervised by our Academy Manager with 15 years of professional teaching experience. Male and Female Quran teachers are available on-demand. Families may customize timetables and request separate lady instructors for girls and kids at any time.
          </div>
        </div>

      </div>
    </section>
  );
}
