import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export const Logo3D = ({ size = 'md', className = '' }) => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [18, -18]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), { stiffness: 200, damping: 18 });
  const translateZ = useSpring(isHovered ? 20 : 0, { stiffness: 200, damping: 25 });

  const sizeMap = { sm: 48, md: 64, lg: 96, xl: 220 };
  const px = sizeMap[size] || 64;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  if (!hasMounted) return null;

  return (
    <motion.div
      ref={containerRef}
      className={`relative cursor-pointer select-none ${className}`}
      style={{ width: px, height: px, perspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {/* Ambient glow — pulses behind logo */}
        <motion.div
          className="absolute inset-[-20%] rounded-full pointer-events-none"
          animate={
            isHovered
              ? { opacity: [0.5, 1, 0.5], scale: [1, 1.25, 1] }
              : { opacity: [0.15, 0.35, 0.15], scale: [1, 1.08, 1] }
          }
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.55) 0%, transparent 70%)',
            filter: 'blur(12px)',
            transform: 'translateZ(-15px)',
          }}
        />

        {/* Cast shadow — depth layer */}
        <div
          style={{
            position: 'absolute',
            inset: '5%',
            bottom: '-10%',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.6)',
            transform: `translateZ(-30px) translateY(${px * 0.12}px) scaleX(0.85)`,
            filter: 'blur(18px)',
            opacity: isHovered ? 0.8 : 0.45,
            transition: 'opacity 0.3s',
          }}
        />

        {/* The actual logo image */}
        <motion.img
          src="/logo.png"
          alt="Defensive Cyber Logo"
          draggable={false}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transform: 'translateZ(18px)',
            filter: isHovered
              ? 'drop-shadow(0 0 18px rgba(212,175,55,1)) drop-shadow(0 0 40px rgba(212,175,55,0.55)) brightness(1.15)'
              : 'drop-shadow(0 0 8px rgba(212,175,55,0.5)) drop-shadow(0 0 20px rgba(212,175,55,0.25))',
            transition: 'filter 0.35s ease',
            userSelect: 'none',
          }}
        />

        {/* Specular glint — top edge highlight */}
        <div
          style={{
            position: 'absolute',
            top: '5%',
            left: '15%',
            right: '15%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(255,251,230,0.6), transparent)',
            transform: 'translateZ(25px)',
            borderRadius: '999px',
            opacity: isHovered ? 0.9 : 0.3,
            transition: 'opacity 0.3s',
          }}
        />
      </motion.div>
    </motion.div>
  );
};
