import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Company } from '@hrc/shared-feature';

export const loadCompanys = createAction(
  '[Company/API] Load Companys',
  props<{ companys: Company[] }>()
);

export const addCompany = createAction(
  '[Company/API] Add Company',
  props<{ company: Company }>()
);

export const upsertCompany = createAction(
  '[Company/API] Upsert Company',
  props<{ company: Company }>()
);

export const addCompanys = createAction(
  '[Company/API] Add Companys',
  props<{ companys: Company[] }>()
);

export const upsertCompanys = createAction(
  '[Company/API] Upsert Companys',
  props<{ companys: Company[] }>()
);

export const updateCompanyEntity = createAction(
  '[Company/API] Update Company',
  props<{ company: Update<Company> }>()
);

export const updateCompanys = createAction(
  '[Company/API] Update Companys',
  props<{ companys: Update<Company>[] }>()
);

export const deleteCompanyEntity = createAction(
  '[Company/API] Delete Company',
  props<{ id: string }>()
);

export const deleteCompanys = createAction(
  '[Company/API] Delete Companys',
  props<{ ids: string[] }>()
);

export const clearCompanys = createAction(
  '[Company/API] Clear Companys'
);

export const loadCompany = createAction(
  '[Company/API] Load Company'
);

export const selectCompany = createAction(
  '[Company/API] Select Company',
    props<{ payload: Company }>()
);

export const loadAllCompanys = createAction(
  '[Company/API] Load All Companys'
);

export const loadAllCompanysSuccess = createAction(
  '[Company/API] Load All Companys Success',
    props<{ payload: Company }>()
);

export const loadAllCompanysFailure = createAction(
  '[Company/API] Load All Companys Failure',
    props<{ error: unknown }>()
);

export const createCompany = createAction(
 '[Company/API] Create Company',
 props<{ payload: Company }>()
);

export const createCompanySuccess = createAction(
  '[Company/API] Create Company Success',
  props<{ payload: Company }>()
);

export const createCompanyFailire = createAction(
  '[Company/API] Create Company Failure',
    props<{ error: unknown }>()
);

export const updateCompany = createAction(
  '[Company/API] Update Company',
  props<{ payload: Company }>()
);

export const updateCompanySuccess = createAction(
  '[Company/API] Update Company Success',
    props<{ payload: Company }>()
);

export const updateCompanyFailure = createAction(
  '[Company/API] Update Company Failure',
    props<{ error: unknown }>()
);

export const deleteCompany = createAction(
  '[Company/API] Delete Company',
  props<{ payload: Company }>()
);

export const deleteCompanySuccess = createAction(
  '[Company/API] Delete Company Success',
    props<{ payload: Company }>()
);

export const deleteCompanyFailure = createAction(
  '[Company/API] Delete Company Failure',
    props<{ error: unknown }>()
);
