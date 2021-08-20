import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Feedback } from '@hrcatalyst/shared-feature';

export const loadFeedbacks = createAction(
  '[Feedback/API] Load Feedbacks',
  props<{ feedbacks: Feedback[] }>()
);

export const addFeedback = createAction(
  '[Feedback/API] Add Feedback',
  props<{ feedback: Feedback }>()
);

export const upsertFeedback = createAction(
  '[Feedback/API] Upsert Feedback',
  props<{ feedback: Feedback }>()
);

export const addFeedbacks = createAction(
  '[Feedback/API] Add Feedbacks',
  props<{ feedbacks: Feedback[] }>()
);

export const upsertFeedbacks = createAction(
  '[Feedback/API] Upsert Feedbacks',
  props<{ feedbacks: Feedback[] }>()
);

export const updateFeedback = createAction(
  '[Feedback/API] Update Feedback',
  props<{ feedback: Update<Feedback> }>()
);

export const updateFeedbacks = createAction(
  '[Feedback/API] Update Feedbacks',
  props<{ feedbacks: Update<Feedback>[] }>()
);

export const deleteFeedback = createAction(
  '[Feedback/API] Delete Feedback',
  props<{ id: string }>()
);

export const deleteFeedbacks = createAction(
  '[Feedback/API] Delete Feedbacks',
  props<{ ids: string[] }>()
);

export const clearFeedbacks = createAction(
  '[Feedback/API] Clear Feedbacks'
);
