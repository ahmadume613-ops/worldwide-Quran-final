import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ClassFormats from './components/ClassFormats';
import CourseSlider from './components/CourseSlider';
import PricingSection from './components/PricingSection';
import BlogSection from './components/BlogSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import SanityStudio from './components/SanityStudio';

export default function App() {
  const [currentView, setCurrentView] = useState<'website' | 'studio'>('website');
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  // Handle routing via hash & pathname
  useEffect(() => {
    const handleRouteCheck = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;

      if (hash === '#/studio' || hash === '#studio' || path === '/studio') {
        setCurrentView('studio');
        // Smooth scroll to top when opening studio
        window.scrollTo({ top: 0 });
      } else {
        setCurrentView('website');
      }
    };

    // Run on mount
    handleRouteCheck();

    // Listen for hash modifications
    window.addEventListener('hashchange', handleRouteCheck);
    
    // Support click-to-nav for popstate
    window.addEventListener('popstate', handleRouteCheck);

    return () => {
      window.removeEventListener('hashchange', handleRouteCheck);
      window.removeEventListener('popstate', handleRouteCheck);
    };
  }, []);

  const handleGoToStudio = () => {
    window.location.hash = '/studio';
    setCurrentView('studio');
    window.scrollTo({ top: 0 });
  };

  const handleBackToWebsite = () => {
    window.location.hash = '';
    // If the path was literal /studio, let's redirect to main root
    if (window.location.pathname === '/studio') {
      window.history.pushState({}, '', '/');
    }
    setCurrentView('website');
    window.scrollTo({ top: 0 });
  };

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    // Smooth scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Render Router
  if (currentView === 'studio') {
    return (
      <SanityStudio onBackToWebsite={handleBackToWebsite} />
    );
  }

  return (
    <div id="website-app-root" className="min-h-screen bg-[#FDFBF7] font-sans text-[#2D312A] flex flex-col justify-between selection:bg-gold-accent/20 selection:text-emerald-deep relative">
      {/* Standard Header */}
      <Navbar onGoToStudio={handleGoToStudio} currentView={currentView} />
      
      {/* Main Page Layout */}
      <main id="main-content">
        <Hero />
        
        <ClassFormats />
        
        <CourseSlider />
        
        <PricingSection onSelectPlan={handleSelectPlan} />

        <BlogSection />
        
        <ContactForm preSelectedPlan={selectedPlan} />
      </main>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/923345750157"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-2xl z-50 transition-all transform hover:scale-110 flex items-center justify-center border border-white/15"
        title="Chat on WhatsApp"
        id="floating-whatsapp-btn"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.454L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 1.981 14.114.957 11.487.957c-5.44 0-9.866 4.372-9.87 9.802 0 1.772.465 3.504 1.346 5.03L1.904 21.8l6.127-1.597.108.064c1.559.924 3.125 1.411 4.708 1.411z" />
        </svg>
      </a>

      {/* Footer Section */}
      <Footer onGoToStudio={handleGoToStudio} />
    </div>
  );
}
