import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Interview } from '@hrc/shared-feature';

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

export const updateInterviewEntity = createAction(
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

export const loadInterview = createAction(
  '[Interview/API] LOAD_INTERVIEW'
);

export const loadInterviewSuccess = createAction(
  '[Interview/API] LOAD_INTERVIEW_SUCCESS',
  props<{ payload: unknown }>()
);

export const loadInterviewFailure = createAction(
  '[Interview/API] LOAD_INTERVIEW_FAILURE',
  props<{ error: unknown }>()
);

export const loadInterviewParticipants = createAction(
  '[Interview/API] LOAD_INTERVIEW_PARTICIPANTS',
  props<{ payload: string }>()
);

export const loadInterviewParticipantsInprogress = createAction(
  '[Interview/API] LOAD_INTERVIEW_PARTICIPANTS_INPROGRESS',
);

export const loadInterviewParticipantsSuccess = createAction(
  '[Interview/API] LOAD_INTERVIEW_PARTICIPANTS_SUCCESS',
  props<{ payload: unknown }>()
);

export const loadInterviewParticipantsFailure = createAction(
  '[Interview/API] LOAD_INTERVIEW_PARTICIPANTS_FAILURE',
  props<{ error: unknown }>()
);

export const createInterview = createAction(
  '[Interview/API] CREATE_INTERVIEW',
  props<{ payload: Interview }>()
);

export const createInterviewSuccess = createAction(
  '[Interview/API] CREATE_INTERVIEW_SUCCESS',
  props<{ payload: Interview }>()
);

export const createInterviewFailire = createAction(
  '[Interview/API] CREATE_INTERVIEW_FAILURE',
  props<{ error: unknown }>()
);

export const updateInterview = createAction(
  '[Interview/API] UPDATE_INTERVIEW',
  props<{ payload: Interview }>()
);

export const updateInterviewSuccess = createAction(
  '[Interview/API] UPDATE_INTERVIEW_SUCCESS',
  props<{ payload: unknown }>()
);

export const updateInterviewFailure = createAction(
  '[Interview/API] UPDATE_INTERVIEW_FAILURE',
  props<{ error: unknown }>()
);

export const deleteInterviewEntity = createAction(
  '[Interview/API] DELETE_INTERVIEW',
  props<{ payload: Interview }>()
);

export const deleteInterviewSuccess = createAction(
  '[Interview/API] DELETE_INTERVIEW_SUCCESS',
  props<{ payload: unknown }>()
);

export const deleteInterviewFailure = createAction(
  '[Interview/API] DELETE_INTERVIEW_FAILURE',
  props<{ error: unknown }>()
);
