import React from 'react';

export const ArrowScribble = ({ className, color }: { className?: string; color: string }) => (
  <svg viewBox="0 0 100 50" className={className} style={{ fill: 'none', stroke: color, strokeWidth: '2', strokeLinecap: 'round' }}>
    <path d="M10,25 Q50,5 90,25" />
    <path d="M80,15 L90,25 L80,35" />
  </svg>
);

export const CircleScribble = ({ className, color }: { className?: string; color: string }) => (
  <svg viewBox="0 0 100 100" className={className} style={{ fill: 'none', stroke: color, strokeWidth: '2', strokeLinecap: 'round' }}>
     <path d="M50,10 C20,10 10,40 10,50 C10,80 40,90 50,90 C80,90 90,60 90,50 C90,20 60,10 50,15" />
  </svg>
);

export const UnderlineScribble = ({ className, color }: { className?: string; color: string }) => (
  <svg viewBox="0 0 200 20" className={className} style={{ fill: 'none', stroke: color, strokeWidth: '3', strokeLinecap: 'round' }}>
    <path d="M5,10 Q50,15 100,5 Q150,0 195,10" />
    <path d="M20,18 Q80,12 180,15" opacity="0.6"/>
  </svg>
);
