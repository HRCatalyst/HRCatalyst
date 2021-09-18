import { createFeatureSelector } from "@ngrx/store";
import { homesFeatureKey, HomeState } from "./../entities/home.entity";

export const selectHomeState = createFeatureSelector<HomeState>(
  homesFeatureKey
);
