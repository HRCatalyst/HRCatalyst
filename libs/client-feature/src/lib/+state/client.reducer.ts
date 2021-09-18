import { Client, clientEntity } from '@hrc/shared-feature';
import { createReducer, on } from '@ngrx/store';
import * as ClientActions from './client.actions';


export const reducer = createReducer(
  clientEntity.initialState,
  on(ClientActions.addClient,
    (state, action) => clientEntity.adapter.addOne(action.client, state)
  ),
  on(ClientActions.upsertClient,
    (state, action) => clientEntity.adapter.upsertOne(action.client, state)
  ),
  on(ClientActions.addClients,
    (state, action) => clientEntity.adapter.addMany(action.clients, state)
  ),
  on(ClientActions.upsertClients,
    (state, action) => clientEntity.adapter.upsertMany(action.clients, state)
  ),
  on(ClientActions.updateClientEntity,
    (state, action) => clientEntity.adapter.updateOne(action.client, state)
  ),
  on(ClientActions.updateClients,
    (state, action) => clientEntity.adapter.updateMany(action.clients, state)
  ),
  on(ClientActions.deleteClientEntity,
    (state, action) => clientEntity.adapter.removeOne(action.id, state)
  ),
  on(ClientActions.deleteClients,
    (state, action) => clientEntity.adapter.removeMany(action.ids, state)
  ),
  on(ClientActions.loadClients,
    (state, action) => clientEntity.adapter.setAll(action.clients, state)
  ),
  on(ClientActions.clearClients,
    state => clientEntity.adapter.removeAll(state)
  ),
  on(ClientActions.loadClient,
    state => { return state; }
  ),
  on(ClientActions.loadCompanyClients,
    state => { return state; }
  ),
  on(ClientActions.loadCompanyClientsInprogress,
    state => { return state; }
  ),
  on(ClientActions.loadCompanyClientsSuccess, (state, action) => {
    const clients = action.payload.map(e => {
      return {
          id: e.id, ...e
      } as Client;
    });
    state = clientEntity.adapter.removeAll(state);
    return clientEntity.adapter.addMany(clients, state);
  }),
  on(ClientActions.loadCompanyClientsFailure,
    state => { return state; }
  ),
  on(ClientActions.selectClient, (state, action) => {
    return {...state, selectedClient: action.payload}; }
  ),
  on(ClientActions.createClient,
    state => { return state; }
  ),
  on(ClientActions.createClientSuccess,
    state => { return state; }
  ),
  on(ClientActions.createClientFailire,
    state => { return state; }
  ),
  on(ClientActions.updateClient,
    state => { return state; }
  ),
  on(ClientActions.updateClientSuccess,
    state => { return state; }
  ),
  on(ClientActions.updateClientFailure,
    state => { return state; }
  ),
  on(ClientActions.deleteClient,
    state => { return state; }
  ),
  on(ClientActions.deleteClientSuccess,
    state => { return state; }
  ),
  on(ClientActions.deleteClientFailure,
    state => { return state; }
  )
);

