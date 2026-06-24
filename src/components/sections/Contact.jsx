import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, ShieldCheck } from 'lucide-react';

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative z-10 bg-background-darker/50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Map/Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-space mb-6 text-white text-glow">
              Secure Your <span className="text-primary">Future</span>
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Ready to fortify your digital infrastructure? Contact our team of security experts for a comprehensive audit.
            </p>

            <div className="flex items-center gap-4 mb-8 p-4 glass-panel rounded-xl border-success/30">
              <ShieldCheck className="w-8 h-8 text-success" />
              <div>
                <h4 className="font-bold text-white">256-bit Encrypted Connection</h4>
                <p className="text-sm text-gray-400">Your data is securely transmitted.</p>
              </div>
            </div>

            {/* Simulated Map / Graphic */}
            <div className="w-full h-64 rounded-2xl glass-panel relative overflow-hidden group">
              <div className="absolute inset-0 bg-cyber-grid opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-4 h-4 bg-primary rounded-full animate-ping mx-auto mb-2" />
                  <p className="text-primary font-mono text-sm">Global HQ</p>
                  <p className="text-white font-space">San Francisco, CA</p>
                </div>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 transition-colors rounded-2xl pointer-events-none" />
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden">
              {/* Form glowing accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <h3 className="text-2xl font-bold font-space text-white mb-8">Request an Audit</h3>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Full Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Work Email</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Service Required</label>
                  <select className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none">
                    <option value="">Select a service</option>
                    <option value="vapt">Penetration Testing</option>
                    <option value="cloud">Cloud Security Review</option>
                    <option value="consulting">Security Consultation</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Message</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                    placeholder="Tell us about your security needs..."
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting || submitted}
                  className={`w-full ${submitted ? 'bg-success text-background-darker border-success' : 'cyber-button-solid'} flex items-center justify-center gap-2 py-4`}
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-background-darker border-t-transparent rounded-full animate-spin" />
                  ) : submitted ? (
                    <>Message Sent <ShieldCheck className="w-5 h-5" /></>
                  ) : (
                    <>Send Secure Message <Send className="w-5 h-5" /></>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
