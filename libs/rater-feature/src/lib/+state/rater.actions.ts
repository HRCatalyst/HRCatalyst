import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Rater, SelectParticipantParams, SelectRaterParams } from '@hrc/shared-feature';

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

export const updateRaterEntity = createAction(
  '[Rater/API] Update Rater',
  props<{ rater: Update<Rater> }>()
);

export const updateRaters = createAction(
  '[Rater/API] Update Raters',
  props<{ raters: Update<Rater>[] }>()
);

export const deleteRaterEntity = createAction(
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

export const loadRater = createAction(
  '[Rater/API] LOAD_RATER'
);

export const loadAllRaters = createAction(
  '[Rater/API] LOAD_ALL_RATERS'
);

export const loadAllRatersSuccess = createAction(
  '[Rater/API] LOAD_ALL_RATERS_SUCCESS',
  props<{ payload:  unknown}>()
);

export const loadAllRatersFailure = createAction(
  '[Rater/API] LOAD_ALL_RATERS_FAILURE',
  props<{ error:  unknown}>()
);

export const loadParticipantRaters = createAction(
  '[Rater/API] LOAD_PARTICIPANT_RATERS',
  props<{ payload: SelectParticipantParams}>()

);

export const loadParticipantRatersInprogress = createAction(
  '[Rater/API] LOAD_PARTICIPANT_RATERS_INPROGRESS'
);

export const loadParticipantRatersSuccess = createAction(
  '[Rater/API] LOAD_PARTICIPANT_RATERS_SUCCESS',
  props<{ payload:  unknown}>()
);

export const loadParticipantRatersFailure = createAction(
  '[Rater/API] LOAD_PARTICIPANT_RATERS_FAILURE',
  props<{ error:  unknown}>()
);

export const loadParticipantAssociatesSuccess = createAction(
  '[Rater/API] LOAD_PARTICIPANT_ASSOCIATES_SUCCESS',
  props<{ payload:  unknown}>()
);

export const selectRater = createAction(
  '[Rater/API] SELECT_RATER',
  props<{ payload: SelectRaterParams}>()
);

export const createRater = createAction(
  '[Rater/API] CREATE_RATER',
  props<{ payload: Rater}>()
);

export const createRaterSuccess = createAction(
  '[Rater/API] CREATE_RATER_SUCCESS',
  props<{ payload: Rater}>()
);

export const createRaterFailire = createAction(
  '[Rater/API] CREATE_RATER_FAILURE',
  props<{ error:  unknown}>()
);

export const updateRater = createAction(
  '[Rater/API] UPDATE_RATER',
  props<{ payload: Rater}>()
);

export const updateRaterSuccess = createAction(
  '[Rater/API] UPDATE_RATER_SUCCESS',
  props<{ payload:  unknown}>()
);

export const updateRaterFailure = createAction(
  '[Rater/API] UPDATE_RATER_FAILURE',
  props<{ error:  unknown}>()
);

export const deleteRater = createAction(
  '[Rater/API] DELETE_RATER',
  props<{ payload: Rater}>()
);

export const deleteRaterSuccess = createAction(
  '[Rater/API] DELETE_RATER_SUCCESS',
  props<{ payload:  unknown}>()
);

export const deleteRaterFailure = createAction(
  '[Rater/API] DELETE_RATER_FAILURE',
  props<{ error:  unknown}>()
);

export const loadRaterFeedback = createAction(
  '[Rater/API] LOAD_RATER_FEEDBACK',
  props<{ payload: SelectRaterParams}>()
);

export const loadRaterFeedbackInprogress = createAction(
  '[Rater/API] LOAD_RATER_FEEDBACK_INPROGRESS',
);

export const loadRaterFeedbackSuccess = createAction(
  '[Rater/API] LOAD_RATER_FEEDBACK_SUCCESS',
  props<{ payload:  unknown}>()
);

export const loadRaterFeedbackFailure = createAction(
  '[Rater/API] LOAD_RATER_FEEDBACK_FAILURE',
  props<{ error:  unknown}>()
);

export const changeColleagueToPeer = createAction(
  '[Rater/API] CHANGE_COLLEAGUE_TO_PEER'
);

export const changeColleagueToPeerSuccess = createAction(
  '[Rater/API] CHANGE_COLLEAGUE_TO_PEER_SUCCESS'
);

export const changeColleagueToPeerFailure = createAction(
  '[Rater/API] CHANGE_COLLEAGUE_TO_PEER_FAILURE'
);

export const dedupRaters = createAction(
  '[Rater/API] DEDUP_RATERS'
);

export const dedupRatersSuccess = createAction(
  '[Rater/API] DEDUP_RATERS_SUCCESS'
);

export const dedupRatersFailure = createAction(
  '[Rater/API] DEDUP_RATERS_FAILURE'
);
