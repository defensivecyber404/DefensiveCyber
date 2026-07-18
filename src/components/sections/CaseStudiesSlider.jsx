import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const caseStudies = [
  {
    sector: "FINANCE & BANKING",
    title: "Securing the future of digital banking — FinTech Secure reimagined",
    description: "Determined to modernize legacy systems and elevate the customer experience, FinTech Secure transformed its mission-critical infrastructure and launched customer-first mobile apps — ensuring zero-downtime and 100% compliance.",
    quote: "Their penetration testing uncovered vulnerabilities that automated tools completely missed. Outstanding attention to detail. It's not easy or glamorous work but it's a big part of unlocking the value we want to create going forward, to continue to scale and grow.",
    author: "Sarah Jenkins",
    role: "CISO, at TechCorp Global",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff0f?auto=format&fit=crop&q=80&w=1000"
  },
  {
    sector: "HEALTHCARE",
    title: "Protecting patient data without compromising care — HealthPlus secured",
    description: "Facing evolving threats in the healthcare sector, HealthPlus partnered with us to migrate their legacy systems to a highly secure cloud environment while training their employees to become the first line of defense.",
    quote: "The security awareness training transformed our employees from the weakest link to our first line of defense. We sleep better at night knowing DefensiveCyber is monitoring our infrastructure. True professionals.",
    author: "Amanda Torres",
    role: "VP of Operations, at HealthPlus",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000"
  },
  {
    sector: "RETAIL & E-COMMERCE",
    title: "Scaling securely during peak seasons — RetailGiant protected",
    description: "With millions of daily transactions, RetailGiant needed robust defense against automated bot attacks and data breaches. We implemented a comprehensive WAF optimization strategy that blocked over 1M+ attacks.",
    quote: "Their rapid incident response saved us from what could have been a catastrophic data breach. Modernizing our defense posture is key for us, to continue to scale and grow safely.",
    author: "David O'Connor",
    role: "CTO, at RetailGiant",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1000"
  }
];

export const CaseStudiesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === caseStudies.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? caseStudies.length - 1 : prevIndex - 1));
  };

  const slide = caseStudies[currentIndex];

  return (
    <section id="cases" className="relative py-24 bg-transparent overflow-hidden">
      <div className="container mx-auto px-4 md:px-12 xl:px-16 relative">
        
        {/* Desktop Navigation Overlays - Left & Right Screen Edges */}
        <div className="hidden lg:flex absolute top-1/2 left-4 md:left-8 -translate-y-1/2 z-20">
          <button 
            onClick={prevSlide}
            className="w-14 h-14 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] border border-white/50 hover:scale-110 hover:bg-white/60 transition-all text-[#0F172A]"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="hidden lg:flex absolute top-1/2 right-4 md:right-8 -translate-y-1/2 z-20">
          <button 
            onClick={nextSlide}
            className="w-14 h-14 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] border border-white/50 hover:scale-110 hover:bg-white/60 transition-all text-[#0F172A]"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        {/* The Card */}
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-[#0F172A]/5 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
            {/* Left Content Area */}
            <div className="p-8 md:p-12 flex flex-col justify-center relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-xl mx-auto lg:mx-0"
                >
                  <h4 className="text-[#D4AF37] font-extrabold tracking-widest text-[0.85rem] uppercase mb-4 drop-shadow-sm">
                    {slide.sector}
                  </h4>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4 leading-tight tracking-tight font-sans">
                    {slide.title}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed text-[0.95rem]">
                    {slide.description}
                  </p>
                  
                  <Link 
                    to="/cases" 
                    className="inline-flex items-center gap-2 text-[#D4AF37] font-extrabold uppercase tracking-widest text-[0.85rem] hover:gap-3 transition-all mb-10 drop-shadow-sm"
                  >
                    READ THE STORY <ArrowRight className="w-5 h-5" />
                  </Link>

                  <div className="relative border-l-2 border-[#C9A227]/50 pl-6 py-1">
                    <p className="text-gray-800 text-[1.05rem] leading-relaxed mb-4 font-medium italic">
                      "{slide.quote}"
                    </p>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{slide.author}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{slide.role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Mobile Navigation (only visible on small screens) */}
              <div className="flex gap-4 mt-8 lg:hidden justify-center">
                <button 
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <ArrowRight className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Right Image Area */}
            <div className="relative h-[300px] lg:h-auto bg-gray-100">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={slide.image}
                  alt={slide.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
