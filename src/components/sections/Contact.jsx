import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, ShieldCheck, ArrowRight } from 'lucide-react';
import { submitContact } from '../../utils/blogStore';
import contactBg from '../../assets/backgroundImagelast.png';

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    const contactData = {
      name: form.name.value,
      email: form.email.value,
      service: form.service.value,
      message: form.message.value,
    };

    setIsSubmitting(true);
    try {
      await submitContact(contactData);
      setSubmitted(true);
      form.reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      alert('Failed to send message: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="py-24 relative z-10 bg-transparent"
      style={{
        backgroundImage: `url(${contactBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto items-center">
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white/40 backdrop-blur-xl border border-white/50 shadow-xl p-8 md:p-10 rounded-3xl relative overflow-hidden">
              {/* Form glowing accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <div className="text-center mb-8">
                <h3 
                  className="text-xl md:text-2xl lg:text-[1.7rem] leading-tight font-black uppercase text-[#0F172A] mb-2"
                  style={{ fontFamily: '"Monument Extended", "Syncopate", sans-serif' }}
                >
                  WANT TO STAY CONNECTED?
                </h3>
                <p className="text-[#0F172A]/70 text-sm md:text-base max-w-2xl mx-auto">
                  Partner with our elite cybersecurity team to fortify your digital infrastructure, mitigate risks, and respond rapidly to emerging threats.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-normal text-[#0F172A]">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      className="w-full bg-white/60 border border-white/50 shadow-sm rounded-lg px-4 py-3 text-[#0F172A] placeholder:text-[#0F172A]/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-normal text-[#0F172A]">Work Email</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      className="w-full bg-white/60 border border-white/50 shadow-sm rounded-lg px-4 py-3 text-[#0F172A] placeholder:text-[#0F172A]/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="company@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-normal text-[#0F172A]">Service Required</label>
                    <select name="service" defaultValue="" className="w-full bg-white/60 border border-white/50 shadow-sm rounded-lg px-4 py-3 text-[#0F172A] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none">
                      <option value="" disabled hidden className="text-black">Select a service</option>
                      <option value="digital-forensics" className="text-black">Digital Forensics</option>
                      <option value="cyber-threat-intelligence" className="text-black">Cyber Threat Intelligence</option>
                      <option value="incident-response" className="text-black">Incident Response</option>
                      <option value="reverse-engineering" className="text-black">Reverse Engineering & Malware Analysis</option>
                      <option value="other" className="text-black">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-normal text-[#0F172A]">Message</label>
                  <textarea 
                    name="message"
                    required
                    rows={3}
                    className="w-full bg-white/60 border border-white/50 shadow-sm rounded-lg px-4 py-3 text-[#0F172A] placeholder:text-[#0F172A]/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                    placeholder="Tell us about your security needs..."
                  />
                </div>

                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    disabled={isSubmitting || submitted}
                    className={`${submitted ? 'bg-success text-background-darker' : 'bg-[#040816] text-white hover:bg-primary hover:text-[#040816]'} px-8 py-3 rounded-full font-bold flex items-center justify-center gap-2 transition-colors shadow-lg`}
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : submitted ? (
                      <>Sent <ShieldCheck className="w-5 h-5" /></>
                    ) : (
                      <>SUBMIT <ArrowRight className="w-5 h-5" /></>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
