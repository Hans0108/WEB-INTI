import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, ArrowRight } from 'lucide-react';
import IntiLogo from './IntiLogo';

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white pt-20 pb-12 border-t border-luxury-gold/30 tech-grid relative overflow-hidden">
      {/* Decorative subtle gold-to-red glow */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-imperial-red via-luxury-gold to-imperial-red-dark"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-4 group">
              <IntiLogo className="w-12 h-12 shadow-sm rounded border border-luxury-gold/20 group-hover:border-luxury-gold transition-all duration-300" />
              <div className="flex flex-col justify-center">
                <span className="text-[10px] sm:text-[11.5px] font-heading font-extrabold tracking-[0.18em] text-white uppercase leading-none">
                  Perhimpunan
                </span>
                <span className="text-[10px] sm:text-[11.5px] font-heading font-extrabold tracking-[0.18em] text-white uppercase leading-none mt-1">
                  Indonesia Tionghoa
                </span>
              </div>
            </Link>
            <p className="text-gray-400 font-mono text-xs leading-relaxed">
              Fostering harmony, bridging Indonesian cultures, and building national unity through mutual respect and collective empowerment.
            </p>
            <div className="flex space-x-3.5">
              <SocialIcon icon={Facebook} />
              <SocialIcon icon={Twitter} />
              <SocialIcon icon={Instagram} />
              <SocialIcon icon={Linkedin} />
            </div>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-gold mb-6 border-b border-luxury-gold/20 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-imperial-red rounded-full"></span>
              Quick Navigation
            </h3>
            <ul className="space-y-3.5 text-gray-300 text-[10px] font-mono uppercase tracking-widest font-semibold">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/magazine">Magazine</FooterLink>
              <FooterLink to="/admin">Admin Panel</FooterLink>
              <FooterLink to="#">Event Matrix</FooterLink>
              <FooterLink to="#">Access Nodes</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-gold mb-6 border-b border-luxury-gold/20 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-imperial-red rounded-full"></span>
              Headquarters
            </h3>
            <ul className="space-y-4 text-gray-300 text-xs font-mono">
              <li className="tracking-wide">123 SECTOR 7<br/>JAKARTA, ID 10000</li>
              <li className="text-imperial-red font-bold hover:underline cursor-pointer">sys.admin@inti.or.id</li>
              <li className="text-gray-400">+62-21-1234-5678</li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-gold mb-6 border-b border-luxury-gold/20 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-imperial-red rounded-full"></span>
              Data Stream
            </h3>
            <p className="text-gray-400 font-mono text-[11px] mb-4">Subscribe to updates.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="ENTER_EMAIL" 
                className="bg-black/40 text-white border border-luxury-gold/20 px-4 py-2.5 focus:outline-none focus:border-imperial-red w-full text-xs font-mono placeholder-gray-500 font-bold"
              />
              <button 
                type="submit" 
                className="bg-imperial-red hover:bg-imperial-red-dark transition-colors px-5 py-2.5 border border-l-0 border-luxury-gold/20 flex items-center justify-center text-white cursor-pointer"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-luxury-gold/15 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 font-mono text-[9px] uppercase tracking-widest font-bold">
          <p>SYS.DATE::{new Date().getFullYear()} / INTI / ALL_RIGHTS_RESERVED_</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="hover:text-luxury-gold transition-colors">Privacy_Protocol</Link>
            <Link to="#" className="hover:text-luxury-gold transition-colors">Terms_Of_Usage</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon: Icon }: { icon: any }) {
  return (
    <a href="#" className="w-10 h-10 border border-luxury-gold/20 bg-white/5 flex items-center justify-center text-luxury-gold hover:text-white hover:bg-imperial-red hover:border-imperial-red transition-all duration-300">
      <Icon size={15} />
    </a>
  );
}

function FooterLink({ to, children }: { to: string, children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="text-gray-400 hover:text-luxury-gold hover:translate-x-1.5 transition-all duration-300 inline-flex items-center group">
        <span className="w-0 h-[1.5px] bg-imperial-red mr-0 group-hover:w-2.5 group-hover:mr-1.5 transition-all duration-300"></span>
        {children}
      </Link>
    </li>
  );
}
