import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Shield, Lock, Terminal, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const typingWords = [
  'Penetration Testing',
  'Vulnerability Assessment',
  'Security Consulting',
  'Web Security',
  'Cloud Security',
];

export const Hero = () => {
  // High-performance lag-free Custom Cursor State
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 800, damping: 35, mass: 0.1 });
  const springY = useSpring(cursorY, { stiffness: 800, damping: 35, mass: 0.1 });
  const trailContainerRef = useRef(null);
  const lastBubbleTime = useRef(0);

  const handleMouseMove = (e) => {
    // Update Framer Motion values directly to eliminate React re-render lag
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    cursorX.set(touch.clientX);
    cursorY.set(touch.clientY);
  };

  const bubbleScale = useTransform(() => {
    const dx = cursorX.get() - springX.get();
    const dy = cursorY.get() - springY.get();
    const dist = Math.sqrt(dx * dx + dy * dy);
    // When distance is 0, scale is 2. As distance increases to 200px, scale drops to 0.5.
    return Math.max(0.5, 2 - (dist / 100));
  });

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
    <section 
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchMove={handleTouchMove}
      onTouchStart={() => setIsHovering(true)}
      onTouchEnd={() => setIsHovering(false)}
      onTouchCancel={() => setIsHovering(false)}
    >
      {/* Trailing Bubble Effect */}
      {typeof window !== 'undefined' && (
        <motion.div
          className="fixed top-0 left-0 w-32 h-32 rounded-full pointer-events-none z-0"
          style={{
            x: springX,
            y: springY,
            scale: bubbleScale,
            translateX: '-50%',
            translateY: '-50%',
            backgroundColor: 'rgba(15, 23, 42, 0.4)', // Dark translucent color
            backdropFilter: 'blur(4px)',
            opacity: isHovering ? 1 : 0
          }}
          transition={{ opacity: { duration: 0.3 } }}
        />
      )}

      {/* Background Image for Hero Section */}
      <div
        className="absolute inset-0 z-[-1] opacity-100 dark:opacity-100"
        style={{
          backgroundImage: "url('/BackgroundImage.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >

            <h1 className="mb-6 flex flex-col gap-1">
              <span className="text-sm md:text-base font-serif uppercase tracking-[0.3em] text-gray-900 dark:text-gray-900 mb-2 font-semibold dark:font-semibold drop-shadow-[0_2px_4px_rgba(255,255,255,0.6)]">
                The Art of
              </span>
              <span className="text-6xl md:text-8xl font-serif font-bold leading-tight tracking-tight glossy-silver pb-1">
                Digital
              </span>
              <span className="text-6xl md:text-8xl font-serif font-bold leading-tight tracking-tight glossy-gold pb-2">
                Defense
              </span>
            </h1>

            <p className="mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-orbitron font-medium tracking-[0.15em] uppercase text-sm md:text-base text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-900 dark:to-gray-800 drop-shadow-[0_2px_4px_rgba(255,255,255,0.6)]">
              Sophisticated Cyber Defense for a Connected World
            </p>

            <div className="h-8 mb-8 text-xl font-mono text-gray-900 dark:text-gray-900 font-bold drop-shadow-[0_2px_4px_rgba(255,255,255,0.6)]">
              <span className="text-gray-800">{'>'} </span>
              {currentText}
              <span className="animate-pulse">_</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
              <a href="#services" className="cyber-button-solid !rounded-full text-center flex items-center justify-center gap-2">
                Explore the platform <span className="text-xl leading-none">→</span>
              </a>
              <Link to="/about" className="cyber-button-solid !rounded-full text-center flex items-center justify-center gap-2">
                About Us
              </Link>
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
              className="absolute top-10 left-10 p-6 rounded-2xl backdrop-blur-md border border-white/20 bg-transparent shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            >
              <Shield className="w-16 h-16 text-primary mb-4 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
              <div className="h-2 w-24 bg-primary/20 rounded mb-2 overflow-hidden backdrop-blur-sm">
                <div className="h-full w-3/4 bg-primary rounded animate-pulse" />
              </div>
              <div className="text-xs text-white font-mono font-bold tracking-wider drop-shadow-md">System Secure</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-10 right-10 p-6 rounded-2xl backdrop-blur-md border border-white/20 bg-transparent shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            >
              <Lock className="w-16 h-16 text-accent mb-4 drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
              <div className="h-2 w-24 bg-accent/20 rounded mb-2 overflow-hidden backdrop-blur-sm">
                <div className="h-full w-full bg-accent rounded" />
              </div>
              <div className="text-xs text-white font-mono font-bold tracking-wider drop-shadow-md">Encryption Active</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 rounded-full border-primary/40 border-2 backdrop-blur-md bg-transparent shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            >
              <Terminal className="w-20 h-20 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
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
