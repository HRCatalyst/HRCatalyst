import { createFeatureSelector } from "@ngrx/store";
import { interviewsFeatureKey, InterviewState } from "./interview.entity";

export const selectInterviewState = createFeatureSelector<InterviewState>(
  interviewsFeatureKey
);
