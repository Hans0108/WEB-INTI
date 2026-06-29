import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth follow effect
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if we are hovering over something clickable
      const clickableTags = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'];
      const isClickable = 
        clickableTags.includes(target.tagName) || 
        target.closest('a') !== null || 
        target.closest('button') !== null ||
        target.classList.contains('cursor-pointer');
      
      setIsHovering(isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* The main rotating ring (delayed follow) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 1.6 : 1,
            rotate: isHovering ? 90 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`w-10 h-10 border-[1.5px] rounded-full flex items-center justify-center transition-colors duration-300 ${
            isHovering ? 'border-luxury-gold bg-luxury-gold/5 backdrop-blur-[2px]' : 'border-imperial-red/50 border-dashed'
          }`}
        >
          {/* Inner accent ring */}
          <motion.div 
            className="w-full h-full border-[1px] border-luxury-gold/40 rounded-full absolute"
            animate={{
              rotate: -360,
              scale: isHovering ? 0.75 : 1.15,
              opacity: isHovering ? 1 : 0.5
            }}
            transition={{
              rotate: { duration: 10, repeat: Infinity, ease: "linear" },
              scale: { duration: 0.4, ease: "easeOut" }
            }}
          >
             {/* Small orbital dot */}
             <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-imperial-red rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* The center dot (instant follow) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[10000]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div 
          className="w-full h-full bg-imperial-red rounded-full"
          animate={{
            scale: isHovering ? 0 : 1,
            opacity: isHovering ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  );
}
