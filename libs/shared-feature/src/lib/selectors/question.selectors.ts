import { createFeatureSelector } from "@ngrx/store";
import { questionsFeatureKey, QuestionState } from "./../entities/question.entity";

export const selectQuestionState = createFeatureSelector<QuestionState>(
  questionsFeatureKey
);
