import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const leftLinks = [
    { name: 'Services', href: '/#services' },
    { name: 'Why Us', href: '/#why-us' },
  ];
  const rightLinks = [
    { name: 'Case Studies', href: '/#cases' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed z-50 transition-all duration-300 left-4 right-4 lg:left-12 lg:right-12 rounded-2xl border ${scrolled
        ? 'top-2 py-3 bg-white/80 dark:bg-black/40 backdrop-blur-xl border-gray-200/60 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
        : 'top-2 py-5 bg-white/60 dark:bg-black/10 backdrop-blur-lg border-gray-200/50 dark:border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-lg'
        }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between md:justify-center items-center relative h-14">
        {/* Top Left Corner */}
        <div className="absolute left-6 md:left-12 flex items-center h-full">
          <Link to="/" className="font-space flex items-center gap-3 tracking-[4px] hover:tracking-[6px] transition-all duration-500 ease-out group">
            <span className="text-lg md:text-xl font-bold bg-gradient-to-b from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent drop-shadow-sm dark:drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
              DEFENSIVE
            </span>
            <span className="text-lg md:text-xl font-medium bg-gradient-to-b from-white via-gray-300 to-gray-500 bg-clip-text text-transparent drop-shadow-sm dark:drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
              CYBER
            </span>
          </Link>
        </div>

        {/* Center Content (Desktop) */}
        <div className="hidden md:flex items-center w-full justify-center gap-2 mx-48">
          <div className="flex gap-6 flex-1 justify-end">
            {leftLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-[15px] font-medium text-white drop-shadow-md hover:text-primary transition-colors group whitespace-nowrap"
              >
                {link.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Logo */}
          <Link to="/" className="relative flex items-center justify-center flex-shrink-0 z-10 mt-12 group">
            {/* Hexagon Background Layer */}
            <div
              className={`
                    absolute
                    left-[50.9%]
                    top-[37%]
                    -translate-x-1/2
                    -translate-y-1/2
                    pointer-events-none
                    z-0
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-300
                  `}
            >

              {/* Glassy backdrop (CSS clip-path) */}
              <div
                className="absolute w-[110px] h-[127px] bg-transparent backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.15)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
                style={{ clipPath: 'url(#rounded-hex-clip)' }}
              />

              {/* Hexagon Border (SVG) with Gloss Effect */}
              <svg
                viewBox="0 0 100 115.47"
                className="w-[110px] h-[127px] absolute drop-shadow-[0_0_15px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] text-gray-900 dark:text-white"
              >
                <clipPath id="rounded-hex-clip" clipPathUnits="objectBoundingBox">
                  <path d="M 0.400,0.117 Q 0.500,0.067 0.600,0.117 L 0.833,0.233 Q 0.933,0.283 0.933,0.383 L 0.933,0.617 Q 0.933,0.716 0.833,0.767 L 0.600,0.883 Q 0.500,0.933 0.400,0.883 L 0.167,0.767 Q 0.067,0.716 0.067,0.617 L 0.067,0.383 Q 0.067,0.283 0.167,0.233 Z" />
                </clipPath>

                {/* Boundary that blends with the theme */}
                <path
                  d="M 40.00,13.51 Q 50.00,7.73 60.00,13.51 L 83.30,26.96 Q 93.30,32.73 93.30,44.28 L 93.30,71.19 Q 93.30,82.73 83.30,88.51 L 60.00,101.96 Q 50.00,107.73 40.00,101.96 L 16.70,88.51 Q 6.70,82.73 6.70,71.19 L 6.70,44.28 Q 6.70,32.73 16.70,26.96 Z"
                  fill="transparent"
                  stroke="url(#hex-boundary)"
                  strokeWidth="1.5"
                />

                <defs>
                  {/* Blending boundary gradient using currentColor */}
                  <linearGradient id="hex-boundary" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
                    <stop offset="30%" stopColor="currentColor" stopOpacity="0" />
                    <stop offset="70%" stopColor="currentColor" stopOpacity="0" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>

            </div>

            <img
              src="/middle-logo-dark.png"
              alt="Defensive Cyber Logo"
              className="w-auto object-contain transition-all duration-300 relative z-10 h-40"
            />
          </Link>

          <div className="flex gap-6 flex-1 justify-start">
            {rightLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-[15px] font-medium text-white drop-shadow-md hover:text-primary transition-colors group whitespace-nowrap"
              >
                {link.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>

        {/* Top Right Corner (Desktop) */}
        <div className="hidden md:flex absolute right-6 md:right-12 items-center gap-6 h-full">
          <a
            href="/#contact"
            className="relative px-6 py-2 rounded-full overflow-hidden group border border-gray-200 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-blue-600 hover:border-blue-600 shadow-[0_4px_15px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
          >
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 dark:from-white/15 to-transparent pointer-events-none group-hover:opacity-50 transition-opacity" />
            <span className="relative z-10 text-sm font-bold tracking-wide text-gray-800 dark:font-medium dark:text-gray-200 group-hover:text-white transition-colors">
              Contact Us
            </span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-300 hover:text-primary transition-colors ml-auto z-10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-primary/20 overflow-hidden"
            style={{
              background: 'rgba(0,0,0,0.92)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex flex-col items-center py-6 gap-4">
              {[...leftLinks, ...rightLinks].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center gap-6 mt-4">
                <a
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="relative px-6 py-2 rounded-full overflow-hidden group border border-gray-300/50 dark:border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-blue-600 hover:border-blue-600 shadow-lg text-center"
                >
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent pointer-events-none group-hover:opacity-50 transition-opacity" />
                  <span className="relative z-10 text-sm font-medium tracking-wide text-gray-800 dark:text-gray-200 group-hover:text-white transition-colors">
                    Contact Us
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
