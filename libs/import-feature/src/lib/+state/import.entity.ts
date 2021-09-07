import { Import } from "@hrcatalyst/shared-feature";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createFeatureSelector } from "@ngrx/store";

export const importsFeatureKey = 'imports';

export interface ImportState  extends EntityState<Import> {
  selectedImport?: Import;
}

export function selectimportId(a: Import): string {
  // In this case this would be optional since primary key is id
  return a.id ?? '';
}

export function sortByName(a: Import, b: Import): number {
  return (a.id ?? '').localeCompare(b.id ?? '');
}

export const adapter: EntityAdapter<Import> = createEntityAdapter<Import>({
  selectId: selectimportId,
  sortComparer: sortByName,
});

export const initialState: ImportState = adapter.getInitialState({
  // additional entity state properties
  selectedImport: undefined
});

// Create the default selectors
export const getImportState = createFeatureSelector<ImportState>('company');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getImportState);
