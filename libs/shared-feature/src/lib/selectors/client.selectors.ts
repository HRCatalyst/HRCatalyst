import { createFeatureSelector } from "@ngrx/store";
import { clientsFeatureKey, ClientState } from "./../entities/client.entity";

export const selectClientState = createFeatureSelector<ClientState>(
  clientsFeatureKey
);
