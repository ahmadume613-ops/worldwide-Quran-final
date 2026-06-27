import React from 'react';
import { Mail, Phone, MapPin, Heart, Database, CheckCircle, ShieldCheck } from 'lucide-react';
import logoImg from '../assets/images/quran_academy_logo_1782168948648.jpg';

// Elegant circular SVG emblem with emerald-deep background and gold border/lettering as a premium fallback
const FALLBACK_LOGO = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%230D3E26' stroke='%23C5A880' stroke-width='4'/><text x='50%' y='58%' font-family='serif, system-ui' font-size='42' font-weight='bold' fill='%23C5A880' text-anchor='middle'>Q</text></svg>";

interface FooterProps {
  onGoToStudio: () => void;
}

export default function Footer({ onGoToStudio }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const contactEmail = "worldwidequrann@gmail.com";
  const contactPhone = "+923345750157";
  const whatsappUrl = "https://wa.me/923345750157";

  return (
    <footer id="footer-wrapper" className="bg-emerald-deep text-[#FDFBF7] border-t border-gold-accent/10">
      
      {/* Upper footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Col 1: Brand & Logo */}
        <div className="md:col-span-4 space-y-6">
          <div className="flex items-center gap-3">
            <img 
              src={logoImg} 
              alt="Worldwide Quran Logo" 
              className="h-14 w-14 rounded-full object-cover border-2 border-gold-accent shadow-sm"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = FALLBACK_LOGO;
              }}
            />
            <div>
              <span className="text-xl font-bold text-[#FDFBF7] block serif-font">WORLDWIDE QURAN</span>
              <span className="text-[10px] text-gold-accent tracking-widest uppercase font-semibold block mt-0.5">Academy & Learning Center</span>
            </div>
          </div>
          <p className="text-sm text-emerald-100/80 leading-relaxed font-light">
            Empowering kids and adult learners with professional interactive online Quran classes under expert management supervision. Our lessons are tailored for any speed, standard, and timezone.
          </p>
          <div className="p-3.5 bg-[#182F24] rounded border border-gold-accent/15 flex items-center gap-2 text-xs text-gold-accent font-semibold">
            <ShieldCheck className="w-4 h-4 text-gold-accent shrink-0" />
            <span>Male and Female Teachers are available!</span>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-[#FDFBF7] font-bold text-sm tracking-wide uppercase border-b border-[#182F24] pb-2 serif-font">Academic Sections</h4>
          <ul className="space-y-2 text-sm text-emerald-100/85">
            <li><a href="#home" className="hover:text-gold-accent transition">Academy Home</a></li>
            <li><a href="#courses" className="hover:text-gold-accent transition">Specialized Courses</a></li>
            <li><a href="#pricing" className="hover:text-gold-accent transition">Pricing Plans</a></li>
            <li><a href="#contact" className="hover:text-gold-accent transition">Enroll Now</a></li>
          </ul>
        </div>

        {/* Col 3: Student Helpline Contact */}
        <div className="md:col-span-5 space-y-4">
          <h4 className="text-[#FDFBF7] font-bold text-sm tracking-wide uppercase border-b border-[#182F24] pb-2 serif-font">Inquiries & Helpline</h4>
          <p className="text-sm text-emerald-100/80 font-light">Feel free to contact us via WhatsApp or email. The Academy Manager is always on call.</p>
          
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm">
              <span className="p-2 bg-[#182F24] rounded text-gold-accent border border-gold-accent/10"><Phone className="w-4 h-4" /></span>
              <div>
                <span className="text-emerald-300 text-[10px] block font-semibold uppercase">Official WhatsApp</span>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[#FDFBF7] hover:text-gold-accent hover:underline transition font-mono font-semibold">
                  {contactPhone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="p-2 bg-[#182F24] rounded text-gold-accent border border-gold-accent/10"><Mail className="w-4 h-4" /></span>
              <div>
                <span className="text-emerald-300 text-[10px] block font-semibold uppercase">Official Gmail</span>
                <a href={`mailto:${contactEmail}`} className="text-[#FDFBF7] hover:text-gold-accent hover:underline transition font-mono font-semibold break-all">
                  {contactEmail}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="p-2 bg-[#182F24] rounded text-gold-accent border border-gold-accent/10"><MapPin className="w-4 h-4" /></span>
              <div>
                <span className="text-emerald-300 text-[10px] block font-semibold uppercase">Headquarters</span>
                <span className="text-[#FDFBF7] font-light">Globally Online Academy</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Lower footer copyright bar */}
      <div className="bg-[#14261D] py-6 border-t border-[#182F24] text-xs text-emerald-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {currentYear} Worldwide Quran Academy. All Rights Reserved. Led by 15+ years expert teaching team.</p>
        </div>
      </div>

    </footer>
  );
}
