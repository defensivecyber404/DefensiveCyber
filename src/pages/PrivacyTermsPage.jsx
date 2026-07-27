import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle, Lock, Cpu, Globe, FileText, AlertTriangle, Scale, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export const PrivacyTermsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "1. Acceptance",
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
      content: "This website at [WEBSITE URL] is operated by [LEGAL ENTITY NAME], trading as Defensive Cyber Consulting Services (\"we\", \"us\"). By using the site you agree to these Terms. If you're using it for an organization, you confirm you're authorized to accept on its behalf."
    },
    {
      title: "2. The Site Is Not a Service Agreement",
      icon: <FileText className="w-6 h-6 text-primary" />,
      content: "The site is for information only. Nothing on it is a binding offer of services, and no engagement is created by using it or submitting an enquiry. All work is governed by a separate signed agreement (an MSA, SOW, or engagement letter), which controls over these Terms for the work it covers."
    },
    {
      title: "3. Authorization for Security Work",
      icon: <Shield className="w-6 h-6 text-primary" />,
      content: "We perform no active security work — scanning, testing, monitoring, or incident response — without prior written authorization and your confirmation that you own or are lawfully permitted to authorize work on the relevant systems and data."
    },
    {
      title: "4. No Guarantee of Security",
      icon: <AlertTriangle className="w-6 h-6 text-primary" />,
      content: "No service, assessment, or method can guarantee complete security or detection of all threats. Findings reflect a point in time only. You remain responsible for your own security decisions and compliance."
    },
    {
      title: "5. Intellectual Property",
      icon: <Cpu className="w-6 h-6 text-primary" />,
      content: "Our content, methodologies, tooling, and branding remain ours. You may not copy or reuse them without written consent. Ownership of engagement deliverables is set by the applicable agreement; absent other terms, we keep our reusable tooling and you receive a license to the deliverables produced for you."
    },
    {
      title: "6. Threat Intelligence and Content",
      icon: <Globe className="w-6 h-6 text-primary" />,
      content: "Any threat intelligence, feed, or report provided is for informational purposes only, on an \"as available\" basis, and may be incomplete or contain inaccuracies. Don't rely on it as the sole basis for any decision."
    },
    {
      title: "7. Disclaimer and Liability",
      icon: <Shield className="w-6 h-6 text-[#c77dff]" />,
      content: "The site and its content are provided \"as is\" without warranties of any kind. To the fullest extent permitted by law, we are not liable for indirect or consequential losses, and our total liability relating to the site will not exceed [AMOUNT]. Nothing here excludes liability that can't be excluded by law."
    },
    {
      title: "8. Indemnity",
      icon: <Lock className="w-6 h-6 text-[#c77dff]" />,
      content: "You agree to indemnify us for claims arising from your misuse of the site, breach of these Terms, or unauthorized instructions in connection with any work."
    },
    {
      title: "9. Privacy",
      icon: <Lock className="w-6 h-6 text-[#c77dff]" />,
      content: "We handle personal data as described in our Privacy Policy, in line with the Digital Personal Data Protection Act, 2023 (India), and other applicable laws for users outside India."
    },
    {
      title: "10. Governing Law",
      icon: <Scale className="w-6 h-6 text-[#c77dff]" />,
      content: "These Terms are governed by the laws of India, and the courts of Bangalore, Karnataka have exclusive jurisdiction, subject to any different terms in a signed engagement agreement."
    },
    {
      title: "11. Changes and Contact",
      icon: <Mail className="w-6 h-6 text-[#c77dff]" />,
      content: "We may update these Terms; changes take effect when posted with a new date. Questions: defensivecyber404@gmail.com"
    }
  ];

  return (
    <main className="pt-32 pb-24 relative min-h-screen bg-transparent text-white overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#c77dff]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-5xl">
        <div className="mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="relative z-[60] group flex items-center justify-center text-sm font-bold text-white hover:text-primary transition-all backdrop-blur-md bg-white/5 border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/10 px-6 py-2.5 rounded-full w-max cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
        </div>

        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-sm font-space text-primary tracking-[0.2em] mb-4 uppercase">Terms & Conditions</h1>
            <h1 
              className="text-2xl md:text-4xl lg:text-[2.5rem] leading-tight font-black uppercase mb-6"
              style={{ fontFamily: '"Monument Extended", "Syncopate", sans-serif' }}
            >
              <span className="glossy-neon-purple pb-1">DEFENSIVE CYBER CONSULTING SERVICES</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-[#c77dff] mx-auto rounded-full" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-8 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-primary/30 transition-all duration-300 hover:bg-white/[0.05] group ${
                index === sections.length - 1 && sections.length % 2 !== 0 ? 'md:col-span-2' : ''
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold font-space text-white group-hover:text-primary transition-colors">
                    {section.title}
                  </h3>
                </div>
              </div>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed pl-16">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16 text-center text-gray-500 text-sm"
        >
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </motion.div>
      </div>
    </main>
  );
};
