import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { fetchServices, deleteService, defaultServices } from '../../utils/blogStore';
import { useAuth } from '../../contexts/AuthContext';
import { ServiceFormModal } from '../admin/ServiceFormModal';
import { WhyUsStats } from './WhyUs';

const ServiceCard = ({ service, index, isAuthenticated, onEdit, onDelete }) => {
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

  const IconComponent = Icons[service.icon] || Icons.Search;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full relative group/card"
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
        
        {/* Inner Card - Liquid Glass Translucent Effect */}
        <Link 
          to={`/service/${service.slug}`}
          onClick={() => window.scrollTo(0, 0)}
          className="block relative h-full bg-black/30 backdrop-blur-sm p-8 rounded-2xl flex flex-col items-start gap-4 border border-white/10 shadow-xl transition-all duration-300 overflow-hidden"
        >
          {/* Subtle center purple glow */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(90,20,150,0.2) 0%, transparent 60%)' }} />
          
          <div className="relative z-10 p-3 rounded-lg transition-colors border bg-white/10 border-white/20 group-hover:bg-white/20">
            <IconComponent className="w-8 h-8 group-hover:text-glow text-accent" />
          </div>
          <h3 className="text-xl font-bold font-space text-white group-hover:text-primary transition-colors">
            {service.title}
          </h3>
          <p className="text-white text-sm leading-relaxed">
            {service.description}
          </p>
        </Link>
      </div>

      {isAuthenticated && (
        <div className="absolute top-4 right-4 z-50 flex gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity">
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(service); }}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors"
          >
            <Icons.Edit className="w-4 h-4" />
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(service._id); }}
            className="p-2 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-full backdrop-blur-md transition-colors"
          >
            <Icons.Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export const Services = () => {
  const { isAuthenticated, token } = useAuth();
  const [services, setServices] = useState(defaultServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const scrollContainerRef = useRef(null);

  const loadServices = async () => {
    const data = await fetchServices();
    setServices(data);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService(id, token);
        loadServices();
      } catch (err) {
        alert('Failed to delete service: ' + err.message);
      }
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const hasSlider = services.length > 4;

  return (
    <section id="services" className="pt-24 pb-12 relative z-10 bg-transparent">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-20">
          <h2 className="text-3xl md:text-5xl font-extrabold font-sans tracking-tight mb-6 text-white">
            <span className="glossy-neon-white pb-1">Core</span> <span className="glossy-neon-purple pb-1">Services</span>
          </h2>
          <p className="text-gray-300 font-medium text-base mb-8">
            Comprehensive <strong className="text-white">cybersecurity services</strong>, including <strong className="text-white">penetration testing (VAPT)</strong>, <strong className="text-white">network security monitoring</strong>, and <strong className="text-white">compliance audits</strong>, tailored to protect your critical assets against the most sophisticated threats.
          </p>

          {isAuthenticated && (
            <button
              onClick={() => { setEditingService(null); setIsModalOpen(true); }}
              className="mt-4 px-6 py-2.5 rounded-full cyber-button-solid text-sm font-bold flex items-center gap-2 mx-auto"
            >
              <Icons.Plus className="w-4 h-4" />
              Add Service
            </button>
          )}
        </div>

        {hasSlider ? (
          <div className="relative group/slider">
            {/* Left Arrow */}
            <button 
              onClick={scrollLeft}
              className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-30 p-2 text-white/50 hover:text-white bg-transparent hover:bg-white/10 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              <Icons.ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
            </button>

            <div 
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {services.map((service, index) => (
                <div key={service._id || index} className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] snap-start relative">
                  <ServiceCard 
                    service={service} 
                    index={index} 
                    isAuthenticated={isAuthenticated}
                    onEdit={(s) => { setEditingService(s); setIsModalOpen(true); }}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button 
              onClick={scrollRight}
              className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-30 p-2 text-white/50 hover:text-white bg-transparent hover:bg-white/10 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              <Icons.ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {services.map((service, index) => (
              <ServiceCard 
                key={service._id || index} 
                service={service} 
                index={index} 
                isAuthenticated={isAuthenticated}
                onEdit={(s) => { setEditingService(s); setIsModalOpen(true); }}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        <div className="mt-24 text-center max-w-3xl mx-auto relative z-20">
          <h2 className="text-3xl md:text-5xl font-extrabold font-sans tracking-tight mb-6 text-white">
            <span className="glossy-neon-white pb-1">Why</span> <span className="glossy-neon-purple pb-1">Us</span>
          </h2>
          <p className="text-gray-300 font-medium text-base mb-12">
            Elite certifications. Battle-tested expertise. Uncompromising protection for your critical assets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto relative z-20 mt-16">
          {/* Card 1 */}
          <a 
            href="https://www.credly.com/earner/earned/badge/f2de7353-342a-4e6f-88ea-c674116837f0" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-black/30 backdrop-blur-sm p-8 rounded-2xl flex flex-col items-center text-center border border-white/10 hover:border-white/20 transition-colors shadow-xl block"
            aria-label="View GIAC Certification Forensic Analyst Credential"
          >
            <div className="inline-block transition-transform duration-300 group-hover:scale-110 mb-6">
              <img 
                src="/GIACCertificationForensicAnalyst.png" 
                alt="GIAC Certification Forensic Analyst" 
                className="w-32 h-32 md:w-40 md:h-40 object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">Forensic Analyst</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Expertise in uncovering digital evidence, analyzing cyber incidents, and preserving data integrity for investigations.
            </p>
          </a>

          {/* Card 2 */}
          <a 
            href="https://www.credly.com/earner/earned/badge/1671a9b8-676e-4887-89e6-d35c73e747a8" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-black/30 backdrop-blur-sm p-8 rounded-2xl flex flex-col items-center text-center border border-white/10 hover:border-white/20 transition-colors shadow-xl block"
            aria-label="View GIAC Certification Incident Handler Credential"
          >
            <div className="inline-block transition-transform duration-300 group-hover:scale-110 mb-6">
              <img 
                src="/GIACCertificationIncidentHandler.png" 
                alt="GIAC Certification Incident Handler" 
                className="w-32 h-32 md:w-40 md:h-40 object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">Incident Handler</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Proven ability to rapidly detect, contain, and recover from cyber incidents while minimizing business disruption.
            </p>
          </a>

          {/* Card 3 */}
          <a 
            href="https://www.credly.com/earner/earned/badge/75006c8b-08f2-4ef4-bc1c-74b1676c85f2" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-black/30 backdrop-blur-sm p-8 rounded-2xl flex flex-col items-center text-center border border-white/10 hover:border-white/20 transition-colors shadow-xl block"
            aria-label="View GIAC Certification Threat Intelligence Credential"
          >
            <div className="inline-block transition-transform duration-300 group-hover:scale-110 mb-6">
              <img 
                src="/GIACCertificationThreatIntelligence.png" 
                alt="GIAC Certification Threat Intelligence" 
                className="w-32 h-32 md:w-40 md:h-40 object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">Threat Intelligence</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Proactive identification of emerging cyber threats and delivery of actionable intelligence to strengthen security posture.
            </p>
          </a>
        </div>
        
        <div className="mt-32 relative z-20">
          <WhyUsStats />
        </div>
      </div>

      <ServiceFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadServices}
        initialData={editingService}
      />
    </section>
  );
};
