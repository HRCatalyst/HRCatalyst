import { Interview } from "@hrc/shared-feature";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createFeatureSelector } from "@ngrx/store";

export const interviewsFeatureKey = 'interviews';

export interface InterviewState  extends EntityState<Interview> {
  selectedInterview?: Interview;
}

export function selectinterviewId(a: Interview): string {
  // In this case this would be optional since primary key is id
  return a.id ?? '';
}

export function sortByName(a: Interview, b: Interview): number {
  return (a.id ?? '').localeCompare(b.id ?? '');
}

export const adapter: EntityAdapter<Interview> = createEntityAdapter<Interview>({
  selectId: selectinterviewId,
  sortComparer: sortByName,
});

export const initialState: InterviewState = adapter.getInitialState({
  // additional entity state properties
  selectedInterview: undefined
});

// Create the default selectors
export const getInterviewState = createFeatureSelector<InterviewState>('company');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getInterviewState);
