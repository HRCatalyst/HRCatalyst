import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Associate, Feedback, IFeedback, SelectParticipantParams, SelectRaterParams } from '@hrc/shared-feature';

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

export const updateFeedbackEntity = createAction(
  '[Feedback/API] Update Feedback',
  props<{ feedback: Update<Feedback> }>()
);

export const updateFeedbacks = createAction(
  '[Feedback/API] Update Feedbacks',
  props<{ feedbacks: Update<Feedback>[] }>()
);

export const deleteFeedbackEntity = createAction(
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

export const loadFeedback = createAction(
  '[Feedback/API] LOAD_FEEDBACK'
);

export const loadFeedbackSuccess = createAction(
  '[Feedback/API] LOAD_FEEDBACK_SUCCESS',
  props<{ payload: Feedback[] }>()
);

export const loadFeedbackFailure = createAction(
  '[Feedback/API] LOAD_FEEDBACK_FAILURE',
  props<{ error: unknown }>()
);

export const loadFeedbackErrors = createAction(
  '[Feedback/API] LOAD_FEEDBACK_ERRORS'
);

export const loadFeedbackErrorsSuccess = createAction(
  '[Feedback/API] LOAD_FEEDBACK_ERRORS_SUCCESS',
  props<{ payload: Feedback[] }>()
);

export const loadFeedbackErrorsFailure = createAction(
  '[Feedback/API] LOAD_FEEDBACK_ERRORS_FAILURE',
  props<{ error: unknown }>()
);

export const loadParticipantFeedback = createAction(
  '[Feedback/API] LOAD_PARTICIPANT_FEEDBACK',
  props<{ payload: SelectParticipantParams }>()
);

export const loadParticipantFeedbackInprogress = createAction(
  '[Feedback/API] LOAD_PARTICIPANT_FEEDBACK_INPROGRESS'
);

export const loadParticipantFeedbackSuccess = createAction(
  '[Feedback/API] LOAD_PARTICIPANT_FEEDBACK_SUCCESS',
  props<{ payload: Feedback[] }>()
);

export const loadParticipantFeedbackFailure = createAction(
  '[Feedback/API] LOAD_PARTICIPANT_FEEDBACK_FAILURE',
  props<{ error: unknown }>()
);

export const loadParticipantAssociatesSuccess = createAction(
  '[Feedback/API] LOAD_PARTICIPANT_ASSOCIATES_SUCCESS',
  props<{ payload: Associate[] }>()
);

export const createFeedback = createAction(
  '[Feedback/API] CREATE_FEEDBACK',
  props<{ payload: Feedback }>()
);

export const createFeedbackSuccess = createAction(
  '[Feedback/API] CREATE_FEEDBACK_SUCCESS',
  props<{  payload: Feedback }>()
);

export const createFeedbackFailire = createAction(
  '[Feedback/API] CREATE_FEEDBACK_FAILURE',
  props<{ error: unknown }>()
);

export const updateFeedback = createAction(
  '[Feedback/API] UPDATE_FEEDBACK',
  props<{  payload: Feedback }>()
);

export const updateFeedbackSuccess = createAction(
  '[Feedback/API] UPDATE_FEEDBACK_SUCCESS',
  props<{ payload: Feedback }>()
);

export const updateFeedbackFailure = createAction(
  '[Feedback/API] UPDATE_FEEDBACK_FAILURE',
  props<{ error: unknown }>()
);

export const deleteFeedback = createAction(
  '[Feedback/API] DELETE_FEEDBACK',
  props<{  payload: Feedback }>()
);

export const deleteFeedbackSuccess = createAction(
  '[Feedback/API] DELETE_FEEDBACK_SUCCESS',
  props<{ payload: Feedback }>()
);

export const deleteFeedbackFailure = createAction(
  '[Feedback/API] DELETE_FEEDBACK_FAILURE',
  props<{ error: unknown }>()
);

export const changePendingToReceived = createAction(
  '[Feedback/API] CHANGE_PENDING_TO_RECEIVED'
);

export const changePendingToReceivedSuccess = createAction(
  '[Feedback/API] CHANGE_PENDING_TO_RECEIVED_SUCCESS'
);

export const changePendingToReceivedFailure = createAction(
  '[Feedback/API] CHANGE_PENDING_TO_RECEIVED_FAILURE'
);

export const changeColleagueToPeer = createAction(
  '[Feedback/API] CHANGE_COLLEAGUE_TO_PEER'
);

export const changeColleagueToPeerSuccess = createAction(
  '[Feedback/API] CHANGE_COLLEAGUE_TO_PEER_SUCCESS'
);

export const changeColleagueToPeerFailure = createAction(
  '[Feedback/API] CHANGE_COLLEAGUE_TO_PEER_FAILURE'
);

export const loadRaterFeedback = createAction(
  '[Feedback/API] LOAD_RATER_FEEDBACK',
  props<{ payload: SelectRaterParams}>()
);

export const loadRaterFeedbackInprogress = createAction(
  '[Feedback/API] LOAD_RATER_FEEDBACK_INPROGRESS',
);

export const loadRaterFeedbackSuccess = createAction(
  '[Feedback/API] LOAD_RATER_FEEDBACK_SUCCESS',
  props<{ payload:  unknown}>()
);

export const loadRaterFeedbackFailure = createAction(
  '[Feedback/API] LOAD_RATER_FEEDBACK_FAILURE',
  props<{ error:  unknown}>()
);

