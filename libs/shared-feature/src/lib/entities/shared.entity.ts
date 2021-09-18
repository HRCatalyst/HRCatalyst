import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createFeatureSelector } from "@ngrx/store";
import { Shared } from "../+state/shared.model";

export const sharedFeatureKey = 'shared';

export interface SharedState  extends EntityState<Shared> {
  selectedShared?: Shared;
}

export function selectSharedId(a: Shared): string {
  // In this case this would be optional since primary key is id
  return a.id ?? '';
}

export function sortByName(a: Shared, b: Shared): number {
  return (a.id ?? '').localeCompare(b.id ?? '');
}

export const adapter: EntityAdapter<Shared> = createEntityAdapter<Shared>({
  selectId: selectSharedId,
  sortComparer: sortByName,
});

export const initialState: SharedState = adapter.getInitialState({
  // additional entity state properties
  selectedShared: undefined
});

// Create the default selectors
export const getSharedState = createFeatureSelector<SharedState>('company');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getSharedState);

