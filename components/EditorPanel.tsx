import React, { useState } from 'react';
import { AdState, AdLabel } from '../types';
import { generateAdCopy } from '../services/geminiService';

interface EditorPanelProps {
  data: AdState;
  onChange: (newData: AdState) => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({ data, onChange }) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'layout'>('content');

  const handleTextChange = (field: keyof AdState, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleColorChange = (key: keyof AdState['colors'], value: string) => {
    onChange({ ...data, colors: { ...data.colors, [key]: value } });
  };

  const handleImageUpload = (key: keyof AdState['images'], file: File | null) => {
    if (file) {
      const url = URL.createObjectURL(file);
      onChange({ ...data, images: { ...data.images, [key]: url } });
    }
  };

  const handleLabelChange = (id: string, text: string) => {
    const newLabels = data.labels.map(l => l.id === id ? { ...l, text } : l);
    onChange({ ...data, labels: newLabels });
  };

  const generateAI = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    const result = await generateAdCopy(prompt);
    if (result) {
      onChange({
        ...data,
        headline: result.headline,
        subHeadline: result.subHeadline,
        brandName: result.brandName,
        footerText: result.footerText,
        labels: data.labels.map((l, i) => ({
          ...l,
          text: result.labels[i] || l.text
        }))
      });
    }
    setIsGenerating(false);
  };

  return (
    <div className="bg-white border-l border-gray-200 h-full flex flex-col w-full">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {(['content', 'style', 'layout'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 text-sm font-medium uppercase tracking-wider transition-colors
              ${activeTab === tab ? 'text-black border-b-2 border-black bg-gray-50' : 'text-gray-500 hover:text-black'}
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6 overflow-y-auto flex-1 space-y-8">
        
        {/* AI GENERATOR - Always visible at top of content tab */}
        {activeTab === 'content' && (
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100 shadow-sm">
            <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-2">AI Creative Assistant</h3>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Describe your product (e.g. Vintage Summer Dress)" 
                className="flex-1 px-3 py-2 text-sm border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button 
                onClick={generateAI}
                disabled={isGenerating || !prompt}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center"
              >
                {isGenerating ? (
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : 'Magic'}
              </button>
            </div>
            <p className="text-[10px] text-indigo-400 mt-2">Powered by Gemini 2.5 Flash</p>
          </div>
        )}

        {activeTab === 'content' && (
          <>
            <div className="space-y-4">
              <h3 className="section-title">Text</h3>
              <div className="input-group">
                <label className="text-xs font-semibold text-gray-500 uppercase">Headline</label>
                <input 
                  className="input-field font-script text-xl text-red-800"
                  value={data.headline} 
                  onChange={(e) => handleTextChange('headline', e.target.value)} 
                />
              </div>
              <div className="input-group">
                <label className="text-xs font-semibold text-gray-500 uppercase">Sub-Headline</label>
                <input 
                  className="input-field font-script text-lg"
                  value={data.subHeadline} 
                  onChange={(e) => handleTextChange('subHeadline', e.target.value)} 
                />
              </div>
               <div className="input-group">
                <label className="text-xs font-semibold text-gray-500 uppercase">Brand Name</label>
                <input 
                  className="input-field"
                  value={data.brandName} 
                  onChange={(e) => handleTextChange('brandName', e.target.value)} 
                />
              </div>
              <div className="input-group">
                <label className="text-xs font-semibold text-gray-500 uppercase">Footer Info</label>
                <input 
                  className="input-field"
                  value={data.footerText} 
                  onChange={(e) => handleTextChange('footerText', e.target.value)} 
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h3 className="section-title">Labels</h3>
              {data.labels.map((label) => (
                <div key={label.id} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500 font-mono">
                    {label.id}
                  </div>
                  <input 
                    className="input-field flex-1 text-sm font-handwriting"
                    value={label.text} 
                    onChange={(e) => handleLabelChange(label.id, e.target.value)} 
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'style' && (
          <div className="space-y-6">
            <h3 className="section-title">Colors</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Background</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={data.colors.background} 
                    onChange={(e) => handleColorChange('background', e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer border-0 p-0"
                  />
                  <span className="text-xs font-mono">{data.colors.background}</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Accent (Red)</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={data.colors.accent} 
                    onChange={(e) => handleColorChange('accent', e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer border-0 p-0"
                  />
                  <span className="text-xs font-mono">{data.colors.accent}</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Text/Doodles</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={data.colors.text} 
                    onChange={(e) => handleColorChange('text', e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer border-0 p-0"
                  />
                  <span className="text-xs font-mono">{data.colors.text}</span>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
               <p className="text-sm text-gray-500 italic">
                 Tip: Use warm, muted colors for the background and strong, saturated colors for the accent to maintain the "Retro" aesthetic.
               </p>
            </div>
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="space-y-6">
            <h3 className="section-title">Images</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Main Model (Center)</label>
                <div className="relative group">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleImageUpload('main', e.target.files?.[0] || null)}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-xs file:font-semibold
                      file:bg-indigo-50 file:text-indigo-700
                      hover:file:bg-indigo-100
                    "
                  />
                  <p className="text-[10px] text-gray-400 mt-1">Use a transparent PNG for best "cutout" effect.</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                 <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Left Polaroid</label>
                 <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleImageUpload('leftPolaroid', e.target.files?.[0] || null)}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                  />
              </div>

              <div className="border-t border-gray-100 pt-4">
                 <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Right Polaroid</label>
                 <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleImageUpload('rightPolaroid', e.target.files?.[0] || null)}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                  />
              </div>
            </div>
            
            <div className="pt-8 border-t border-gray-100">
               <h3 className="section-title">Positioning</h3>
               <p className="text-sm text-gray-500">
                 Label positions are currently fixed to optimized retro grid coordinates. (Advanced dragging coming soon).
               </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .input-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .input-field { 
          width: 100%; 
          padding: 0.5rem 0.75rem; 
          border: 1px solid #e5e7eb; 
          border-radius: 0.5rem; 
          transition: all 0.2s;
        }
        .input-field:focus { 
          outline: none; 
          border-color: #4f46e5; 
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1); 
        }
        .section-title {
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          font-size: 1.125rem;
          color: #111827;
        }
      `}</style>
    </div>
  );
};
