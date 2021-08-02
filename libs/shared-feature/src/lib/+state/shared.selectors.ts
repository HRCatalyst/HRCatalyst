import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromShared from './shared.reducer';

export const selectSharedState = createFeatureSelector<fromShared.State>(
  fromShared.sharedFeatureKey
);
