import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Users, Calendar, Heart } from 'lucide-react';
import IntiLogo from '../components/IntiLogo';
import MagazineCarousel from '../components/MagazineCarousel';
import InteractiveBackground from '../components/InteractiveBackground';
import AnimatedHeroLogo from '../components/AnimatedHeroLogo';

import { useStore } from '../store';

const stats = [
  { label: 'Members Nationwide', value: 15420, prefix: '+' },
  { label: 'Events Hosted', value: 340, prefix: '+' },
  { label: 'Charity Programs', value: 120, prefix: '+' },
  { label: 'Regional Branches', value: 85, prefix: '' }
];

const timeline = [
  { year: '1999', title: 'The Founding', desc: 'INTI was established to foster harmony and unity among Indonesian citizens of Chinese descent and the wider community.' },
  { year: '2005', title: 'National Expansion', desc: 'Expanded branches across 15 provinces, strengthening the network of cultural exchange.' },
  { year: '2012', title: 'Youth Empowerment', desc: 'Launched the INTI Youth wing to prepare the next generation of culturally aware leaders.' },
  { year: '2023', title: 'Modern Heritage', desc: 'Embracing digital transformation to connect communities globally while preserving traditional values.' }
];

export default function Home() {
  const { websiteImages } = useStore();
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const heroContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      }
    }
  };

  const heroChildVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 85,
        damping: 16,
      }
    }
  };

  return (
    <div className="overflow-hidden bg-[#FAFAFA]">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePos({ x: -1000, y: -1000 });
        }}
        className="relative min-h-screen flex items-center tech-grid overflow-hidden"
      >
        {/* Dynamic Interactive Node Network Canvas */}
        <InteractiveBackground />

        {/* Ambient Mouse Spotlight Tracker */}
        {isHovered && (
          <motion.div
            className="absolute pointer-events-none rounded-full blur-[130px] opacity-[0.16] z-0 hidden sm:block"
            style={{
              background: 'radial-gradient(circle, #b30006 0%, #b8860b 45%, transparent 100%)',
              width: '500px',
              height: '500px',
              left: mousePos.x - 250,
              top: mousePos.y - 250,
            }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}

        {websiteImages.showHomeHeroImg && websiteImages.homeHeroImg && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img 
              src={websiteImages.homeHeroImg} 
              alt="Hero Background" 
              className="w-full h-full object-cover filter grayscale opacity-[0.06] mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-[#FAFAFA]/50" />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.025] pointer-events-none overflow-hidden z-0">
          <IntiLogo className="w-[120vw] h-[120vw] max-w-[1200px] max-h-[1200px] opacity-20 translate-x-1/4 translate-y-1/4" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-transparent to-transparent z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAFA] via-[#FAFAFA]/95 to-transparent z-0 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-7">
              <motion.div 
                className="max-w-3xl"
                variants={heroContainerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={heroChildVariants}>
                  <h4 className="flex items-center gap-3 text-imperial-red font-mono uppercase tracking-[0.4em] font-bold text-xs mb-6">
                    <span className="w-2 h-2 bg-imperial-red animate-pulse tech-glow rounded-full"></span>
                    SYS.INIT // 1999
                  </h4>
                </motion.div>

                <motion.div variants={heroChildVariants}>
                  <h1 className="text-6xl md:text-8xl font-heading font-bold text-[#111111] leading-[0.95] mb-6 tracking-tighter uppercase">
                    Bridging <br/>
                    <span className="text-imperial-gradient relative inline-block group">
                      Cultures
                      <span className="absolute left-0 bottom-1 w-full h-[3px] bg-imperial-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </span>
                    <span className="text-imperial-red animate-pulse">_</span><br />
                    <span className="text-luxury-gold-gradient font-light">Building Harmony</span>
                  </h1>
                </motion.div>
                
                <motion.p 
                  variants={heroChildVariants}
                  className="font-mono text-[11px] text-gray-500 mb-10 max-w-2xl leading-relaxed uppercase tracking-[0.2em]"
                >
                  Perhimpunan Indonesia Tionghoa (INTI) is dedicated to fostering unity, preserving cultural heritage, and contributing to the advancement of the Indonesian nation through inclusivity and compassion.
                </motion.p>
                
                <motion.div 
                  variants={heroChildVariants}
                  className="flex flex-wrap gap-4 relative z-20"
                >
                  <motion.button 
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#111111] hover:bg-imperial-red text-white px-8 py-4 text-[10px] font-mono font-bold uppercase tracking-[0.3em] border border-transparent hover:tech-glow transition-all duration-300 flex items-center group cursor-pointer"
                  >
                    Discover_Story
                    <ArrowRight className="ml-3 group-hover:translate-x-1.5 transition-transform" size={14} />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-transparent text-[#111111] border border-[#111111]/30 hover:border-luxury-gold hover:text-luxury-gold-dark px-8 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.3em] transition-colors duration-300 cursor-pointer"
                  >
                    Join_Network
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column: Super Fancy Animated Logo */}
            <motion.div 
              className="lg:col-span-5 flex justify-center items-center relative z-20"
              initial={{ opacity: 0, scale: 0.75, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 75, 
                damping: 18,
                delay: 0.55
              }}
            >
              <AnimatedHeroLogo />
            </motion.div>
          </div>
        </div>
        
        {/* Futuristic elements */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute -right-64 top-0 w-[800px] h-[800px] border border-luxury-gold/20 rounded-full z-0 pointer-events-none grid grid-cols-2 grid-rows-2 p-10 bg-white/10 backdrop-blur-[1px] hidden lg:grid"
        >
          <div className="border border-luxury-gold/20 tech-grid opacity-40"></div>
          <div className="border border-luxury-gold/20"></div>
          <div className="border border-luxury-gold/20"></div>
          <div className="border border-luxury-gold/20 tech-grid opacity-40"></div>
        </motion.div>
      </section>

      {/* Values & Vision Grid */}
      <section className="py-24 bg-white relative border-t border-luxury-gold/20 shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-luxury-gold/20 pb-8">
            <div>
              <h4 className="text-imperial-red font-mono uppercase tracking-[0.4em] font-bold text-[10px] mb-2 flex items-center gap-2">
                <span className="w-1 h-4 bg-imperial-red"></span>
                CORE PILLARS
              </h4>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#111111] tracking-tight uppercase">Our Core Foundations</h2>
            </div>
            <p className="font-mono text-gray-500 text-[10px] uppercase tracking-widest max-w-sm border-l border-luxury-gold/30 pl-4">
              Nurturing social harmony, building national unity, and sustaining cultural heritage across the archipelago.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ValueCard 
              icon={Users}
              title="Unity in Diversity"
              desc="Celebrating our shared identity as Indonesians while preserving the rich heritage of Chinese-Indonesian culture."
              delay={0.1}
            />
            <ValueCard 
              icon={Heart}
              title="Social Compassion"
              desc="Actively engaging in charitable initiatives, disaster relief, and community welfare programs across the archipelago."
              delay={0.2}
            />
            <ValueCard 
              icon={Calendar}
              title="Cultural Exchange"
              desc="Hosting events, seminars, and festivals that promote cross-cultural understanding and harmony."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-24 bg-[#FAFAFA] relative tech-grid overflow-hidden border-t border-luxury-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center mb-20">
            <h4 className="text-imperial-red font-mono uppercase tracking-[0.4em] font-bold text-[10px] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full border border-imperial-red"></span>
              OUR CHRONOLOGY
            </h4>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#111111] tracking-tight uppercase">The Journey of INTI</h2>
          </div>

          <div className="max-w-4xl mx-auto relative border-l border-luxury-gold/30">
            {timeline.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
                className="mb-12 ml-8 relative group"
              >
                <div className="absolute -left-[41px] top-0 w-8 h-[1px] bg-luxury-gold/50 group-hover:bg-imperial-red transition-colors duration-300"></div>
                <div className="absolute -left-[37px] top-[-3px] w-2 h-2 bg-white border border-luxury-gold group-hover:border-imperial-red group-hover:bg-imperial-red group-hover:tech-glow transition-all duration-300 transform rotate-45"></div>
                
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 bg-white border border-luxury-gold/20 p-6 hover:border-imperial-red/50 hover:bg-imperial-red/5 transition-all duration-300 shadow-sm">
                  <div className="font-mono text-2xl font-bold text-imperial-red tracking-tight md:border-r border-luxury-gold/30 pb-2 md:pb-0 md:pr-8 w-32 shrink-0 flex items-center">
                    &gt; {item.year}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading text-[#1a1a1a] mb-2">{item.title}</h3>
                    <p className="text-gray-500 font-mono text-xs uppercase tracking-widest leading-relaxed group-hover:text-[#1a1a1a] transition-colors">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-24 bg-white border-t border-b border-luxury-gold/20 tech-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <StatItem key={i} stat={stat} delay={i * 0.1} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Magazine Chronicles Carousel */}
      <MagazineCarousel />
    </div>
  );
}

const ValueCard: React.FC<{ icon: any, title: string, desc: string, delay: number }> = ({ icon: Icon, title, desc, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, type: "spring" }}
      whileHover={{ y: -6 }}
      className="bg-white p-8 border border-luxury-gold/20 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_40px_rgba(179,0,6,0.06)] hover:border-imperial-red/50 transition-all duration-500 flex flex-col group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 text-gray-100 group-hover:text-imperial-red/5 transition-colors text-6xl font-mono leading-none font-bold select-none">
        0{Math.floor(delay * 10) + 1}
      </div>
      <div className="w-12 h-12 bg-white border border-luxury-gold/30 flex items-center justify-center text-luxury-gold group-hover:bg-imperial-red group-hover:border-imperial-red group-hover:text-white transition-all duration-500 relative z-10 shadow-sm">
        <Icon size={18} />
      </div>
      <h3 className="text-xl font-heading font-bold text-[#111111] mt-6 mb-3 relative z-10 tracking-tight uppercase">{title}</h3>
      <p className="text-gray-500 font-mono text-[10.5px] uppercase tracking-wider leading-relaxed relative z-10">{desc}</p>
      
      {/* Decorative colored thin bar at the bottom */}
      <div className="absolute bottom-0 left-0 w-0 h-[2.5px] bg-gradient-to-r from-imperial-red to-luxury-gold group-hover:w-full transition-all duration-500 ease-out"></div>
    </motion.div>
  );
}

const StatItem: React.FC<{ stat: any, delay: number, index: number }> = ({ stat, delay, index }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const duration = 2000;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      if (progress < duration) {
        setCount(Math.floor((stat.value * progress) / duration));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(stat.value);
      }
    };
    
    const timer = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, 500 + (delay * 1000));
    
    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timer);
    };
  }, [stat.value, delay]);

  const cardsStyles = [
    "bg-white border-t-2 border-imperial-red text-[#111111] shadow-[0_10px_30px_rgba(0,0,0,0.02)]",
    "bg-white border border-luxury-gold/25 text-[#111111] shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:border-luxury-gold transition-colors",
    "bg-white border border-luxury-gold/25 text-[#111111] shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:border-luxury-gold transition-colors",
    "bg-[#111111] border-b-2 border-luxury-gold text-white shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
  ];
  const styleStr = cardsStyles[index % cardsStyles.length];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, type: "spring" }}
      className={`p-6 flex flex-col justify-center items-center text-center ${styleStr}`}
    >
      <div className="font-mono text-4xl md:text-5xl font-bold mb-2 tracking-tighter">
        {stat.prefix}{count.toLocaleString()}
      </div>
      <p className="font-mono font-bold uppercase tracking-[0.2em] text-[9px] text-gray-400">{stat.label}</p>
    </motion.div>
  );
}
