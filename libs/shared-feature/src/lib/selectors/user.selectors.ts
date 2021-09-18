
import { createFeatureSelector } from '@ngrx/store';
import { usersFeatureKey, UserState } from './../entities/user.entity';

export const selectUserState = createFeatureSelector<UserState>(
  usersFeatureKey
);
