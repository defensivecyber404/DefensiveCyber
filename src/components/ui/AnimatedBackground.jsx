import React, { useEffect, useRef } from 'react';

export const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let particles = [];
    const spacing = 32;
    let rows = Math.floor(height / spacing) + 4;
    let cols = Math.floor(width / spacing) + 4;
    let time = 0;
    let mouseX = width / 2;
    let mouseY = height / 2;
    let animFrame;

    const initParticles = () => {
      particles = [];
      rows = Math.floor(height / spacing) + 4;
      cols = Math.floor(width / spacing) + 4;
      for (let i = -2; i < cols; i++) {
        for (let j = -2; j < rows; j++) {
          // Assign depth layer: 0=far, 1=mid, 2=near
          const depth = Math.random();
          particles.push({
            x: i * spacing,
            y: j * spacing,
            baseX: i * spacing,
            baseY: j * spacing,
            depth,
            speed: 0.008 + depth * 0.015,
            amplitude: 8 + depth * 12,
          });
        }
      }
    };
    initParticles();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.012;

      particles.forEach((p) => {
        const dx = mouseX - p.baseX;
        const dy = mouseY - p.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const waveX = Math.sin(p.baseY * 0.008 + time + p.depth) * p.amplitude;
        const waveY = Math.cos(p.baseX * 0.008 + time + p.depth) * (p.amplitude * 0.6);

        const repelRadius = 180;
        const repelForce = Math.max(0, repelRadius - dist) / repelRadius;
        const repelX = repelForce > 0 ? (dx / (dist || 1)) * -35 * repelForce : 0;
        const repelY = repelForce > 0 ? (dy / (dist || 1)) * -35 * repelForce : 0;

        p.x = p.baseX + waveX + repelX;
        p.y = p.baseY + waveY + repelY;

        // Depth-based size: far=small, near=large
        const size = 0.4 + p.depth * 2.2;

        // Opacity also driven by depth for fog-of-depth effect
        const baseOpacity = 0.06 + p.depth * 0.28;
        const waveOpacity = Math.sin(p.baseX * 0.015 + time * 0.7) * 0.15;
        const opacity = Math.max(0.03, baseOpacity + waveOpacity);

        // Color: far particles are dim silver, near are bright gold
        const goldAmount = p.depth;
        const r = Math.round(120 + goldAmount * 92);   // 120→212
        const g = Math.round(110 + goldAmount * 65);   // 110→175
        const b = Math.round(100 - goldAmount * 82);   // 100→18

        ctx.globalAlpha = opacity;
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animFrame = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1]" style={{ background: '#000000' }}>
      {/* Base vignette gradient for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 40%, rgba(18,14,4,1) 0%, rgba(0,0,0,1) 100%)',
        }}
      />

      {/* Atmospheric gold glow — center depth point */}
      <div
        className="absolute"
        style={{
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60vw',
          height: '40vh',
          background: 'radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Cyber grid — very subtle */}
      <div className="absolute inset-0 bg-cyber-grid opacity-[0.07]" />

      {/* Depth gradient overlay — top and bottom fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.8) 100%)',
          pointerEvents: 'none',
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};
