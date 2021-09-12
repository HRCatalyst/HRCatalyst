import { createFeatureSelector } from "@ngrx/store";
import { homesFeatureKey, HomeState } from "./home.entity";

export const selectHomeState = createFeatureSelector<HomeState>(
  homesFeatureKey
);
