import { createFeatureSelector } from '@ngrx/store';
import { importsFeatureKey, ImportState } from './import.entity';

export const selectImportState = createFeatureSelector<ImportState>(
  importsFeatureKey
);
