import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { Associate } from '../models/associate.model';
import { Company } from '../models/company.model';

export const companysFeatureKey = 'company';
export interface CompanyState  extends EntityState<Company> {
    selectedCompany?: Company;
    associates?: Associate[];
}

export function selectcompanyId(a: Company): string {
    // In this case this would be optional since primary key is id
    return a.id ?? '';
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
    selectedCompany: undefined,
    associates: undefined
});

// Create the default selectors
export const getCompanyState = createFeatureSelector<CompanyState>('company');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = adapter.getSelectors(getCompanyState);
