import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Company } from '@hrcatalyst/shared-feature';
import * as CompanyActions from './company.actions';

export const companiesFeatureKey = 'companies';

export interface State extends EntityState<Company> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Company> = createEntityAdapter<Company>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(CompanyActions.addCompany,
    (state, action) => adapter.addOne(action.company, state)
  ),
  on(CompanyActions.upsertCompany,
    (state, action) => adapter.upsertOne(action.company, state)
  ),
  on(CompanyActions.addCompanys,
    (state, action) => adapter.addMany(action.companys, state)
  ),
  on(CompanyActions.upsertCompanys,
    (state, action) => adapter.upsertMany(action.companys, state)
  ),
  on(CompanyActions.updateCompany,
    (state, action) => adapter.updateOne(action.company, state)
  ),
  on(CompanyActions.updateCompanys,
    (state, action) => adapter.updateMany(action.companys, state)
  ),
  on(CompanyActions.deleteCompany,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(CompanyActions.deleteCompanys,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(CompanyActions.loadCompanys,
    (state, action) => adapter.setAll(action.companys, state)
  ),
  on(CompanyActions.clearCompanys,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
