import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';

const filters = ['All', 'Newsletters', 'Articles', 'Upcoming Events'];

export default function Magazine() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { articles: contentData } = useStore();

  const filteredContent = contentData.filter(item => activeFilter === 'All' || item.type === activeFilter);
  const featured = contentData.find(item => item.featured);
  const gridItems = filteredContent.filter(item => !item.featured || activeFilter !== 'All');

  return (
    <div className="pt-20 bg-[#FAFAFA] min-h-screen">
      {/* Header */}
      <section className="py-16 bg-white border-b border-luxury-gold/20 tech-grid shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h4 className="text-imperial-red font-mono uppercase tracking-[0.4em] font-bold text-[10px] mb-4">INTI CHRONICLES</h4>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-[#111111] mb-8 tracking-tighter uppercase">The Heritage Library</h1>
          
          {/* Global Filter Navigation */}
          <div className="flex flex-wrap gap-4 relative z-20 p-2 bg-[#FAFAFA] border border-luxury-gold/20 w-fit">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative px-6 py-2 font-mono text-[10px] uppercase font-bold tracking-widest transition-colors duration-300 ${
                  activeFilter === filter ? 'text-imperial-red' : 'text-gray-500 hover:text-imperial-red'
                }`}
              >
                {activeFilter === filter && (
                  <motion.div
                    layoutId="activeFilterBg"
                    className="absolute inset-0 bg-white border border-luxury-gold/40 shadow-sm"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Spotlight (Only show on 'All' or if its type matches) */}
        {featured && (activeFilter === 'All' || featured.type === activeFilter) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 bg-white p-8 border border-luxury-gold/35 hover:border-imperial-red transition-all duration-500 flex flex-col md:flex-row gap-8 group block relative overflow-hidden shadow-sm rounded-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 border-r-[40px] border-t-[40px] border-imperial-red/5 rounded-tr-2xl pointer-events-none"></div>
            <div className="flex-1 overflow-hidden relative cursor-pointer min-h-[300px] border border-luxury-gold/20 bg-gray-100 rounded-xl">
              <div className="absolute inset-0">
                <img src={featured.img} alt={featured.title} className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-80 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-luxury-gold font-mono text-[10px] font-bold uppercase tracking-widest mb-2 block">&gt; {featured.type}_</span>
                <h4 className="text-white font-heading font-bold text-2xl md:text-3xl leading-tight uppercase tracking-tight">{featured.title}</h4>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col justify-center relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-[10px] uppercase tracking-[0.2em] font-mono font-bold text-gray-400">Featured Chronicle</h3>
              </div>
              <p className="text-sm border-l-2 border-imperial-red pl-4 md:text-base text-gray-600 font-mono tracking-wide leading-relaxed mb-8">
                Exploring how {featured.title.toLowerCase()} is shaping the cultural narrative, preservation of community values, and social sequence of Indonesia.
              </p>
              
              <div className="flex items-center text-gray-500 font-mono space-x-6 mb-8 text-[10px] font-bold uppercase tracking-widest">
                <div className="flex items-center"><Calendar size={14} className="mr-2 text-luxury-gold-dark" /> {featured.date}</div>
                <div className="flex items-center"><Clock size={14} className="mr-2 text-luxury-gold-dark" /> {featured.readTime}</div>
              </div>

              <Link to={`/magazine/article/${featured.id}`} className="text-[10px] uppercase font-bold text-imperial-red tracking-widest flex items-center gap-2 font-mono hover:text-[#1a1a1a] transition-colors">&gt; Access Record</Link>
            </div>
          </motion.div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {gridItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="bg-white overflow-hidden border border-luxury-gold/30 hover:border-imperial-red hover:shadow-lg group transition-all duration-300 flex flex-col shadow-sm rounded-xl"
              >
                <div className="relative h-60 overflow-hidden border-b border-luxury-gold/20">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale opacity-90 transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100" />
                  <div className="absolute top-4 right-4">
                    <Badge type={item.type} />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow relative">
                  <h3 className="text-lg md:text-xl font-heading font-bold text-[#111111] mb-4 uppercase tracking-tight leading-tight group-hover:text-imperial-red transition-colors">{item.title}</h3>
                  <div className="mt-auto pt-6 border-t border-luxury-gold/20 flex items-center justify-between">
                    <div className="text-[10px] font-bold font-mono tracking-widest uppercase text-gray-500">
                      {item.type === 'Upcoming Events' ? item.location : item.date}
                    </div>
                    
                    <Link to={`/magazine/article/${item.id}`} className="w-8 h-8 rounded-full border border-luxury-gold/50 bg-white flex items-center justify-center text-imperial-red group-hover:bg-imperial-red group-hover:border-imperial-red group-hover:text-white transition-all duration-300 cursor-pointer">
                       <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
                {/* Magnetic Gold Border on Hover */}
                <div className="h-[2px] w-0 bg-imperial-red group-hover:w-full transition-all duration-500 ease-out"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const Badge: React.FC<{ type: string }> = ({ type }) => {
  const isEvent = type === 'Upcoming Events';
  return (
    <span className={`px-3 py-1 text-[9px] font-bold font-mono uppercase tracking-widest border backdrop-blur-md bg-white ${isEvent ? 'text-imperial-red border-imperial-red' : 'text-luxury-gold-dark border-luxury-gold'}`}>
      {type}
    </span>
  );
}
