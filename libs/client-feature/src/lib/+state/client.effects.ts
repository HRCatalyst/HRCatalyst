import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Client } from './client.model';
import { addDoc, collection, collectionChanges, CollectionReference, deleteDoc, doc, Firestore, query, updateDoc, where } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { LoaderService, clientEntity } from '@hrc/shared-feature';
import { createClient, createClientFailire, createClientSuccess, deleteClient, deleteClientFailure, deleteClientSuccess, loadCompanyClients, loadCompanyClientsFailure, loadCompanyClientsSuccess, updateClient, updateClientFailure, updateClientSuccess } from './client.actions';
import { Subject } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class ClientEffects {
  campaignYear: string = Date.now.toString();
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private actions$: Actions, private firestore: Firestore,
    private store: Store<clientEntity.ClientState>, private loader: LoaderService) {
    this.campaignYear = '2021';
  }

  loadClients$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(loadCompanyClients),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      return this.getClients(x.ids).pipe(
        map((data) => {
          const result = new Array<Client>();
          data.forEach(x => {
            return result.push({...x.doc.data(), id: x.doc.id});
          });

          //this.store.dispatch(loadCompanyClientsSuccess({payload: result}));
          this.loader.isLoading.next(false);
          return loadCompanyClientsSuccess({payload: result});
        }),
        catchError((err, caught) => {
          this.loader.isLoading.next(false);
          this.store.dispatch(loadCompanyClientsFailure({error: err}));
          return caught;
        }));
      })
    )}
  );


  create$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(createClient),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      return this.create(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          return createClientSuccess({payload: {...x.payload, id: data.id}});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return createClientFailire({error: err});
        });
    })
  )});

  update$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(updateClient),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      return this.update(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          this.store.dispatch(loadCompanyClients({ids: x.payload.companyId}));
          return updateClientSuccess({payload: data});
        })
        .catch((err: any) => {
            this.loader.isLoading.next(false);
            return updateClientFailure({error: err});
        });
      })
  )});

  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteClient),
      mergeMap(x => {
        this.loader.isLoading.next(true);
        return this.delete(x.payload.id ?? '')
          .then(() => {
            this.loader.isLoading.next(false);
            this.store.dispatch(loadCompanyClients({ids: x.payload.companyId}));
            return deleteClientSuccess({payload: x.payload});
          })
          .catch((err: any) => {
            this.loader.isLoading.next(false);
            return deleteClientFailure({error: err});
          });
      })
  )});

  get() {
    return collectionChanges<Client>(query<Client>(collection(this.firestore, 'clients') as CollectionReference<Client>));
  }

  getClients(id: string) {
    return collectionChanges<Client>(query(collection(this.firestore, 'clients') as CollectionReference<Client>,
    where('companyId', '==', id)));
  }

  create(client: Client) {
    delete client.id;
    const g = Object.assign({}, client);
    return addDoc(collection(this.firestore, 'clients'), g);
  }

  update(client: Client) {
    const g = Object.assign({}, client);
    return updateDoc(doc(collection(this.firestore, 'clients') as CollectionReference<Client>, g.id), g);
  }

  delete(id: string) {
    return deleteDoc(doc(this.firestore, 'clients', id));
  }
}

