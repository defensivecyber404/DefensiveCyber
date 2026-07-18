import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Database, Cloud } from 'lucide-react';

const cases = [
  {
    title: 'FinTech Infrastructure Secure',
    category: 'Penetration Testing',
    metrics: ['0 Critical Vulns', '100% Compliance', '24h Remediation'],
    icon: Database,
    imageColor: 'from-blue-900/50 to-primary/20',
  },
  {
    title: 'Healthcare Cloud Migration',
    category: 'Cloud Security',
    metrics: ['HIPAA Compliant', 'Zero Downtime', 'Automated Audits'],
    icon: Cloud,
    imageColor: 'from-purple-900/50 to-accent/20',
  },
  {
    title: 'E-Commerce Threat Mitigation',
    category: 'Web Security',
    metrics: ['1M+ Attacks Blocked', 'WAF Optimization', 'PCI-DSS Verified'],
    icon: Shield,
    imageColor: 'from-emerald-900/50 to-success/20',
  },
];

export const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold font-space mb-6 text-[#0F172A]">
              Trusted by <span className="text-primary">Industry</span>
            </h2>
            <p className="text-[#0F172A]">
              Explore how we've helped industry leaders secure their infrastructure and maintain compliance against evolving threats.
            </p>
          </div>
          <Link 
            to="/cases" 
            className="inline-flex items-center justify-center px-6 py-3 border border-[#0F172A]/20 bg-transparent text-[#0F172A] hover:bg-[#0F172A]/5 transition-colors rounded-xl uppercase tracking-widest text-sm font-bold shrink-0 shadow-sm backdrop-blur-sm"
          >
            View All Cases
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {cases.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden bg-white/50 backdrop-blur-md border border-[#0F172A]/10 shadow-sm flex flex-col h-full"
            >
              {/* Abstract Image Placeholder */}
              <div className={`h-48 w-full bg-gradient-to-br ${item.imageColor} relative overflow-hidden flex items-center justify-center`}>
                <div className="absolute inset-0 bg-cyber-grid opacity-30 mix-blend-overlay" />
                <item.icon className="w-16 h-16 text-[#0F172A]/70 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FDF8E7] to-transparent opacity-80" />
              </div>

              <div className="p-8 flex flex-col flex-grow relative z-10 -mt-8">
                <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full w-max mb-4 border border-primary/20">
                  {item.category}
                </span>
                <h3 className="text-xl font-bold font-space text-[#0F172A] mb-4 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                
                <div className="space-y-2 mb-8 flex-grow">
                  {item.metrics.map((metric, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0F172A]/30 group-hover:bg-primary transition-colors" />
                      {metric}
                    </div>
                  ))}
                </div>

                <a href="#" className="flex items-center gap-2 text-sm font-space text-[#0F172A] group-hover:text-primary transition-colors uppercase tracking-wider">
                  Read Case Study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-2xl transition-colors pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
