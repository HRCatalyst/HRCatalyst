import { Company, companyEntity } from '@hrc/shared-feature';
import { createReducer, on } from '@ngrx/store';
import * as CompanyActions from './company.actions';

export const reducer = createReducer(
  companyEntity.initialState,
  on(CompanyActions.addCompany,
    (state, action) => companyEntity.adapter.addOne(action.company, state)
  ),
  on(CompanyActions.upsertCompany,
    (state, action) => companyEntity.adapter.upsertOne(action.company, state)
  ),
  on(CompanyActions.addCompanys,
    (state, action) => companyEntity.adapter.addMany(action.companys, state)
  ),
  on(CompanyActions.upsertCompanys,
    (state, action) => companyEntity.adapter.upsertMany(action.companys, state)
  ),
  on(CompanyActions.updateCompanyEntity,
    (state, action) => companyEntity.adapter.updateOne(action.company, state)
  ),
  on(CompanyActions.updateCompanys,
    (state, action) => companyEntity.adapter.updateMany(action.companys, state)
  ),
  on(CompanyActions.deleteCompanyEntity,
    (state, action) => companyEntity.adapter.removeOne(action.id, state)
  ),
  on(CompanyActions.deleteCompanys,
    (state, action) => companyEntity.adapter.removeMany(action.ids, state)
  ),
  on(CompanyActions.loadCompanys,
    (state, action) => companyEntity.adapter.setAll(action.companys, state)
  ),
  on(CompanyActions.clearCompanys,
    state => companyEntity.adapter.removeAll(state)
  ),
   on(CompanyActions.loadCompany,
    state => { return state; }
  ),
   on(CompanyActions.selectCompany, (state, action) => {
     return {...state, selectedCompany: action.payload};
  }),
  on(CompanyActions.loadAllCompanys,
    state => { return state; }
  ),
  on(CompanyActions.loadAllCompanysSuccess, (state, action) => {
    const companys = action.payload.map(e => {
      return {
      id: e.id,
      ...e
      } as Company;
    });
    state = companyEntity.adapter.removeAll(state);
    return companyEntity.adapter.addMany(companys, state);
  }),
  on(CompanyActions.loadAllCompanysFailure,
    state => { return state; }
  ),
  on(CompanyActions.createCompany,
    state => { return state; }
  ),
  on(CompanyActions.createCompanySuccess,
    state => { return state; }
  ),
  on(CompanyActions.createCompanyFailire,
    state => { return state; }
  ),
  on(CompanyActions.updateCompany,
    state => { return state; }
  ),
  on(CompanyActions.updateCompanySuccess,
    state => { return state; }
  ),
  on(CompanyActions.updateCompanyFailure,
    state => { return state; }
  ),
  on(CompanyActions.deleteCompany,
    state => { return state; }
  ),
  on(CompanyActions.deleteCompanySuccess,
    state => { return state; }
  ),
  on(CompanyActions.deleteCompanyFailure,
    state => { return state; }
  ),

);

