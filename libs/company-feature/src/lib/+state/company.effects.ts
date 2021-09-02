import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap } from 'rxjs/operators';
import { Observable, EMPTY, of, Subject } from 'rxjs';

import * as CompanyActions from './company.actions';
import { CompanyState } from './company.entity';
import { Company, LoaderService } from '@hrcatalyst/shared-feature';
import { createCompany, createCompanyFailire, createCompanySuccess, deleteCompany, deleteCompanyFailure, deleteCompanySuccess, loadAllCompanys, loadAllCompanysFailure, loadAllCompanysSuccess, updateCompany, updateCompanyFailure, updateCompanySuccess } from './company.actions';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable()
export class CompanyEffects {
  campaignYear: string = Date.now.toString();
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private actions$: Actions, private firestore: AngularFirestore,
    private store: Store<CompanyState>, private loader: LoaderService) {
    this.campaignYear = '2021';
  }

  load$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(loadAllCompanys),
    mergeMap(() => {
      this.loader.isLoading.next(true);
      return this.get()
      .pipe(
        map(data => {
          this.loader.isLoading.next(false);
          return loadAllCompanysSuccess({payload: data});
        }),
        catchError((err, caught) => {
          this.store.dispatch(loadAllCompanysFailure({error: err}));
          this.loader.isLoading.next(false);
          return caught;
        })
    )})
  )});

  create$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(createCompany),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      this.create(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          return createCompanySuccess({payload: data});
        })
        .catch(err => {
          this.loader.isLoading.next(false);
          return createCompanyFailire({error: err});
        });
      return of(x);
    })
  )});

  update$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(updateCompany),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      this.update(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          return updateCompanySuccess({payload: data});
        })
        .catch(err => {
          this.loader.isLoading.next(false);
          return updateCompanyFailure({error: err});
        });
      return of(x);
    })
  )});

  delete$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(deleteCompany),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      this.delete(x.payload.id ?? '')
        .then(() => {
          this.loader.isLoading.next(false);
          return deleteCompanySuccess({payload: x.payload});
        })
        .catch(err => {
          this.loader.isLoading.next(false);
          return deleteCompanyFailure({error: err});
        });
      return of(x);
    })
  )});

  get() {
      return this.firestore.collection<Company>('company').snapshotChanges();
  }

  create(company: Company) {
    delete company.id;
    const g = Object.assign({}, company);
    return this.firestore.collection<Company>('company').add(g);
  }

  update(company: Company) {
    const g = Object.assign({}, company);
    return this.firestore.doc('company/' + company.id).update(g);
  }

  delete(id: string) {
    return this.firestore.doc('company/' + id).delete();
  }
}
