import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAssociate from './associate.reducer';

export const selectAssociateState = createFeatureSelector<fromAssociate.State>(
  fromAssociate.associateFeatureKey
);
