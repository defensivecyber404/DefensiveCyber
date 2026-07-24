import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { servicesData } from '../data/services';

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
        
        {/* Inner Card - Fully Transparent Glass Effect for All Services Page */}
        <div className="relative h-full bg-white/10 dark:bg-black/20 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] p-8 rounded-2xl flex flex-col items-start gap-4 transition-all duration-500">
          <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors border border-primary/20">
            <service.icon className="w-8 h-8 text-primary group-hover:text-glow" />
          </div>
          <h3 className="text-xl font-bold font-space text-gray-900 dark:text-white group-hover:text-primary transition-colors">
            {service.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const ServicesPage = () => {
  const navigate = useNavigate();

  return (
    <main className="pt-24 pb-24 relative min-h-screen bg-[#F8F5EF] dark:bg-gray-950">
      

      <div className="container mx-auto px-6 relative z-10">
        <button 
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
            setTimeout(() => {
              const el = document.getElementById('services');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 300);
          }}
          className="relative z-50 cursor-pointer inline-flex items-center text-sm font-bold text-gray-900 dark:text-white hover:text-primary transition-colors mt-8 mb-4 backdrop-blur-md bg-transparent border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] px-5 py-2 rounded-full"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
        <div className="text-center max-w-3xl mx-auto mb-16 pt-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold font-sans tracking-tight mb-6 text-[#0F172A] dark:text-white"
          >
            All <span className="glossy-neon-white pb-1">Core</span> <span className="glossy-neon-purple pb-1">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-800 dark:text-gray-300 font-medium text-lg drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] dark:drop-shadow-none"
          >
            Explore our complete suite of advanced cybersecurity solutions designed to secure every aspect of your digital infrastructure.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
};
