import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromParticipant from './participant.reducer';

export const selectParticipantState = createFeatureSelector<fromParticipant.State>(
  fromParticipant.participantFeatureKey
);
