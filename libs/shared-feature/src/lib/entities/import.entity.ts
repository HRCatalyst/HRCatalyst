import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createFeatureSelector } from "@ngrx/store";
import { Associate } from "../models/associate.model";
import { Campaign } from "../models/campaign.model";
import { Import } from "../models/import.model";
import { Participant } from "../models/participant.model";
import { Rater } from "../models/rater.model";

export const importsFeatureKey = 'import';

export interface ImportState  extends EntityState<Import> {
  associates?: Associate[];
  campaigns?: Campaign[];
  participants?: Participant[];
  raters?: Rater[];
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
  associates: undefined,
  campaigns: undefined,
  participants: undefined,
  raters: undefined
});

// Create the default selectors
export const getImportState = createFeatureSelector<ImportState>('company');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getImportState);
