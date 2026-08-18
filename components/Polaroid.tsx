import React from 'react';

interface PolaroidProps {
  src: string | null;
  rotation?: number;
  className?: string;
}

export const Polaroid: React.FC<PolaroidProps> = ({ src, rotation = 0, className = '' }) => {
  return (
    <div 
      className={`bg-white p-3 pb-8 shadow-xl border border-gray-200 ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="w-full h-full bg-gray-200 overflow-hidden relative filter grayscale contrast-125">
         {src ? (
           <img 
            src={src} 
            alt="Polaroid" 
            className="w-full h-full object-cover" 
          />
         ) : (
           <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
         )}
         {/* Vintage overlay */}
         <div className="absolute inset-0 bg-yellow-900/10 mix-blend-overlay pointer-events-none"></div>
      </div>
    </div>
  );
};
