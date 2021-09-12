import { createFeatureSelector } from "@ngrx/store";
import { sharedFeatureKey, SharedState } from "./shared.entity";


export const selectSharedState = createFeatureSelector<SharedState>(
  sharedFeatureKey
);
