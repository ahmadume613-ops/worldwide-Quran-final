import React from 'react';
import { Mail, Phone, ShieldCheck, Database, Award } from 'lucide-react';

interface NavbarProps {
  onGoToStudio: () => void;
  currentView: 'website' | 'studio';
}

export default function Navbar({ onGoToStudio, currentView }: NavbarProps) {
  const contactEmail = "ahmadume613@gmail.com";
  const contactPhone = "+923345750157";
  const whatsappUrl = "https://wa.me/923345750157";

  return (
    <div id="navigation-wrapper" className="w-full bg-[#FDFBF7] border-b border-[#E5E1DA] sticky top-0 z-40">
      {/* Announcement & Quick Contact Bar */}
      <div id="top-announcement-bar" className="bg-emerald-deep text-white text-xs py-2.5 px-4 transition-all border-b border-gold-accent/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-gold-accent" />
            <span>Male & Female Teachers Available 24/7</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs">
            <a href={`mailto:${contactEmail}`} className="hover:text-gold-accent transition flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              <span>{contactEmail}</span>
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold-accent transition flex items-center gap-1 font-semibold">
              <Phone className="w-3.5 h-3.5 text-gold-accent" />
              <span>WhatsApp: {contactPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <nav id="main-nav" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Logo and Name */}
        <div className="flex items-center gap-3">
          <img 
            src="/src/assets/images/quran_academy_logo_1782168948648.jpg" 
            alt="Worldwide Quran Logo" 
            className="h-12 w-12 rounded-full object-cover border-2 border-gold-accent shadow-md shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="text-left">
            <span className="text-lg sm:text-xl font-extrabold text-emerald-deep tracking-tight block serif-font leading-none">WORLDWIDE QURAN</span>
            <span className="text-[9px] text-gold-accent tracking-widest uppercase font-bold block mt-1">International Academy & Learning Center</span>
          </div>
        </div>

        {/* Full-text Navigation Row (Always Visible, No Hamburger, No Three-dots) */}
        <div className="flex flex-wrap items-center justify-center gap-x-3.5 gap-y-2 sm:gap-x-5">
          <a href="#home" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-warm-text hover:text-gold-accent transition">Home</a>
          <a href="#class-formats" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-warm-text hover:text-gold-accent transition">1-on-1 Classes</a>
          <a href="#class-formats" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-warm-text hover:text-gold-accent transition">Group Classes</a>
          <a href="#courses" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-warm-text hover:text-gold-accent transition">Courses</a>
          <a href="#pricing" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-warm-text hover:text-gold-accent transition">Fee Structure</a>
          <a href="#blog" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-warm-text hover:text-gold-accent transition">Blog</a>
          <a href="#contact" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-warm-text hover:text-gold-accent transition">Contact</a>
        </div>
      </nav>
    </div>
  );
}
