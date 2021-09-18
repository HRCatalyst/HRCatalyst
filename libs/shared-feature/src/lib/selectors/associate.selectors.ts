import { createFeatureSelector } from '@ngrx/store';
import { associatesFeatureKey, AssociateState } from './../entities/associate.entity';

export const selectAssociateState = createFeatureSelector<AssociateState>(
  associatesFeatureKey
);
