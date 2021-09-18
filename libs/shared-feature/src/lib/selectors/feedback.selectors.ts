import { createFeatureSelector } from '@ngrx/store';
import { feedbacksFeatureKey, FeedbackState } from './../entities/feedback.entity';

export const selectFeedbackState = createFeatureSelector<FeedbackState>(
  feedbacksFeatureKey
);
