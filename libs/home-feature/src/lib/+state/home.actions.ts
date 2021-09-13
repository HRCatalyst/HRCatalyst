import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Home } from '@hrc/shared-feature';

export const loadHomes = createAction(
  '[Home/API] Load Homes',
  props<{ homes: Home[] }>()
);

export const addHome = createAction(
  '[Home/API] Add Home',
  props<{ home: Home }>()
);

export const upsertHome = createAction(
  '[Home/API] Upsert Home',
  props<{ home: Home }>()
);

export const addHomes = createAction(
  '[Home/API] Add Homes',
  props<{ homes: Home[] }>()
);

export const upsertHomes = createAction(
  '[Home/API] Upsert Homes',
  props<{ homes: Home[] }>()
);

export const updateHome = createAction(
  '[Home/API] Update Home',
  props<{ home: Update<Home> }>()
);

export const updateHomes = createAction(
  '[Home/API] Update Homes',
  props<{ homes: Update<Home>[] }>()
);

export const deleteHome = createAction(
  '[Home/API] Delete Home',
  props<{ id: string }>()
);

export const deleteHomes = createAction(
  '[Home/API] Delete Homes',
  props<{ ids: string[] }>()
);

export const clearHomes = createAction(
  '[Home/API] Clear Homes'
);
