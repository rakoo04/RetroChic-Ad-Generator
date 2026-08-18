import React, { useState, useRef } from 'react';
import { Canvas } from './components/Canvas';
import { EditorPanel } from './components/EditorPanel';
import { DEFAULT_AD_STATE } from './constants';
import { AdState } from './types';

const App: React.FC = () => {
  const [adState, setAdState] = useState<AdState>(DEFAULT_AD_STATE);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Simple export function
  const handleExport = () => {
     alert("To save: Right click the image on the left and select 'Save Image As' (or take a screenshot for now!). Full HTML-to-Image export libraries are heavy for this demo.");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans text-gray-900">
      
      {/* Sidebar Editor (Mobile: Bottom, Desktop: Right) */}
      <div className="w-full md:w-[400px] md:h-screen z-20 order-2 md:order-2 fixed right-0 top-0 bottom-0 shadow-2xl">
        <EditorPanel data={adState} onChange={setAdState} />
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 min-h-screen md:mr-[400px] flex flex-col items-center justify-center p-4 md:p-10 order-1 bg-stone-100 overflow-y-auto">
        <div className="mb-6 flex flex-col items-center gap-2">
           <h1 className="text-3xl font-marker tracking-wider text-gray-800">Retro<span className="text-red-700">Chic</span> Builder</h1>
           <p className="text-gray-500 text-sm">Customize your vintage collage ad</p>
        </div>

        <div className="w-full max-w-[60vh] md:max-w-[500px]">
          <Canvas data={adState} canvasRef={canvasRef} />
        </div>
        
        <div className="mt-8 flex gap-4">
           <button 
             onClick={handleExport}
             className="px-6 py-3 bg-gray-900 text-white font-bold rounded-full shadow-lg hover:bg-gray-700 transform hover:-translate-y-1 transition-all"
           >
             Download Ad
           </button>
        </div>
      </div>

    </div>
  );
};

export default App;
