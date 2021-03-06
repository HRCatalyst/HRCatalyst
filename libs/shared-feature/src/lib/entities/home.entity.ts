import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createFeatureSelector } from "@ngrx/store";
import { Home } from "../models/home.model";

export const homesFeatureKey = 'home';

export interface HomeState  extends EntityState<Home> {
  selectedHome?: Home;
}

export function selecthomeId(a: Home): string {
  // In this case this would be optional since primary key is id
  return a.id ?? '';
}

export function sortByName(a: Home, b: Home): number {
  return (a.id ?? '').localeCompare(b.id ?? '');
}

export const adapter: EntityAdapter<Home> = createEntityAdapter<Home>({
  selectId: selecthomeId,
  sortComparer: sortByName,
});

export const initialState: HomeState = adapter.getInitialState({
  // additional entity state properties
  selectedHome: undefined
});

// Create the default selectors
export const getHomeState = createFeatureSelector<HomeState>('company');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getHomeState);
