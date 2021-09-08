import { createReducer, on } from '@ngrx/store';
import * as CompanyActions from './company.actions';
import { adapter, initialState } from './company.entity';


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
  on(CompanyActions.updateCompanyEntity,
    (state, action) => adapter.updateOne(action.company, state)
  ),
  on(CompanyActions.updateCompanys,
    (state, action) => adapter.updateMany(action.companys, state)
  ),
  on(CompanyActions.deleteCompanyEntity,
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
   on(CompanyActions.loadCompany,
    state => { return state; }
  ),
   on(CompanyActions.selectCompany,
    state => { return state; }
  ),
  on(CompanyActions.loadAllCompanys,
    state => { return state; }
  ),
  on(CompanyActions.loadAllCompanysSuccess,
    state => { return state; }
  ),
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

