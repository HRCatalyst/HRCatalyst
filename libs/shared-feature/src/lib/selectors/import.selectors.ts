import { createFeatureSelector } from '@ngrx/store';
import { importsFeatureKey, ImportState } from './../entities/import.entity';

export const selectImportState = createFeatureSelector<ImportState>(
  importsFeatureKey
);
