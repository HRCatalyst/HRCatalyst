import { createFeatureSelector } from "@ngrx/store";
import { ratersFeatureKey, RaterState } from "./rater.entity";

export const selectRaterState = createFeatureSelector<RaterState>(
  ratersFeatureKey
);
