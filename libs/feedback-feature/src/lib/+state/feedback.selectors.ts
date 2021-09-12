import { createFeatureSelector } from '@ngrx/store';
import { feedbacksFeatureKey, FeedbackState } from './feedback.entity';

export const selectFeedbackState = createFeatureSelector<FeedbackState>(
  feedbacksFeatureKey
);
