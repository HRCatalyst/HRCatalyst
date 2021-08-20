import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Company } from '@hrcatalyst/shared-feature';

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

export const updateCompany = createAction(
  '[Company/API] Update Company',
  props<{ company: Update<Company> }>()
);

export const updateCompanys = createAction(
  '[Company/API] Update Companys',
  props<{ companys: Update<Company>[] }>()
);

export const deleteCompany = createAction(
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
