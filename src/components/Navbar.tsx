import React, { useRef } from 'react';
import { useCSAT, PRESET_THEMES } from '../context/CSATContext';
import { Layers, Palette, RefreshCw, Download, Upload, ChevronDown } from 'lucide-react';
import { AppVersalLogo } from './AppVersalLogo';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    applyPresetTheme,
    resetConfig,
    exportConfig,
    importConfig,
  } = useCSAT();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importConfig(content);
        if (!success) {
          alert('Invalid CSAT Configuration JSON file.');
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <header className="border-b border-zinc-200 bg-white sticky top-0 z-40 px-4 lg:px-8 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-5 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <AppVersalLogo iconSize={34} />
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 hidden sm:inline-block">
              CSAT Builder
            </span>
          </div>

          <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl border border-zinc-200">
            <button
              onClick={() => setActiveTab('content')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'content'
                  ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200/80 font-semibold'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Content</span>
            </button>
            <button
              onClick={() => setActiveTab('styling')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'styling'
                  ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200/80 font-semibold'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Styling</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end overflow-x-auto pb-1 md:pb-0">
          <div className="relative group">
            <select
              onChange={(e) => {
                const idx = parseInt(e.target.value);
                if (!isNaN(idx) && PRESET_THEMES[idx]) {
                  applyPresetTheme(PRESET_THEMES[idx].colors);
                }
              }}
              defaultValue=""
              className="appearance-none bg-zinc-50 hover:bg-zinc-100 text-zinc-800 text-xs rounded-xl px-3 py-2 pr-8 border border-zinc-200 font-medium cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900"
            >
              <option value="" disabled>Theme Presets</option>
              {PRESET_THEMES.map((theme, index) => (
                <option key={theme.name} value={index}>
                  {theme.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            onClick={exportConfig}
            title="Export Configuration JSON"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-medium border border-zinc-200 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-zinc-500" />
            <span className="hidden sm:inline">Export</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            title="Import Configuration JSON"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-medium border border-zinc-200 transition-colors shadow-2xs"
          >
            <Upload className="w-3.5 h-3.5 text-zinc-500" />
            <span className="hidden sm:inline">Import</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".json"
            className="hidden"
          />

          <button
            onClick={resetConfig}
            title="Reset to Default Configuration"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-zinc-600 text-xs font-medium border border-zinc-200 transition-colors shadow-2xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

      </div>
    </header>
  );
};
