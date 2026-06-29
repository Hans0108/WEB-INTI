import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export default function AnimatedHeroLogo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for the 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs to dampen the tilt action
  const springConfig = { damping: 20, stiffness: 140, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [18, -18]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-18, 18]), springConfig);

  // Parallax layers
  const translateZLogo = useSpring(useTransform(y, [-0.5, 0.5], [50, -50]), springConfig);
  const translateZRing1 = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);
  const translateZRing2 = useSpring(useTransform(y, [-0.5, 0.5], [-25, 25]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to card center, normalized between -0.5 and 0.5
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Top Rays angles
  const topAngles = [-82, -64, -47.5, -31, -15.5, 0, 15.5, 31, 47.5, 64, 82];
  // Bottom rays angles
  const bottomAngles = [-60, -40, -20, 0, 20, 40, 60];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-square max-w-[430px] mx-auto flex items-center justify-center cursor-pointer select-none"
      style={{ perspective: '1500px' }}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-radial-gradient from-luxury-gold/15 via-transparent to-transparent opacity-70 blur-3xl pointer-events-none" />

      {/* Outer Golden Geometric Ring (Speeds up on hover) */}
      <motion.div
        style={{
          rotateZ: isHovered ? 180 : 0,
          z: translateZRing1,
        }}
        animate={{
          rotate: isHovered ? [0, 360] : [0, 360],
        }}
        transition={{
          rotate: { 
            duration: isHovered ? 15 : 45, 
            repeat: Infinity, 
            ease: 'linear' 
          },
          default: { type: 'spring', ...springConfig },
        }}
        className="absolute w-[104%] h-[104%] border border-dashed border-luxury-gold/30 rounded-full flex items-center justify-center pointer-events-none"
      >
        {/* Fine crosshairs details */}
        <div className="absolute w-full h-[1px] bg-luxury-gold/15" />
        <div className="absolute h-full w-[1px] bg-luxury-gold/15" />
        <div className="absolute w-6 h-6 border border-luxury-gold/40 rounded-full bg-white/5 backdrop-blur-[1px]" />
      </motion.div>

      {/* Inner Red Orbiting Ring (Counter-rotation, speeds up + higher opacity on hover) */}
      <motion.div
        style={{
          rotateZ: isHovered ? -180 : 0,
          z: translateZRing2,
          opacity: isHovered ? 0.45 : 0.25,
        }}
        animate={{
          rotate: isHovered ? [0, -360] : [0, -360],
        }}
        transition={{
          rotate: { 
            duration: isHovered ? 10 : 30, 
            repeat: Infinity, 
            ease: 'linear' 
          },
          default: { type: 'spring', ...springConfig },
        }}
        className="absolute w-[86%] h-[86%] border border-double border-imperial-red/25 rounded-full pointer-events-none flex items-center justify-center transition-opacity duration-300"
      >
        {/* Orbital dots */}
        <div className="absolute top-0 w-3 h-3 rounded-full bg-imperial-red/90 shadow-[0_0_15px_#b30006]" />
        <div className="absolute bottom-0 w-3 h-3 rounded-full bg-luxury-gold/90 shadow-[0_0_15px_#b8860b]" />
      </motion.div>

      {/* MAIN 3D TILT CARD COMPONENT */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-[78%] h-[78%] bg-[#111111] border border-luxury-gold/35 p-6 md:p-8 flex items-center justify-center shadow-2xl rounded-[20px] overflow-hidden group transition-all duration-300 hover:border-luxury-gold/75 hover:shadow-[0_25px_60px_rgba(184,134,11,0.22),_0_15px_40px_rgba(179,0,6,0.18)]"
      >
        {/* Subtle interior gold grid lines */}
        <div className="absolute inset-0 tech-grid opacity-[0.25] pointer-events-none" />
        
        {/* Hover corner brackets */}
        <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-luxury-gold/45 group-hover:border-imperial-red group-hover:scale-110 transition-all duration-500" />
        <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-luxury-gold/45 group-hover:border-imperial-red group-hover:scale-110 transition-all duration-500" />
        <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-luxury-gold/45 group-hover:border-imperial-red group-hover:scale-110 transition-all duration-500" />
        <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-luxury-gold/45 group-hover:border-imperial-red group-hover:scale-110 transition-all duration-500" />

        {/* Floating Logo with TranslateZ Depth */}
        <motion.div
          style={{
            z: translateZLogo,
            transformStyle: 'preserve-3d',
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Main SVG Logo */}
          <svg 
            viewBox="0 0 200 200" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-full h-full drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
          >
            <defs>
              <linearGradient id="gold-shimmer" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#FFFFFF" />
                <stop offset="80%" stopColor="#FFEAA7" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
            </defs>

            {/* Red Square background with hover glow and soft spring scaling */}
            <motion.rect
              initial={{ scale: 0, rotate: -45, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ 
                type: 'spring', 
                stiffness: 110, 
                damping: 16,
                delay: 0.15 
              }}
              width="200" 
              height="200" 
              fill="#E60000" 
              rx="16" 
            />

            {/* Inner Sunburst Elements group */}
            <g transform="translate(100, 105)">
              
              {/* TOP RAYS: Grows outward with staggered spring animation + interactive scaling on card hover */}
              {topAngles.map((angle, i) => (
                <g key={`top-animated-${i}`} transform={`rotate(${angle})`}>
                  <motion.path
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ 
                      scaleY: isHovered ? 1.06 : 1, 
                      opacity: 1 
                    }}
                    transition={{
                      scaleY: { type: 'spring', stiffness: 120, damping: 10 },
                      default: {
                        type: 'spring',
                        stiffness: 85,
                        damping: 11,
                        delay: 0.35 + i * 0.04
                      }
                    }}
                    style={{ transformOrigin: '0px -22px' }}
                    d="M -2.5,-22 L -9,-85 A 9 9 0 0 1 9,-85 L 2.5,-22 A 2.5 2.5 0 0 1 -2.5,-22 Z"
                    fill="url(#gold-shimmer)"
                  />
                </g>
              ))}

              {/* BOTTOM RAYS: Grows outward with staggered spring animation + interactive scaling on card hover */}
              {bottomAngles.map((angle, i) => (
                <g key={`bot-animated-${i}`} transform={`rotate(${angle + 180})`}>
                  <motion.path
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ 
                      scaleY: isHovered ? 1.06 : 1, 
                      opacity: 1 
                    }}
                    transition={{
                      scaleY: { type: 'spring', stiffness: 120, damping: 10 },
                      default: {
                        type: 'spring',
                        stiffness: 85,
                        damping: 11,
                        delay: 0.35 + (topAngles.length + i) * 0.04
                      }
                    }}
                    style={{ transformOrigin: '0px -22px' }}
                    d="M -1.5,-22 L -5.5,-45 A 5.5 5.5 0 0 1 5.5,-45 L 1.5,-22 A 1.5 1.5 0 0 1 -1.5,-22 Z"
                    fill="url(#gold-shimmer)"
                  />
                </g>
              ))}

              {/* Pulsating Symmetrical Center Core (Sun cutout) */}
              <motion.circle
                cx="0"
                cy="0"
                r="22"
                fill="#E60000"
                animate={{
                  scale: isHovered ? [1, 1.1, 1] : [1, 1.04, 1],
                }}
                transition={{
                  scale: {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }
                }}
              />
            </g>

            {/* INTI Serifed Typography: Slides up and expands tracking reactively on card hover */}
            <motion.text
              x="100"
              y="185"
              textAnchor="middle"
              fill="white"
              fontFamily="Times New Roman, Georgia, serif"
              fontSize="48"
              fontWeight="bold"
              initial={{ opacity: 0, translateY: 15 }}
              animate={{ 
                opacity: 1, 
                translateY: 0,
                letterSpacing: isHovered ? "4px" : "1px"
              }}
              transition={{
                letterSpacing: { type: 'spring', stiffness: 120, damping: 14 },
                default: {
                  type: 'spring',
                  stiffness: 100,
                  damping: 15,
                  delay: 0.95
                }
              }}
            >
              INTI
            </motion.text>
          </svg>
        </motion.div>

        {/* Hover Shimmer Overlay Sweep Effect (More prominent on darker backgrounds) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1200 ease-out pointer-events-none" />
      </motion.div>
    </div>
  );
}
