
import { createFeatureSelector } from '@ngrx/store';
import { usersFeatureKey, UserState } from './user.entity';

export const selectUserState = createFeatureSelector<UserState>(
  usersFeatureKey
);
