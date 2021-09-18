import { createFeatureSelector } from '@ngrx/store';
import { authFeatureKey, AuthState } from './../entities/auth.entity';


export const selectAuthState = createFeatureSelector<AuthState>(
  authFeatureKey
);
