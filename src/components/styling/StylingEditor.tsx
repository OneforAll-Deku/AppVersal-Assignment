import React from 'react';
import { useCSAT } from '../../context/CSATContext';
import { Palette, Type, Layout, Star } from 'lucide-react';
import { FontSize, FontWeight, ButtonWidthMode } from '../../types/csat';

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

const ColorInput: React.FC<ColorInputProps> = ({ label, value, onChange }) => {
  return (
    <div>
      <label className="block text-xs font-semibold text-zinc-700 mb-1.5">{label}</label>
      <div className="flex items-center gap-2.5 bg-zinc-50 p-2 rounded-xl border border-zinc-200 focus-within:border-zinc-900 focus-within:bg-white transition-colors">
        <div
          className="w-7 h-7 rounded-lg border border-zinc-300 shrink-0 shadow-2xs relative overflow-hidden cursor-pointer"
          style={{ backgroundColor: value }}
        >
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent text-xs text-zinc-900 font-mono font-medium focus:outline-none uppercase"
          maxLength={7}
        />
      </div>
    </div>
  );
};

export const StylingEditor: React.FC = () => {
  const { config, updateStyling } = useCSAT();
  const { styling } = config;

  return (
    <div className="space-y-6">
      
      <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
          <div className="p-2 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Color Customization</h3>
            <p className="text-xs text-zinc-500">Configure background, text, and action colors</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ColorInput
            label="Modal Card Background"
            value={styling.cardBackgroundColor}
            onChange={(val) => updateStyling({ cardBackgroundColor: val })}
          />

          <ColorInput
            label="Title Text Color"
            value={styling.titleColor}
            onChange={(val) => updateStyling({ titleColor: val })}
          />

          <ColorInput
            label="Subtitle Text Color"
            value={styling.subtitleColor}
            onChange={(val) => updateStyling({ subtitleColor: val })}
          />

          <ColorInput
            label="Button Background Color"
            value={styling.buttonColor}
            onChange={(val) => updateStyling({ buttonColor: val })}
          />

          <ColorInput
            label="Button Text Color"
            value={styling.buttonTextColor}
            onChange={(val) => updateStyling({ buttonTextColor: val })}
          />

          <ColorInput
            label="Backdrop Background Color"
            value={styling.backgroundColor}
            onChange={(val) => updateStyling({ backgroundColor: val })}
          />
        </div>
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
          <div className="p-2 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200">
            <Star className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Rating Colors</h3>
            <p className="text-xs text-zinc-500">Customize active & inactive states for stars and numbers</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ColorInput
            label="Rating Selected Color"
            value={styling.ratingSelectedColor}
            onChange={(val) => updateStyling({ ratingSelectedColor: val })}
          />

          <ColorInput
            label="Rating Unselected Color"
            value={styling.ratingUnselectedColor}
            onChange={(val) => updateStyling({ ratingUnselectedColor: val })}
          />
        </div>
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
          <div className="p-2 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200">
            <Type className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Typography</h3>
            <p className="text-xs text-zinc-500">Set overall font size scale and weight</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-2">Font Size Scale</label>
            <div className="grid grid-cols-4 gap-2">
              {(['sm', 'md', 'lg', 'xl'] as FontSize[]).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => updateStyling({ fontSize: size })}
                  className={`py-2 rounded-xl text-xs uppercase font-semibold border transition-all ${
                    styling.fontSize === size
                      ? 'bg-zinc-900 border-zinc-900 text-white shadow-xs'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-2">Font Weight</label>
            <div className="grid grid-cols-4 gap-2">
              {(['normal', 'medium', 'semibold', 'bold'] as FontWeight[]).map((weight) => (
                <button
                  key={weight}
                  type="button"
                  onClick={() => updateStyling({ fontWeight: weight })}
                  className={`py-2 rounded-xl text-xs capitalize font-semibold border transition-all ${
                    styling.fontWeight === weight
                      ? 'bg-zinc-900 border-zinc-900 text-white shadow-xs'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                  }`}
                >
                  {weight}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
          <div className="p-2 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200">
            <Layout className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Layout & Button Geometry</h3>
            <p className="text-xs text-zinc-500">Configure border radius, button width, and button height</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-zinc-700">
                Border Radius ({styling.borderRadius}px)
              </label>
            </div>
            <input
              type="range"
              min={0}
              max={32}
              value={styling.borderRadius}
              onChange={(e) => updateStyling({ borderRadius: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-2">Button Width Mode</label>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {(['full', 'auto', 'custom'] as ButtonWidthMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => updateStyling({ buttonWidth: mode })}
                  className={`py-2 rounded-xl text-xs capitalize font-semibold border transition-all ${
                    styling.buttonWidth === mode
                      ? 'bg-zinc-900 border-zinc-900 text-white shadow-xs'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                  }`}
                >
                  {mode === 'full' ? 'Full Width' : mode === 'auto' ? 'Auto Fit' : 'Custom Px'}
                </button>
              ))}
            </div>

            {styling.buttonWidth === 'custom' && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">Custom Width</span>
                  <span className="text-xs font-mono font-semibold text-zinc-900">{styling.buttonCustomWidth}px</span>
                </div>
                <input
                  type="range"
                  min={120}
                  max={320}
                  value={styling.buttonCustomWidth}
                  onChange={(e) => updateStyling({ buttonCustomWidth: parseInt(e.target.value) })}
                  className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
                />
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-zinc-700">
                Button Height ({styling.buttonHeight}px)
              </label>
            </div>
            <input
              type="range"
              min={36}
              max={64}
              value={styling.buttonHeight}
              onChange={(e) => updateStyling({ buttonHeight: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
            />
          </div>
        </div>
      </div>

    </div>
  );
};
