import React from 'react';

export const HexagonLogo = ({ className = "w-10 h-10" }) => {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gold-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="silver-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#9ca3af" />
          <stop offset="100%" stopColor="#4b5563" />
        </linearGradient>
        <filter id="glass-hexagon" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.8" />
        </filter>
        <filter id="glow-gold">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Background Hexagon (Glassy & Transparent) */}
      <polygon 
        points="50,2 95,25 95,75 50,98 5,75 5,25" 
        fill="rgba(20, 25, 35, 0.4)" 
        stroke="rgba(255, 255, 255, 0.15)" 
        strokeWidth="1.5"
        filter="url(#glass-hexagon)"
        style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
      />
      
      {/* Circuit lines left */}
      <path d="M 5,50 L 15,50 L 20,45 L 25,45 M 15,50 L 20,55 L 25,55 M 5,42 L 10,42 L 15,47" stroke="rgba(212,175,55,0.7)" strokeWidth="1" fill="none" />
      <circle cx="5" cy="50" r="1.5" fill="rgba(212,175,55,0.8)" />
      <circle cx="5" cy="42" r="1" fill="rgba(212,175,55,0.8)" />
      
      {/* Circuit lines right */}
      <path d="M 95,50 L 85,50 L 80,45 L 75,45 M 85,50 L 80,55 L 75,55 M 95,58 L 90,58 L 85,53" stroke="rgba(156,163,175,0.7)" strokeWidth="1" fill="none" />
      <circle cx="95" cy="50" r="1.5" fill="rgba(156,163,175,0.8)" />
      <circle cx="95" cy="58" r="1" fill="rgba(156,163,175,0.8)" />
      
      {/* Left C (Gold) */}
      <path d="M 48,15 L 25,28 L 25,72 L 48,85 L 48,72 L 36,65 L 36,35 L 48,28 Z" fill="url(#gold-grad)" filter="url(#glow-gold)" />
      
      {/* Right C (Silver) */}
      <path d="M 52,15 L 75,28 L 75,72 L 52,85 L 52,72 L 64,65 L 64,35 L 52,28 Z" fill="url(#silver-grad)" />
      
      {/* Center Shield Outer */}
      <path d="M 50,30 C 50,30 60,33 60,42 C 60,54 50,68 50,68 C 50,68 40,54 40,42 C 40,33 50,30 50,30 Z" fill="rgba(0,0,0,0.5)" stroke="url(#gold-grad)" strokeWidth="2" filter="url(#glow-gold)" />
      
      {/* Center Shield Inner Fingerprint lines (abstracted) */}
      <path d="M 46,38 C 46,36 54,36 54,38 M 44,42 C 44,38 56,38 56,42 M 43,46 C 43,40 57,40 57,46" fill="none" stroke="url(#gold-grad)" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      
      {/* Center Padlock */}
      <rect x="46" y="47" width="8" height="6" rx="1.5" fill="url(#gold-grad)" />
      <path d="M 47,47 L 47,44 C 47,41 53,41 53,44 L 53,47" fill="none" stroke="url(#gold-grad)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};
