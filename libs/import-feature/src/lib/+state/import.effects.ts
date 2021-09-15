import { Injectable } from '@angular/core';
import { addDoc, collection, collectionChanges, CollectionReference, deleteDoc, doc, Firestore, query, updateDoc } from '@angular/fire/firestore';
import { Associate, Campaign, IImport, Import, ImportSuccessResult, LoaderService, Participant, Rater } from '@hrc/shared-feature';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of, zip } from 'rxjs';
import { deleteImport, deleteImportFailure, deleteImportSuccess, loadAllImports, loadAllImportsFailure, loadAllImportsSuccess, loadImport, loadImportFailure, loadImportInprogress, loadImportSuccess, logImportError, logImportErrorFailire, logImportErrorSuccess, updateImport, updateImportFailure, updateImportSuccess } from './import.actions';


@Injectable()
export class ImportEffects {
  campaignYear: string = Date.now.toString();

  constructor(private actions$: Actions, private firestore: Firestore,
      private loader: LoaderService, private store: Store<IImport>) {
        this.campaignYear = '2021';
  }

  loadDependencies$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(loadImport),
    mergeMap(x => {
      this.loader.isLoading.next(true);
        zip(this.getParticipants(),
          this.getRaters(),
          this.getAssociates(),
          this.getCampaigns()).subscribe(([participants, raters, associates, campaigns]) => {
            const p = participants.map(e => {
              return {
                id: e.doc.id,
                ...e.doc.data()
                } as Participant;
            });

            const r = raters.map(e => {
              return {
                id: e.doc.id,
                ...e.doc.data()
                } as Rater;
            });

            const a = associates.map(e => {
              return {
                //id: e.payload.doc.id,
                ...e.doc.data()
              } as Associate;
            });

            const c = campaigns.map(e => {
              return {
                id: e.doc.id,
                ...e.doc.data()
                } as Campaign;
            });

            const results = new ImportSuccessResult(c, p, r, a);

            this.store.dispatch(loadImportSuccess({payload: results}));
            this.loader.isLoading.next(false);
          });
        return of(x);
      }),
      map(() => {
          return loadImportInprogress();
      }),
      catchError((err, caught) => {
        this.store.dispatch(loadImportFailure({error: err}));
        this.loader.isLoading.next(false);
        return caught;
      })
    );
  })

  loadAll$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(loadAllImports),
    mergeMap(() => {
      this.loader.isLoading.next(true);
      return this.get()
        .pipe(
          map(Imports => {
            this.loader.isLoading.next(false);
            return loadAllImportsSuccess({payload: Imports});
          },
          catchError((err, caught) => {
            this.store.dispatch(loadAllImportsFailure({error: err}));
            this.loader.isLoading.next(false);
            return caught;
          })));
      }
    ))
  });

  create$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(logImportError),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      return this.create(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          return logImportErrorSuccess({payload: {...x.payload, id: data.id}});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return logImportErrorFailire({error: err});
        });
    })
  )});

  update$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(updateImport),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      return this.update(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          return updateImportSuccess({payload: data});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return updateImportFailure({error: err});
        });
    })
  )});

  delete$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(deleteImport),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      return this.delete(x.payload.id ?? '')
        .then(() => {
          this.loader.isLoading.next(false);
          return deleteImportSuccess({payload: x.payload.id});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return deleteImportFailure({error: err});
        });
    })
  )});

  get() {
    const table = `imports${this.campaignYear}`;
    return collectionChanges<Import>(query<Import>(collection(this.firestore, table) as CollectionReference<Import>));
  }

  getAssociates() {
    const table = `associates${this.campaignYear}`;
    return collectionChanges<Associate>(query<Associate>(collection(this.firestore, table) as CollectionReference<Associate>));
  }

  getCampaigns() {
    const table = `campaigns${this.campaignYear}`;
    return collectionChanges<Campaign>(query<Campaign>(collection(this.firestore, table) as CollectionReference<Campaign>));
  }

  getParticipants() {
    const table = `participants${this.campaignYear}`;
    return collectionChanges<Participant>(query(collection(this.firestore, table) as CollectionReference<Participant>));
  }

  getRaters() {
    const table = `raters${this.campaignYear}`;
    return collectionChanges<Rater>(query(collection(this.firestore, table) as CollectionReference<Rater>));
  }

  create(data: Import) {
    delete data.id;
    const g = Object.assign({}, data);
    const table = `imports${this.campaignYear}`;
    return addDoc(collection(this.firestore, table), g);
  }

  update(data: Import) {
    const g = Object.assign({}, data);
    const table = `imports${this.campaignYear}/${data.id}`;
    return updateDoc(doc(collection(this.firestore, table) as CollectionReference<Associate>, g.id), g);
  }

  delete(id: string) {
    const table = `imports${this.campaignYear}/${id}`;
    return deleteDoc(doc(this.firestore, table, id));
  }
}


