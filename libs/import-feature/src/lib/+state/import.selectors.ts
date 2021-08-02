import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromImport from './import.reducer';

export const selectImportState = createFeatureSelector<fromImport.State>(
  fromImport.importFeatureKey
);
