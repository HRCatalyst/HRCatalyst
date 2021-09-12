import { createFeatureSelector } from "@ngrx/store";
import { questionsFeatureKey, QuestionState } from "./question.entity";

export const selectQuestionState = createFeatureSelector<QuestionState>(
  questionsFeatureKey
);
