import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, debounceTime, distinctUntilChanged, map, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

import { Associate } from '@hrcatalyst/shared-feature';
import { Store } from '@ngrx/store';
import { LoaderService } from '@hrcatalyst/shared-feature';
import { AssociateState } from './associate.entity';
import { createAssociate, createAssociateFailire, createAssociateSuccess, deleteAssociate, deleteAssociateFailure, deleteAssociateSuccess, loadAssociate, loadAssociateFailure, loadAssociateSuccess, loadCompanyAssociates, loadCompanyAssociatesFailure, loadCompanyAssociatesInprogress, loadCompanyAssociatesSuccess, searchAssociates, searchAssociatesFailure, searchAssociatesSuccess, updateAssociate, updateAssociateFailure, updateAssociateSuccess } from './associate.actions';

@Injectable()
export class AssociateEffects {
  campaignYear: string = Date.now.toString();
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private actions$: Actions,
              private store: Store<AssociateState>,
              private firestore: Firestore,
              private loader: LoaderService) {
      this.campaignYear = '2021';
  };

  loadAssociate$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(loadAssociate),
    mergeMap(x => {
        this.loader.isLoading.next(true);
        this.getById(x.payload)
          .pipe(
            map(aoc => {
              this.loader.isLoading.next(false);
              return loadAssociateSuccess({ payload: aoc.data() });
            }),
            catchError((err, caught) => {
              this.store.dispatch(loadAssociateFailure(err));
              this.loader.isLoading.next(false);
              return caught;
            }));
        return of(x);
    }))
  });

  loadCompanyAssociates$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(loadCompanyAssociates),
    mergeMap(x => {
       this.loader.isLoading.next(true);
       this.getAssociates(x.payload)
        .then((data) => {
          const result = new Array<unknown>();
          data.docs.forEach(d => {
              result.push({...d.data(), id: d.id});
          });

          this.store.dispatch(loadCompanyAssociatesSuccess({payload: result}));
          this.loader.isLoading.next(false);
          return of(loadCompanyAssociatesSuccess({payload: result}));
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return of(loadCompanyAssociatesFailure({error: err}));
        });
        return of(loadCompanyAssociatesInprogress());
      })
    )
  });

  searchAssociates$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(searchAssociates),
     mergeMap(x => {
       this.loader.isLoading.next(true);
       return this.get()
        .pipe(
          debounceTime(250),
          distinctUntilChanged(),
          switchMap(associates => {
            const assoc = associates.filter(a =>
              x.payload.length > 0 &&
              (a.payload.doc.id === x.payload
              || a.payload.doc.data().lastName.toLowerCase().startsWith(x.payload.toLowerCase())
              || a.payload.doc.data().firstName.toLowerCase().startsWith(x.payload.toLowerCase())
              || a.payload.doc.data().emailAddress.toLowerCase().startsWith(x.payload.toLowerCase())));

            this.loader.isLoading.next(false);
            return of(searchAssociatesSuccess({ payload: assoc}));
          }),
          catchError((err, caught) => {
            this.store.dispatch(searchAssociatesFailure(err));
            this.loader.isLoading.next(false);
            return caught;
          }));
        return of(x);
      })
    )}
  );

  create$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(createAssociate),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      this.create(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          this.store.dispatch(loadCompanyAssociates({payload: x.payload.companyId}));
          return createAssociateSuccess({payload: data});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return createAssociateFailire({ error: err });
        })
        return of(x);
      })
    )
  });

  update$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(updateAssociate),
    mergeMap(x => {
      this.loader.isLoading.next(true);
        this.update(x.payload)
          .then(() => {
            this.loader.isLoading.next(false);
            this.store.dispatch(loadCompanyAssociates({payload: x.payload.companyId}));
            return updateAssociateSuccess({payload: x.payload});
          })
          .catch((err: any) => {
            this.loader.isLoading.next(false);
            return updateAssociateFailure({error: err });
          })
          return of(x);
      })
    )
  });

  delete$ = createEffect(() => {
      return this.actions$.pipe(
      ofType(deleteAssociate),
      mergeMap(x => {
        this.loader.isLoading.next(true);
        this.delete(x.payload.id ?? '')
          .then(() => {
            this.loader.isLoading.next(false);
            this.store.dispatch(loadCompanyAssociates({payload: x.payload.companyId}));
            return deleteAssociateSuccess({payload: x.payload});
          })
          .catch((err: any) => {
            this.loader.isLoading.next(false);
            return deleteAssociateFailure({error: err});
          })
          return of(x);
        })
    )
  });

  get() {
    const query = `associates${this.campaignYear}`;
    return this.firestore.collection<Associate>(query).snapshotChanges();
  };

  getById(id: string) {
    const query = `associates${this.campaignYear}/${id}`;
    return this.firestore.doc(query).get();
  };

  getAssociates(id: string) {
      const query = `associates${this.campaignYear}`;
      return this.firestore.collection<Associate>(query).ref.where('companyId', '==', id).get();
  };

  create(associate: Associate) {
    delete associate.id;
    const g = Object.assign({}, associate);
    const query = `associates${this.campaignYear}`;
    return this.firestore.collection<Associate>(query).add(g);
  };

  update(associate: Associate) {
    const g = Object.assign({}, associate);
    const query = `associates${this.campaignYear}/${associate.id}`;
    return this.firestore.doc(query).update(g);
  };

  delete(id: string) {
    const query = `associates${this.campaignYear}/${id}`;
    return this.firestore.doc(query).delete();
  };

}
