import React from 'react';
import { motion } from 'framer-motion';

export const FireParticles = () => {
  // Generate optimized amount of particles to prevent lag
  const particles = Array.from({ length: 45 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 8 + 7, // 7s to 15s for much slower, elegant travel
    delay: Math.random() * 5,
    size: Math.random() * 12 + 4, // 4px to 16px (slightly smaller on average)
  }));

  return (
    <div className="absolute bottom-0 w-full h-[1500px] overflow-hidden bg-transparent pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bottom-0 rounded-full bg-gradient-to-t from-yellow-500 via-yellow-300 to-yellow-100 mix-blend-screen pointer-events-auto cursor-pointer"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            filter: 'blur(2px)',
          }}
          initial={{ y: 50, opacity: 0, scale: 1 }}
          animate={{
            y: -(Math.random() * 800 + 600), // Fly up 600px to 1400px
            opacity: [0, 0.8, 1, 0.8, 0],
            scale: [1, 0.8, 0.5, 0.2, 0],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 150 - 75]
          }}
          whileHover={{ 
            scale: 0, 
            opacity: 0,
            x: Math.random() * 200 - 100, // Scatter left or right
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeOut"
          }}
        />
      ))}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-orange-600/10 to-transparent blur-xl pointer-events-none" />
    </div>
  );
};
