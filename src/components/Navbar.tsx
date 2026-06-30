import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import IntiLogo from './IntiLogo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-luxury-gold/20 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)]"
    >
      {/* Red accent line at the very top of the nav */}
      <div className="h-[3px] w-full bg-gradient-to-r from-imperial-red via-luxury-gold to-imperial-red-dark"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3.5 group">
            <IntiLogo className="w-12 h-12 shadow-sm rounded border border-luxury-gold/30 group-hover:shadow-md group-hover:border-imperial-red group-hover:scale-105 transition-all duration-300" />
            <div className="flex flex-col justify-center">
              <span className="text-[10px] sm:text-[11.5px] font-heading font-extrabold tracking-[0.18em] text-[#111111] uppercase leading-none">
                Perhimpunan
              </span>
              <span className="text-[10px] sm:text-[11.5px] font-heading font-extrabold tracking-[0.18em] text-[#111111] uppercase leading-none mt-1">
                Indonesia Tionghoa
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/magazine">Magazine</NavLink>
            <Link to="/join">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2.5 bg-[#111] hover:bg-imperial-red text-white font-mono text-[9px] uppercase tracking-widest font-bold border border-transparent hover:tech-glow hover:border-luxury-gold/30 transition-all duration-300 cursor-pointer"
              >
                Join INTI
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#1a1a1a] hover:text-imperial-red transition-colors">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white border-b border-luxury-gold/30 px-6 pt-4 pb-8 space-y-4 shadow-xl"
        >
          <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
          <MobileNavLink to="/about" onClick={() => setIsOpen(false)}>About Us</MobileNavLink>
          <MobileNavLink to="/magazine" onClick={() => setIsOpen(false)}>Magazine</MobileNavLink>
          <Link to="/join" onClick={() => setIsOpen(false)} className="block">
            <button className="w-full px-6 py-3 bg-[#111] text-white font-mono text-[10px] uppercase tracking-widest font-bold border border-luxury-gold/30 hover:bg-imperial-red transition-all mt-4 cursor-pointer">
              Join INTI
            </button>
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
}

function NavLink({ to, children }: { to: string, children: React.ReactNode }) {
  return (
    <Link to={to} className="relative font-mono text-[11px] uppercase tracking-widest font-semibold text-gray-600 hover:text-imperial-red transition-colors group py-2">
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-imperial-red group-hover:w-full transition-all duration-300 ease-out"></span>
    </Link>
  );
}

function MobileNavLink({ to, children, onClick }: { to: string, children: React.ReactNode, onClick: () => void }) {
  return (
    <Link to={to} onClick={onClick} className="block font-mono text-sm tracking-widest uppercase font-semibold text-gray-600 hover:text-imperial-red hover:pl-2 transition-all py-2 border-l-2 border-transparent hover:border-imperial-red">
      {children}
    </Link>
  );
}
