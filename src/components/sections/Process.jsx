import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Search, Bug, FileOutput, ShieldCheck } from 'lucide-react';

const steps = [
  {
    title: 'Requirement Gathering',
    description: 'Understanding your infrastructure, assets, and specific security compliance needs.',
    icon: ClipboardList,
  },
  {
    title: 'Security Assessment',
    description: 'Performing automated and manual scanning across the targeted attack surface.',
    icon: Search,
  },
  {
    title: 'Vulnerability Discovery',
    description: 'Exploiting identified weaknesses to determine real-world risk and impact.',
    icon: Bug,
  },
  {
    title: 'Detailed Reporting',
    description: 'Providing actionable insights with Proof of Concept (PoC) and remediation steps.',
    icon: FileOutput,
  },
  {
    title: 'Remediation Support',
    description: 'Assisting your team in patching vulnerabilities and verifying the fixes.',
    icon: ShieldCheck,
  },
];

export const Process = () => {
  return (
    <section id="process" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-space mb-6 text-gray-900 dark:text-white text-glow">
            Our <span className="text-primary">Process</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            A systematic, battle-tested approach to securing your digital perimeter.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-primary/20 md:-translate-x-1/2"></div>

          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={index} className="relative flex items-center justify-between mb-12 md:mb-24 last:mb-0">
                {/* Mobile View / Left Side for Desktop */}
                <div className={`w-full md:w-[45%] pl-20 md:pl-0 ${isEven ? 'md:text-right md:pr-12' : 'md:hidden'}`}>
                  {isEven && (
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.5 }}
                      className="glass-panel p-6 rounded-2xl hover:border-primary/50 transition-colors group"
                    >
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-space group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{step.description}</p>
                    </motion.div>
                  )}
                </div>

                {/* Center Icon */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-14 h-14 rounded-full bg-background border-4 border-primary/30 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(0,245,255,0.5)]"
                >
                  <step.icon className="w-6 h-6 text-primary" />
                </motion.div>

                {/* Right Side for Desktop */}
                <div className={`w-full md:w-[45%] pl-20 md:pl-12 hidden md:block ${!isEven ? '' : 'md:hidden'}`}>
                  {!isEven && (
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.5 }}
                      className="glass-panel p-6 rounded-2xl hover:border-primary/50 transition-colors group"
                    >
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-space group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{step.description}</p>
                    </motion.div>
                  )}
                </div>

                {/* Right Side Fallback for Mobile (Odd items) */}
                <div className="w-full md:hidden pl-20 absolute top-0">
                  {!isEven && (
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.5 }}
                      className="glass-panel p-6 rounded-2xl hover:border-primary/50 transition-colors group"
                    >
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-space group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{step.description}</p>
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
