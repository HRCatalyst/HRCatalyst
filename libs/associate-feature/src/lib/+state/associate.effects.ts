import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Associate, IAssociate } from './associate.model';
import { select, Store } from '@ngrx/store';
import { LoaderService } from '@hrcatalyst/shared-feature';
import { AssociateState } from './associate.entity';



@Injectable()
export class AssociateEffects {
  campaignYear: string = Date.now.toString();
  private onDestroy$: Subject<void> = new Subject<void>();

  // loadAssociates$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(AssociateActions.loadAssociates),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => AssociateActions.loadAssociatesSuccess({ data })),
  //         catchError(error => of(AssociateActions.loadAssociatesFailure({ error }))))
  //     )
  //   );
  // });
  constructor(private actions$: Actions<associateActions.AssociateActions>, private firestore: AngularFirestore,
    private loader: LoaderService, private store: Store<IAssociate>) {
      this.campaignYear = '';
      this.store.pipe(select((state: AssociateState) => state))
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state) => {
        if (state.campaign.activeYear) {
          this.campaignYear = state.campaign.activeYear.suffix;
        }
      });
  }

  // @Effect()
  // loadAssociate$: Observable<Action> = this.actions$.pipe(
  //   ofType(associateActions.AssociateActionTypes.LOAD_ASSOCIATE),
  //   mergeMap(x => {
  //       this.loader.isLoading.next(true);
  //       return this.getById(x.payload)
  //         .pipe(
  //           map(aoc => {
  //             this.loader.isLoading.next(false);
  //             return new associateActions.LoadAssociateSuccessAction(aoc.data());
  //           }),
  //           catchError((err, caught) => {
  //             this.store.dispatch(new associateActions.LoadAssociateFailureAction(err));
  //             this.loader.isLoading.next(false);
  //             return caught;
  //           }));
  // }));

  // @Effect()
  // loadAssociates$: Observable<Action> = this.actions$.pipe(
  //   ofType(associateActions.AssociateActionTypes.LOAD_COMPANY_ASSOCIATES),
  //   mergeMap(x => {
  //       this.loader.isLoading.next(true);
  //       this.getAssociates(x.payload).then((data) => {
  //         const result = new Array();
  //         data.docs.forEach(d => {
  //             return result.push({...d.data(), id: d.id});
  //         });

  //       this.store.dispatch(new associateActions.LoadCompanyAssociatesSuccessAction(result));
  //       this.loader.isLoading.next(false);
  //     })
  //     .catch(error => {
  //       this.loader.isLoading.next(false);
  //       return of(new associateActions.LoadCompanyAssociatesFailureAction(error));
  //     });

  //     return of(x);
  //   }),
  //   map((credentials) => {
  //       return new associateActions.LoadCompanyAssociatesInprogressAction();
  //   }),
  //   catchError((err, caught) => {
  //     this.store.dispatch(new associateActions.LoadCompanyAssociatesFailureAction(err));
  //     this.loader.isLoading.next(false);
  //     return caught;
  //   }
  // ));

  // @Effect()
  // searchAssociates$: Observable<Action> = this.actions$.pipe(
  //   ofType(associateActions.AssociateActionTypes.SEARCH_ASSOCIATES),
  //   mergeMap(x => {
  //     this.loader.isLoading.next(true);
  //     return this.get()
  //       .pipe(
  //         debounceTime(250),
  //         distinctUntilChanged(),
  //         switchMap(associates => {
  //           const assoc = associates.filter(a =>
  //             x.payload.length > 0 &&
  //             (a.payload.doc.id === x.payload
  //             || a.payload.doc.data().lastName.toLowerCase().startsWith(x.payload.toLowerCase())
  //             || a.payload.doc.data().firstName.toLowerCase().startsWith(x.payload.toLowerCase())
  //             || a.payload.doc.data().emailAddress.toLowerCase().startsWith(x.payload.toLowerCase())));

  //           this.loader.isLoading.next(false);
  //           return of(new associateActions.SearchAssociatesSuccessAction(assoc));
  //         }),
  //         catchError((err, caught) => {
  //           this.store.dispatch(new associateActions.SearchAssociatesFailureAction(err));
  //           this.loader.isLoading.next(false);
  //           return caught;
  //         })
  //     );
  //   })
  // );

  // @Effect()
  // create$: Observable<Action> = this.actions$.pipe(
  //   ofType(associateActions.AssociateActionTypes.CREATE_ASSOCIATE),
  //   mergeMap(x => {
  //       this.loader.isLoading.next(true);
  //       return this.create(x.payload).then(data => {
  //             this.loader.isLoading.next(false);
  //             this.store.dispatch(new associateActions.LoadCompanyAssociatesAction(x.payload.companyId));
  //             return new associateActions.CreateAssociateSuccessAction(data);
  //         },
  //         error => {
  //             this.loader.isLoading.next(false);
  //             return new associateActions.CreateAssociateFailireAction(error);
  //         });
  //     }
  // ));

  // @Effect()
  // update$: Observable<Action> = this.actions$.pipe(
  //   ofType(associateActions.AssociateActionTypes.UPDATE_ASSOCIATE),
  //   mergeMap(x => {
  //     this.loader.isLoading.next(true);
  //       return this.update(x.payload).then(data => {
  //         this.loader.isLoading.next(false);
  //         this.store.dispatch(new associateActions.LoadCompanyAssociatesAction(x.payload.companyId));
  //         return new associateActions.UpdateAssociateSuccessAction(data);
  //     },
  //     error => {
  //         this.loader.isLoading.next(false);
  //         return new associateActions.UpdateAssociateFailureAction(error);
  //     });
  //   }
  // ));

  // @Effect()
  // delete$: Observable<Action> = this.actions$.pipe(
  //     ofType(associateActions.AssociateActionTypes.DELETE_ASSOCIATE),
  //     mergeMap(x => {
  //       this.loader.isLoading.next(true);
  //       return this.delete(x.payload.id).then(() => {
  //           this.loader.isLoading.next(false);
  //           this.store.dispatch(new associateActions.LoadCompanyAssociatesAction(x.payload.companyId));
  //           return new associateActions.DeleteAssociateSuccessAction(0);
  //       },
  //       error => {
  //           this.loader.isLoading.next(false);
  //           return new associateActions.DeleteAssociateFailureAction(error);
  //       });
  //     }
  // ));

  get() {
    const query = `associates${this.campaignYear}`;
    return this.firestore.collection<Associate>(query).snapshotChanges();
  }

  getById(id: string) {
    const query = `associates${this.campaignYear}/${id}`;
    return this.firestore.doc(query).get();
  }

  getAssociates(id: string) {
      const query = `associates${this.campaignYear}`;
      return this.firestore.collection<Associate>(query).ref.where('companyId', '==', id).get();
  }

  create(associate: Associate) {
    delete associate.id;
    const g = Object.assign({}, associate);
    const query = `associates${this.campaignYear}`;
    return this.firestore.collection<Associate>(query).add(g);
  }

  update(associate: Associate) {
    const g = Object.assign({}, associate);
    const query = `associates${this.campaignYear}/${associate.id}`;
    return this.firestore.doc(query).update(g);
  }

  delete(id: string) {
    const query = `associates${this.campaignYear}/${id}`;
    return this.firestore.doc(query).delete();
  }

}
