import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { servicesData } from '../../data/services';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleTouchMove = (e) => {
    if (!cardRef.current) return;
    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative h-full p-[1px] rounded-2xl overflow-hidden group hover:shadow-[0_0_30px_rgba(0,245,255,0.2)] transition-shadow duration-500"
      >
        {/* Animated Gradient Border */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 245, 255, 0.4), transparent 40%)`
          }}
        />
        
        {/* Inner Card - Liquid Glass Translucent Effect (Apple Style) */}
        <div className="relative h-full bg-white/5 dark:bg-black/10 backdrop-blur-2xl p-8 rounded-2xl flex flex-col items-start gap-4 border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] transition-all duration-300">
          <div className={`p-3 rounded-lg transition-colors border ${index < 2 ? 'bg-[#0F172A]/10 border-[#0F172A]/20 group-hover:bg-[#0F172A]/20' : 'bg-primary/10 border-primary/20 group-hover:bg-primary/20'}`}>
            <service.icon className={`w-8 h-8 group-hover:text-glow ${index < 2 ? 'text-[#0F172A]' : 'text-primary'}`} />
          </div>
          <h3 className="text-xl font-bold font-space text-gray-900 dark:text-white group-hover:text-primary transition-colors">
            {service.title}
          </h3>
          <p className="text-white text-sm leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const Services = () => {
  return (
    <section id="services" className="py-24 relative z-10 bg-transparent">
      {/* Background Image 2 */}
      <div 
        className="absolute inset-0 z-[-1] opacity-100"
        style={{
          backgroundImage: "url('/backgroundImage2.png?v=2')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-20">
          <h2 className="text-3xl md:text-5xl font-extrabold font-sans tracking-tight mb-6 text-[#0F172A]">
            Core <span className="text-[#C9A227]">Services</span>
          </h2>
          <p className="text-gray-800 font-medium text-lg mb-8">
            Comprehensive cybersecurity services tailored to protect your critical assets against the most sophisticated threats.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.slice(0, 4).map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
