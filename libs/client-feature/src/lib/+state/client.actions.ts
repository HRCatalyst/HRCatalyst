import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Client, IClient } from './client.model';

export const loadClients = createAction(
  '[Client/API] Load Clients',
  props<{ clients: Client[] }>()
);

export const addClient = createAction(
  '[Client/API] Add Client',
  props<{ client: Client }>()
);

export const upsertClient = createAction(
  '[Client/API] Upsert Client',
  props<{ client: Client }>()
);

export const addClients = createAction(
  '[Client/API] Add Clients',
  props<{ clients: Client[] }>()
);

export const upsertClients = createAction(
  '[Client/API] Upsert Clients',
  props<{ clients: Client[] }>()
);

export const updateClientEntity = createAction(
  '[Client/API] Update Client',
  props<{ client: Update<Client> }>()
);

export const updateClients = createAction(
  '[Client/API] Update Clients',
  props<{ clients: Update<Client>[] }>()
);

export const deleteClientEntity = createAction(
  '[Client/API] Delete Client',
  props<{ id: string }>()
);

export const deleteClients = createAction(
  '[Client/API] Delete Clients',
  props<{ ids: string[] }>()
);

export const clearClients = createAction(
  '[Client/API] Clear Clients'
);

export const loadClient = createAction(
  '[Client/API] Load Client'
);

export const loadCompanyClients = createAction(
  '[Client/API] Load Company Client',
  props<{ ids: string }>()
);

export const loadCompanyClientsInprogress = createAction(
  '[Client/API] Load Company Clients Inprogress'
);

export const loadCompanyClientsSuccess = createAction(
  '[Client/API] Load Company Clienta Soccess',
  props<{ payload: unknown }>()
);

export const loadCompanyClientsFailure = createAction(
  '[Client/API] Load Company Clients Failure',
  props<{ error: unknown }>()
);

export const selectClient = createAction(
  '[Client/API] Select Client',
  props<{ payload: unknown }>()
);

export const createClient = createAction(
  '[Client/API] Create Client',
  props<{ payload: Client }>()
);

export const createClientSuccess = createAction(
  '[Client/API] Create Client Success',
  props<{ payload: Client }>()
);

export const createClientFailire = createAction(
  '[Client/API] Create Client Failure',
  props<{ error: unknown }>()
);

export const updateClient = createAction(
  '[Client/API] Update Client',
  props<{ payload: IClient }>()
);

export const updateClientSuccess = createAction(
  '[Client/API] Update Client Success',
  props<{ payload: unknown }>()
);

export const updateClientFailure = createAction(
  '[Client/API] Update Client Failure',
  props<{ error: unknown }>()
);

export const deleteClient = createAction(
  '[Client/API] Delete Client',
  props<{ payload: IClient }>()
);

export const deleteClientSuccess = createAction(
  '[Client/API] Delete Client Success',
  props<{ payload: IClient }>()
);

export const deleteClientFailure = createAction(
  '[Client/API] Delete Client Failure',
  props<{ error: unknown }>()
);
