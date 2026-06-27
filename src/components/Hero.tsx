import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Award } from 'lucide-react';
import heroImg from '../assets/images/quran_academy_hero_1782168948648.jpg';

// High-quality public stock image representing happy, warm interactive online learning with laptop as a robust fallback
const FALLBACK_HERO = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80";

export default function Hero() {
  return (
    <section id="home" className="relative bg-[#FDFBF7] overflow-hidden py-16 lg:py-24 border-b border-[#E5E1DA]">
      {/* Visual background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5F2ED] rounded-full blur-3xl opacity-60 -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E5E1DA]/30 rounded-full blur-3xl opacity-60 -z-10 -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left: Text & Pitch */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#F5F2ED] text-emerald-deep border border-gold-accent/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-4 h-4 text-gold-accent" />
              <span>Male & Female Teachers Available 24/7</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2D312A] tracking-tight leading-none serif-font">
              Learn the Holy Quran Online <br />
              <span className="text-gold-accent block mt-2">
                For Kids & Adults
              </span>
            </h1>

            <p className="text-base sm:text-lg text-warm-text/80 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
              Welcome to the premier interactive modern online learning academy. Led by our dedicated Academy Manager and certified management team with over <strong className="text-emerald-deep font-bold">15 years of professional teaching experience</strong>. We make Quranic study comfortable, accessible, and correct from the ease of your home.
            </p>

            {/* Micro Highlights */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0 text-left pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-gold-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#2D312A] text-sm">Flexible Scheduling</h4>
                  <p className="text-xs text-warm-text/75">Pick hours that fit your busy life</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Award className="w-5 h-5 text-gold-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#2D312A] text-sm">Tajweed Standards</h4>
                  <p className="text-xs text-warm-text/75">100% correct letters & rules</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-gold-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#2D312A] text-sm">Female Tutors</h4>
                  <p className="text-xs text-warm-text/75">Safe, dedicated lady instructors</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-gold-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#2D312A] text-sm">1-on-1 Personalized</h4>
                  <p className="text-xs text-warm-text/75">One dedicated teacher per student</p>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a 
                href="#contact" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-deep hover:bg-emerald-deep/90 text-[#FDFBF7] font-bold px-8 py-4 rounded shadow-lg transition transform hover:-translate-y-0.5"
              >
                <span>Book Free Trial Class</span>
                <ArrowRight className="w-5 h-5 text-gold-accent" />
              </a>
              <a 
                href="#courses" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F5F2ED] hover:bg-[#E5E1DA] text-[#2D312A] border border-[#E5E1DA] font-semibold px-8 py-4 rounded transition shadow-sm"
              >
                <span>View Courses</span>
              </a>
            </div>
          </div>

          {/* Hero Right: Modern Online Learning Visual Concept */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gold-accent/5 rounded-2xl -z-10 transform rotate-3" />
            <div className="bg-[#FDFBF7] p-4 rounded border border-[#E5E1DA] relative shadow-lg">
              
              <img 
                src={heroImg} 
                alt="Parents and children studying Quran together online in a warm home" 
                className="w-full h-auto rounded object-cover aspect-[4/3] shadow-inner"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_HERO;
                }}
              />

              {/* Float Badge 1: Expert Manager */}
              <div className="absolute -bottom-5 -left-5 bg-[#FDFBF7] border border-[#E5E1DA] p-4 rounded shadow-xl flex items-center gap-3 max-w-xs">
                <div className="w-10 h-10 rounded-full bg-gold-accent flex items-center justify-center text-[#FDFBF7] shrink-0 font-bold">15+</div>
                <div>
                  <span className="text-xs font-bold text-emerald-deep block">Experienced Management</span>
                  <span className="text-[10px] text-warm-text/80 block leading-tight">15 years professional Quran teaching guidance</span>
                </div>
              </div>

              {/* Float Badge 2: Class Live */}
              <div className="absolute -top-4 -right-4 bg-emerald-deep text-[#FDFBF7] py-2 px-3.5 rounded border border-gold-accent/30 shadow-lg flex items-center gap-1.5 text-xs font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-gold-accent animate-ping" />
                <span>Live 1-on-1 Class</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
