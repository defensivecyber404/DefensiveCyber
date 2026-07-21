import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const caseStudies = [
  {
    text: "This is the second time I've worked with Ankur. He is very professional, knowledgeable in cybersecurity and endpoint security tools, and always great to work with.",
    companyAndPost: "Client"
  },
  {
    text: "Ankur has good knowledge in information security and he is really hardworking and is always open to discuss ideas and suggestions. Keep growing Ankur..",
    companyAndPost: "Cloud Security | Ex-Accenture | Ex- DXC | Ex- McAfee"
  },
  {
    text: "It was my pleasure learning with Ankur, as he is through professional and shared his expertise in best possible way.",
    companyAndPost: "Governance, Risk and Compliance Lead at Kyndryl (Airtel Africa)"
  },
  {
    text: "Ankur is hardworking and very knowledgeable! I had the pleasure of working with Ankur for 10months on several projects at TruShield! He always went above and beyond for the team. He would be an asset to any company because he is passionate about the field and always went the extra mile.",
    companyAndPost: "Senior Associate - Security intelligence analyst at Capital One"
  },
  {
    text: "Ankur and I worked at the same company however, we never worked together directly. Ankur is very personable and cares about his coworkers. He is extremely determined and hardworking in his craft. I would highly recommend Ankur in any capacity, I know he is capable of many things.",
    companyAndPost: "Clinical Technician II & Telemetry Technician at Inova Health System"
  }
];

const clients = [
  { name: "TryHackMe", location: "London" },
  { name: "CodeCentro", location: "USA" },
  { name: "ActiveBytes Innovation", location: "Dubai" },
  { name: "Empathy Technologies", location: "" }
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
        
        <div className="max-w-4xl mx-auto mb-4 pl-2 md:pl-0">
          <h4 
            className="text-[#0F172A] font-bold tracking-widest text-sm md:text-base uppercase"
            style={{ fontFamily: '"Monument Extended", "Syncopate", sans-serif' }}
          >
            CLIENT REVIEW
          </h4>
        </div>

        {/* Card and Arrows Wrapper */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Desktop Navigation Overlays */}
          <div className="hidden lg:flex absolute top-1/2 -left-6 md:-left-20 -translate-y-1/2 z-20">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white/60 backdrop-blur-md flex items-center justify-center shadow-md border border-[#0F172A]/10 hover:scale-110 hover:bg-white/90 transition-all text-[#0F172A]"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="hidden lg:flex absolute top-1/2 -right-6 md:-right-20 -translate-y-1/2 z-20">
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white/60 backdrop-blur-md flex items-center justify-center shadow-md border border-[#0F172A]/10 hover:scale-110 hover:bg-white/90 transition-all text-[#0F172A]"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* The Card with 3D Effect */}
          <div className="bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden border border-white/80 relative z-10 w-full transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(0,0,0,0.2)]">
            <div className="min-h-[250px] flex items-center justify-center">
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative w-full text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4 }}
                    className="w-full"
                  >
                    <p className="text-gray-800 text-lg md:text-xl leading-relaxed mb-6 font-medium">
                      "{slide.text}"
                    </p>
                    
                    <div className="mt-6 flex flex-col items-center">
                      {slide.companyAndPost && (
                        <p className="font-bold font-space text-[#0F172A] text-sm md:text-base text-center max-w-2xl">{slide.companyAndPost}</p>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Mobile Navigation */}
                <div className="flex gap-4 mt-8 lg:hidden justify-center">
                  <button 
                    onClick={prevSlide}
                    className="w-10 h-10 rounded-full bg-white/70 border border-gray-300 shadow-sm flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 text-gray-800" />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="w-10 h-10 rounded-full bg-white/70 border border-gray-300 shadow-sm flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 text-gray-800" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clients Section */}
        <div className="mt-24 max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <h4 
              className="text-[#0F172A] font-bold tracking-widest text-sm md:text-base uppercase opacity-80"
              style={{ fontFamily: '"Monument Extended", "Syncopate", sans-serif' }}
            >
              Clients We've Worked With
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {clients.map((client, idx) => (
              <div 
                key={idx} 
                className="bg-white/40 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center justify-center border border-[#0F172A]/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all group"
              >
                <h5 className="font-bold font-space text-[#111827] text-center text-lg md:text-xl leading-tight mb-2 group-hover:text-primary transition-colors">
                  {client.name}
                </h5>
                {client.location && (
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                    {client.location}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
