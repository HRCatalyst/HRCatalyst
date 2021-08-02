import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Shared } from './shared.model';

export const loadShareds = createAction(
  '[Shared/API] Load Shareds', 
  props<{ shareds: Shared[] }>()
);

export const addShared = createAction(
  '[Shared/API] Add Shared',
  props<{ shared: Shared }>()
);

export const upsertShared = createAction(
  '[Shared/API] Upsert Shared',
  props<{ shared: Shared }>()
);

export const addShareds = createAction(
  '[Shared/API] Add Shareds',
  props<{ shareds: Shared[] }>()
);

export const upsertShareds = createAction(
  '[Shared/API] Upsert Shareds',
  props<{ shareds: Shared[] }>()
);

export const updateShared = createAction(
  '[Shared/API] Update Shared',
  props<{ shared: Update<Shared> }>()
);

export const updateShareds = createAction(
  '[Shared/API] Update Shareds',
  props<{ shareds: Update<Shared>[] }>()
);

export const deleteShared = createAction(
  '[Shared/API] Delete Shared',
  props<{ id: string }>()
);

export const deleteShareds = createAction(
  '[Shared/API] Delete Shareds',
  props<{ ids: string[] }>()
);

export const clearShareds = createAction(
  '[Shared/API] Clear Shareds'
);
