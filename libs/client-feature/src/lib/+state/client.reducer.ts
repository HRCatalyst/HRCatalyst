import { createReducer, on } from '@ngrx/store';
import * as ClientActions from './client.actions';
import { adapter, initialState } from './client.entity';


export const reducer = createReducer(
  initialState,
  on(ClientActions.addClient,
    (state, action) => adapter.addOne(action.client, state)
  ),
  on(ClientActions.upsertClient,
    (state, action) => adapter.upsertOne(action.client, state)
  ),
  on(ClientActions.addClients,
    (state, action) => adapter.addMany(action.clients, state)
  ),
  on(ClientActions.upsertClients,
    (state, action) => adapter.upsertMany(action.clients, state)
  ),
  on(ClientActions.updateClientEntity,
    (state, action) => adapter.updateOne(action.client, state)
  ),
  on(ClientActions.updateClients,
    (state, action) => adapter.updateMany(action.clients, state)
  ),
  on(ClientActions.deleteClientEntity,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ClientActions.deleteClients,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(ClientActions.loadClients,
    (state, action) => adapter.setAll(action.clients, state)
  ),
  on(ClientActions.clearClients,
    state => adapter.removeAll(state)
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
  on(ClientActions.loadCompanyClientsSuccess,
    state => { return state; }
  ),
  on(ClientActions.loadCompanyClientsFailure,
    state => { return state; }
  ),
  on(ClientActions.selectClient,
    state => { return state; }
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


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
