import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Auth } from '@hrcatalyst/shared-feature';

export const loadAuths = createAction(
  '[Auth/API] Load Auths',
  props<{ auths: Auth[] }>()
);

export const addAuth = createAction(
  '[Auth/API] Add Auth',
  props<{ auth: Auth }>()
);

export const upsertAuth = createAction(
  '[Auth/API] Upsert Auth',
  props<{ auth: Auth }>()
);

export const addAuths = createAction(
  '[Auth/API] Add Auths',
  props<{ auths: Auth[] }>()
);

export const upsertAuths = createAction(
  '[Auth/API] Upsert Auths',
  props<{ auths: Auth[] }>()
);

export const updateAuth = createAction(
  '[Auth/API] Update Auth',
  props<{ auth: Update<Auth> }>()
);

export const updateAuths = createAction(
  '[Auth/API] Update Auths',
  props<{ auths: Update<Auth>[] }>()
);

export const deleteAuth = createAction(
  '[Auth/API] Delete Auth',
  props<{ id: string }>()
);

export const deleteAuths = createAction(
  '[Auth/API] Delete Auths',
  props<{ ids: string[] }>()
);

export const clearAuths = createAction(
  '[Auth/API] Clear Auths'
);
