import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createFeatureSelector } from "@ngrx/store";
import { Rater } from "../models/rater.model";

export const ratersFeatureKey = 'raters';

export interface RaterState  extends EntityState<Rater> {
  selectedRater?: Rater;
}

export function selectRaterId(a: Rater): string {
  // In this case this would be optional since primary key is id
  return a.id ?? '';
}

export function sortByName(a: Rater, b: Rater): number {
  return (a.id ?? '').localeCompare(b.id ?? '');
}

export const adapter: EntityAdapter<Rater> = createEntityAdapter<Rater>({
  selectId: selectRaterId,
  sortComparer: sortByName,
});

export const initialState: RaterState = adapter.getInitialState({
  // additional entity state properties
  selectedRater: undefined
});

// Create the default selectors
export const getRaterState = createFeatureSelector<RaterState>('company');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getRaterState);

