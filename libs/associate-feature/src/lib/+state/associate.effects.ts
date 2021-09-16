import { Injectable } from '@angular/core';
import { addDoc, collection, collectionChanges, CollectionReference, deleteDoc, doc, Firestore, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, debounceTime, distinctUntilChanged, map, mergeMap, switchMap,  } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { Associate } from '@hrc/shared-feature';
import { Store } from '@ngrx/store';
import { LoaderService } from '@hrc/shared-feature';
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
      return this.getById(x.payload).pipe(
        map(aoc => {
          this.loader.isLoading.next(false);
          return loadAssociateSuccess({ payload: aoc.values[0] });
        }),
        catchError((err, caught) => {
          this.store.dispatch(loadAssociateFailure(err));
          this.loader.isLoading.next(false);
          return caught;
        }));
    }))
  });

  loadCompanyAssociates$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(loadCompanyAssociates),
    mergeMap(x => {
      this.loader.isLoading.next(true);
       this.getAssociates(x.payload).pipe(
        map((data) => {
          const result = new Array<Associate>();
          data.forEach(d => {
              result.push({...d.doc.data(), id: d.doc.id});
          });
          this.loader.isLoading.next(false);
          return of(loadCompanyAssociatesSuccess({payload: result}));
        }),
        catchError((err, caught) => {
          this.loader.isLoading.next(false);
          this.store.dispatch(loadCompanyAssociatesFailure({error: err}));
          return caught;
        }));
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
              (a.doc.id === x.payload
              || a.doc.data().lastName.toLowerCase().startsWith(x.payload.toLowerCase())
              || a.doc.data().firstName.toLowerCase().startsWith(x.payload.toLowerCase())
              || a.doc.data().emailAddress.toLowerCase().startsWith(x.payload.toLowerCase())));

            this.loader.isLoading.next(false);
            const result = new Array<Associate>();
            assoc.forEach(x => {
              return result.push({...x.doc.data(), id: x.doc.id});
            });
            return of(searchAssociatesSuccess({ payload: result}));
          }),
          catchError((err, caught) => {
            this.store.dispatch(searchAssociatesFailure(err));
            this.loader.isLoading.next(false);
            return caught;
          }));
      })
    )}
  );

  create$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(createAssociate),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      return this.create(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          return createAssociateSuccess({payload: {...x.payload, id: data.id}});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return createAssociateFailire({ error: err });
        })

      })
    )
  });

  update$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(updateAssociate),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      return this.update(x.payload)
          .then(() => {
            this.loader.isLoading.next(false);
            return updateAssociateSuccess({payload: x.payload});
          })
          .catch((err: any) => {
            this.loader.isLoading.next(false);
            return updateAssociateFailure({error: err });
          })
      })
    )
  });

  delete$ = createEffect(() => {
      return this.actions$.pipe(
      ofType(deleteAssociate),
      mergeMap(x => {
        this.loader.isLoading.next(true);
        return this.delete(x.payload.id ?? '')
          .then(() => {
            this.loader.isLoading.next(false);
            return deleteAssociateSuccess({payload: x.payload});
          })
          .catch((err: any) => {
            this.loader.isLoading.next(false);
            return deleteAssociateFailure({error: err});
          })
        })
    )
  });

  get() {
    const table = `associates${this.campaignYear}`;
    return collectionChanges<Associate>(query<Associate>(collection(this.firestore, table) as CollectionReference<Associate>));
  };

  getById(id: string) {
    const table = `associates${this.campaignYear}`;
    return collectionChanges<Associate>(query(collection(this.firestore, table) as CollectionReference<Associate>, where('id', '==', id)));
  };

  getAssociates(id: string) {
    const table = `associates${this.campaignYear}`;
    return collectionChanges<Associate>(query(collection(this.firestore, table) as CollectionReference<Associate>,
      where('companyId', '==', id)));
  };

  create(associate: Associate) {
    delete associate.id;
    const g = Object.assign({}, associate);
    const table = `associates${this.campaignYear}`;
    return addDoc(collection(this.firestore, table), g);
  };

  update(associate: Associate) {
    const g = Object.assign({}, associate);
    const table = `associates${this.campaignYear}`;
    return updateDoc(doc(collection(this.firestore, table) as CollectionReference<Associate>, g.id), g);
  };

  delete(id: string) {
    const table = `associates${this.campaignYear}`;
    return deleteDoc(doc(this.firestore, table, id));
  };
}
