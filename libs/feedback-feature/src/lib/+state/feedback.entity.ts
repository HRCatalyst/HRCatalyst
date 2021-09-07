import { Feedback } from "@hrcatalyst/shared-feature";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createFeatureSelector } from "@ngrx/store";

export const feedbacksFeatureKey = 'feedbacks';

export interface FeedbackState  extends EntityState<Feedback> {
  selectedFeedback?: Feedback;
}

export function selectfeedbackId(a: Feedback): string {
  return a.id ?? '';
}

export function sortByName(a: Feedback, b: Feedback): number {
  return (a.participantEmail).localeCompare(b.participantEmail);
}

export const adapter: EntityAdapter<Feedback> = createEntityAdapter<Feedback>({
  selectId: selectfeedbackId,
  sortComparer: sortByName,
});

export const initialState: FeedbackState = adapter.getInitialState({
  // additional entity state properties
  selectedFeedback: undefined
});

// Create the default selectors
export const getFeedbackState = createFeatureSelector<FeedbackState>('company');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getFeedbackState);
