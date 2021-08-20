import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Rater } from '@hrcatalyst/shared-feature';

export const loadRaters = createAction(
  '[Rater/API] Load Raters',
  props<{ raters: Rater[] }>()
);

export const addRater = createAction(
  '[Rater/API] Add Rater',
  props<{ rater: Rater }>()
);

export const upsertRater = createAction(
  '[Rater/API] Upsert Rater',
  props<{ rater: Rater }>()
);

export const addRaters = createAction(
  '[Rater/API] Add Raters',
  props<{ raters: Rater[] }>()
);

export const upsertRaters = createAction(
  '[Rater/API] Upsert Raters',
  props<{ raters: Rater[] }>()
);

export const updateRater = createAction(
  '[Rater/API] Update Rater',
  props<{ rater: Update<Rater> }>()
);

export const updateRaters = createAction(
  '[Rater/API] Update Raters',
  props<{ raters: Update<Rater>[] }>()
);

export const deleteRater = createAction(
  '[Rater/API] Delete Rater',
  props<{ id: string }>()
);

export const deleteRaters = createAction(
  '[Rater/API] Delete Raters',
  props<{ ids: string[] }>()
);

export const clearRaters = createAction(
  '[Rater/API] Clear Raters'
);
