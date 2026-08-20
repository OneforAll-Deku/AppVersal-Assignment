export type RatingType = 'stars' | 'numbers';
export type MediaType = 'image' | 'lottie' | 'gif';
export type FontSize = 'sm' | 'md' | 'lg' | 'xl';
export type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type ButtonWidthMode = 'full' | 'auto' | 'custom';

export interface FeedbackOption {
  id: string;
  text: string;
}

export interface InitialFeedbackConfig {
  title: string;
  subtitle: string;
}

export interface FeedbackPageConfig {
  ratingType: RatingType;
  ratingScale: number;
  options: FeedbackOption[];
  allowComment: boolean;
  commentPlaceholder: string;
  submitButtonText: string;
}

export interface ThankYouPageConfig {
  mediaUrl: string;
  mediaType: MediaType;
  title: string;
  subtitle: string;
  buttonText: string;
}

export interface StylingConfig {
  backgroundColor: string;
  titleColor: string;
  subtitleColor: string;
  buttonColor: string;
  buttonTextColor: string;
  fontSize: FontSize;
  fontWeight: FontWeight;
  borderRadius: number;
  buttonWidth: ButtonWidthMode;
  buttonCustomWidth: number;
  buttonHeight: number;
  ratingSelectedColor: string;
  ratingUnselectedColor: string;
  cardBackgroundColor: string;
  cardBorderColor: string;
}

export interface CSATConfig {
  initial: InitialFeedbackConfig;
  feedback: FeedbackPageConfig;
  thankYou: ThankYouPageConfig;
  styling: StylingConfig;
}

export type TabType = 'content' | 'styling';
export type PreviewStep = 'feedback' | 'thankyou';
