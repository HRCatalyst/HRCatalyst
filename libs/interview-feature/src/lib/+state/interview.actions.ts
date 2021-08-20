import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Interview } from '@hrcatalyst/shared-feature';

export const loadInterviews = createAction(
  '[Interview/API] Load Interviews',
  props<{ interviews: Interview[] }>()
);

export const addInterview = createAction(
  '[Interview/API] Add Interview',
  props<{ interview: Interview }>()
);

export const upsertInterview = createAction(
  '[Interview/API] Upsert Interview',
  props<{ interview: Interview }>()
);

export const addInterviews = createAction(
  '[Interview/API] Add Interviews',
  props<{ interviews: Interview[] }>()
);

export const upsertInterviews = createAction(
  '[Interview/API] Upsert Interviews',
  props<{ interviews: Interview[] }>()
);

export const updateInterview = createAction(
  '[Interview/API] Update Interview',
  props<{ interview: Update<Interview> }>()
);

export const updateInterviews = createAction(
  '[Interview/API] Update Interviews',
  props<{ interviews: Update<Interview>[] }>()
);

export const deleteInterview = createAction(
  '[Interview/API] Delete Interview',
  props<{ id: string }>()
);

export const deleteInterviews = createAction(
  '[Interview/API] Delete Interviews',
  props<{ ids: string[] }>()
);

export const clearInterviews = createAction(
  '[Interview/API] Clear Interviews'
);
