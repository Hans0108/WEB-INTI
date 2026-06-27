import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BookOpen, Calendar, Mail, ArrowUpRight } from 'lucide-react';
import { useStore } from '../store';

export default function MagazineCarousel() {
  const { articles } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive items count detector
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2); // Tablet
      } else {
        setVisibleCount(3); // Desktop
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalItems = articles.length;
  const maxIndex = Math.max(0, totalItems - visibleCount);

  // Auto-play interval
  useEffect(() => {
    if (isPaused || totalItems <= visibleCount) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, maxIndex, totalItems, visibleCount]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  if (!articles || articles.length === 0) return null;

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'Articles':
        return <BookOpen size={12} className="text-luxury-gold" />;
      case 'Upcoming Events':
        return <Calendar size={12} className="text-imperial-red" />;
      default:
        return <Mail size={12} className="text-gray-400" />;
    }
  };

  return (
    <section 
      className="py-24 bg-[#FAFAFA] border-t border-luxury-gold/20 relative overflow-hidden tech-grid"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Carousel Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h4 className="text-imperial-red font-mono uppercase tracking-[0.4em] font-bold text-[10px] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-imperial-red rounded-full"></span>
              LATEST CHRONICLES
            </h4>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#111111] tracking-tight uppercase">
              The Heritage Library
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Prev/Next buttons */}
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded border border-luxury-gold/30 flex items-center justify-center hover:border-imperial-red text-luxury-gold-dark hover:text-white hover:bg-imperial-red transition-all duration-300 shadow-sm cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded border border-luxury-gold/30 flex items-center justify-center hover:border-imperial-red text-luxury-gold-dark hover:text-white hover:bg-imperial-red transition-all duration-300 shadow-sm cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel Track Wrapper */}
        <div className="relative overflow-hidden" ref={containerRef}>
          <motion.div
            animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className="flex gap-6 w-full"
            style={{
              width: `${(totalItems / visibleCount) * 100}%`,
            }}
          >
            {articles.map((item) => (
              <div
                key={item.id}
                style={{ width: `calc(${100 / totalItems}% - ${((visibleCount - 1) * 24) / totalItems}px)` }}
                className="shrink-0"
              >
                <Link to={`/magazine/article/${item.id}`} className="block group h-full">
                  <div className="bg-white border border-luxury-gold/20 hover:border-imperial-red/50 hover:shadow-[0_12px_40px_rgba(179,0,6,0.05)] transition-all duration-500 flex flex-col h-[420px] relative overflow-hidden rounded-xl">
                    
                    {/* Floating Fine Line Accent */}
                    <div className="absolute top-0 left-0 w-full h-[2.5px] bg-luxury-gold/20 group-hover:bg-imperial-red transition-all duration-500" />
                    
                    {/* Article Cover Image with Grayscale to Color Reveal */}
                    <div className="h-48 overflow-hidden relative border-b border-luxury-gold/15 bg-gray-100">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-luxury-gold/30 px-2.5 py-1 flex items-center gap-1.5 shadow-sm text-[8px] font-mono font-bold uppercase tracking-widest text-[#111111] rounded">
                        {getCategoryIcon(item.type)}
                        {item.type}
                      </div>

                      {item.featured && (
                        <div className="absolute top-3 right-3 bg-imperial-red text-white text-[8px] font-mono font-bold uppercase tracking-widest px-2 py-1 shadow-sm">
                          FEATURED
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-grow relative">
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-3">
                        <span>{item.date}</span>
                        {item.readTime && <span>{item.readTime}</span>}
                      </div>

                      <h3 className="text-lg font-heading font-bold text-[#111111] uppercase tracking-tight leading-snug group-hover:text-imperial-red transition-colors duration-300 line-clamp-3 mb-4">
                        {item.title}
                      </h3>

                      <p className="text-gray-500 font-mono text-[10.5px] uppercase tracking-wider line-clamp-3 leading-relaxed mb-6">
                        {item.content.replace(/[#*`>_-]/g, '').trim()}
                      </p>

                      {/* Footer/CTA indicator */}
                      <div className="mt-auto pt-4 border-t border-luxury-gold/15 flex items-center justify-between">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-luxury-gold-dark group-hover:text-imperial-red transition-colors duration-300 flex items-center gap-1">
                          READ LOG_ <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                        {item.location && (
                          <span className="text-[8.5px] font-mono text-gray-400 uppercase tracking-wider truncate max-w-[140px]" title={item.location}>
                            {item.location}
                          </span>
                        )}
                      </div>
                    </div>

                  </div>
                </Link>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Carousel Indicators / Bullets at bottom */}
        {totalItems > visibleCount && (
          <div className="flex justify-center items-center gap-2 mt-10">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx 
                    ? 'w-8 bg-imperial-red' 
                    : 'w-2 bg-luxury-gold/30 hover:bg-luxury-gold/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
