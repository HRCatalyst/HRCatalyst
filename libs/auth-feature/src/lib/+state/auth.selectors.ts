import { createFeatureSelector } from '@ngrx/store';
import { Auth, authsFeatureKey } from './auth.reducer';

export const selectAuthState = createFeatureSelector<Auth>(
  authsFeatureKey
);
