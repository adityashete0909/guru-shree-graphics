'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', variant = 'dark' }) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const subSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-xs',
  };

  const isLight = variant === 'light';

  return (
    <Link href="/" className="inline-flex items-center gap-3 group select-none">
      {/* Custom Vector Emblem */}
      <div className={`relative ${iconSizes[size]} flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          {/* Outer Ring representing dynamic CMYK Printing Plates */}
          <circle cx="50" cy="50" r="44" stroke="#0B132B" strokeWidth="4" className={isLight ? 'stroke-white/40' : 'stroke-navy-900'} />
          
          {/* Cyan/Navy Arc */}
          <path d="M 50 6 A 44 44 0 0 1 94 50" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
          
          {/* Orange Accent Arc */}
          <path d="M 94 50 A 44 44 0 0 1 50 94" stroke="#EA580C" strokeWidth="7" strokeLinecap="round" />
          
          {/* Red Accent Arc */}
          <path d="M 50 94 A 44 44 0 0 1 6 50" stroke="#DC2626" strokeWidth="6" strokeLinecap="round" />
          
          {/* Golden Yellow Arc */}
          <path d="M 6 50 A 44 44 0 0 1 50 6" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />

          {/* Central Stylized GS Monogram */}
          <path
            d="M 65 35 C 60 27, 40 27, 35 37 C 30 47, 42 53, 50 56 C 58 59, 70 63, 65 73 C 60 83, 38 82, 32 73"
            stroke="url(#gsgGradient)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Printing alignment register crosshairs */}
          <circle cx="50" cy="50" r="4" fill="#EA580C" />
          
          <defs>
            <linearGradient id="gsgGradient" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EA580C" />
              <stop offset="0.5" stopColor="#DC2626" />
              <stop offset="1" stopColor="#0B132B" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-black tracking-tight uppercase ${titleSizes[size]} ${
              isLight ? 'text-white' : 'text-navy-900'
            }`}
          >
            Guru Shree
          </span>
          <span
            className={`font-black tracking-tight uppercase ${titleSizes[size]} text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-red`}
          >
            Graphics
          </span>
        </div>
        <span
          className={`font-semibold tracking-wider uppercase ${subSizes[size]} ${
            isLight ? 'text-slate-300' : 'text-slate-500'
          }`}
        >
          Printing & Designing • Akola
        </span>
      </div>
    </Link>
  );
};
