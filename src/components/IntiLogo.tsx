import React from 'react';

export default function IntiLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="200" height="200" fill="#E60000" rx="16" />
      <g transform="translate(100, 105)">
        {/* Top Rays */}
        {[-82, -64, -47.5, -31, -15.5, 0, 15.5, 31, 47.5, 64, 82].map((angle, i) => (
           <g key={`top-${i}`} transform={`rotate(${angle})`}>
             <path d="M -2.5,-22 L -9,-85 A 9 9 0 0 1 9,-85 L 2.5,-22 A 2.5 2.5 0 0 1 -2.5,-22 Z" fill="white"/>
           </g>
        ))}
        
        {/* Bottom rays */}
        {[-60, -40, -20, 0, 20, 40, 60].map((angle, i) => (
           <g key={`bot-${i}`} transform={`rotate(${angle + 180})`}>
             <path d="M -1.5,-22 L -5.5,-45 A 5.5 5.5 0 0 1 5.5,-45 L 1.5,-22 A 1.5 1.5 0 0 1 -1.5,-22 Z" fill="white"/>
           </g>
        ))}
        {/* Center red circle cutout effect is natural because we start paths at y=-22 */}
      </g>
      {/* INTI Text */}
      <text x="100" y="185" textAnchor="middle" fill="white" fontFamily="Times New Roman, serif" fontSize="48" fontWeight="bold" letterSpacing="1">INTI</text>
    </svg>
  );
}
