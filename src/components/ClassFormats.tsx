import React from 'react';
import { UserCheck, Users, Check, Sparkles, Video, HelpCircle } from 'lucide-react';

export default function ClassFormats() {
  return (
    <section id="class-formats" className="py-16 bg-[#F5F2ED] relative border-b border-[#E5E1DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-emerald-deep tracking-widest uppercase mb-3 font-sans">Structured Class Formats</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-[#2D312A] tracking-tight serif-font">
            Choose the Perfect Learning Method For Yourself or Your Child
          </p>
          <div className="h-1 w-20 bg-gold-accent mx-auto rounded-full mt-5" />
        </div>

        {/* Formats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Format 1: 1-on-1 Classes */}
          <div className="bg-[#FDFBF7] rounded p-8 lg:p-12 border border-[#E5E1DA] hover:border-gold-accent/40 transition duration-300 shadow-sm relative flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <UserCheck className="w-24 h-24 text-emerald-deep" />
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#F5F2ED] text-emerald-deep text-xs font-bold px-3 py-1 rounded uppercase">
                <Video className="w-3.5 h-3.5 text-gold-accent" />
                <span>Highest Retention</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2D312A] flex items-center gap-3 serif-font">
                <span className="p-3 bg-emerald-deep text-gold-accent rounded shadow-md"><UserCheck className="w-6 h-6" /></span>
                <span>Online 1-on-1 Classes</span>
              </h3>

              <p className="text-warm-text/85 text-sm sm:text-base leading-relaxed font-light">
                The most effective online Quran study structure. Every student is paired with their own dedicated male or female teacher. The entire 30-minute session is tailored strictly to the student's individual reading speed, capability, and retention.
              </p>

              <ul className="space-y-3.5 text-sm font-medium text-warm-text/90">
                <li className="flex items-start gap-3">
                  <span className="p-0.5 rounded-full bg-emerald-deep/10 text-emerald-deep mt-0.5"><Check className="w-4 h-4" /></span>
                  <span>100% private session with zero distractions or noise</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="p-0.5 rounded-full bg-emerald-deep/10 text-emerald-deep mt-0.5"><Check className="w-4 h-4" /></span>
                  <span>Male & Female certified teachers available</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="p-0.5 rounded-full bg-emerald-deep/10 text-emerald-deep mt-0.5"><Check className="w-4 h-4" /></span>
                  <span>Highly flexible scheduling - change class timing anytime</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="p-0.5 rounded-full bg-emerald-deep/10 text-emerald-deep mt-0.5"><Check className="w-4 h-4" /></span>
                  <span>Custom paced curriculum - perfect for kids & adults alike</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-8 border-t border-[#E5E1DA]">
              <a 
                href="#contact" 
                className="w-full inline-flex justify-center items-center bg-emerald-deep hover:bg-emerald-deep/90 text-[#FDFBF7] font-bold py-3 px-6 rounded transition text-sm shadow"
              >
                Enroll in 1-on-1 Trial
              </a>
            </div>
          </div>

          {/* Format 2: Group Classes */}
          <div className="bg-[#FDFBF7] rounded p-8 lg:p-12 border border-[#E5E1DA] hover:border-gold-accent/40 transition duration-300 shadow-sm relative flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Users className="w-24 h-24 text-gold-accent" />
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-gold-accent/10 text-gold-accent text-xs font-bold px-3 py-1 rounded uppercase">
                <Sparkles className="w-3.5 h-3.5 text-gold-accent" />
                <span>Interactive Collective Study</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2D312A] flex items-center gap-3 serif-font">
                <span className="p-3 bg-gold-accent text-[#FDFBF7] rounded shadow-md"><Users className="w-6 h-6" /></span>
                <span>Interactive Group Classes</span>
              </h3>

              <p className="text-warm-text/85 text-sm sm:text-base leading-relaxed font-light">
                Join high-spirited, interactive small group environments. Crafted strictly under professional management guidelines, our group lessons combine collective reciting practice with structured feedback. Recommended for secondary learning or daily practices.
              </p>

              <ul className="space-y-3.5 text-sm font-medium text-warm-text/90">
                <li className="flex items-start gap-3">
                  <span className="p-0.5 rounded-full bg-gold-accent/10 text-gold-accent mt-0.5"><Check className="w-4 h-4" /></span>
                  <span>Small peer sizes (max 4-6 students) for individual oversight</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="p-0.5 rounded-full bg-gold-accent/10 text-gold-accent mt-0.5"><Check className="w-4 h-4" /></span>
                  <span>Great classroom discipline with peer reciting exercises</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="p-0.5 rounded-full bg-gold-accent/10 text-gold-accent mt-0.5"><Check className="w-4 h-4" /></span>
                  <span>Affordable pricing options for large households</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="p-0.5 rounded-full bg-gold-accent/10 text-gold-accent mt-0.5"><Check className="w-4 h-4" /></span>
                  <span>Structured Quranic discussions & essential dua reciting</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-8 border-t border-[#E5E1DA]">
              <a 
                href="#contact" 
                className="w-full inline-flex justify-center items-center bg-gold-accent hover:bg-gold-accent/90 text-[#FDFBF7] font-bold py-3 px-6 rounded transition text-sm shadow"
              >
                Inquire About Group Classes
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
