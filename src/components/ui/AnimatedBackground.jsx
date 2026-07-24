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
    const spacing = 30; // Space between dots
    let rows = Math.floor(height / spacing) + 4;
    let cols = Math.floor(width / spacing) + 4;

    // We'll create a grid of dots that animate in a wave
    let time = 0;
    
    // Mouse interaction
    let mouseX = width / 2;
    let mouseY = height / 2;

    const initParticles = () => {
      particles = [];
      rows = Math.floor(height / spacing) + 4;
      cols = Math.floor(width / spacing) + 4;
      for (let i = -2; i < cols; i++) {
        for (let j = -2; j < rows; j++) {
          const isGold = Math.random() > 0.3; // 70% gold, 30% purple
          particles.push({
            x: i * spacing,
            y: j * spacing,
            baseX: i * spacing,
            baseY: j * spacing,
            color: isGold ? '#d4af37' : '#c77dff'
          });
        }
      }
    };
    initParticles();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      time += 0.02;

      particles.forEach((p, index) => {
        // Calculate distance to mouse for interactive effect
        const dx = mouseX - p.baseX;
        const dy = mouseY - p.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Wave calculation
        const waveX = Math.sin(p.baseY * 0.01 + time) * 15;
        const waveY = Math.cos(p.baseX * 0.01 + time) * 15;
        
        // Mouse repel effect
        const repelRadius = 200;
        const repelForce = Math.max(0, repelRadius - dist) / repelRadius;
        const repelX = repelForce > 0 ? (dx / dist) * -40 * repelForce : 0;
        const repelY = repelForce > 0 ? (dy / dist) * -40 * repelForce : 0;
        
        p.x = p.baseX + waveX + repelX;
        p.y = p.baseY + waveY + repelY;

        // Size changes based on wave
        const size = Math.max(0.5, Math.sin(p.baseX * 0.02 + time) * 1.5 + 1.5);
        
        // Opacity based on wave
        const opacity = Math.max(0.1, Math.sin(p.baseY * 0.02 + time) * 0.5 + 0.3);
        
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);

        ctx.fillStyle = p.color;
        ctx.fill();
      });

      requestAnimationFrame(draw);
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
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] bg-background">
      <div className="absolute inset-0 bg-cyber-grid opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background opacity-90" />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};
