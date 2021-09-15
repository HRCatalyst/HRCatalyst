import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { CampaignParticipantsParams, Participant, SelectParticipantParams } from '@hrc/shared-feature';

export const loadParticipants = createAction(
  '[Participant/API] Load Participants',
  props<{ participants: Participant[] }>()
);

export const addParticipant = createAction(
  '[Participant/API] Add Participant',
  props<{ participant: Participant }>()
);

export const upsertParticipant = createAction(
  '[Participant/API] Upsert Participant',
  props<{ participant: Participant }>()
);

export const addParticipants = createAction(
  '[Participant/API] Add Participants',
  props<{ participants: Participant[] }>()
);

export const upsertParticipants = createAction(
  '[Participant/API] Upsert Participants',
  props<{ participants: Participant[] }>()
);

export const updateParticipantEntity = createAction(
  '[Participant/API] Update Participant',
  props<{ participant: Update<Participant> }>()
);

export const updateParticipants = createAction(
  '[Participant/API] Update Participants',
  props<{ participants: Update<Participant>[] }>()
);

export const deleteParticipantEntity = createAction(
  '[Participant/API] Delete Participant',
  props<{ id: string }>()
);

export const deleteParticipants = createAction(
  '[Participant/API] Delete Participants',
  props<{ ids: string[] }>()
);

export const clearParticipants = createAction(
  '[Participant/API] Clear Participants'
);
export const loadParticipant = createAction(
  '[Participant/API] LOAD_PARTICIPANT'
);

export const loadParticipantCampaign = createAction(
  '[Participant/API] LOAD_PARTICIPANT_CAMPAIGN',
  props<{ payload: string}>()
);

export const loadParticipantCampaignInprogress = createAction(
  '[Participant/API] LOAD_PARTICIPANT_CAMPAIGN_INPROGRESS'
);

export const loadParticipantCampaignSuccess = createAction(
  '[Participant/API] LOAD_PARTICIPANT_CAMPAIGN_SUCCESS',
  props<{ payload: unknown}>()
);

export const loadParticipantCampaignFailure = createAction(
  '[Participant/API] LOAD_PARTICIPANT_CAMPAIGN_FAILURE',
  props<{ error: unknown}>()
)

export const loadCampaignParticipants = createAction(
  '[Participant/API] LOAD_CAMPAIGN_PARTICIPANTS',
  props<{ payload: CampaignParticipantsParams}>()
);

export const loadCampaignParticipantsInprogress = createAction(
  '[Participant/API] LOAD_CAMPAIGN_PARTICIPANTS_INPROGRESS'
)

export const loadCampaignParticipantsSuccess = createAction(
  '[Participant/API] LOAD_CAMPAIGN_PARTICIPANTS_SUCCESS',
  props<{ payload: unknown}>()
);

export const loadCampaignParticipantsFailure = createAction(
  '[Participant/API] LOAD_CAMPAIGN_PARTICIPANTS_FAILURE',
  props<{ error: unknown}>()
);

export const loadCampaignAssociatesSuccess = createAction(
  '[Participant/API] LOAD_CAMPAIGN_ASSOCIATES_SUCCESS',
  props<{ payload: unknown}>()
);

export const selectParticipant = createAction(
  '[Participant/API] SELECT_PARTICIPANT',
  props<{ payload: SelectParticipantParams}>()
);

export const createParticipant = createAction(
  '[Participant/API] CREATE_PARTICIPANT',
  props<{ payload: Participant}>()
);

export const createParticipantSuccess = createAction(
  '[Participant/API] CREATE_PARTICIPANT_SUCCESS',
  props<{ payload: Participant}>()
);

export const createParticipantFailire = createAction(
  '[Participant/API] CREATE_PARTICIPANT_FAILURE',
  props<{ error: unknown}>()
);

export const updateParticipant = createAction(
  '[Participant/API] UPDATE_PARTICIPANT',
  props<{ payload: Participant}>()
);

export const updateParticipantSuccess = createAction(
  '[Participant/API] UPDATE_PARTICIPANT_SUCCESS',
  props<{ payload: Participant}>()
);

export const updateParticipantFailure = createAction(
  '[Participant/API] UPDATE_PARTICIPANT_FAILURE',
  props<{ error: unknown}>()
);

export const deleteParticipant = createAction(
  '[Participant/API] DELETE_PARTICIPANT',
  props<{ payload: Participant}>()
);

export const deleteParticipantSuccess = createAction(
  '[Participant/API] DELETE_PARTICIPANT_SUCCESS',
  props<{ payload: Participant}>()
);

export const deleteParticipantFailure = createAction(
  '[Participant/API] DELETE_PARTICIPANT_FAILURE',
  props<{ error: unknown}>()
);
