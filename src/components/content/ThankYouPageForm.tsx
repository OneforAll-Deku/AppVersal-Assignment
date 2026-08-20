import React, { useRef } from 'react';
import { useCSAT } from '../../context/CSATContext';
import { HeartHandshake, Upload, Image as ImageIcon, Bookmark, XCircle } from 'lucide-react';
import { MediaType } from '../../types/csat';

const MEDIA_PRESETS: { name: string; url: string; type: MediaType }[] = [
  {
    name: 'Star Burst Lottie',
    url: 'https://assets4.lottiefiles.com/packages/lf20_j1adxtyb.json',
    type: 'lottie',
  },
  {
    name: 'Party Confetti GIF',
    url: 'https://media.giphy.com/media/g9582DNuQppxC/giphy.gif',
    type: 'gif',
  },
  {
    name: 'Success Badge Image',
    url: 'https://cdn-icons-png.flaticon.com/512/7518/7518748.png',
    type: 'image',
  },
];

export const ThankYouPageForm: React.FC = () => {
  const { config, updateThankYou, setPreviewStep } = useCSAT();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileType = file.type;
    const isLottie = file.name.endsWith('.json') || fileType === 'application/json';
    const isGif = fileType === 'image/gif';
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        updateThankYou({
          mediaUrl: result,
          mediaType: isLottie ? 'lottie' : isGif ? 'gif' : 'image',
        });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div
      onClickCapture={() => setPreviewStep('thankyou')}
      className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs space-y-5"
    >
      <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
        <div className="p-2 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200">
          <HeartHandshake className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-900">Thank You Page</h3>
          <p className="text-xs text-zinc-500">Configure media graphic, appreciation message & final action button</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
            Media Graphic (PNG, JPG, JPEG, GIF, Lottie JSON)
          </label>

          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-medium transition-colors"
              >
                <Upload className="w-3.5 h-3.5 text-zinc-600" />
                <span>Upload Media File</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".png,.jpg,.jpeg,.gif,.json,image/*,application/json"
                className="hidden"
              />
            </div>

            <div>
              <div className="relative">
                <input
                  type="text"
                  value={config.thankYou.mediaUrl}
                  onChange={(e) => {
                    const val = e.target.value;
                    let detectedType: MediaType = 'image';
                    if (val.endsWith('.json')) detectedType = 'lottie';
                    else if (val.endsWith('.gif')) detectedType = 'gif';
                    updateThankYou({ mediaUrl: val, mediaType: detectedType });
                  }}
                  placeholder="Or paste Media URL (Image, GIF, or Lottie JSON)..."
                  className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-900 text-xs focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all placeholder:text-zinc-400"
                />
                <ImageIcon className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                {config.thankYou.mediaUrl && (
                  <button
                    type="button"
                    onClick={() => updateThankYou({ mediaUrl: '', mediaType: 'image' })}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1">
              <span className="text-[11px] text-zinc-500 shrink-0 flex items-center gap-1 font-medium">
                <Bookmark className="w-3 h-3 text-zinc-600" /> Presets:
              </span>
              {MEDIA_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() =>
                    updateThankYou({
                      mediaUrl: preset.url,
                      mediaType: preset.type,
                    })
                  }
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium shrink-0 border transition-all ${
                    config.thankYou.mediaUrl === preset.url
                      ? 'bg-zinc-900 border-zinc-900 text-white shadow-xs'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 bg-zinc-50 p-2.5 rounded-xl border border-zinc-200">
              <span className="text-xs font-semibold text-zinc-600">Media Format:</span>
              <div className="flex items-center gap-3">
                {(['image', 'gif', 'lottie'] as MediaType[]).map((type) => (
                  <label key={type} className="flex items-center gap-1.5 cursor-pointer text-xs capitalize text-zinc-700 font-medium">
                    <input
                      type="radio"
                      name="mediaType"
                      checked={config.thankYou.mediaType === type}
                      onChange={() => updateThankYou({ mediaType: type })}
                      className="text-zinc-900 focus:ring-zinc-900 h-3.5 w-3.5 bg-white border-zinc-300"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
            Thank You Title
          </label>
          <input
            type="text"
            value={config.thankYou.title}
            onChange={(e) => updateThankYou({ title: e.target.value })}
            placeholder="e.g. Thank You for Your Feedback!"
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-900 text-xs focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all placeholder:text-zinc-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
            Thank You Subtitle
          </label>
          <textarea
            rows={2}
            value={config.thankYou.subtitle}
            onChange={(e) => updateThankYou({ subtitle: e.target.value })}
            placeholder="e.g. Your response helps us improve AppVersal for everyone."
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-900 text-xs focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all placeholder:text-zinc-400 resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
            Close / Action Button Text
          </label>
          <input
            type="text"
            value={config.thankYou.buttonText}
            onChange={(e) => updateThankYou({ buttonText: e.target.value })}
            placeholder="Close Window"
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-900 text-xs focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all placeholder:text-zinc-400"
          />
        </div>
      </div>
    </div>
  );
};
