import React from 'react';
import { InitialFeedbackForm } from './InitialFeedbackForm';
import { FeedbackPageForm } from './FeedbackPageForm';
import { ThankYouPageForm } from './ThankYouPageForm';

export const ContentEditor: React.FC = () => {
  return (
    <div className="space-y-6">
      <InitialFeedbackForm />
      <FeedbackPageForm />
      <ThankYouPageForm />
    </div>
  );
};
