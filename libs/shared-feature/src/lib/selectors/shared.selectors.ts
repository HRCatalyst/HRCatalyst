import { createFeatureSelector } from "@ngrx/store";
import { sharedFeatureKey, SharedState } from "./../entities/shared.entity";


export const selectSharedState = createFeatureSelector<SharedState>(
  sharedFeatureKey
);
