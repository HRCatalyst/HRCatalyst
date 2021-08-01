import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromClient from './client.reducer';

export const selectClientState = createFeatureSelector<fromClient.State>(
  fromClient.clientFeatureKey
);
