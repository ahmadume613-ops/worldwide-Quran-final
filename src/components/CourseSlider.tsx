import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  BookOpenCheck, 
  BookCheck, 
  GraduationCap, 
  Award, 
  HeartHandshake, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { getCourses } from '../sanityClient';
import { Course } from '../types';

export default function CourseSlider() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Load courses on mount
  useEffect(() => {
    setCourses(getCourses());
  }, []);

  // Auto-play interval
  useEffect(() => {
    if (!isAutoPlaying || courses.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % courses.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, courses]);

  if (courses.length === 0) return null;

  const currentCourse = courses[currentIndex];

  // Map icon strings to Lucide components
  const renderIcon = (iconName: string) => {
    const iconClass = "w-7 h-7 text-gold-accent";
    switch (iconName) {
      case 'BookOpenCheck':
        return <BookOpenCheck className={iconClass} />;
      case 'BookCheck':
        return <BookCheck className={iconClass} />;
      case 'GraduationCap':
        return <GraduationCap className={iconClass} />;
      case 'Award':
        return <Award className={iconClass} />;
      case 'HeartHandshake':
        return <HeartHandshake className={iconClass} />;
      case 'Sparkles':
        return <Sparkles className={iconClass} />;
      default:
        return <BookOpen className={iconClass} />;
    }
  };

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % courses.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + courses.length) % courses.length);
  };

  return (
    <section id="courses" className="py-16 bg-emerald-deep text-[#FDFBF7] relative overflow-hidden select-none border-b border-[#E5E1DA]">
      {/* Background visual arches */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#A4864A_1px,transparent_1px)] [background-size:16px_16px] -z-10" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-gold-accent rounded-full blur-3xl opacity-10 -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-emerald-deep rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-gold-accent tracking-widest uppercase block mb-3 font-sans">Our Comprehensive Curriculum</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#FDFBF7] serif-font">
            7 Specific Core Quran Syllabus Courses
          </h2>
          <div className="h-1 w-20 bg-gold-accent mx-auto rounded-full mt-4" />
        </div>

        {/* Carousel Container */}
        <div className="relative bg-[#234333] rounded border border-gold-accent/20 shadow-xl p-6 sm:p-10 lg:p-12 overflow-hidden min-h-[420px] flex flex-col justify-between">
          
          {/* Top metadata */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-[10px] font-bold tracking-widest uppercase bg-[#182F24] text-gold-accent px-3 py-1 rounded border border-[#14261D]">
              {currentCourse.badge || 'Academic Syllabus'}
            </span>
            <span className="text-xs font-mono text-emerald-200 font-semibold">
              Course {currentIndex + 1} of {courses.length}
            </span>
          </div>

          {/* Active Course Info */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1 my-4">
            
            {/* Left Content */}
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#182F24] rounded-xl shadow-inner border border-gold-accent/15">
                  {renderIcon(currentCourse.icon)}
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FDFBF7] tracking-tight serif-font">{currentCourse.title}</h3>
                  <p className="text-xs text-gold-accent font-semibold mt-0.5 uppercase tracking-wider">With professional certified guidance</p>
                </div>
              </div>

              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed pt-2 font-light">
                {currentCourse.description}
              </p>
            </div>

            {/* Right Calligraphic / Visual subtitle */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-[#182F24] rounded border border-gold-accent/10 text-center relative h-40">
              <div className="absolute top-2 right-3 text-[9px] text-emerald-400 font-bold uppercase tracking-widest">Arabic Syllabus</div>
              {/* Beautiful Urdu Arabic Font presentation */}
              <span className="text-3xl sm:text-4xl font-extrabold text-gold-accent drop-shadow-[0_2px_10px_rgba(164,134,74,0.2)] font-serif" dir="rtl">
                {currentCourse.urduTitle}
              </span>
              <span className="text-[10px] text-emerald-300 font-medium tracking-wider uppercase mt-4 block border-t border-[#234333] pt-1.5 w-1/2">
                Urdu Subtitle
              </span>
            </div>

          </div>

          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-4 border-t border-[#182F24]">
            {/* Slider Dots indicators */}
            <div className="flex items-center gap-2">
              {courses.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setIsAutoPlaying(false); setCurrentIndex(idx); }}
                  className={`h-2.5 rounded-full transition-all ${idx === currentIndex ? 'w-8 bg-gold-accent' : 'w-2.5 bg-[#182F24] hover:bg-[#1C3629]'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Sliding buttons */}
            <div className="flex items-center gap-3">
              <button
                id="slider-prev-btn"
                onClick={prevSlide}
                className="p-3 rounded-full bg-[#182F24] hover:bg-[#1C3629] border border-gold-accent/20 text-white transition shadow hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                title="Previous Course"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <a 
                href="#contact" 
                className="bg-gold-accent hover:bg-gold-accent/90 text-white font-bold px-5 py-2.5 rounded transition text-xs uppercase flex items-center gap-1.5 shadow"
              >
                <span>Enroll in Course</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <button
                id="slider-next-btn"
                onClick={nextSlide}
                className="p-3 rounded-full bg-[#182F24] hover:bg-[#1C3629] border border-gold-accent/20 text-white transition shadow hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                title="Next Course"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

        {/* Informational tip */}
        <div className="text-center text-xs text-emerald-200/80 mt-6 select-text">
          💡 Want to customize these courses? Enter our <span className="font-semibold text-gold-accent">Sanity Studio</span> via the button in the header to modify names, descriptions, or subtitles instantly!
        </div>

      </div>
    </section>
  );
}
