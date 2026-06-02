import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Users, Calendar, Heart } from 'lucide-react';
import IntiLogo from '../components/IntiLogo';

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
  return (
    <div className="overflow-hidden bg-[#FAFAFA]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center tech-grid">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
          <IntiLogo className="w-[120vw] h-[120vw] max-w-[1200px] max-h-[1200px] opacity-20 translate-x-1/4 translate-y-1/4" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-transparent to-transparent z-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAFA] via-[#FAFAFA]/90 to-transparent z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            >
              <h4 className="flex items-center gap-3 text-imperial-red font-mono uppercase tracking-[0.4em] font-bold text-xs mb-6">
                <span className="w-2 h-2 bg-imperial-red animate-pulse tech-glow"></span>
                SYS.INIT // 1999
              </h4>
              <h1 className="text-6xl md:text-8xl font-heading font-bold text-[#1a1a1a] leading-[0.9] mb-6 tracking-tighter">
                Bridging <br/>Cultures<span className="text-imperial-red animate-pulse">_</span><br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-imperial-red via-luxury-gold to-imperial-red bg-[length:200%_auto] animate-[gradient_4s_linear_infinite]">Building Harmony</span>
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              className="font-mono text-sm text-gray-400 mb-10 max-w-2xl leading-relaxed uppercase tracking-wider"
            >
              Perhimpunan Indonesia Tionghoa (INTI) is dedicated to fostering unity, preserving cultural heritage, and contributing to the advancement of the Indonesian nation through inclusivity and compassion.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
              className="flex flex-wrap gap-4"
            >
              <button className="bg-imperial-red/10 text-imperial-red px-8 py-4 text-[10px] font-mono font-bold uppercase tracking-[0.3em] border border-imperial-red hover:bg-imperial-red hover:text-white hover:tech-glow transition-all duration-300 flex items-center group">
                Execute_Story()
                <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={16} />
              </button>
              <button className="bg-white text-[#1a1a1a] border border-luxury-gold/50 px-8 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.3em] hover:border-imperial-red hover:text-imperial-red transition-colors duration-300">
                Join_Network
              </button>
            </motion.div>
          </div>
        </div>
        
        {/* Futuristic elements */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute -right-64 top-0 w-[800px] h-[800px] border border-luxury-gold/20 rounded-full z-0 pointer-events-none grid grid-cols-2 grid-rows-2 p-10 bg-white/30 backdrop-blur-[2px]"
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
                CORE_MODULES
              </h4>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1a1a1a] tracking-tight">System Pillars</h2>
            </div>
            <p className="font-mono text-gray-500 text-[10px] uppercase tracking-widest max-w-sm border-l border-luxury-gold/30 pl-4">
              Executing directives for cultural integration and collective empowerment sequence.
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
              TRACE_HISTORY
            </h4>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1a1a1a] tracking-tight">System Chronology</h2>
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
      whileHover={{ y: -5 }}
      className="bg-white p-8 border border-luxury-gold/30 shadow-sm hover:shadow-lg hover:border-imperial-red transition-all duration-300 flex flex-col group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 text-gray-200 group-hover:text-imperial-red/10 transition-colors text-6xl font-mono leading-none font-bold">
        0{delay * 10 + 1}
      </div>
      <div className="w-12 h-12 bg-imperial-red/5 border border-imperial-red/20 flex items-center justify-center text-imperial-red mb-6 group-hover:bg-luxury-gold group-hover:border-luxury-gold group-hover:text-white transition-all duration-300 relative z-10">
        <Icon size={20} />
      </div>
      <h3 className="text-xl font-heading font-bold text-[#1a1a1a] mb-3 relative z-10 tracking-tight">{title}</h3>
      <p className="text-gray-500 font-mono text-xs uppercase tracking-widest leading-relaxed relative z-10">{desc}</p>
      
      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-imperial-red group-hover:w-full transition-all duration-500 ease-out"></div>
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
    "bg-white border-b-4 border-imperial-red text-imperial-red shadow-[0_4px_20px_-5px_rgba(230,0,0,0.2)]",
    "bg-white border border-luxury-gold/50 text-[#1a1a1a] hover:border-luxury-gold transition-colors shadow-sm",
    "bg-white border border-luxury-gold/50 text-[#1a1a1a] hover:border-luxury-gold transition-colors shadow-sm",
    "bg-[#1a1a1a] border-t-4 border-luxury-gold text-white shadow-lg"
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
