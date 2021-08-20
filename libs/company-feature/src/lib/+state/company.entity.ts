import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Company } from './company.interface';
import { createFeatureSelector } from '@ngrx/store';

export interface CompanyState  extends EntityState<Company> {
    selectedCompany?: Company;
}

export function selectcompanyId(a: Company): string {
    // In this case this would be optional since primary key is id
    return a.id;
}

export function sortByName(a: Company, b: Company): number {
    return (a.name).localeCompare(b.name);
}

export const adapter: EntityAdapter<Company> = createEntityAdapter<Company>({
    selectId: selectcompanyId,
    sortComparer: sortByName,
});

export const initialState: CompanyState = adapter.getInitialState({
    // additional entity state properties
    selectedCompany: null
});

// Create the default selectors
export const getCompanyState = createFeatureSelector<CompanyState>('company');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = adapter.getSelectors(getCompanyState);
