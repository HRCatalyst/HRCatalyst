import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Associate, Campaign, IImport, Import, ImportSuccessResult, LoaderService, Participant, Rater } from '@hrcatalyst/shared-feature';
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
                id: e.payload.doc.id,
                ...e.payload.doc.data()
                } as Participant;
            });

            const r = raters.map(e => {
              return {
                id: e.payload.doc.id,
                ...e.payload.doc.data()
                } as Rater;
            });

            const a = associates.map(e => {
              return {
                //id: e.payload.doc.id,
                ...e.payload.doc.data()
              } as Associate;
            });

            const c = campaigns.map(e => {
              return {
                id: e.payload.doc.id,
                ...e.payload.doc.data()
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
      this.create(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          return logImportErrorSuccess({payload: data});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return logImportErrorFailire({error: err});
        });
      return of(x);
    })
  )});

  update$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(updateImport),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      this.update(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          return updateImportSuccess({payload: data});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return updateImportFailure({error: err});
        });
      return of(x);
    })
  )});

  delete$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(deleteImport),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      this.delete(x.payload.id ?? '')
        .then(() => {
          this.loader.isLoading.next(false);
          return deleteImportSuccess({payload: x.payload.id});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return deleteImportFailure({error: err});
        });
      return of(x);
    })
  )});

  get() {
    const query = `imports${this.campaignYear}`;
    return this.firestore.collection<Import>(query).snapshotChanges();
  }

  getAssociates() {
    const query = `associates${this.campaignYear}`;
    return this.firestore.collection<Associate>(query).snapshotChanges();
  }

  getCampaigns() {
    const query = `campaigns${this.campaignYear}`;
    return this.firestore.collection<Campaign>(query).snapshotChanges();
  }

  getParticipants() {
    const query = `participants${this.campaignYear}`;
    return this.firestore.collection<Participant>(query).snapshotChanges();;
  }

  getRaters() {
    const query = `raters${this.campaignYear}`;
    return this.firestore.collection<Rater>(query).snapshotChanges();
  }

  create(data: Import) {
    delete data.id;
    const g = Object.assign({}, data);
    const query = `imports${this.campaignYear}`;
    return this.firestore.collection<Import>(query).add(g);
  }

  update(data: Import) {
    const g = Object.assign({}, data);
    const query = `imports${this.campaignYear}/${data.id}`;
    return this.firestore.doc(query).update(g);
  }

  delete(id: string) {
    const query = `imports${this.campaignYear}/${id}`;
    return this.firestore.doc(query).delete();
  }
}


