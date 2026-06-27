import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export default function InteractiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Use ResizeObserver for perfect responsive canvas sizing without window-only dependencies
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high-DPI scaling
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    const particles: Particle[] = [];
    const particleCount = Math.min(65, Math.floor((dimensions.width * dimensions.height) / 16000));
    
    // Luxury gold and imperial red color scheme
    const colors = [
      'rgba(184, 134, 11, 0.35)',  // Gold
      'rgba(179, 0, 6, 0.25)',     // Red
      'rgba(17, 17, 17, 0.1)',     // Charcoal
    ];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // 1. Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Core dynamic interactive node connection
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 125) {
            const alpha = (1 - dist / 125) * 0.18;
            ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw cursor connection
        if (mouseRef.current.active) {
          const mdx = p1.x - mouseRef.current.x;
          const mdy = p1.y - mouseRef.current.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < 180) {
            const mAlpha = (1 - mdist / 180) * 0.28;
            ctx.strokeStyle = `rgba(179, 0, 6, ${mAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();
          }
        }

        // 2. Update positions
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce on borders
        if (p1.x < 0 || p1.x > dimensions.width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > dimensions.height) p1.vy *= -1;

        // Ensure bounds
        p1.x = Math.max(0, Math.min(dimensions.width, p1.x));
        p1.y = Math.max(0, Math.min(dimensions.height, p1.y));

        // 3. Draw particles
        ctx.fillStyle = p1.color;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();

        // Glow center for some nodes
        if (i % 5 === 0) {
          ctx.fillStyle = 'rgba(212, 175, 55, 0.4)';
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, p1.radius + 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [dimensions]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 z-0 overflow-hidden w-full h-full pointer-events-auto"
      style={{ touchAction: 'none' }}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block opacity-[0.85]" 
      />
    </div>
  );
}
