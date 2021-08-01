import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Associate } from './associate.model';

export const loadAssociates = createAction(
  '[Associate/API] Load Associates', 
  props<{ associates: Associate[] }>()
);

export const addAssociate = createAction(
  '[Associate/API] Add Associate',
  props<{ associate: Associate }>()
);

export const upsertAssociate = createAction(
  '[Associate/API] Upsert Associate',
  props<{ associate: Associate }>()
);

export const addAssociates = createAction(
  '[Associate/API] Add Associates',
  props<{ associates: Associate[] }>()
);

export const upsertAssociates = createAction(
  '[Associate/API] Upsert Associates',
  props<{ associates: Associate[] }>()
);

export const updateAssociate = createAction(
  '[Associate/API] Update Associate',
  props<{ associate: Update<Associate> }>()
);

export const updateAssociates = createAction(
  '[Associate/API] Update Associates',
  props<{ associates: Update<Associate>[] }>()
);

export const deleteAssociate = createAction(
  '[Associate/API] Delete Associate',
  props<{ id: string }>()
);

export const deleteAssociates = createAction(
  '[Associate/API] Delete Associates',
  props<{ ids: string[] }>()
);

export const clearAssociates = createAction(
  '[Associate/API] Clear Associates'
);
