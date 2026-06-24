import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What exactly happens during a Penetration Test?",
    answer: "A penetration test is a simulated cyber attack against your computer system to check for exploitable vulnerabilities. We use the same techniques as malicious hackers, but safely and with your permission, to identify weak spots before criminals can exploit them."
  },
  {
    question: "How long does a typical security assessment take?",
    answer: "The duration depends on the scope and complexity of your infrastructure. A small web application might take 1-2 weeks, while a comprehensive enterprise-wide assessment could take 4-6 weeks. We provide a detailed timeline during the scoping phase."
  },
  {
    question: "Will your testing disrupt our normal business operations?",
    answer: "Our primary goal is to assess security without causing disruption. We carefully schedule intrusive tests during maintenance windows and closely monitor system health. If we identify a critical vulnerability that could cause a crash, we immediately stop and notify your team."
  },
  {
    question: "Do you help fix the vulnerabilities you find?",
    answer: "Yes. Our reports include detailed remediation steps and proof-of-concept exploits. We also offer remediation support consulting to help your development and IT teams implement the recommended fixes effectively."
  },
  {
    question: "Are your services compliant with SOC2 and ISO 27001?",
    answer: "Absolutely. Our methodologies align with industry standards including OWASP, NIST, and PTES. Our reports can be used as evidence of independent security testing for SOC2, ISO 27001, PCI-DSS, and HIPAA audits."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-space mb-6 text-white text-glow">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-gray-400">
            Clear answers to common questions about our security services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`glass-panel rounded-xl overflow-hidden transition-colors duration-300 ${openIndex === index ? 'border-primary/50 bg-white/10' : ''}`}
            >
              <button
                className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`font-space font-semibold pr-8 ${openIndex === index ? 'text-primary' : 'text-white'}`}>
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-primary' : 'text-gray-400'}`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
