import { createFeatureSelector } from "@ngrx/store";
import { ratersFeatureKey, RaterState } from "./../entities/rater.entity";

export const selectRaterState = createFeatureSelector<RaterState>(
  ratersFeatureKey
);
