import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRater from './rater.reducer';

export const selectRaterState = createFeatureSelector<fromRater.State>(
  fromRater.raterFeatureKey
);
