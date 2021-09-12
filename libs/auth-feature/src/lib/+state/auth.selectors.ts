import { createFeatureSelector } from '@ngrx/store';
import { authFeatureKey, AuthState } from './auth.entity';


export const selectAuthState = createFeatureSelector<AuthState>(
  authFeatureKey
);
