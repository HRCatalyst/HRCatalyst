import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Company, LoaderService, companyEntity } from '@hrc/shared-feature';
import { createCompany, createCompanyFailire, createCompanySuccess, deleteCompany, deleteCompanyFailure, deleteCompanySuccess, loadAllCompanys, loadAllCompanysFailure, loadAllCompanysSuccess, updateCompany, updateCompanyFailure, updateCompanySuccess } from './company.actions';
import { Store } from '@ngrx/store';
import { addDoc, collection, collectionChanges, CollectionReference, deleteDoc, doc, Firestore, query, updateDoc } from '@angular/fire/firestore';
import { Subject } from 'rxjs';


@Injectable()
export class CompanyEffects {
  campaignYear: string = Date.now.toString();
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private actions$: Actions, private firestore: Firestore,
    private store: Store<companyEntity.CompanyState>, private loader: LoaderService) {
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
          const result = new Array<Company>();
          data.forEach(x => {
            return result.push({...x.doc.data(), id: x.doc.id});
          });
          return loadAllCompanysSuccess({payload: result});
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
      return this.create(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          return createCompanySuccess({payload: {...x.payload, id: data.id}});
        })
        .catch((err: any)=> {
          this.loader.isLoading.next(false);
          return createCompanyFailire({error: err});
        });
    })
  )});

  update$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(updateCompany),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      return this.update(x.payload)
        .then(() => {
          this.loader.isLoading.next(false);
          return updateCompanySuccess({payload: x.payload});
        })
        .catch((err: any)=> {
          this.loader.isLoading.next(false);
          return updateCompanyFailure({error: err});
        });
    })
  )});

  delete$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(deleteCompany),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      return this.delete(x.payload.id ?? '')
        .then(() => {
          this.loader.isLoading.next(false);
          return deleteCompanySuccess({payload: x.payload});
        })
        .catch((err: any)=> {
          this.loader.isLoading.next(false);
          return deleteCompanyFailure({error: err});
        });
    })
  )});

  get() {
    return collectionChanges<Company>(query<Company>(collection(this.firestore, 'company') as CollectionReference<Company>));
  }

  create(company: Company) {
    delete company.id;
    const g = Object.assign({}, company);
    return addDoc(collection(this.firestore, 'company'), g);
  }

  update(company: Company) {
    const g = Object.assign({}, company);
    return updateDoc(doc(collection(this.firestore, 'company') as CollectionReference<Company>, g.id), g);
  }

  delete(id: string) {
    return deleteDoc(doc(this.firestore, 'company', id));
  }
}
