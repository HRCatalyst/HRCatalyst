
import { createFeatureSelector } from "@ngrx/store";
import { participantsFeatureKey, ParticipantState } from "./participant.entity";

export const selectParticipantState = createFeatureSelector<ParticipantState>(
  participantsFeatureKey
);
