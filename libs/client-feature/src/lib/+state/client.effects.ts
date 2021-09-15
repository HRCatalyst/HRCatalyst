import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Client } from './client.model';
import { Firestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { LoaderService } from '@hrc/shared-feature';
import { createClient, createClientFailire, createClientSuccess, deleteClient, deleteClientFailure, deleteClientSuccess, loadCompanyClients, loadCompanyClientsFailure, loadCompanyClientsSuccess, updateClient, updateClientFailure, updateClientSuccess } from './client.actions';
import { of, Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ClientState } from './client.entity';

@Injectable()
export class ClientEffects {
  campaignYear: string = Date.now.toString();
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private actions$: Actions, private firestore: Firestore,
    private store: Store<ClientState>, private loader: LoaderService) {
    this.campaignYear = '2021';
  }

  loadClients$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(loadCompanyClients),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      this.getClients(x.ids)
        .then((data) => {
          const result = new Array<unknown>();
          data.docs.forEach(x => {
              return result.push({...x.data(), id: x.id});
          });

          this.store.dispatch(loadCompanyClientsSuccess({payload: result}));
          this.loader.isLoading.next(false);
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return of(loadCompanyClientsFailure({error: err}));
        });
      return of(x);
    })
  )});


  create$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(createClient),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      this.create(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          this.store.dispatch(loadCompanyClients({ids: x.payload.companyId}));
          return createClientSuccess({payload: data});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return of(createClientFailire({error: err}));
        });
      return of(x);
    })
  )});

  update$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(updateClient),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      this.update(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          this.store.dispatch(loadCompanyClients({ids: x.payload.companyId}));
          return updateClientSuccess({payload: data});
        })
        .catch((err: any) => {
            this.loader.isLoading.next(false);
            return updateClientFailure({error: err});
        });
        return of(x);
      })
  )});

  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteClient),
      mergeMap(x => {
        this.loader.isLoading.next(true);
        this.delete(x.payload.id ?? '')
          .then(() => {
            this.loader.isLoading.next(false);
            this.store.dispatch(loadCompanyClients({ids: x.payload.companyId}));
            return deleteClientSuccess({payload: x.payload});
          })
          .catch((err: any) => {
            this.loader.isLoading.next(false);
            return deleteClientFailure({error: err});
          });
        return of(x);
      })
  )});

  get() {
    return this.firestore.collection<Client>('clients').snapshotChanges();
  }

  getClients(id: string) {
      return this.firestore.collection<Client>('clients').ref.where('companyId', '==', id).get();
  }

  create(client: Client) {
    delete client.id;
    const g = Object.assign({}, client);
    return this.firestore.collection<Client>('clients').add(g);
  }

  update(client: Client) {
    const g = Object.assign({}, client);
    return this.firestore.doc('clients/' + client.id).update(g);
  }

  delete(id: string) {
    return this.firestore.doc('clients/' + id).delete();
  }
}

