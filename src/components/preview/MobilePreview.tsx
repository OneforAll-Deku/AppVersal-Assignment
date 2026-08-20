import React from 'react';
import { useCSAT } from '../../context/CSATContext';
import { CSATPopup } from './CSATPopup';
import { Wifi, Signal, Battery, Eye, RefreshCw } from 'lucide-react';

export const MobilePreview: React.FC = () => {
  const { config, previewStep, setPreviewStep } = useCSAT();

  return (
    <div className="h-full flex flex-col items-center justify-center p-2 lg:p-4">
      
      <div className="flex items-center gap-2 mb-5 bg-white p-1.5 rounded-2xl border border-zinc-200 shadow-xs">
        <span className="text-xs text-zinc-500 pl-2 font-medium flex items-center gap-1.5 select-none">
          <Eye className="w-3.5 h-3.5 text-zinc-700" /> Preview:
        </span>
        <button
          type="button"
          onClick={() => setPreviewStep('feedback')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
            previewStep === 'feedback'
              ? 'bg-zinc-900 text-white shadow-sm scale-102'
              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
          }`}
        >
          Feedback Page
        </button>
        <button
          type="button"
          onClick={() => setPreviewStep('thankyou')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
            previewStep === 'thankyou'
              ? 'bg-zinc-900 text-white shadow-sm scale-102'
              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
          }`}
        >
          Thank You Page
        </button>
      </div>

      <div className="relative w-[340px] sm:w-[375px] h-[680px] bg-zinc-950 rounded-[48px] p-3 shadow-2xl ring-1 ring-zinc-900/10 border-[6px] border-zinc-800">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-zinc-800 rounded-b-2xl z-30 flex items-center justify-center">
          <div className="w-12 h-1 bg-zinc-900 rounded-full" />
          <div className="w-3 h-3 rounded-full bg-zinc-900 absolute right-4" />
        </div>

        <div
          className="w-full h-full rounded-[38px] overflow-hidden relative flex flex-col transition-colors duration-300"
          style={{ backgroundColor: config.styling.backgroundColor || '#ffffff' }}
        >
          <div className="pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-semibold text-zinc-400 z-20">
            <span>9:41</span>
            <div className="flex items-center gap-1.5 text-zinc-400">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="flex-1 px-4 flex flex-col justify-end pb-10 z-20">
            <CSATPopup />
          </div>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-zinc-400/40 rounded-full z-20" />
        </div>

      </div>

      <div className="mt-4 flex items-center gap-2 text-zinc-400 text-xs font-medium">
        <RefreshCw className="w-3.5 h-3.5 animate-spin text-zinc-500" />
        <span>Live preview synced in real-time</span>
      </div>
    </div>
  );
};
