import { createFeatureSelector } from "@ngrx/store";
import { interviewsFeatureKey, InterviewState } from "./../entities/interview.entity";

export const selectInterviewState = createFeatureSelector<InterviewState>(
  interviewsFeatureKey
);
