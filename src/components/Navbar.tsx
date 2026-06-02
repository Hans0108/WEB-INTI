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
      className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-imperial-red/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-4 group">
            <IntiLogo className="w-12 h-12 shadow-sm rounded border border-imperial-red/20 group-hover:shadow-lg group-hover:border-imperial-red group-hover:scale-105 transition-all duration-300" />
            <span className="font-heading font-bold text-2xl tracking-tighter text-[#1a1a1a] transition-colors duration-300">
              INTI<span className="text-imperial-red animate-pulse">_</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/magazine">Magazine</NavLink>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-imperial-red/10 text-imperial-red font-mono text-[10px] uppercase tracking-widest font-bold rounded border border-imperial-red/50 hover:bg-imperial-red hover:text-white hover:tech-glow transition-all"
            >
              SYS.JOIN()
            </motion.button>
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
          className="md:hidden bg-white border-b border-imperial-red/10 px-4 pt-2 pb-6 space-y-4 shadow-xl"
        >
          <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
          <MobileNavLink to="/about" onClick={() => setIsOpen(false)}>About Us</MobileNavLink>
          <MobileNavLink to="/magazine" onClick={() => setIsOpen(false)}>Magazine</MobileNavLink>
          <button className="w-full px-6 py-3 bg-imperial-red/10 text-imperial-red font-mono text-[10px] uppercase tracking-widest font-bold rounded border border-imperial-red/50 hover:bg-imperial-red hover:text-white transition-all mt-4">
            SYS.JOIN()
          </button>
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
