import React, { useState, useEffect } from 'react';
import { Mail, Phone, Clock, Send, CheckCircle, ShieldCheck, UserCheck, Star, Quote } from 'lucide-react';
import { addInquiry, getTestimonials } from '../sanityClient';
import emailjs from '@emailjs/browser';

// ==========================================================
// EMAILJS CONFIGURATION PLACEHOLDERS
// ==========================================================
// Replace these empty strings with your actual EmailJS credentials:
// 1. Service ID (e.g. 'service_xxxxxx')
// 2. Template ID (e.g. 'template_xxxxxx')
// 3. Public Key (e.g. 'your_public_key_here')
//
// Note: You can also enter them directly in the "EmailJS Settings"
// interactive panel at the bottom of the form on the live website.
// ==========================================================
const EMAILJS_SERVICE_ID_PLACEHOLDER = ""; 
const EMAILJS_TEMPLATE_ID_PLACEHOLDER = "";
const EMAILJS_PUBLIC_KEY_PLACEHOLDER = "";

interface ContactFormProps {
  preSelectedPlan?: string;
}

export default function ContactForm({ preSelectedPlan }: ContactFormProps) {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    email: '',
    ageGroup: 'Kids (Ages 4-12)',
    courseInterest: 'Madani Qaidah (مدنی قاعده)',
    preferredFormat: 'Private 1-on-1 Classes',
    preferredDays: '5 Days a Week',
    preferredTime: 'Afternoon Slots',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [testimonials, setTestimonials] = useState<any[]>([]);

  // EmailJS dynamic state configuration
  const [emailJsConfig, setEmailJsConfig] = useState({
    serviceId: localStorage.getItem('emailjs_service_id') || EMAILJS_SERVICE_ID_PLACEHOLDER,
    templateId: localStorage.getItem('emailjs_template_id') || EMAILJS_TEMPLATE_ID_PLACEHOLDER,
    publicKey: localStorage.getItem('emailjs_public_key') || EMAILJS_PUBLIC_KEY_PLACEHOLDER,
  });
  const [showDeveloperPanel, setShowDeveloperPanel] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'success' | 'skipped' | 'error'>('idle');

  // Load testimonials on mount
  useEffect(() => {
    setTestimonials(getTestimonials());
  }, []);

  // Sync preSelectedPlan if provided
  useEffect(() => {
    if (preSelectedPlan) {
      // Determine format from plan name if possible
      const format = preSelectedPlan.toLowerCase().includes('group') 
        ? 'Group Classes' 
        : 'Private 1-on-1 Classes';

      let days = '5 Days a Week';
      const lowercasePlan = preSelectedPlan.toLowerCase();
      if (lowercasePlan.includes('4 or 5') || lowercasePlan.includes('5 days')) {
        days = '5 Days a Week';
      } else if (lowercasePlan.includes('3 days')) {
        days = '3 Days a Week';
      } else if (lowercasePlan.includes('2 days')) {
        days = '2 Days a Week';
      } else if (lowercasePlan.includes('weekend')) {
        days = 'Weekend Only';
      }

      setFormData(prev => ({
        ...prev,
        courseInterest: `Plan Interest: ${preSelectedPlan}`,
        preferredFormat: format,
        preferredDays: days,
        message: `I am interested in signing up for the free trial of the "${preSelectedPlan}".`
      }));
    }
  }, [preSelectedPlan]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.phone || !formData.email || !formData.preferredFormat || !formData.preferredDays) {
      setValidationError("Please fill in all mandatory fields (Name, Phone, Email, Preferred Format, and Preferred Days).");
      return;
    }

    setValidationError('');
    setIsSubmitting(true);
    setEmailStatus('idle');

    // 1. Save to our emulated Sanity/local state
    addInquiry({
      studentName: formData.studentName,
      parentName: formData.parentName || undefined,
      phone: formData.phone,
      email: formData.email,
      ageGroup: formData.ageGroup,
      courseInterest: formData.courseInterest,
      preferredFormat: formData.preferredFormat,
      preferredDays: formData.preferredDays,
      preferredTime: formData.preferredTime,
      message: formData.message
    });

    // 2. Deliver via EmailJS to owner's Gmail if credentials are configured
    const { serviceId, templateId, publicKey } = emailJsConfig;
    if (serviceId && templateId && publicKey) {
      try {
        const templateParams = {
          student_name: formData.studentName,
          parent_name: formData.parentName || 'N/A',
          whatsapp_number: formData.phone,
          student_email: formData.email,
          age_group: formData.ageGroup,
          selected_course: formData.courseInterest,
          preferred_format: formData.preferredFormat,
          preferred_days: formData.preferredDays,
          preferred_time: formData.preferredTime,
          message: formData.message || 'No additional message.'
        };

        await emailjs.send(serviceId, templateId, templateParams, publicKey);
        setEmailStatus('success');
      } catch (err: any) {
        console.error('EmailJS Delivery Failed:', err);
        setEmailStatus('error');
      }
    } else {
      console.log('EmailJS skipped (credentials empty/not configured). Configured in placeholders or interactive Developer panel.');
      setEmailStatus('skipped');
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      studentName: '',
      parentName: '',
      phone: '',
      email: '',
      ageGroup: 'Kids (Ages 4-12)',
      courseInterest: 'Madani Qaidah (مدنی قاعده)',
      preferredFormat: 'Private 1-on-1 Classes',
      preferredDays: '5 Days a Week',
      preferredTime: 'Afternoon Slots',
      message: ''
    });
    setValidationError('');
    setIsSubmitted(false);
    setEmailStatus('idle');
  };

  const contactEmail = "worldwidequrann@gmail.com";
  const contactPhone = "+923345750157";
  const whatsappUrl = "https://wa.me/923345750157";

  return (
    <section id="contact" className="py-16 bg-[#F5F2ED] relative border-b border-[#E5E1DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold text-[#A4864A] tracking-widest uppercase block mb-3 font-sans">Begin Your Journey</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D312A] tracking-tight serif-font">
            Apply For A 100% Free Trial Class
          </h2>
          <p className="text-warm-text/80 mt-3 text-sm sm:text-base leading-relaxed font-light">
            Fill out this quick form. Our Academy Manager will reach out to you within 2-4 hours to schedule your introductory webinar and trial class!
          </p>
          <div className="h-1 w-20 bg-gold-accent mx-auto rounded-full mt-5" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* Contact Left: Quick Info */}
          <div className="lg:col-span-5 bg-emerald-deep text-[#FDFBF7] rounded p-8 sm:p-10 flex flex-col justify-between shadow-xl relative overflow-hidden border border-gold-accent/20">
            {/* Overlay background decorations */}
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-[#234333]/60 rounded-full blur-2xl" />
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-gold-accent/15 rounded-full blur-2xl" />

            <div className="space-y-8 relative z-10">
              <div>
                <h3 className="text-2xl font-bold text-[#FDFBF7] tracking-tight serif-font">Direct Academy Contacts</h3>
                <p className="text-[#E5E1DA] text-xs sm:text-sm mt-1">Available for student inquiries globally via WhatsApp or Email.</p>
              </div>

              <div className="space-y-6">
                {/* WhatsApp Chat Card */}
                <div className="flex items-start gap-4 p-4 bg-[#182F24] rounded border border-gold-accent/15">
                  <span className="p-3 bg-gold-accent text-white rounded shadow-md shrink-0"><Phone className="w-5 h-5" /></span>
                  <div>
                    <span className="text-xs text-gold-accent block font-semibold uppercase tracking-wider">Official WhatsApp</span>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-[#FDFBF7] hover:underline hover:text-gold-accent transition font-mono block mt-1">
                      {contactPhone}
                    </a>
                    <span className="text-[10px] text-emerald-300 mt-1 block">Click to open instant WhatsApp Chat</span>
                  </div>
                </div>

                {/* Gmail Card */}
                <div className="flex items-start gap-4 p-4 bg-[#182F24] rounded border border-gold-accent/15">
                  <span className="p-3 bg-gold-accent text-white rounded shadow-md shrink-0"><Mail className="w-5 h-5" /></span>
                  <div>
                    <span className="text-xs text-gold-accent block font-semibold uppercase tracking-wider">Official Email</span>
                    <a href={`mailto:${contactEmail}`} className="text-sm sm:text-base font-bold text-[#FDFBF7] hover:underline hover:text-gold-accent transition font-mono block mt-1 break-all">
                      {contactEmail}
                    </a>
                    <span className="text-[10px] text-emerald-300 mt-1 block">Send email for syllabus or custom plan details</span>
                  </div>
                </div>

                {/* Timing Slot Card */}
                <div className="flex items-start gap-4 p-4 bg-[#182F24] rounded border border-gold-accent/15">
                  <span className="p-3 bg-gold-accent text-white rounded shadow-md shrink-0"><Clock className="w-5 h-5" /></span>
                  <div>
                    <span className="text-xs text-gold-accent block font-semibold uppercase tracking-wider">Academy Hours</span>
                    <span className="text-sm font-bold text-[#FDFBF7] block mt-1">
                      Open 24 Hours / 7 Days a week
                    </span>
                    <span className="text-[10px] text-emerald-300 mt-1 block">Accommodating UK, US, Canada, Australia, and all international timezones</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-[#182F24] text-xs text-emerald-200/80 space-y-2 relative z-10 font-light">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4.5 h-4.5 text-gold-accent shrink-0" />
                <span className="font-semibold text-[#FDFBF7]">Male & Female Teachers on Standby</span>
              </div>
              <p>Your privacy is important to us. Information is securely stored and forwarded straight to the academy's executive management board.</p>
            </div>
          </div>

          {/* Contact Right: Form Layout */}
          <div className="lg:col-span-7 bg-[#FDFBF7] border border-[#E5E1DA] rounded p-8 sm:p-10 flex flex-col justify-center shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-8 space-y-6 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-deep border border-gold-accent/20 shadow-inner">
                  <CheckCircle className="w-10 h-10 text-gold-accent" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-[#2D312A] serif-font">Thank you! Your registration has been received.</h3>
                  <p className="text-warm-text/80 text-sm max-w-md mx-auto leading-relaxed font-light">
                    Dear <strong className="text-[#2D312A] font-semibold">{formData.studentName}</strong>, your Quran free trial registration is saved. You can view your record instantly in our <strong>Sanity Studio</strong>! Our coordinator will contact you shortly on WhatsApp.
                  </p>
                </div>

                {/* EmailJS Delivery Status banner */}
                <div className="max-w-md mx-auto p-4 rounded text-left text-xs border border-gold-accent/15 bg-[#FDFBF7] space-y-1">
                  {emailStatus === 'success' && (
                    <div className="text-emerald-800 flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">EmailJS Sent Successfully:</span> Email notification dispatched to Academy Manager's Gmail inbox with full registration details!
                      </div>
                    </div>
                  )}
                  {emailStatus === 'skipped' && (
                    <div className="text-amber-800 flex items-start gap-2">
                      <div className="px-1.5 py-0.5 bg-amber-100 rounded text-amber-700 font-mono text-[9px] uppercase shrink-0 mt-0.5">DEV</div>
                      <div>
                        <span className="font-bold">Gmail Notification Queued:</span> EmailJS skipped because Service ID/Template ID are empty placeholders. 
                        <p className="mt-1 text-[11px] text-warm-text/70">Configure them below in the collapsible <strong>EmailJS Settings</strong> panel to activate live Gmail routing.</p>
                      </div>
                    </div>
                  )}
                  {emailStatus === 'error' && (
                    <div className="text-red-800 flex items-start gap-2">
                      <span className="text-red-600 shrink-0 mt-0.5 font-bold">⚠️</span>
                      <div>
                        <span className="font-bold">EmailJS Failed:</span> The registration was saved, but we couldn't send the Gmail alert. Check your EmailJS service status or keys.
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    id="reset-form-btn"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 bg-[#F5F2ED] hover:bg-[#E5E1DA] text-[#2D312A] font-semibold px-6 py-2.5 rounded text-xs uppercase tracking-wide transition cursor-pointer"
                  >
                    <span>Submit Another Registration</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Visual Indicators */}
                <div className="flex items-center gap-2 pb-2 border-b border-[#E5E1DA]">
                  <UserCheck className="w-5 h-5 text-gold-accent" />
                  <span className="text-sm font-bold text-[#2D312A] serif-font">Student & Parent Demographics</span>
                </div>

                {validationError && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-100 font-medium">
                    {validationError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-warm-text/60 mb-1 font-sans">Student Full Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Ahmed Khan"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      className="w-full bg-[#FDFBF7] text-warm-text text-xs px-3.5 py-3 rounded border border-[#E5E1DA] focus:outline-none focus:border-gold-accent focus:ring-1 focus:ring-gold-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-warm-text/60 mb-1 font-sans">Parent/Guardian Name (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Mohamed Ali"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full bg-[#FDFBF7] text-warm-text text-xs px-3.5 py-3 rounded border border-[#E5E1DA] focus:outline-none focus:border-gold-accent focus:ring-1 focus:ring-gold-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-warm-text/60 mb-1 font-sans">WhatsApp Number (with Country Code) <span className="text-red-500">*</span></label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. +1 234 567 890"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#FDFBF7] text-warm-text text-xs px-3.5 py-3 rounded border border-[#E5E1DA] focus:outline-none focus:border-gold-accent focus:ring-1 focus:ring-gold-accent font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-warm-text/60 mb-1 font-sans">Email Address <span className="text-red-500">*</span></label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. user@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FDFBF7] text-warm-text text-xs px-3.5 py-3 rounded border border-[#E5E1DA] focus:outline-none focus:border-gold-accent focus:ring-1 focus:ring-gold-accent font-mono"
                    />
                  </div>
                </div>

                {/* Academy specific preferences */}
                <div className="flex items-center gap-2 pt-2 pb-2 border-b border-[#E5E1DA]">
                  <ShieldCheck className="w-5 h-5 text-gold-accent" />
                  <span className="text-sm font-bold text-[#2D312A] serif-font">Academy Syllabus Preferences</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-warm-text/60 mb-1 font-sans">Student Age Group</label>
                    <select 
                      value={formData.ageGroup}
                      onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                      className="w-full bg-[#FDFBF7] text-warm-text text-xs px-3.5 py-3 rounded border border-[#E5E1DA] focus:outline-none focus:border-gold-accent"
                    >
                      <option>Kids (Ages 4-12)</option>
                      <option>Teens (Ages 13-19)</option>
                      <option>Adults (Ages 20+)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-warm-text/60 mb-1 font-sans">Course Interest</label>
                    <select 
                      value={formData.courseInterest}
                      onChange={(e) => setFormData({ ...formData, courseInterest: e.target.value })}
                      className="w-full bg-[#FDFBF7] text-warm-text text-xs px-3.5 py-3 rounded border border-[#E5E1DA] focus:outline-none focus:border-gold-accent"
                    >
                      <option value="Madani Qaidah (مدنی قاعده)">Madani Qaidah (مدنی قاعده)</option>
                      <option value="Norani Qaidah (نورانی قاعده)">Norani Qaidah (نورانی قاعده)</option>
                      <option value="Iqra Book (اقرا بک)">Iqra Book (اقرا بک)</option>
                      <option value="Tajweed Quran (تجوید القرآن)">Tajweed Quran (تجوید القرآن)</option>
                      <option value="Quran Memorization/Hifz (حفظ القرآن)">Quran Memorization/Hifz (حفظ القرآن)</option>
                      <option value="Islamic Duas (اسلامک دعائیں)">Islamic Duas (اسلامک دعائیں)</option>
                      <option value="Namaz Learning (نماز کورس)">Namaz Learning (نماز کورس)</option>
                      {formData.courseInterest && 
                       !['Madani Qaidah (مدنی قاعده)', 'Norani Qaidah (نورانی قاعده)', 'Iqra Book (اقرا بک)', 'Tajweed Quran (تجوید القرآن)', 'Quran Memorization/Hifz (حفظ القرآن)', 'Islamic Duas (اسلامک دعائیں)', 'Namaz Learning (نماز کورس)'].includes(formData.courseInterest) && (
                        <option value={formData.courseInterest}>{formData.courseInterest}</option>
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-warm-text/60 mb-1 font-sans">Preferred Class Format <span className="text-red-500">*</span></label>
                    <select 
                      required
                      value={formData.preferredFormat}
                      onChange={(e) => setFormData({ ...formData, preferredFormat: e.target.value })}
                      className="w-full bg-[#FDFBF7] text-warm-text text-xs px-3.5 py-3 rounded border border-[#E5E1DA] focus:outline-none focus:border-gold-accent"
                    >
                      <option value="Private 1-on-1 Classes">Private 1-on-1 Classes</option>
                      <option value="Group Classes">Group Classes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-warm-text/60 mb-1 font-sans">Preferred Days Per Week <span className="text-red-500">*</span></label>
                    <select 
                      required
                      value={formData.preferredDays}
                      onChange={(e) => setFormData({ ...formData, preferredDays: e.target.value })}
                      className="w-full bg-[#FDFBF7] text-warm-text text-xs px-3.5 py-3 rounded border border-[#E5E1DA] focus:outline-none focus:border-gold-accent"
                    >
                      <option value="5 Days a Week">5 Days a Week</option>
                      <option value="4 Days a Week">4 Days a Week</option>
                      <option value="3 Days a Week">3 Days a Week</option>
                      <option value="2 Days a Week">2 Days a Week</option>
                      <option value="Weekend Only">Weekend Only</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-warm-text/60 mb-1 font-sans">Preferred Time</label>
                    <select 
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full bg-[#FDFBF7] text-warm-text text-xs px-3.5 py-3 rounded border border-[#E5E1DA] focus:outline-none focus:border-gold-accent"
                    >
                      <option>Morning Slots</option>
                      <option>Afternoon Slots</option>
                      <option>Evening Slots</option>
                      <option>Night Slots (24/7 flexibility)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-warm-text/60 mb-1 font-sans">Message or Specific Requests (e.g., "Need Female Teacher")</label>
                  <textarea 
                    rows={3}
                    placeholder="Enter any details, timing adjustments, or if you require separate male/female teachers here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#FDFBF7] text-warm-text text-xs px-3.5 py-3 rounded border border-[#E5E1DA] focus:outline-none focus:border-gold-accent"
                  />
                </div>

                <div className="pt-2">
                  <button
                    id="submit-form-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-deep hover:bg-emerald-deep/90 text-[#FDFBF7] font-bold py-3.5 px-6 rounded transition shadow cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Registering...' : 'Submit Trial Registration'}</span>
                    <Send className="w-4 h-4 text-gold-accent" />
                  </button>
                </div>
              </form>
            )}

            {/* Collapsible EmailJS settings panel for owner configuration */}
            <div className="mt-8 pt-6 border-t border-[#E5E1DA]">
              <button
                type="button"
                onClick={() => setShowDeveloperPanel(!showDeveloperPanel)}
                className="w-full flex items-center justify-between text-xs text-warm-text/60 hover:text-[#2D312A] transition cursor-pointer"
              >
                <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
                  ⚙️ EmailJS Gmail Settings
                </span>
                <span className="text-[10px] bg-[#F5F2ED] border border-[#E5E1DA] px-2 py-0.5 rounded text-warm-text/80 font-mono">
                  {showDeveloperPanel ? 'Collapse Setup' : 'Expand Setup'}
                </span>
              </button>

              {showDeveloperPanel && (
                <div className="mt-4 p-4 rounded bg-[#F5F2ED] border border-[#E5E1DA] space-y-4 animate-fade-in">
                  <div className="text-[11px] text-warm-text/70 leading-relaxed space-y-1">
                    <p className="font-semibold text-[#2D312A]">How to activate Gmail Notifications:</p>
                    <ol className="list-decimal list-inside space-y-1 font-light">
                      <li>Create a free account at <a href="https://www.emailjs.com" target="_blank" rel="noopener noreferrer" className="text-emerald-deep font-bold underline">emailjs.com</a></li>
                      <li>Link your <strong>Gmail</strong> service to obtain your <strong>Service ID</strong></li>
                      <li>Create an Email Template to obtain your <strong>Template ID</strong> (map parameters like <code className="bg-white/80 px-1 py-0.2 rounded font-mono text-[9px] font-bold">{"{{student_name}}"}</code>, <code className="bg-white/80 px-1 py-0.2 rounded font-mono text-[9px] font-bold">{"{{whatsapp_number}}"}</code>, <code className="bg-white/80 px-1 py-0.2 rounded font-mono text-[9px] font-bold">{"{{selected_course}}"}</code>)</li>
                      <li>Retrieve your <strong>Public Key</strong> from the Account panel</li>
                    </ol>
                  </div>

                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="block text-[10px] font-bold text-warm-text/70 uppercase mb-1">EmailJS Service ID</label>
                      <input
                        type="text"
                        placeholder="e.g. service_gmail"
                        value={emailJsConfig.serviceId}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEmailJsConfig(p => ({ ...p, serviceId: val }));
                          localStorage.setItem('emailjs_service_id', val);
                        }}
                        className="w-full bg-white text-warm-text text-xs px-2.5 py-2 rounded border border-[#E5E1DA] focus:outline-none focus:border-gold-accent font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-warm-text/70 uppercase mb-1">EmailJS Template ID</label>
                      <input
                        type="text"
                        placeholder="e.g. template_quran_academy"
                        value={emailJsConfig.templateId}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEmailJsConfig(p => ({ ...p, templateId: val }));
                          localStorage.setItem('emailjs_template_id', val);
                        }}
                        className="w-full bg-white text-warm-text text-xs px-2.5 py-2 rounded border border-[#E5E1DA] focus:outline-none focus:border-gold-accent font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-warm-text/70 uppercase mb-1">EmailJS Public Key</label>
                      <input
                        type="text"
                        placeholder="e.g. user_abcdef123456"
                        value={emailJsConfig.publicKey}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEmailJsConfig(p => ({ ...p, publicKey: val }));
                          localStorage.setItem('emailjs_public_key', val);
                        }}
                        className="w-full bg-white text-warm-text text-xs px-2.5 py-2 rounded border border-[#E5E1DA] focus:outline-none focus:border-gold-accent font-mono"
                      />
                    </div>
                  </div>

                  <p className="text-[10px] text-warm-text/50 italic text-center font-light pt-1">
                    Your dynamic values are stored and persist in your local browser cache.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Testimonials Section */}
        <div className="mt-20 pt-16 border-t border-[#E5E1DA]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-gold-accent tracking-widest uppercase block mb-2 font-sans">Student & Parent Reviews</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2D312A] serif-font">What Our Global Community Says</h3>
            <p className="text-warm-text/70 text-xs sm:text-sm mt-2 font-light leading-relaxed">
              Read authentic feedback from families and adult students from the UK, USA, Canada, UAE, and beyond praising our interactive, flexible classes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div 
                key={t.id} 
                className="bg-[#FDFBF7] p-6 rounded border border-[#E5E1DA] shadow-2xs hover:shadow-sm transition-all duration-300 flex flex-col justify-between relative group"
              >
                <div className="absolute top-4 right-4 text-gold-accent/10 group-hover:text-gold-accent/25 transition-colors">
                  <Quote className="w-8 h-8" />
                </div>
                <div>
                  {/* Stars */}
                  <div className="flex items-center gap-0.5 mb-3.5">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-accent text-gold-accent" />
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="text-xs sm:text-[13px] leading-relaxed text-warm-text/90 italic font-light font-sans mb-4">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-[#F5F2ED] flex flex-col">
                  <span className="text-xs font-bold text-[#2D312A] serif-font">{t.name}</span>
                  <span className="text-[10px] text-gold-accent font-medium mt-0.5 uppercase tracking-wider">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

