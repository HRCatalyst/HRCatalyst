import { Question } from "@hrcatalyst/shared-feature";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createFeatureSelector } from "@ngrx/store";

export const questionsFeatureKey = 'questions';

export interface QuestionState  extends EntityState<Question> {
  selectedQuestion?: Question;
}

export function selectQuestionId(a: Question): string {
  // In this case this would be optional since primary key is id
  return a.id ?? '';
}

export function sortByName(a: Question, b: Question): number {
  return (a.id ?? '').localeCompare(b.id ?? '');
}

export const adapter: EntityAdapter<Question> = createEntityAdapter<Question>({
  selectId: selectQuestionId,
  sortComparer: sortByName,
});

export const initialState: QuestionState = adapter.getInitialState({
  // additional entity state properties
  selectedQuestion: undefined
});

// Create the default selectors
export const getQuestionState = createFeatureSelector<QuestionState>('company');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getQuestionState);

