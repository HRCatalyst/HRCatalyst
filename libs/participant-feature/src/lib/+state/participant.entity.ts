import { Participant } from "@hrc/shared-feature";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createFeatureSelector } from "@ngrx/store";

export const participantsFeatureKey = 'participants';

export interface ParticipantState  extends EntityState<Participant> {
  selectedParticipant?: Participant;
}

export function selectParticipantId(a: Participant): string {
  // In this case this would be optional since primary key is id
  return a.id ?? '';
}

export function sortByName(a: Participant, b: Participant): number {
  return (a.id ?? '').localeCompare(b.id ?? '');
}

export const adapter: EntityAdapter<Participant> = createEntityAdapter<Participant>({
  selectId: selectParticipantId,
  sortComparer: sortByName,
});

export const initialState: ParticipantState = adapter.getInitialState({
  // additional entity state properties
  selectedParticipant: undefined
});

// Create the default selectors
export const getParticipantState = createFeatureSelector<ParticipantState>('company');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getParticipantState);

