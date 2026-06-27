import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Terminal, 
  ArrowLeft, 
  Search, 
  Plus, 
  Trash2, 
  Save, 
  FileText, 
  Users, 
  Settings, 
  Play, 
  RefreshCw, 
  HelpCircle,
  CheckCircle,
  Eye,
  Star
} from 'lucide-react';
import { getCourses, saveCourses, getPricingPlans, savePricingPlans, getInquiries, saveInquiries, getTestimonials, saveTestimonials, SANITY_CONFIG } from '../sanityClient';
import { Course, PricingPlan, Inquiry, Testimonial } from '../types';

interface SanityStudioProps {
  onBackToWebsite: () => void;
}

export default function SanityStudio({ onBackToWebsite }: SanityStudioProps) {
  const [activeTool, setActiveTool] = useState<'desk' | 'vision'>('desk');
  
  // Data State loaded from Client
  const [courses, setCourses] = useState<Course[]>([]);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Studio Selection State
  const [selectedSchema, setSelectedSchema] = useState<'course' | 'pricing' | 'registrations' | 'testimonials'>('course');
  const [selectedDocId, setSelectedDocId] = useState<string>('');
  
  // Editor State
  const [editCourse, setEditCourse] = useState<Partial<Course> | null>(null);
  const [editPricing, setEditPricing] = useState<Partial<PricingPlan> | null>(null);
  const [editInquiry, setEditInquiry] = useState<Partial<Inquiry> | null>(null);
  const [editTestimonial, setEditTestimonial] = useState<Partial<Testimonial> | null>(null);

  // Vision Tool State
  const [groqQuery, setGroqQuery] = useState<string>('*[_type == "course"]');
  const [queryResult, setQueryResult] = useState<string>('// Run a query to see results');
  const [isQueryRunning, setIsQueryRunning] = useState<boolean>(false);

  // Toast status
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setCourses(getCourses());
    setPricingPlans(getPricingPlans());
    setInquiries(getInquiries());
    setTestimonials(getTestimonials());
  }, []);

  // Sync editor when document selection changes
  useEffect(() => {
    if (selectedSchema === 'course') {
      const doc = courses.find(c => c.id === selectedDocId);
      if (doc) {
        setEditCourse({ ...doc });
      } else if (courses.length > 0) {
        setSelectedDocId(courses[0].id);
        setEditCourse({ ...courses[0] });
      } else {
        setEditCourse(null);
      }
      setEditPricing(null);
      setEditInquiry(null);
      setEditTestimonial(null);
    } else if (selectedSchema === 'pricing') {
      const doc = pricingPlans.find(p => p.id === selectedDocId);
      if (doc) {
        setEditPricing({ ...doc });
      } else if (pricingPlans.length > 0) {
        setSelectedDocId(pricingPlans[0].id);
        setEditPricing({ ...pricingPlans[0] });
      } else {
        setEditPricing(null);
      }
      setEditCourse(null);
      setEditInquiry(null);
      setEditTestimonial(null);
    } else if (selectedSchema === 'registrations') {
      const doc = inquiries.find(i => i.id === selectedDocId);
      if (doc) {
        setEditInquiry({ ...doc });
      } else if (inquiries.length > 0) {
        setSelectedDocId(inquiries[0].id);
        setEditInquiry({ ...inquiries[0] });
      } else {
        setEditInquiry(null);
      }
      setEditCourse(null);
      setEditPricing(null);
      setEditTestimonial(null);
    } else if (selectedSchema === 'testimonials') {
      const doc = testimonials.find(t => t.id === selectedDocId);
      if (doc) {
        setEditTestimonial({ ...doc });
      } else if (testimonials.length > 0) {
        setSelectedDocId(testimonials[0].id);
        setEditTestimonial({ ...testimonials[0] });
      } else {
        setEditTestimonial(null);
      }
      setEditCourse(null);
      setEditPricing(null);
      setEditInquiry(null);
    }
  }, [selectedSchema, selectedDocId, courses, pricingPlans, inquiries, testimonials]);

  // Toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Save Actions
  const handleSaveCourse = () => {
    if (!editCourse || !editCourse.id) return;
    const updated = courses.map(c => c.id === editCourse.id ? (editCourse as Course) : c);
    setCourses(updated);
    saveCourses(updated);
    showToast(`Course "${editCourse.title}" successfully saved to production dataset!`);
  };

  const handleSavePricing = () => {
    if (!editPricing || !editPricing.id) return;
    const updated = pricingPlans.map(p => p.id === editPricing.id ? (editPricing as PricingPlan) : p);
    setPricingPlans(updated);
    savePricingPlans(updated);
    showToast(`Pricing Plan "${editPricing.name}" successfully saved!`);
  };

  const handleSaveTestimonial = () => {
    if (!editTestimonial || !editTestimonial.id) return;
    const updated = testimonials.map(t => t.id === editTestimonial.id ? (editTestimonial as Testimonial) : t);
    setTestimonials(updated);
    saveTestimonials(updated);
    showToast(`Testimonial for "${editTestimonial.name}" successfully saved!`);
  };

  const handleDeleteDoc = () => {
    if (selectedSchema === 'course') {
      const updated = courses.filter(c => c.id !== selectedDocId);
      setCourses(updated);
      saveCourses(updated);
      setSelectedDocId(updated[0]?.id || '');
      showToast('Course document deleted successfully');
    } else if (selectedSchema === 'pricing') {
      const updated = pricingPlans.filter(p => p.id !== selectedDocId);
      setPricingPlans(updated);
      savePricingPlans(updated);
      setSelectedDocId(updated[0]?.id || '');
      showToast('Pricing plan document deleted successfully');
    } else if (selectedSchema === 'registrations') {
      const updated = inquiries.filter(i => i.id !== selectedDocId);
      setInquiries(updated);
      saveInquiries(updated);
      setSelectedDocId(updated[0]?.id || '');
      showToast('Registration log deleted successfully');
    } else if (selectedSchema === 'testimonials') {
      const updated = testimonials.filter(t => t.id !== selectedDocId);
      setTestimonials(updated);
      saveTestimonials(updated);
      setSelectedDocId(updated[0]?.id || '');
      showToast('Testimonial document deleted successfully');
    }
  };

  const handleAddDocument = () => {
    if (selectedSchema === 'course') {
      const newDoc: Course = {
        id: `course-${Date.now()}`,
        title: 'New Course',
        urduTitle: 'نیا کورس',
        description: 'Describe your academy course here.',
        icon: 'BookOpen',
        badge: 'New'
      };
      const updated = [...courses, newDoc];
      setCourses(updated);
      saveCourses(updated);
      setSelectedDocId(newDoc.id);
      showToast('Created new Course draft document!');
    } else if (selectedSchema === 'pricing') {
      const newDoc: PricingPlan = {
        id: `plan-${Date.now()}`,
        name: 'New Custom Pricing Plan',
        priceUSD: '$29',
        pricePKR: '$25',
        billing: 'monthly',
        features: ['3 Classes per week', '24/7 Teacher support', 'Tajweed included'],
        isPopular: false,
        audience: 'international'
      };
      const updated = [...pricingPlans, newDoc];
      setPricingPlans(updated);
      savePricingPlans(updated);
      setSelectedDocId(newDoc.id);
      showToast('Created new Pricing Plan draft document!');
    } else if (selectedSchema === 'testimonials') {
      const newDoc: Testimonial = {
        id: `test-${Date.now()}`,
        name: 'New Muslim Student/Parent Name',
        role: 'Parent from Houston, USA',
        rating: 5,
        quote: 'This is an outstanding Quran Academy with highly professional tutors!'
      };
      const updated = [...testimonials, newDoc];
      setTestimonials(updated);
      saveTestimonials(updated);
      setSelectedDocId(newDoc.id);
      showToast('Created new Testimonial draft document!');
    }
  };

  // Vision GROQ Evaluator
  const runGroqQuery = () => {
    setIsQueryRunning(true);
    setTimeout(() => {
      const q = groqQuery.trim().toLowerCase();
      let resultData: any = null;

      if (q === '*' || q.includes('*[]') || q.includes('*[_type == "course"]') || q.includes('course')) {
        resultData = courses;
      } else if (q.includes('*[_type == "pricing"]') || q.includes('pricing')) {
        resultData = pricingPlans;
      } else if (q.includes('*[_type == "registrations"]') || q.includes('registrations') || q.includes('inquiry')) {
        resultData = inquiries;
      } else if (q.includes('*[_type == "testimonials"]') || q.includes('testimonials')) {
        resultData = testimonials;
      } else if (q.includes('config') || q.includes('project')) {
        resultData = SANITY_CONFIG;
      } else {
        resultData = {
          _warning: "Vision emulated query parsed successfully. No matching schema filters applied.",
          available_types: ["course", "pricing", "registrations", "testimonials"],
          all_documents_count: courses.length + pricingPlans.length + inquiries.length + testimonials.length
        };
      }

      setQueryResult(JSON.stringify(resultData, null, 2));
      setIsQueryRunning(false);
      showToast('GROQ Query executed successfully!');
    }, 450);
  };

  const getQueryPreset = (type: string) => {
    setGroqQuery(`*[_type == "${type}"] {\n  _id,\n  title,\n  "slug": slug.current\n}`);
  };

  return (
    <div id="sanity-studio-container" className="min-h-screen bg-[#1c1d21] text-[#f2f3f5] font-sans flex flex-col selection:bg-[#5c56df] selection:text-white">
      {/* Sanity Header */}
      <header className="bg-[#121316] border-b border-[#2d3039] h-12 flex items-center justify-between px-4 select-none">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded bg-red-500 flex items-center justify-center font-bold text-white text-xs">S</div>
            <span className="font-semibold text-sm tracking-wide text-white flex items-center gap-1.5">
              {SANITY_CONFIG.title} 
              <span className="text-[10px] px-1.5 py-0.5 bg-[#2a2c35] text-[#a5b4fc] border border-[#3e4251] rounded font-mono">
                {SANITY_CONFIG.dataset}
              </span>
            </span>
          </div>

          <div className="h-4 w-px bg-[#2d3039]" />

          <nav className="flex space-x-1">
            <button 
              id="tool-desk-btn"
              onClick={() => setActiveTool('desk')}
              className={`px-3 py-1 rounded text-xs font-medium transition ${activeTool === 'desk' ? 'bg-[#272930] text-white' : 'text-[#9ca3af] hover:text-white hover:bg-[#1a1b20]'}`}
            >
              <span className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" /> Desk
              </span>
            </button>
            <button 
              id="tool-vision-btn"
              onClick={() => setActiveTool('vision')}
              className={`px-3 py-1 rounded text-xs font-medium transition ${activeTool === 'vision' ? 'bg-[#272930] text-white' : 'text-[#9ca3af] hover:text-white hover:bg-[#1a1b20]'}`}
            >
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" /> Vision (GROQ)
              </span>
            </button>
          </nav>
        </div>

        {/* Studio controls */}
        <div className="flex items-center space-x-3">
          <div className="relative max-w-xs hidden md:block">
            <Search className="absolute left-2 top-2.5 w-3.5 h-3.5 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search documents..." 
              className="bg-[#21232a] text-xs text-white pl-8 pr-3 py-1.5 rounded w-52 border border-[#2d3039] focus:outline-none focus:border-[#4f46e5]"
            />
          </div>

          <button 
            id="back-website-btn"
            onClick={onBackToWebsite}
            className="flex items-center gap-1.5 bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-medium px-3 py-1.5 rounded transition shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Exit Studio
          </button>
        </div>
      </header>

      {/* Main Studio Area */}
      {activeTool === 'desk' ? (
        <div className="flex-1 flex overflow-hidden">
          
          {/* Desk Pane 1: Schemas */}
          <aside className="w-64 bg-[#121316] border-r border-[#2d3039] flex flex-col select-none">
            <div className="p-3 border-b border-[#2d3039]">
              <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">Content Schemas</span>
            </div>
            <nav className="flex-1 p-2 space-y-1">
              <button
                id="schema-course-btn"
                onClick={() => { setSelectedSchema('course'); setSelectedDocId(''); }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition ${selectedSchema === 'course' ? 'bg-[#222530] text-[#a5b4fc]' : 'text-[#9ca3af] hover:text-white hover:bg-[#18191e]'}`}
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span>Courses ({courses.length})</span>
                </span>
                <span className="text-[10px] bg-[#1e2026] px-1.5 py-0.5 rounded text-gray-400 border border-[#2d3039]">Live</span>
              </button>

              <button
                id="schema-pricing-btn"
                onClick={() => { setSelectedSchema('pricing'); setSelectedDocId(''); }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition ${selectedSchema === 'pricing' ? 'bg-[#222530] text-[#a5b4fc]' : 'text-[#9ca3af] hover:text-white hover:bg-[#18191e]'}`}
              >
                <span className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-blue-400" />
                  <span>Pricing Plans ({pricingPlans.length})</span>
                </span>
                <span className="text-[10px] bg-[#1e2026] px-1.5 py-0.5 rounded text-gray-400 border border-[#2d3039]">Live</span>
              </button>

              <button
                id="schema-registrations-btn"
                onClick={() => { setSelectedSchema('registrations'); setSelectedDocId(''); }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition ${selectedSchema === 'registrations' ? 'bg-[#222530] text-[#a5b4fc]' : 'text-[#9ca3af] hover:text-white hover:bg-[#18191e]'}`}
              >
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Registrations ({inquiries.length})</span>
                </span>
                {inquiries.length > 0 && (
                  <span className="text-[10px] bg-[#dc2626] text-white px-1.5 py-0.5 rounded-full font-semibold animate-pulse">
                    {inquiries.length}
                  </span>
                )}
              </button>

              <button
                id="schema-testimonials-btn"
                onClick={() => { setSelectedSchema('testimonials'); setSelectedDocId(''); }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition ${selectedSchema === 'testimonials' ? 'bg-[#222530] text-[#a5b4fc]' : 'text-[#9ca3af] hover:text-white hover:bg-[#18191e]'}`}
              >
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>Testimonials ({testimonials.length})</span>
                </span>
                <span className="text-[10px] bg-[#1e2026] px-1.5 py-0.5 rounded text-gray-400 border border-[#2d3039]">Live</span>
              </button>
            </nav>

            {/* Studio details */}
            <div className="p-3 bg-[#18191e] border-t border-[#2d3039] text-[10px] text-gray-400 space-y-1">
              <p>Project ID: <span className="font-mono text-white select-all">7z1epwzq</span></p>
              <p>Dataset: <span className="font-mono text-emerald-400">production</span></p>
              <p>Engine: <span className="text-gray-300">Sanity Desk v3.14 (Vite)</span></p>
            </div>
          </aside>

          {/* Desk Pane 2: Documents List */}
          <aside className="w-72 bg-[#17181d] border-r border-[#2d3039] flex flex-col">
            <div className="p-3 border-b border-[#2d3039] flex items-center justify-between bg-[#121316]">
              <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                {selectedSchema === 'course' ? 'Course' : selectedSchema === 'pricing' ? 'Pricing Plan' : selectedSchema === 'registrations' ? 'Registration' : 'Testimonial'} Documents
              </span>
              {selectedSchema !== 'registrations' && (
                <button
                  id="add-doc-btn"
                  onClick={handleAddDocument}
                  className="p-1 rounded bg-[#2b2e38] text-white hover:bg-[#4f46e5] transition"
                  title="Add new document"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {selectedSchema === 'course' && courses.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedDocId(c.id)}
                  className={`w-full text-left p-2.5 rounded transition ${selectedDocId === c.id ? 'bg-[#212431] border-l-2 border-[#4f46e5]' : 'hover:bg-[#1e2026]'}`}
                >
                  <div className="font-semibold text-xs text-white truncate">{c.title}</div>
                  <div className="text-[10px] text-gray-400 flex items-center justify-between mt-1">
                    <span className="font-mono text-purple-400">{c.urduTitle}</span>
                    <span className="bg-[#101114] px-1 rounded text-[9px] text-gray-500 font-mono">_id: {c.id.substring(0, 10)}</span>
                  </div>
                </button>
              ))}

              {selectedSchema === 'pricing' && pricingPlans.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedDocId(p.id)}
                  className={`w-full text-left p-2.5 rounded transition ${selectedDocId === p.id ? 'bg-[#212431] border-l-2 border-[#4f46e5]' : 'hover:bg-[#1e2026]'}`}
                >
                  <div className="font-semibold text-xs text-white truncate">{p.name}</div>
                  <div className="text-[10px] text-gray-400 flex items-center justify-between mt-1">
                    <span className="font-mono text-emerald-400">{p.priceUSD} / {p.pricePKR}</span>
                    <span className="bg-[#101114] px-1 rounded text-[9px] text-gray-500 font-mono">_id: {p.id.substring(0, 10)}</span>
                  </div>
                </button>
              ))}

              {selectedSchema === 'registrations' && inquiries.length === 0 && (
                <div className="p-4 text-center text-xs text-gray-500 mt-8">
                  No registrations received yet. Submit a registration on the homepage contact form to see it live!
                </div>
              )}

              {selectedSchema === 'registrations' && inquiries.map(i => (
                <button
                  key={i.id}
                  onClick={() => setSelectedDocId(i.id)}
                  className={`w-full text-left p-2.5 rounded transition ${selectedDocId === i.id ? 'bg-[#212431] border-l-2 border-[#4f46e5]' : 'hover:bg-[#1e2026]'}`}
                >
                  <div className="font-semibold text-xs text-white flex items-center justify-between">
                    <span className="truncate">{i.studentName}</span>
                    <span className="text-[9px] bg-emerald-950 text-emerald-400 px-1 py-0.2 rounded font-mono">New</span>
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1">
                    <div className="truncate text-gray-300">{i.courseInterest}</div>
                    <div className="flex justify-between mt-1 text-[9px] text-gray-500 font-mono">
                      <span>{new Date(i.createdAt).toLocaleTimeString()}</span>
                      <span>{i.phone}</span>
                    </div>
                  </div>
                </button>
              ))}

              {selectedSchema === 'testimonials' && testimonials.length === 0 && (
                <div className="p-4 text-center text-xs text-gray-500 mt-8">
                  No testimonials found. Click the + icon above to create one!
                </div>
              )}

              {selectedSchema === 'testimonials' && testimonials.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedDocId(t.id)}
                  className={`w-full text-left p-2.5 rounded transition ${selectedDocId === t.id ? 'bg-[#212431] border-l-2 border-[#4f46e5]' : 'hover:bg-[#1e2026]'}`}
                >
                  <div className="font-semibold text-xs text-white truncate">{t.name}</div>
                  <div className="text-[10px] text-gray-400 flex items-center justify-between mt-1">
                    <span className="truncate text-amber-400 font-medium">{t.role}</span>
                    <span className="bg-[#101114] px-1 rounded text-[9px] text-gray-500 font-mono">_id: {t.id.substring(0, 10)}</span>
                  </div>
                </button>
              ))}
            </div>
          </aside>

          {/* Desk Pane 3: Document Form Editor */}
          <main className="flex-1 bg-[#1e2026] overflow-y-auto flex flex-col">
            {selectedDocId ? (
              <div className="flex-1 flex flex-col">
                {/* Editor Header */}
                <div className="bg-[#121316] p-3 border-b border-[#2d3039] flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-[#a5b4fc] font-semibold font-mono">Document:_id/{selectedDocId}</span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded">Published</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedSchema !== 'registrations' && (
                      <button
                        id="save-doc-btn"
                        onClick={selectedSchema === 'course' ? handleSaveCourse : selectedSchema === 'pricing' ? handleSavePricing : selectedSchema === 'testimonials' ? handleSaveTestimonial : () => {}}
                        className="flex items-center gap-1 bg-[#22c55e] hover:bg-[#16a34a] text-white text-xs px-3 py-1.5 rounded transition font-medium"
                      >
                        <Save className="w-3.5 h-3.5" /> Publish to Dataset
                      </button>
                    )}
                    <button
                      id="delete-doc-btn"
                      onClick={handleDeleteDoc}
                      className="p-1.5 rounded bg-[#2b2e38] text-[#f87171] hover:bg-[#dc2626] hover:text-white transition"
                      title="Delete document"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Form Elements */}
                <div className="p-6 max-w-3xl w-full mx-auto space-y-5">
                  {selectedSchema === 'course' && editCourse && (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1">Course ID (ReadOnly)</label>
                        <input 
                          type="text" 
                          value={editCourse.id || ''} 
                          disabled 
                          className="w-full bg-[#121316] text-[#71717a] text-xs px-3 py-2 rounded border border-[#2d3039] font-mono cursor-not-allowed"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-1">Course Name (English)</label>
                          <input 
                            type="text" 
                            value={editCourse.title || ''} 
                            onChange={(e) => setEditCourse({ ...editCourse, title: e.target.value })}
                            className="w-full bg-[#121316] text-white text-xs px-3 py-2 rounded border border-[#2d3039] focus:outline-none focus:border-[#4f46e5]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-1">Urdu Subtitle (Arabic Script)</label>
                          <input 
                            type="text" 
                            dir="rtl"
                            value={editCourse.urduTitle || ''} 
                            onChange={(e) => setEditCourse({ ...editCourse, urduTitle: e.target.value })}
                            className="w-full bg-[#121316] text-white text-xs px-3 py-2 rounded border border-[#2d3039] focus:outline-none focus:border-[#4f46e5] font-mono text-right"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-1">Lucide Icon Key</label>
                          <input 
                            type="text" 
                            value={editCourse.icon || ''} 
                            onChange={(e) => setEditCourse({ ...editCourse, icon: e.target.value })}
                            className="w-full bg-[#121316] text-white text-xs px-3 py-2 rounded border border-[#2d3039] focus:outline-none focus:border-[#4f46e5] font-mono"
                          />
                          <p className="text-[10px] text-gray-500 mt-1">Available: BookOpen, BookOpenCheck, BookCheck, GraduationCap, Award, HeartHandshake, Sparkles</p>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-1">Course Badge</label>
                          <input 
                            type="text" 
                            value={editCourse.badge || ''} 
                            onChange={(e) => setEditCourse({ ...editCourse, badge: e.target.value })}
                            className="w-full bg-[#121316] text-white text-xs px-3 py-2 rounded border border-[#2d3039] focus:outline-none focus:border-[#4f46e5]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Course Description</label>
                        <textarea 
                          rows={4}
                          value={editCourse.description || ''} 
                          onChange={(e) => setEditCourse({ ...editCourse, description: e.target.value })}
                          className="w-full bg-[#121316] text-white text-xs px-3 py-2 rounded border border-[#2d3039] focus:outline-none focus:border-[#4f46e5]"
                        />
                      </div>
                    </>
                  )}

                  {selectedSchema === 'pricing' && editPricing && (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1">Document ID (ReadOnly)</label>
                        <input 
                          type="text" 
                          value={editPricing.id || ''} 
                          disabled 
                          className="w-full bg-[#121316] text-[#71717a] text-xs px-3 py-2 rounded border border-[#2d3039] font-mono cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Plan Name</label>
                        <input 
                          type="text" 
                          value={editPricing.name || ''} 
                          onChange={(e) => setEditPricing({ ...editPricing, name: e.target.value })}
                          className="w-full bg-[#121316] text-white text-xs px-3 py-2 rounded border border-[#2d3039] focus:outline-none focus:border-[#4f46e5]"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-1">Price (USD)</label>
                          <input 
                            type="text" 
                            value={editPricing.priceUSD || ''} 
                            onChange={(e) => setEditPricing({ ...editPricing, priceUSD: e.target.value })}
                            className="w-full bg-[#121316] text-white text-xs px-3 py-2 rounded border border-[#2d3039] focus:outline-none focus:border-[#4f46e5]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-1">Promo/Discounted Price</label>
                          <input 
                            type="text" 
                            value={editPricing.pricePKR || ''} 
                            onChange={(e) => setEditPricing({ ...editPricing, pricePKR: e.target.value })}
                            className="w-full bg-[#121316] text-white text-xs px-3 py-2 rounded border border-[#2d3039] focus:outline-none focus:border-[#4f46e5]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-1">Billing cycle</label>
                          <input 
                            type="text" 
                            value={editPricing.billing || ''} 
                            onChange={(e) => setEditPricing({ ...editPricing, billing: e.target.value })}
                            className="w-full bg-[#121316] text-white text-xs px-3 py-2 rounded border border-[#2d3039] focus:outline-none focus:border-[#4f46e5]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-1">Target Audience</label>
                          <select 
                            value={editPricing.audience || 'international'} 
                            onChange={(e) => setEditPricing({ ...editPricing, audience: e.target.value as any })}
                            className="w-full bg-[#121316] text-white text-xs px-3 py-2 rounded border border-[#2d3039] focus:outline-none focus:border-[#4f46e5]"
                          >
                            <option value="international">International Students</option>
                            <option value="local">Custom Cohort Plan</option>
                            <option value="all">All Audiences</option>
                          </select>
                        </div>
                        <div className="flex items-center pt-6">
                          <input 
                            id="popular-checkbox"
                            type="checkbox" 
                            checked={editPricing.isPopular || false} 
                            onChange={(e) => setEditPricing({ ...editPricing, isPopular: e.target.checked })}
                            className="w-4 h-4 bg-[#121316] border-[#2d3039] text-[#4f46e5] rounded focus:ring-0 focus:ring-offset-0"
                          />
                          <label htmlFor="popular-checkbox" className="ml-2 text-xs font-semibold text-gray-300 select-none">Mark as Highly Popular Plan</label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Features (One per line)</label>
                        <textarea 
                          rows={6}
                          value={editPricing.features?.join('\n') || ''} 
                          onChange={(e) => setEditPricing({ ...editPricing, features: e.target.value.split('\n') })}
                          className="w-full bg-[#121316] text-white text-xs px-3 py-2 rounded border border-[#2d3039] focus:outline-none focus:border-[#4f46e5] font-mono leading-relaxed"
                        />
                      </div>
                    </>
                  )}

                  {selectedSchema === 'registrations' && editInquiry && (
                    <div className="space-y-4">
                      <div className="p-4 bg-[#121316] rounded border border-emerald-950 flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                        <div>
                          <div className="text-xs font-semibold text-white">Interactive Registration Log File</div>
                          <div className="text-[10px] text-gray-400">Captured from public online landing page form submission. Read-Only database log.</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 mb-1">Student Full Name</label>
                          <p className="p-2.5 bg-[#121316] text-white text-xs rounded border border-[#2d3039] font-medium">{editInquiry.studentName}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 mb-1">Parent/Guardian Name</label>
                          <p className="p-2.5 bg-[#121316] text-white text-xs rounded border border-[#2d3039] font-medium">{editInquiry.parentName || 'N/A'}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 mb-1">WhatsApp Contact Number</label>
                          <a href={`tel:${editInquiry.phone}`} className="p-2.5 bg-[#121316] text-emerald-400 hover:underline text-xs rounded border border-[#2d3039] font-mono block font-medium">{editInquiry.phone}</a>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 mb-1">Email Address</label>
                          <a href={`mailto:${editInquiry.email}`} className="p-2.5 bg-[#121316] text-indigo-400 hover:underline text-xs rounded border border-[#2d3039] font-mono block font-medium">{editInquiry.email}</a>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 mb-1">Student Age Group</label>
                          <p className="p-2.5 bg-[#121316] text-white text-xs rounded border border-[#2d3039] font-medium">{editInquiry.ageGroup}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 mb-1">Syllabus / Course Interest</label>
                          <p className="p-2.5 bg-[#121316] text-white text-xs rounded border border-[#2d3039] font-medium">{editInquiry.courseInterest}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 mb-1">Preferred Format</label>
                          <p className="p-2.5 bg-[#121316] text-white text-xs rounded border border-[#2d3039] font-medium">{editInquiry.preferredFormat || 'Private 1-on-1 Classes'}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 mb-1">Preferred Days</label>
                          <p className="p-2.5 bg-[#121316] text-white text-xs rounded border border-[#2d3039] font-medium">{editInquiry.preferredDays || '5 Days a Week'}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 mb-1">Preferred Study Slot</label>
                          <p className="p-2.5 bg-[#121316] text-white text-xs rounded border border-[#2d3039] font-medium">{editInquiry.preferredTime}</p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1">Student Message or Request Details</label>
                        <p className="p-3 bg-[#121316] text-white text-xs rounded border border-[#2d3039] leading-relaxed select-text whitespace-pre-wrap">{editInquiry.message || 'No additional message was provided.'}</p>
                      </div>

                      <div className="pt-4 border-t border-[#2d3039] text-[10px] text-gray-500 font-mono">
                        Submission timestamp: {editInquiry.createdAt ? new Date(editInquiry.createdAt).toLocaleString() : 'N/A'}
                      </div>
                    </div>
                  )}

                  {selectedSchema === 'testimonials' && editTestimonial && (
                    <div className="space-y-4">
                      <div className="p-4 bg-[#121316] rounded border border-amber-950 flex items-center gap-3">
                        <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                        <div>
                          <div className="text-xs font-semibold text-white">Interactive Testimonial Document</div>
                          <div className="text-[10px] text-gray-400">Edits here reflect immediately in the customer reviews section on the homepage.</div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1">Document ID (ReadOnly)</label>
                        <input 
                          type="text" 
                          value={editTestimonial.id || ''} 
                          disabled 
                          className="w-full bg-[#121316] text-[#71717a] text-xs px-3 py-2 rounded border border-[#2d3039] font-mono cursor-not-allowed"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-1">Author Name</label>
                          <input 
                            type="text" 
                            value={editTestimonial.name || ''} 
                            onChange={(e) => setEditTestimonial({ ...editTestimonial, name: e.target.value })}
                            className="w-full bg-[#121316] text-white text-xs px-3 py-2 rounded border border-[#2d3039] focus:outline-none focus:border-[#4f46e5]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-1">Role / Designation (e.g., Parent from Toronto)</label>
                          <input 
                            type="text" 
                            value={editTestimonial.role || ''} 
                            onChange={(e) => setEditTestimonial({ ...editTestimonial, role: e.target.value })}
                            className="w-full bg-[#121316] text-white text-xs px-3 py-2 rounded border border-[#2d3039] focus:outline-none focus:border-[#4f46e5]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Star Rating (1-5)</label>
                        <select
                          value={editTestimonial.rating || 5}
                          onChange={(e) => setEditTestimonial({ ...editTestimonial, rating: parseInt(e.target.value) })}
                          className="w-full bg-[#121316] text-white text-xs px-3 py-2 rounded border border-[#2d3039] focus:outline-none focus:border-[#4f46e5]"
                        >
                          <option value={5}>5 Stars (Excellent)</option>
                          <option value={4}>4 Stars (Very Good)</option>
                          <option value={3}>3 Stars (Average)</option>
                          <option value={2}>2 Stars (Poor)</option>
                          <option value={1}>1 Star (Very Poor)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Quote Text</label>
                        <textarea 
                          rows={4}
                          value={editTestimonial.quote || ''} 
                          onChange={(e) => setEditTestimonial({ ...editTestimonial, quote: e.target.value })}
                          className="w-full bg-[#121316] text-white text-xs px-3 py-2 rounded border border-[#2d3039] focus:outline-none focus:border-[#4f46e5] leading-relaxed"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-500">
                <Database className="w-12 h-12 text-gray-600 mb-3" />
                <h3 className="font-semibold text-sm text-white">No Document Selected</h3>
                <p className="text-xs max-w-sm mt-1">Please select a schema and document on the left panel to begin reviewing or publishing edits.</p>
              </div>
            )}
          </main>
        </div>
      ) : (
        /* Vision (GROQ Playground) Tool layout */
        <div className="flex-1 flex overflow-hidden">
          {/* Query Pane */}
          <section className="w-1/2 bg-[#17181d] border-r border-[#2d3039] flex flex-col p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">Query Editor (GROQ)</span>
              <div className="flex space-x-2">
                <button
                  id="preset-course-btn"
                  onClick={() => getQueryPreset('course')}
                  className="px-2 py-0.5 rounded bg-[#2b2e38] text-[10px] text-gray-300 hover:text-white transition"
                >
                  Courses
                </button>
                <button
                  id="preset-pricing-btn"
                  onClick={() => getQueryPreset('pricing')}
                  className="px-2 py-0.5 rounded bg-[#2b2e38] text-[10px] text-gray-300 hover:text-white transition"
                >
                  Pricing
                </button>
                <button
                  id="preset-registrations-btn"
                  onClick={() => getQueryPreset('registrations')}
                  className="px-2 py-0.5 rounded bg-[#2b2e38] text-[10px] text-gray-300 hover:text-white transition"
                >
                  Registrations
                </button>
                <button
                  id="preset-testimonials-btn"
                  onClick={() => getQueryPreset('testimonials')}
                  className="px-2 py-0.5 rounded bg-[#2b2e38] text-[10px] text-gray-300 hover:text-white transition"
                >
                  Testimonials
                </button>
              </div>
            </div>

            <div className="flex-1 bg-[#121316] rounded border border-[#2d3039] flex flex-col overflow-hidden font-mono text-xs">
              <div className="bg-[#18191e] px-3 py-1.5 border-b border-[#2d3039] text-[10px] text-gray-400 flex items-center justify-between select-none">
                <span>query.groq</span>
                <span className="text-indigo-400">worldwide Quran db</span>
              </div>
              <textarea 
                rows={10}
                value={groqQuery}
                onChange={(e) => setGroqQuery(e.target.value)}
                className="flex-1 w-full bg-[#121316] text-[#b4c6e7] p-3 focus:outline-none resize-none leading-relaxed font-mono"
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="text-[10px] text-gray-500 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" /> Protip: *[_type == "course"] filters courses
              </div>
              <button
                id="run-query-btn"
                onClick={runGroqQuery}
                disabled={isQueryRunning}
                className="flex items-center gap-1.5 bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-semibold px-4 py-2 rounded transition shadow-md cursor-pointer disabled:opacity-50"
              >
                {isQueryRunning ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Querying...
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" /> Execute GROQ
                  </>
                )}
              </button>
            </div>
          </section>

          {/* Results Pane */}
          <section className="w-1/2 bg-[#1e2026] flex flex-col p-4 overflow-hidden">
            <span className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-4 block">Query Result (JSON)</span>
            <div className="flex-1 bg-[#121316] rounded border border-[#2d3039] flex flex-col overflow-hidden font-mono text-xs">
              <div className="bg-[#18191e] px-3 py-1.5 border-b border-[#2d3039] text-[10px] text-gray-400 flex items-center justify-between select-none">
                <span>result.json</span>
                <span>{isQueryRunning ? 'RUNNING' : 'IDLE'}</span>
              </div>
              <pre className="flex-1 p-3 text-emerald-400 overflow-auto select-text selection:bg-[#4f46e5]/30 selection:text-white leading-relaxed font-mono">
                {queryResult}
              </pre>
            </div>
          </section>
        </div>
      )}

      {/* Floating Status Toast */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-[#212431] text-white text-xs py-2.5 px-4 rounded border-l-4 border-[#22c55e] shadow-2xl z-50 flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4 text-[#22c55e]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
