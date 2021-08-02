import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInterview from './interview.reducer';

export const selectInterviewState = createFeatureSelector<fromInterview.State>(
  fromInterview.interviewFeatureKey
);
