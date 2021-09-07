import { Client } from '@hrcatalyst/shared-feature';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

export const clientsFeatureKey = 'clients';

export interface ClientState  extends EntityState<Client> {
    selectedClient?: Client;
}

export function selectclientId(a: Client): string {
    return a.id ?? '';
}

export function sortByName(a: Client, b: Client): number {
    return (a.name).localeCompare(b.name);
}

export const adapter: EntityAdapter<Client> = createEntityAdapter<Client>({
    selectId: selectclientId,
    sortComparer: sortByName,
});

export const initialState: ClientState = adapter.getInitialState({
    selectedClient: undefined
});

// Create the default selectors
export const getClientState = createFeatureSelector<ClientState>('client');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = adapter.getSelectors(getClientState);
