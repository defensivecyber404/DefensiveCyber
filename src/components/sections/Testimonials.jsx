import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Their penetration testing uncovered vulnerabilities that automated tools completely missed. Outstanding attention to detail.",
    author: "Sarah Jenkins",
    role: "CISO, TechCorp Global",
    company: "TechCorp"
  },
  {
    quote: "We sleep better at night knowing DefensiveCyber is monitoring our infrastructure. True professionals.",
    author: "Michael Chang",
    role: "Director of Engineering, FinTech Secure",
    company: "FinTech Secure"
  },
  {
    quote: "The security awareness training transformed our employees from the weakest link to our first line of defense.",
    author: "Amanda Torres",
    role: "VP of Operations, HealthPlus",
    company: "HealthPlus"
  },
  {
    quote: "Their rapid incident response saved us from what could have been a catastrophic data breach.",
    author: "David O'Connor",
    role: "CTO, RetailGiant",
    company: "RetailGiant"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 relative z-10 overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold font-space mb-6 text-[#0F172A] text-glow">
            Client <span className="text-primary">Testimonials</span>
          </h2>
          <p className="text-[#0F172A]/70">
            Don't just take our word for it. Hear from the organizations we protect every day.
          </p>
        </div>
      </div>

      {/* Auto-scrolling Carousel */}
      <div className="relative flex overflow-x-hidden group">
        {/* Gradient Masks */}
        <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-[#FDF8E7] to-transparent z-10" />
        <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-[#FDF8E7] to-transparent z-10" />

        <div className="flex animate-[scroll_40s_linear_infinite] group-hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials].map((t, index) => (
            <div key={index} className="w-[400px] shrink-0 px-4">
              <div className="bg-white/50 backdrop-blur-md border border-[#0F172A]/10 shadow-sm p-8 rounded-2xl h-full flex flex-col justify-between">
                <div>
                  <Quote className="w-8 h-8 text-primary/40 mb-6" />
                  <p className="text-[#0F172A] leading-relaxed mb-8">"{t.quote}"</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A] font-space">{t.author}</h4>
                  <p className="text-sm text-primary">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-400px * ${testimonials.length})); }
        }
      `}} />
    </section>
  );
};
