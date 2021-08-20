import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Client } from './client.interface';
import { createFeatureSelector } from '@ngrx/store';

export interface ClientState  extends EntityState<Client> {
    selectedClient?: Client;
}

export function selectclientId(a: Client): string {
    // In this case this would be optional since primary key is id
    return a.id;
}

export function sortByName(a: Client, b: Client): number {
    return (a.name).localeCompare(b.name);
}

export const adapter: EntityAdapter<Client> = createEntityAdapter<Client>({
    selectId: selectclientId,
    sortComparer: sortByName,
});

export const initialState: ClientState = adapter.getInitialState({
    // additional entity state properties
    selectedClient: null
});

// Create the default selectors
export const getClientState = createFeatureSelector<ClientState>('client');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = adapter.getSelectors(getClientState);
