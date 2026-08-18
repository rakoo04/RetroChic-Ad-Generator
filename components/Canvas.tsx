import React from 'react';
import { AdState } from '../types';
import { Tape } from './Tape';
import { Polaroid } from './Polaroid';
import { ArrowScribble, CircleScribble, UnderlineScribble } from './Scribbles';

interface CanvasProps {
  data: AdState;
  canvasRef: React.RefObject<HTMLDivElement>;
}

export const Canvas: React.FC<CanvasProps> = ({ data, canvasRef }) => {
  return (
    <div 
      ref={canvasRef}
      className="w-full relative shadow-2xl overflow-hidden paper-texture select-none"
      style={{
        aspectRatio: '4/5',
        backgroundColor: data.colors.background,
        color: data.colors.text,
      }}
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none"
           style={{ backgroundImage: `radial-gradient(circle at 50% 50%, #ffffff 0%, transparent 60%)` }}
      />

      {/* Main Headline */}
      <div className="absolute top-[5%] w-full text-center z-30 px-4">
        <h1 
          className="font-script text-[15cqw] leading-none drop-shadow-lg"
          style={{ color: data.colors.accent }}
        >
          {data.headline}
        </h1>
        {/* Decorative Scribbles under headline */}
         <UnderlineScribble 
            color={data.colors.text} 
            className="w-[60%] h-10 mx-auto -mt-2 opacity-80" 
         />
      </div>

      {/* Main Image (Cutout style center) */}
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[50%] h-[60%] z-20 pointer-events-none">
        {data.images.main && (
           <img 
             src={data.images.main} 
             alt="Main Model" 
             className="w-full h-full object-contain drop-shadow-2xl filter contrast-110"
           />
        )}
      </div>

      {/* Left Polaroid */}
      <div className="absolute top-[30%] left-[-5%] w-[40%] z-10">
        <Polaroid src={data.images.leftPolaroid} rotation={-6} className="w-full h-auto aspect-[4/5]" />
        {/* Doodle behind polaroid */}
        <CircleScribble color={data.colors.text} className="absolute -left-10 top-1/2 w-32 h-32 opacity-60 -z-10" />
      </div>

      {/* Right Polaroid */}
      <div className="absolute top-[25%] right-[-5%] w-[40%] z-10">
        <Polaroid src={data.images.rightPolaroid} rotation={4} className="w-full h-auto aspect-[4/5]" />
      </div>

      {/* SubHeadline */}
      <div className="absolute bottom-[20%] right-[5%] z-30 transform rotate-[-5deg]">
        <h2 
           className="font-script text-[12cqw] leading-none"
           style={{ color: data.colors.accent }}
        >
          {data.subHeadline}
        </h2>
         <UnderlineScribble 
            color={data.colors.text} 
            className="w-[120%] h-8 -ml-2 opacity-80" 
         />
      </div>

      {/* Labels */}
      {data.labels.map((label) => (
        <div
          key={label.id}
          className="absolute z-40 transition-all duration-300"
          style={{
            left: `${label.x}%`,
            top: `${label.y}%`,
          }}
        >
          <Tape rotation={label.rotation}>{label.text}</Tape>
          {/* Decorative arrows based on position roughly */}
          <ArrowScribble 
            color={data.colors.text} 
            className={`absolute w-16 h-16 opacity-70 pointer-events-none
              ${label.x < 50 ? 'left-full top-1/2 rotate-12' : 'right-full top-1/2 rotate-[160deg]'}
            `} 
          />
        </div>
      ))}

      {/* Footer */}
      <div className="absolute bottom-0 w-full p-8 flex justify-between items-end z-30 font-sans text-[3cqw] font-semibold tracking-widest text-gray-700 uppercase opacity-80">
        <span>{data.brandName}</span>
        <span>{data.footerText}</span>
      </div>

      {/* Overlay Texture (Old Paper) */}
      <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dust.png')]"></div>
    </div>
  );
};
