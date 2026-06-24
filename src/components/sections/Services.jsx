import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, 
  GlobeLock, 
  Braces, 
  CloudRain, 
  Network, 
  MessageSquareWarning, 
  GraduationCap, 
  FileCheck2 
} from 'lucide-react';

const services = [
  {
    title: 'Vulnerability Assessment & Penetration Testing (VAPT)',
    description: 'Comprehensive testing to identify and exploit security vulnerabilities in your systems before attackers do.',
    icon: ShieldAlert,
  },
  {
    title: 'Web Application Security Testing',
    description: 'Deep-dive security analysis of your web applications to uncover OWASP Top 10 vulnerabilities.',
    icon: GlobeLock,
  },
  {
    title: 'API Security Assessment',
    description: 'Securing your data exchange points by identifying authentication flaws and injection vulnerabilities.',
    icon: Braces,
  },
  {
    title: 'Cloud Security Review',
    description: 'Auditing AWS, Azure, and GCP environments for misconfigurations and compliance violations.',
    icon: CloudRain,
  },
  {
    title: 'Network Security Assessment',
    description: 'Internal and external network penetration testing to secure your infrastructure perimeter.',
    icon: Network,
  },
  {
    title: 'Security Consultation',
    description: 'Expert guidance on designing secure architectures and implementing best security practices.',
    icon: MessageSquareWarning,
  },
  {
    title: 'Security Awareness Training',
    description: 'Empowering your workforce to recognize and defend against phishing and social engineering attacks.',
    icon: GraduationCap,
  },
  {
    title: 'Compliance & Risk Assessment',
    description: 'Ensuring your organization meets regulatory requirements like SOC2, HIPAA, and GDPR.',
    icon: FileCheck2,
  },
];

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
        className="relative h-full p-[1px] rounded-2xl overflow-hidden group hover:shadow-[0_0_30px_rgba(0,245,255,0.2)] transition-shadow duration-500"
      >
        {/* Animated Gradient Border */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 245, 255, 0.4), transparent 40%)`
          }}
        />
        
        {/* Inner Card */}
        <div className="relative h-full bg-background-darker/90 backdrop-blur-xl p-8 rounded-2xl flex flex-col items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors border border-primary/20">
            <service.icon className="w-8 h-8 text-primary group-hover:text-glow" />
          </div>
          <h3 className="text-xl font-bold font-space text-white group-hover:text-primary transition-colors">
            {service.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const Services = () => {
  return (
    <section id="services" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-space mb-6 text-white text-glow">
            Core <span className="text-primary">Services</span>
          </h2>
          <p className="text-gray-400">
            Comprehensive cybersecurity services tailored to protect your critical assets against the most sophisticated threats.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
