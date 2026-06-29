import React from 'react';
import { motion } from 'motion/react';
import { Linkedin, Twitter } from 'lucide-react';
import IntiLogo from '../components/IntiLogo';
import AnimatedHeroLogo from '../components/AnimatedHeroLogo';
import { useStore } from '../store';

export default function About() {
  const { leaders, websiteImages } = useStore();

  return (
    <div className="pt-20 bg-white min-h-screen">


      {/* Mission & Philosophy */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", stiffness: 90, damping: 15 }}
              className="lg:w-1/2 flex justify-center items-center relative z-20"
            >
              <AnimatedHeroLogo />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              className="lg:w-1/2"
            >
              <h4 className="text-imperial-red font-mono font-bold uppercase tracking-[0.3em] text-[10px] mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-imperial-red"></span> NOBLE PHILOSOPHY
              </h4>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#111111] mb-8 tracking-tight uppercase">Harmoni dalam<br/>Keberagaman</h2>
              <div className="space-y-6 text-gray-500 font-mono text-xs uppercase tracking-widest leading-relaxed border-l-2 border-imperial-red pl-6">
                <p>
                  At INTI, we believe that true strength lies in our diversity. We embrace our Chinese-Indonesian roots not as a separate entity, but as an integral thread woven tightly into the beautiful tapestry that is Indonesia.
                </p>
                <p>
                  Our mission is to foster mutual respect, social justice, and national unity. We dedicate ourselves to community service, education, and cultural preservation, ensuring that the next generation grows up in a society built on understanding and compassion.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-white tech-grid border-t border-luxury-gold/30 shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <h4 className="text-imperial-red font-mono uppercase tracking-[0.4em] font-bold text-[10px] mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-luxury-gold-dark"></span>
              OUR LEADERSHIP
            </h4>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#111111] mb-4 uppercase tracking-tighter">THE COUNCIL OF TRUSTEES</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leaders.map((leader, i) => (
              <LeaderCard key={leader.id} leader={leader} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-32 bg-gradient-to-br from-imperial-red-dark via-imperial-red to-[#5c0003] relative overflow-hidden text-white tech-grid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="border border-luxury-gold/50 p-12 bg-black/40 backdrop-blur-sm tech-glow-gold shadow-2xl relative"
          >
            {/* Fine decorative corners */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-luxury-gold/40"></div>
            <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-luxury-gold/40"></div>
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-luxury-gold/40"></div>
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-luxury-gold/40"></div>

            <h3 className="text-2xl md:text-4xl font-heading font-bold text-white uppercase tracking-tight mb-8">
              We are the bridge of harmony, <br/>rooted in <span className="text-luxury-gold font-medium">heritage</span>, <br/>entirely devoted to Indonesia.
            </h3>
            <p className="text-[10px] text-luxury-gold/80 font-mono uppercase tracking-[0.4em] font-bold flex items-center justify-center gap-4">
              <span className="w-8 h-[1px] bg-luxury-gold/30"></span>
              OUR SOLEMN PLEDGE
              <span className="w-8 h-[1px] bg-luxury-gold/30"></span>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

const LeaderCard: React.FC<{ leader: any, delay: number }> = ({ leader, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, type: "spring" }}
      className="group relative border border-luxury-gold/30 bg-white overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:border-imperial-red transition-all duration-300"
    >
      <div className="aspect-[3/4] overflow-hidden relative">
        <img 
          src={leader.img || undefined} 
          alt={leader.name} 
          className="w-full h-full object-cover filter grayscale opacity-90 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <div className="font-mono text-[9px] text-luxury-gold mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 uppercase tracking-widest font-bold bg-black/30 px-2 py-1 w-fit rounded backdrop-blur-[2px]">
          {'>'} {leader.role}
        </div>
        <h4 className="text-xl font-bold font-heading text-white uppercase tracking-tight">{leader.name}</h4>
        
        <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 mt-4 border-t border-white/20 pt-4">
          <a href="#" className="text-white hover:text-luxury-gold hover:bg-black/40 rounded p-1 transition-colors">
            <Linkedin size={14} />
          </a>
          <a href="#" className="text-white hover:text-luxury-gold hover:bg-black/40 rounded p-1 transition-colors">
            <Twitter size={14} />
          </a>
        </div>
      </div>
      
      {/* Animated Borders */}
      <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-transparent group-hover:border-imperial-red transition-all duration-300 z-20"></div>
      <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-transparent group-hover:border-imperial-red transition-all duration-300 z-20"></div>
    </motion.div>
  );
}
