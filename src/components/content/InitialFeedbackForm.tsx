import React from 'react';
import { useCSAT } from '../../context/CSATContext';
import { MessageSquareText } from 'lucide-react';

export const InitialFeedbackForm: React.FC = () => {
  const { config, updateInitial, setPreviewStep } = useCSAT();

  return (
    <div
      onClickCapture={() => setPreviewStep('feedback')}
      className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs space-y-5"
    >
      <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
        <div className="p-2 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200">
          <MessageSquareText className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-900">Initial Feedback Header</h3>
          <p className="text-xs text-zinc-500">Configure the primary question & introduction prompt</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
            Campaign Title <span className="text-indigo-600">*</span>
          </label>
          <input
            type="text"
            value={config.initial.title}
            onChange={(e) => updateInitial({ title: e.target.value })}
            placeholder="e.g. How satisfied are you with our service?"
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-900 text-xs focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all placeholder:text-zinc-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
            Subtitle / Description
          </label>
          <textarea
            rows={2}
            value={config.initial.subtitle}
            onChange={(e) => updateInitial({ subtitle: e.target.value })}
            placeholder="e.g. We value your feedback to make our product better."
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-900 text-xs focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all placeholder:text-zinc-400 resize-none"
          />
        </div>
      </div>
    </div>
  );
};
