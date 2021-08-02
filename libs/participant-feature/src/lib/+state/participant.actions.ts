import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Participant } from './participant.model';

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

export const updateParticipant = createAction(
  '[Participant/API] Update Participant',
  props<{ participant: Update<Participant> }>()
);

export const updateParticipants = createAction(
  '[Participant/API] Update Participants',
  props<{ participants: Update<Participant>[] }>()
);

export const deleteParticipant = createAction(
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
