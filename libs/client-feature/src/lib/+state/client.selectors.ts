import { createFeatureSelector } from "@ngrx/store";
import { clientsFeatureKey, ClientState } from "./client.entity";

export const selectClientState = createFeatureSelector<ClientState>(
  clientsFeatureKey
);
