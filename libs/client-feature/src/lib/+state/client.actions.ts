import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Client } from './client.model';

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

export const updateClient = createAction(
  '[Client/API] Update Client',
  props<{ client: Update<Client> }>()
);

export const updateClients = createAction(
  '[Client/API] Update Clients',
  props<{ clients: Update<Client>[] }>()
);

export const deleteClient = createAction(
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
