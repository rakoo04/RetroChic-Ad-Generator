import React from 'react';

interface TapeProps {
  children: React.ReactNode;
  className?: string;
  rotation?: number;
}

export const Tape: React.FC<TapeProps> = ({ children, className = '', rotation = 0 }) => {
  return (
    <div 
      className={`relative inline-block px-4 py-1 bg-white/90 shadow-md ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        // CSS clip-path to simulate torn edges
        clipPath: 'polygon(2% 0%, 98% 0%, 100% 100%, 0% 100%)',
        maskImage: `linear-gradient(45deg, transparent 5px, black 5px), linear-gradient(-45deg, transparent 5px, black 5px)`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/30 to-transparent pointer-events-none" />
      <span className="font-script text-xl text-gray-800 relative z-10 whitespace-nowrap">
        {children}
      </span>
      {/* Tape texture overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #000 2px, #000 4px)' }}>
      </div>
    </div>
  );
};
