import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromQuestion from './question.reducer';

export const selectQuestionState = createFeatureSelector<fromQuestion.State>(
  fromQuestion.questionFeatureKey
);
