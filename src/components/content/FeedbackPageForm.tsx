import React, { useState } from 'react';
import { useCSAT } from '../../context/CSATContext';
import { Star, Hash, Plus, Trash2, Sliders, MessageSquare, Send } from 'lucide-react';

export const FeedbackPageForm: React.FC = () => {
  const {
    config,
    updateFeedback,
    addOption,
    removeOption,
    updateOption,
    setPreviewStep,
  } = useCSAT();

  const [newOptionText, setNewOptionText] = useState('');

  const handleAddOption = (e: React.FormEvent) => {
    e.preventDefault();
    if (newOptionText.trim()) {
      addOption(newOptionText);
      setNewOptionText('');
    }
  };

  return (
    <div
      onClickCapture={() => setPreviewStep('feedback')}
      className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs space-y-6"
    >
      <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
        <div className="p-2 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200">
          <Sliders className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-900">Feedback Page Options</h3>
          <p className="text-xs text-zinc-500">Configure rating style, dynamic options & submit actions</p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-zinc-700 mb-2">
            Rating Representation
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => updateFeedback({ ratingType: 'stars' })}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${
                config.feedback.ratingType === 'stars'
                  ? 'bg-zinc-900 border-zinc-900 text-white shadow-xs'
                  : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
              }`}
            >
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Star Rating (1–5)</span>
            </button>

            <button
              type="button"
              onClick={() => updateFeedback({ ratingType: 'numbers' })}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${
                config.feedback.ratingType === 'numbers'
                  ? 'bg-zinc-900 border-zinc-900 text-white shadow-xs'
                  : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
              }`}
            >
              <Hash className="w-4 h-4 text-indigo-400" />
              <span>Number Scale (1–5)</span>
            </button>
          </div>
        </div>

        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-zinc-700">
              Dynamic Feedback Pills / Categories
            </label>
            <span className="text-[11px] text-zinc-400 font-medium">
              {config.feedback.options.length} options
            </span>
          </div>

          <div className="space-y-2">
            {config.feedback.options.map((option, index) => (
              <div
                key={option.id}
                className="flex items-center gap-2 group bg-zinc-50 p-2 pl-3 rounded-xl border border-zinc-200 focus-within:border-zinc-900 focus-within:bg-white transition-colors"
              >
                <span className="text-[11px] font-mono text-zinc-400 w-4">{index + 1}.</span>
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => updateOption(option.id, e.target.value)}
                  className="flex-1 bg-transparent text-xs text-zinc-900 focus:outline-none placeholder:text-zinc-400"
                  placeholder="Feedback label..."
                />
                <button
                  type="button"
                  onClick={() => removeOption(option.id)}
                  title="Remove option"
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddOption} className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={newOptionText}
              onChange={(e) => setNewOptionText(e.target.value)}
              placeholder="Add new option (e.g. Great customer support)..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-900 text-xs focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all placeholder:text-zinc-400"
            />
            <button
              type="submit"
              disabled={!newOptionText.trim()}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-900 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </form>
        </div>

        <div className="pt-2 border-t border-zinc-100 space-y-3">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-4 h-4 text-zinc-600" />
              <div>
                <span className="text-xs font-semibold text-zinc-800 block">Additional Comment Box</span>
                <span className="text-[11px] text-zinc-500">Allow users to leave open-ended text feedback</span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.feedback.allowComment}
                onChange={(e) => updateFeedback({ allowComment: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-zinc-900"></div>
            </label>
          </div>

          {config.feedback.allowComment && (
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                Comment Box Placeholder
              </label>
              <input
                type="text"
                value={config.feedback.commentPlaceholder}
                onChange={(e) => updateFeedback({ commentPlaceholder: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-900 text-xs focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all placeholder:text-zinc-400"
              />
            </div>
          )}
        </div>

        <div className="pt-1">
          <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
            Submit Button Text
          </label>
          <div className="relative">
            <input
              type="text"
              value={config.feedback.submitButtonText}
              onChange={(e) => updateFeedback({ submitButtonText: e.target.value })}
              placeholder="Submit Feedback"
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-900 text-xs focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all placeholder:text-zinc-400"
            />
            <Send className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

      </div>
    </div>
  );
};
