import React, { useEffect, useRef } from 'react';

export const DotWaveBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const cols = 50;
      const rows = 50;
      const spacingX = 70;
      const spacingZ = 70;
      
      const fov = 600;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x3d = (i - cols / 2) * spacingX;
          const z3d = (j - rows / 2) * spacingZ;
          
          // Wave effect using sine and cosine
          const y3d = Math.sin(x3d * 0.005 + time) * 60 + Math.cos(z3d * 0.005 + time) * 60;

          // Camera translation
          const zTranslated = z3d + 1500; 
          
          if (zTranslated <= 100) continue;

          const scale = fov / zTranslated;
          
          // 2D Projection
          const x2d = canvas.width / 2 + x3d * scale;
          const y2d = canvas.height / 2 + y3d * scale + 150; 

          // Skip drawing if outside view bounds
          if (x2d < -50 || x2d > canvas.width + 50 || y2d < -50 || y2d > canvas.height + 50) continue;

          // Alternating colors (Purple and Gold)
          const isPurple = (i + j) % 2 === 0;
          ctx.fillStyle = isPurple ? '#c084fc' : '#d4af37'; 

          // Scaling radius by depth
          const radius = Math.max(0.5, 3.5 * scale);
          
          // Opacity fades in distance
          ctx.globalAlpha = Math.max(0.1, Math.min(1, scale * 1.5));

          ctx.beginPath();
          ctx.arc(x2d, y2d, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1.0;
      time += 0.02;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[0] bg-[#0c0514]"
    />
  );
};
