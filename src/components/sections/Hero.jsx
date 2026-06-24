import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Terminal, Activity } from 'lucide-react';

const typingWords = [
  'Penetration Testing',
  'Vulnerability Assessment',
  'Security Consulting',
  'Web Security',
  'Cloud Security',
];

export const Hero = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = typingWords[currentWordIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === word) {
        setTimeout(() => setIsDeleting(true), 1500);
        return;
      }

      if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % typingWords.length);
        return;
      }

      const nextText = isDeleting
        ? word.substring(0, currentText.length - 1)
        : word.substring(0, currentText.length + 1);

      setCurrentText(nextText);
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Abstract Glowing Shapes */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6"
            >
              <Activity className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-gray-300">Live Threat Monitoring Active</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold font-space mb-6 leading-tight">
              Protecting Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Digital Assets
              </span>{' '}
              <br />
              Against Modern Threats
            </h1>

            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0">
              Professional Cybersecurity Solutions for Businesses, Startups, and Individuals.
            </p>

            <div className="h-8 mb-8 text-xl font-mono text-primary font-bold">
              <span className="text-gray-500">{'>'} </span>
              {currentText}
              <span className="animate-pulse">_</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
              <a href="#services" className="cyber-button-solid text-center flex items-center justify-center gap-2">
                Explore the platform <span className="text-xl leading-none">→</span>
              </a>
              <a href="#contact" className="cyber-button text-center">
                Book Consultation
              </a>
            </div>
          </motion.div>

          {/* Floating Illustrations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:block h-[500px]"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-10 left-10 p-6 glass-panel rounded-2xl"
            >
              <Shield className="w-16 h-16 text-primary mb-4" />
              <div className="h-2 w-24 bg-primary/20 rounded mb-2 overflow-hidden">
                <div className="h-full w-3/4 bg-primary rounded animate-pulse" />
              </div>
              <div className="text-xs text-gray-400 font-mono">System Secure</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-10 right-10 p-6 glass-panel rounded-2xl"
            >
              <Lock className="w-16 h-16 text-accent mb-4" />
              <div className="h-2 w-24 bg-accent/20 rounded mb-2 overflow-hidden">
                <div className="h-full w-full bg-accent rounded" />
              </div>
              <div className="text-xs text-gray-400 font-mono">Encryption Active</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 glass-panel rounded-full border-primary/30 border-2"
            >
              <Terminal className="w-20 h-20 text-white" />
            </motion.div>
            
            {/* Orbital Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-accent/20 rounded-full animate-[spin_8s_linear_infinite_reverse]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
