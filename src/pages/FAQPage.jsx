import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FAQ } from '../components/sections/FAQ';
import { Send, MessageCircleQuestion, ArrowLeft, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import faqBg from '../assets/backgroundImageFAQ.png';

export const FAQPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      e.target.reset();
    }, 1500);
  };

  return (
    <main 
      className="pt-24 pb-24 relative min-h-screen bg-transparent"
      style={{
        backgroundImage: `url(${faqBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      
      <div className="relative z-10">
        <div className="container mx-auto px-6 pt-12 mb-4">
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md shadow-md text-[#0F172A] font-normal transition-all group w-fit">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>
        <FAQ />
        
        {/* User Query Form Section */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/20 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] shadow-[inset_0_0_20px_rgba(255,255,255,0.6)] p-8 md:p-10 rounded-3xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                  <MessageCircleQuestion className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0F172A]">Still have questions?</h3>
                  <p className="text-[#0F172A]/70 text-sm mt-1">Send us your query and we'll get back to you shortly.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#0F172A]">Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-white/50 border border-[#0F172A]/20 rounded-lg px-4 py-3 text-[#0F172A] placeholder:text-[#0F172A]/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#0F172A]">Email</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-white/50 border border-[#0F172A]/20 rounded-lg px-4 py-3 text-[#0F172A] placeholder:text-[#0F172A]/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="Email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#0F172A]">Your Question</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full bg-white/50 border border-[#0F172A]/20 rounded-lg px-4 py-3 text-[#0F172A] placeholder:text-[#0F172A]/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                    placeholder="Type your question here..."
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting || submitted}
                  className={`w-full md:w-auto px-8 py-3 rounded-xl font-bold font-space transition-all duration-300 flex items-center justify-center gap-2
                    ${submitted 
                      ? 'bg-success text-white shadow-[0_0_20px_rgba(0,255,136,0.4)]' 
                      : 'bg-[#0F172A] text-white shadow-md hover:shadow-lg'
                    }`}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                  ) : submitted ? (
                    "Question Submitted!"
                  ) : (
                    <>Submit Question <Send className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
};
