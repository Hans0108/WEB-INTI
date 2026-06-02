import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, ArrowRight } from 'lucide-react';
import IntiLogo from './IntiLogo';

export default function Footer() {
  return (
    <footer className="bg-white text-[#1a1a1a] pt-20 pb-10 border-t border-luxury-gold/30 tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-4">
              <IntiLogo className="w-12 h-12 shadow-sm rounded border border-imperial-red/20 group-hover:scale-105 transition-all duration-300" />
              <span className="font-heading font-bold text-2xl tracking-tighter text-[#1a1a1a]">
                INTI<span className="text-imperial-red">_</span>
              </span>
            </Link>
            <p className="text-gray-500 font-mono text-xs leading-relaxed">
              Perhimpunan Indonesia Tionghoa. Bridging cultures, fostering unity, and building a stronger, harmonious Indonesia together.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={Facebook} />
              <SocialIcon icon={Twitter} />
              <SocialIcon icon={Instagram} />
              <SocialIcon icon={Linkedin} />
            </div>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a] mb-6 border-b border-luxury-gold/30 pb-2 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-imperial-red"></span>Quick Links</h3>
            <ul className="space-y-4 text-gray-600 text-[10px] font-mono uppercase tracking-widest font-bold">
              <FooterLink to="/about">About System</FooterLink>
              <FooterLink to="/magazine">Data Logs</FooterLink>
              <FooterLink to="#">Event Matrix</FooterLink>
              <FooterLink to="#">Access Nodes</FooterLink>
              <FooterLink to="#">Ping Us</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a] mb-6 border-b border-luxury-gold/30 pb-2 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-imperial-red"></span>Contact Us</h3>
            <ul className="space-y-4 text-gray-500 text-xs font-mono">
              <li>123 / SECTOR 7<br/>JAKARTA, ID 10000</li>
              <li className="text-imperial-red">sys.admin@inti.or.id</li>
              <li>+62-21-1234-5678</li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a] mb-6 border-b border-luxury-gold/30 pb-2 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-imperial-red"></span>Feed</h3>
            <p className="text-gray-500 font-mono text-xs mb-4">Subscribe to data streams.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="ENTER_EMAIL" 
                className="bg-white text-[#1a1a1a] border border-luxury-gold/30 px-4 py-2 focus:outline-none focus:border-imperial-red w-full text-xs font-mono placeholder-gray-400 font-bold"
              />
              <button 
                type="submit" 
                className="bg-imperial-red/5 hover:bg-imperial-red transition-colors px-5 py-2 border border-l-0 border-luxury-gold/30 hover:border-imperial-red flex items-center justify-center text-imperial-red hover:text-white"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-luxury-gold/30 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 font-mono text-[9px] uppercase tracking-widest font-bold">
          <p>SYS.DATE::{new Date().getFullYear()} / INTI / ALL_RIGHTS_RESERVED_</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="hover:text-imperial-red transition-colors">Privacy_Protocol</Link>
            <Link to="#" className="hover:text-imperial-red transition-colors">Terms_Of_Usage</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon: Icon }: { icon: any }) {
  return (
    <a href="#" className="w-10 h-10 border border-luxury-gold/30 bg-white flex items-center justify-center text-imperial-red hover:text-white hover:bg-imperial-red hover:border-imperial-red hover:tech-glow transition-all duration-300">
      <Icon size={16} />
    </a>
  );
}

function FooterLink({ to, children }: { to: string, children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="text-gray-500 hover:text-imperial-red hover:translate-x-2 transition-all duration-300 inline-flex items-center group">
        <span className="w-0 h-[1px] bg-imperial-red mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
        {children}
      </Link>
    </li>
  );
}
