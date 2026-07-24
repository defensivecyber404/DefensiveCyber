import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const AboutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-48 pb-24 relative min-h-screen bg-transparent text-white">
      
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center justify-center text-sm font-bold text-white hover:text-primary transition-all backdrop-blur-md bg-white/5 border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/10 px-6 py-2.5 rounded-full w-max cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold font-sans tracking-tight mb-16 text-center">
            <span className="glossy-neon-white pb-1">About Defensive</span> <span className="glossy-neon-purple pb-1">Cyber</span>
          </h1>

          <div className="space-y-8 text-gray-300 font-sans text-lg leading-relaxed drop-shadow-sm">
            
            <section className="bg-black/40 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
              <h2 className="text-xl md:text-2xl font-normal tracking-wide text-white mb-6" style={{ fontFamily: '"Monument Extended", "Syncopate", sans-serif' }}>
                Defending What Matters Most
              </h2>
              <div className="space-y-4">
                <p>
                  In today's digital world, a single cyber incident can disrupt operations, damage reputations, and compromise years of hard work. At <strong className="text-white">Defensive Cyber</strong>, we help organizations stay prepared, resilient, and secure against an ever-changing threat landscape.
                </p>
                <p>
                  Built on years of hands-on experience in enterprise cybersecurity, our approach combines technical expertise with practical, business-focused solutions. We don't believe in one-size-fits-all security. Every organization has different challenges, and we work closely with our clients to understand their environment, identify potential risks, and implement strategies that truly make a difference.
                </p>
                <p>
                  Whether it's responding to a security incident, uncovering the source of an attack, analyzing sophisticated malware, or providing actionable cyber threat intelligence, our goal is simple—to help businesses operate with confidence in a secure digital environment.
                </p>
              </div>
            </section>

            <section className="py-8">
              <h2 className="text-xl md:text-2xl font-normal tracking-wide text-white mb-8 text-center" style={{ fontFamily: '"Monument Extended", "Syncopate", sans-serif' }}>
                Our Expertise
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-black/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl hover:bg-white/10 transition-colors">
                  <h3 className="text-sm md:text-base font-normal tracking-wide text-white mb-4" style={{ fontFamily: '"Monument Extended", "Syncopate", sans-serif' }}>
                    Digital Forensics
                  </h3>
                  <p className="text-base">
                    When security incidents occur, understanding <strong className="text-white">what happened, how it happened, and what to do next</strong> is critical. Our digital forensics services help organizations investigate cyber incidents, preserve digital evidence, identify root causes, and support informed decision-making during recovery.
                  </p>
                </div>

                <div className="bg-black/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl hover:bg-white/10 transition-colors">
                  <h3 className="text-sm md:text-base font-normal tracking-wide text-white mb-4" style={{ fontFamily: '"Monument Extended", "Syncopate", sans-serif' }}>
                    Cyber Threat Intelligence
                  </h3>
                  <p className="text-base">
                    Cyber threats evolve every day. We continuously analyze emerging attack techniques, threat actors, and security trends to provide organizations with meaningful intelligence that helps them strengthen their defenses before attacks become incidents.
                  </p>
                </div>

                <div className="bg-black/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl hover:bg-white/10 transition-colors">
                  <h3 className="text-sm md:text-base font-normal tracking-wide text-white mb-4" style={{ fontFamily: '"Monument Extended", "Syncopate", sans-serif' }}>
                    Incident Response
                  </h3>
                  <p className="text-base">
                    A rapid response can significantly reduce the impact of a cyberattack. We help organizations contain, investigate, and recover from security incidents through a structured and efficient response process, minimizing downtime and protecting critical business operations.
                  </p>
                </div>

                <div className="bg-black/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl hover:bg-white/10 transition-colors">
                  <h3 className="text-sm md:text-base font-normal tracking-wide text-white mb-4" style={{ fontFamily: '"Monument Extended", "Syncopate", sans-serif' }}>
                    Reverse Engineering & Malware Analysis
                  </h3>
                  <p className="text-base">
                    Understanding malicious software is essential to building stronger defenses. Through detailed malware analysis and reverse engineering, we uncover how threats operate, identify indicators of compromise, and help organizations improve their detection and response capabilities.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-black/40 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
              <h2 className="text-xl md:text-2xl font-normal tracking-wide text-white mb-6" style={{ fontFamily: '"Monument Extended", "Syncopate", sans-serif' }}>
                Why Organizations Choose Defensive Cyber
              </h2>
              <div className="space-y-4">
                <p>
                  Our work is driven by expertise, precision, and a commitment to protecting what matters most. We focus on delivering practical cybersecurity solutions that help organizations strengthen resilience, reduce risk, and stay ahead of evolving threats.
                </p>
                <p>
                  We value long-term partnerships built on trust, transparency, and technical excellence. Every engagement is approached with professionalism, attention to detail, and a clear understanding that cybersecurity is not just about technology—it's about enabling businesses to operate securely and confidently.
                </p>
              </div>
            </section>

            <section className="bg-black/40 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl mt-12 text-center">
              <h2 className="text-xl md:text-2xl font-normal tracking-wide text-white mb-4" style={{ fontFamily: '"Monument Extended", "Syncopate", sans-serif' }}>
                Let's Build a More Secure Future
              </h2>
              <p className="mb-6 max-w-2xl mx-auto">
                Whether you're strengthening your security posture, responding to an incident, or looking for expert guidance in today's complex cyber landscape, <strong className="text-white">Defensive Cyber</strong> is here to support you.
              </p>
              <p className="font-bold text-white text-lg bg-white/10 border border-white/20 inline-block px-6 py-3 rounded-xl">
                Let's work together to protect your business, your data, and your digital future. Contact us today to learn how we can help.
              </p>
            </section>

          </div>
        </motion.div>
      </div>
    </main>
  );
};
