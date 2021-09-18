
import { createFeatureSelector } from "@ngrx/store";
import { participantsFeatureKey, ParticipantState } from "./../entities/participant.entity";

export const selectParticipantState = createFeatureSelector<ParticipantState>(
  participantsFeatureKey
);
