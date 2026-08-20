import React, { useState } from 'react';
import { useCSAT } from '../../context/CSATContext';
import { Star, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MediaRenderer } from './MediaRenderer';

export const CSATPopup: React.FC = () => {
  const { config, previewStep, setPreviewStep } = useCSAT();
  const { initial, feedback, thankYou, styling } = config;

  const [selectedRating, setSelectedRating] = useState<number | null>(4);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [userComment, setUserComment] = useState('');

  const fontClassMap = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  const weightClassMap = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      
    }
    setPreviewStep('thankyou');
  };

  const handleResetTest = () => {
    setSelectedRating(4);
    setSelectedOptions([]);
    setUserComment('');
    setPreviewStep('feedback');
  };

  const getButtonStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {
      backgroundColor: styling.buttonColor,
      color: styling.buttonTextColor,
      borderRadius: `${styling.borderRadius}px`,
      height: `${styling.buttonHeight}px`,
    };

    if (styling.buttonWidth === 'full') {
      style.width = '100%';
    } else if (styling.buttonWidth === 'custom') {
      style.width = `${styling.buttonCustomWidth}px`;
    } else {
      style.width = 'auto';
      style.paddingLeft = '24px';
      style.paddingRight = '24px';
    }

    return style;
  };

  return (
    <div
      className="w-full max-w-[340px] mx-auto shadow-2xl relative transition-all duration-300 overflow-hidden border"
      style={{
        backgroundColor: styling.cardBackgroundColor,
        borderColor: styling.cardBorderColor,
        borderRadius: `${styling.borderRadius}px`,
      }}
    >
      <div className="flex justify-end p-2.5 pb-0">
        <button
          onClick={handleResetTest}
          className="p-1 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
          title="Reset Interactive State"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {previewStep === 'feedback' ? (
        <form onSubmit={handleSubmit} className="p-5 pt-1 space-y-4">
          <div className="text-center space-y-1">
            <h3
              className={`tracking-tight ${fontClassMap[styling.fontSize]} ${weightClassMap[styling.fontWeight]}`}
              style={{ color: styling.titleColor }}
            >
              {initial.title || 'How satisfied are you?'}
            </h3>
            {initial.subtitle && (
              <p className="text-xs leading-relaxed" style={{ color: styling.subtitleColor }}>
                {initial.subtitle}
              </p>
            )}
          </div>

          <div className="py-1">
            {feedback.ratingType === 'stars' ? (
              <div className="flex items-center justify-center gap-1.5">
                {[1, 2, 3, 4, 5].map((num) => {
                  const isSelected = selectedRating !== null && num <= selectedRating;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setSelectedRating(num)}
                      className="p-1 transition-transform hover:scale-115 focus:outline-none"
                    >
                      <Star
                        className="w-7 h-7 transition-colors"
                        style={{
                          fill: isSelected ? styling.ratingSelectedColor : 'transparent',
                          color: isSelected ? styling.ratingSelectedColor : styling.ratingUnselectedColor,
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((num) => {
                  const isSelected = selectedRating === num;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setSelectedRating(num)}
                      className="w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center border transition-all"
                      style={{
                        backgroundColor: isSelected ? styling.ratingSelectedColor : 'transparent',
                        color: isSelected ? '#ffffff' : styling.titleColor,
                        borderColor: isSelected ? styling.ratingSelectedColor : styling.ratingUnselectedColor,
                      }}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {feedback.options.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
              {feedback.options.map((opt) => {
                const isChecked = selectedOptions.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleOption(opt.id)}
                    className="px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1 transition-all"
                    style={{
                      backgroundColor: isChecked ? styling.buttonColor : 'transparent',
                      color: isChecked ? styling.buttonTextColor : styling.titleColor,
                      borderColor: isChecked ? styling.buttonColor : styling.cardBorderColor,
                    }}
                  >
                    {isChecked && <Check className="w-3 h-3" />}
                    <span>{opt.text}</span>
                  </button>
                );
              })}
            </div>
          )}

          {feedback.allowComment && (
            <div>
              <textarea
                rows={2}
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                placeholder={feedback.commentPlaceholder}
                className="w-full px-3 py-2 text-xs rounded-xl border focus:outline-none resize-none transition-all"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.02)',
                  borderColor: styling.cardBorderColor,
                  color: styling.titleColor,
                }}
              />
            </div>
          )}

          <div className="flex justify-center pt-1">
            <button
              type="submit"
              style={getButtonStyle()}
              className="font-semibold text-xs flex items-center justify-center shadow-md transition-transform active:scale-98 hover:opacity-95"
            >
              {feedback.submitButtonText || 'Submit'}
            </button>
          </div>
        </form>
      ) : (
        <div className="p-5 pt-1 text-center space-y-4">
          <MediaRenderer mediaUrl={thankYou.mediaUrl} mediaType={thankYou.mediaType} />

          <div className="space-y-1">
            <h3
              className={`tracking-tight ${fontClassMap[styling.fontSize]} ${weightClassMap[styling.fontWeight]}`}
              style={{ color: styling.titleColor }}
            >
              {thankYou.title || 'Thank You!'}
            </h3>
            {thankYou.subtitle && (
              <p className="text-xs leading-relaxed" style={{ color: styling.subtitleColor }}>
                {thankYou.subtitle}
              </p>
            )}
          </div>

          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={handleResetTest}
              style={getButtonStyle()}
              className="font-semibold text-xs flex items-center justify-center shadow-md transition-transform active:scale-98 hover:opacity-95"
            >
              {thankYou.buttonText || 'Close'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
