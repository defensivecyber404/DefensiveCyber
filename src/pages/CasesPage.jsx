import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Database, Cloud, Lock, Server, Network } from 'lucide-react';

const cases = [
  {
    company: 'Global FinTech Corp',
    title: 'Financial Infrastructure Securing',
    category: 'Penetration Testing',
    metrics: ['0 Critical Vulns', '100% Compliance', '24h Remediation'],
    icon: Database,
  },
  {
    company: 'HealthCare Plus',
    title: 'Healthcare Cloud Migration',
    category: 'Cloud Security',
    metrics: ['HIPAA Compliant', 'Zero Downtime', 'Automated Audits'],
    icon: Cloud,
  },
  {
    company: 'MegaShop E-Commerce',
    title: 'E-Commerce Threat Mitigation',
    category: 'Web Security',
    metrics: ['1M+ Attacks Blocked', 'WAF Optimization', 'PCI-DSS Verified'],
    icon: Shield,
  },
  {
    company: 'SecureNet Systems',
    title: 'Zero Trust Architecture Implementation',
    category: 'Network Security',
    metrics: ['100% Endpoint Coverage', 'Identity Based Access', 'Micro-segmentation'],
    icon: Network,
  },
  {
    company: 'DataVault Solutions',
    title: 'Data Center Hardening',
    category: 'Infrastructure Security',
    metrics: ['ISO 27001 Certified', 'Physical Security Audit', 'DDoS Protection'],
    icon: Server,
  },
  {
    company: 'NextGen Crypto',
    title: 'Smart Contract Audit',
    category: 'Blockchain Security',
    metrics: ['No Exploits Found', 'Gas Optimized', 'Multi-sig Wallet Setup'],
    icon: Lock,
  },
];

export const CasesPage = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-black/90">
      <div className="container mx-auto px-6">
        <Link 
          to="/"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
        
        <div className="max-w-4xl mb-16">
          <h1 className="text-4xl md:text-6xl font-bold font-space mb-6 text-white">
            Companies We've <span className="text-primary">Secured</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            A comprehensive list of industry leaders who trust us with their most critical infrastructure and data.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:border-primary/50 transition-colors group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                    {item.company}
                  </h3>
                </div>
                
                <p className="text-gray-400 font-semibold mb-4">{item.title}</p>
                <div className="mb-6 inline-block px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
                  {item.category}
                </div>

                <div className="space-y-3">
                  {item.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3" />
                      {metric}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
