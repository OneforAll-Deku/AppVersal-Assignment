import React, { createContext, useContext, useState } from 'react';
import { CSATConfig, TabType, PreviewStep, StylingConfig } from '../types/csat';

export const defaultConfig: CSATConfig = {
  initial: {
    title: 'How satisfied are you with our service?',
    subtitle: 'We value your feedback to make our product even better for you.',
  },
  feedback: {
    ratingType: 'stars',
    ratingScale: 5,
    options: [
      { id: '1', text: 'Fast & responsive' },
      { id: '2', text: 'Clean user interface' },
      { id: '3', text: 'Easy to navigate' },
      { id: '4', text: 'Great features' },
    ],
    allowComment: true,
    commentPlaceholder: 'Tell us a bit more about your experience...',
    submitButtonText: 'Submit Feedback',
  },
  thankYou: {
    mediaUrl: 'https://assets4.lottiefiles.com/packages/lf20_j1adxtyb.json',
    mediaType: 'lottie',
    title: 'Thank You for Your Feedback!',
    subtitle: 'Your response helps us improve AppVersal for everyone.',
    buttonText: 'Close Window',
  },
  styling: {
    backgroundColor: '#ffffff',
    titleColor: '#0f172a',
    subtitleColor: '#64748b',
    buttonColor: '#4f46e5',
    buttonTextColor: '#ffffff',
    fontSize: 'md',
    fontWeight: 'medium',
    borderRadius: 16,
    buttonWidth: 'full',
    buttonCustomWidth: 200,
    buttonHeight: 46,
    ratingSelectedColor: '#f59e0b',
    ratingUnselectedColor: '#e2e8f0',
    cardBackgroundColor: '#ffffff',
    cardBorderColor: '#e2e8f0',
  },
};

export const PRESET_THEMES: { name: string; colors: Partial<StylingConfig> }[] = [
  {
    name: 'Indigo Modern',
    colors: {
      backgroundColor: '#ffffff',
      titleColor: '#0f172a',
      subtitleColor: '#64748b',
      buttonColor: '#4f46e5',
      buttonTextColor: '#ffffff',
      ratingSelectedColor: '#f59e0b',
      ratingUnselectedColor: '#e2e8f0',
      cardBackgroundColor: '#ffffff',
    },
  },
  {
    name: 'Emerald Clean',
    colors: {
      backgroundColor: '#f0fdf4',
      titleColor: '#064e3b',
      subtitleColor: '#047857',
      buttonColor: '#059669',
      buttonTextColor: '#ffffff',
      ratingSelectedColor: '#10b981',
      ratingUnselectedColor: '#cbd5e1',
      cardBackgroundColor: '#ffffff',
    },
  },
  {
    name: 'Midnight Dark',
    colors: {
      backgroundColor: '#0f172a',
      titleColor: '#f8fafc',
      subtitleColor: '#94a3b8',
      buttonColor: '#6366f1',
      buttonTextColor: '#ffffff',
      ratingSelectedColor: '#fbbf24',
      ratingUnselectedColor: '#334155',
      cardBackgroundColor: '#1e293b',
    },
  },
  {
    name: 'Sunset Rose',
    colors: {
      backgroundColor: '#fff1f2',
      titleColor: '#881337',
      subtitleColor: '#be123c',
      buttonColor: '#e11d48',
      buttonTextColor: '#ffffff',
      ratingSelectedColor: '#f43f5e',
      ratingUnselectedColor: '#ffe4e6',
      cardBackgroundColor: '#ffffff',
    },
  },
  {
    name: 'Minimal Dark',
    colors: {
      backgroundColor: '#18181b',
      titleColor: '#fafafa',
      subtitleColor: '#a1a1aa',
      buttonColor: '#27272a',
      buttonTextColor: '#ffffff',
      ratingSelectedColor: '#e4e4e7',
      ratingUnselectedColor: '#3f3f46',
      cardBackgroundColor: '#27272a',
    },
  },
];

interface CSATContextValue {
  config: CSATConfig;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  previewStep: PreviewStep;
  setPreviewStep: (step: PreviewStep) => void;
  updateInitial: (data: Partial<CSATConfig['initial']>) => void;
  updateFeedback: (data: Partial<CSATConfig['feedback']>) => void;
  updateThankYou: (data: Partial<CSATConfig['thankYou']>) => void;
  updateStyling: (data: Partial<CSATConfig['styling']>) => void;
  addOption: (text: string) => void;
  removeOption: (id: string) => void;
  updateOption: (id: string, text: string) => void;
  applyPresetTheme: (colors: Partial<StylingConfig>) => void;
  resetConfig: () => void;
  exportConfig: () => void;
  importConfig: (raw: string) => boolean;
}

const CSATContext = createContext<CSATContextValue | null>(null);

export const CSATProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<CSATConfig>(defaultConfig);
  const [activeTab, setActiveTab] = useState<TabType>('content');
  const [previewStep, setPreviewStep] = useState<PreviewStep>('feedback');

  const updateInitial = (data: Partial<CSATConfig['initial']>) => {
    setConfig((prev) => ({ ...prev, initial: { ...prev.initial, ...data } }));
  };

  const updateFeedback = (data: Partial<CSATConfig['feedback']>) => {
    setConfig((prev) => ({ ...prev, feedback: { ...prev.feedback, ...data } }));
  };

  const updateThankYou = (data: Partial<CSATConfig['thankYou']>) => {
    setConfig((prev) => ({ ...prev, thankYou: { ...prev.thankYou, ...data } }));
  };

  const updateStyling = (data: Partial<CSATConfig['styling']>) => {
    setConfig((prev) => ({ ...prev, styling: { ...prev.styling, ...data } }));
  };

  const addOption = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newOption = { id: crypto.randomUUID?.() || Date.now().toString(), text: trimmed };
    setConfig((prev) => ({
      ...prev,
      feedback: { ...prev.feedback, options: [...prev.feedback.options, newOption] },
    }));
  };

  const removeOption = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      feedback: {
        ...prev.feedback,
        options: prev.feedback.options.filter((opt) => opt.id !== id),
      },
    }));
  };

  const updateOption = (id: string, text: string) => {
    setConfig((prev) => ({
      ...prev,
      feedback: {
        ...prev.feedback,
        options: prev.feedback.options.map((opt) => (opt.id === id ? { ...opt, text } : opt)),
      },
    }));
  };

  const applyPresetTheme = (colors: Partial<StylingConfig>) => {
    setConfig((prev) => ({ ...prev, styling: { ...prev.styling, ...colors } }));
  };

  const resetConfig = () => {
    setConfig(defaultConfig);
    setPreviewStep('feedback');
  };

  const exportConfig = () => {
    const json = JSON.stringify(config, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `csat-config-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importConfig = (raw: string): boolean => {
    try {
      const parsed = JSON.parse(raw);
      if (parsed?.initial && parsed?.feedback && parsed?.thankYou && parsed?.styling) {
        setConfig(parsed);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <CSATContext.Provider
      value={{
        config,
        activeTab,
        setActiveTab,
        previewStep,
        setPreviewStep,
        updateInitial,
        updateFeedback,
        updateThankYou,
        updateStyling,
        addOption,
        removeOption,
        updateOption,
        applyPresetTheme,
        resetConfig,
        exportConfig,
        importConfig,
      }}
    >
      {children}
    </CSATContext.Provider>
  );
};

export const useCSAT = () => {
  const ctx = useContext(CSATContext);
  if (!ctx) {
    throw new Error('useCSAT must be used inside CSATProvider');
  }
  return ctx;
};
