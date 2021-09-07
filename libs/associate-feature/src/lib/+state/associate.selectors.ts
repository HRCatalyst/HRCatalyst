import { createFeatureSelector } from '@ngrx/store';
import { associatesFeatureKey, AssociateState } from './associate.entity';

export const selectAssociateState = createFeatureSelector<AssociateState>(
  associatesFeatureKey
);
