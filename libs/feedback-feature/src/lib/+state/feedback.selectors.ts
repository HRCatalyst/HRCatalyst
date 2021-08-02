import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFeedback from './feedback.reducer';

export const selectFeedbackState = createFeatureSelector<fromFeedback.State>(
  fromFeedback.feedbackFeatureKey
);
