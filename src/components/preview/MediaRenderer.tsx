import React, { useEffect, useRef, useState } from 'react';
import { MediaType } from '../../types/csat';
import { CheckCircle2, PartyPopper } from 'lucide-react';

interface MediaRendererProps {
  mediaUrl: string;
  mediaType: MediaType;
}

export const MediaRenderer: React.FC<MediaRendererProps> = ({ mediaUrl, mediaType }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [mediaUrl, mediaType]);

  if (!mediaUrl || error) {
    return (
      <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shadow-xs">
        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
      </div>
    );
  }

  if (mediaType === 'lottie') {
    let embedUrl = mediaUrl;
    if (mediaUrl.includes('lottiefiles.com/packages/')) {
      const match = mediaUrl.match(/(lf20_[a-zA-Z0-9]+)/);
      if (match && match[1]) {
        embedUrl = `https://embed.lottiefiles.com/animation/${match[1]}`;
      } else {
        const id = mediaUrl.split('/').pop()?.replace('.json', '');
        embedUrl = `https://embed.lottiefiles.com/animation/${id}`;
      }
    }

    return (
      <div className="w-24 h-24 mx-auto flex items-center justify-center overflow-hidden">
        {mediaUrl.startsWith('http') || mediaUrl.startsWith('data:') || mediaUrl.startsWith('/') ? (
          <lottie-player
            src={mediaUrl}
            background="transparent"
            speed="1"
            style={{ width: '100%', height: '100%' }}
            loop
            autoplay
            onError={() => setError(true)}
          >
            <iframe
              src={embedUrl}
              className="w-full h-full border-0 pointer-events-none scale-125"
              title="Lottie animation"
              onError={() => setError(true)}
            />
          </lottie-player>
        ) : (
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
            <PartyPopper className="w-8 h-8 text-indigo-600" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-24 h-24 mx-auto flex items-center justify-center overflow-hidden">
      <img
        src={mediaUrl}
        alt="Feedback celebration"
        onError={() => setError(true)}
        className="max-w-full max-h-full object-contain drop-shadow-xs transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
};
