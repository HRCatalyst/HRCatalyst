import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { Associate, AssociateSearchResult } from '@hrcatalyst/shared-feature';

export interface AssociateState  extends EntityState<Associate> {
    selectedAssociate?: Associate;
    searchResult?: AssociateSearchResult[];
}

export function selectassociateId(a: Associate): string {
    // In this case this would be optional since primary key is id
    return a.id;
}

export const adapter: EntityAdapter<Associate> = createEntityAdapter<Associate>({
    selectId: selectassociateId,
    sortComparer: sortByName,
});

export const associatesFeatureKey = 'associates';

export function sortByName(a: Associate, b: Associate): number {
  return (a.lastName + a.firstName).localeCompare(b.lastName + a.firstName);
}

// Create the default selectors
export const getAssociateState = createFeatureSelector<AssociateState>('associate');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getAssociateState);

export const initialState: AssociateState = adapter.getInitialState({
  // additional entity state properties
  selectedAssociate: undefined,
  searchResult: undefined
});

