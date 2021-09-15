import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of, zip } from 'rxjs';
import * as RaterActions from './rater.actions';
import { Store } from '@ngrx/store';
import { Associate, Feedback, LoaderService, Rater, SelectRaterParams } from '@hrc/shared-feature';
import { addDoc, collection, collectionChanges, CollectionReference, deleteDoc, doc, Firestore, query, updateDoc, where } from '@angular/fire/firestore';
import { RaterState } from './rater.entity';

@Injectable()
export class RaterEffects {
  campaignYear: string = Date.now.toString();

  constructor(
    private actions$: Actions,
    private firestore: Firestore,
    private loader: LoaderService,
    private store: Store<RaterState>
  ) {
    this.campaignYear = '2021';
  }

  load$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(RaterActions.loadAllRaters),
    mergeMap(() => {
      this.loader.isLoading.next(true);
      return this.get()
        .pipe(
          map(raters => {
              this.loader.isLoading.next(false);
              return RaterActions.loadAllRatersSuccess({payload: raters});
          }),
          catchError((err, caught) => {
              this.store.dispatch(RaterActions.loadAllRatersFailure({error: err}));
              this.loader.isLoading.next(false);
              return caught;
          })
        )
    })
  )});

  loadRaters$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(RaterActions.loadParticipantRaters),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      zip(this.getRaters(x.payload.participant.associateId),
          this.getAssociates(x.payload.associate.companyId),
          this.getCampaignFeedback(x.payload.campaign.id ?? '')).subscribe(([raters, associates, feedbacks]) => {
            const result = new Array<unknown>();
            raters.forEach(r => {
              return result.push({...r.doc.data(), id: r.doc.id});
            });

            this.store.dispatch(RaterActions.loadParticipantRatersSuccess({payload: result}));

            const partIds = raters.map(p => p.doc.data().associateId);

            const assocs = associates.filter(a => partIds.includes(a.doc.id));

            const data = new Array<unknown>();
            assocs.forEach(a => {
              const d = a.doc.data();
              const fb = feedbacks.filter(f => f.doc.data().raterId === a.doc.id);

              return data.push({...d, id: a.doc.id, feedback: fb.length});
            });
            this.store.dispatch(RaterActions.loadParticipantAssociatesSuccess({payload: data}));
            this.loader.isLoading.next(false);
          });
        return of(x);
      }),
      map(() => {
          return RaterActions.loadParticipantRatersInprogress();
      }),
      catchError((err, caught) => {
        this.store.dispatch(RaterActions.loadParticipantRatersFailure({error: err}));
        this.loader.isLoading.next(false);
        return caught;
      })
    );
  });

  create$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(RaterActions.createRater),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      this.create(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          return RaterActions.createRaterSuccess({payload: {...x.payload, id: data.id}});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return RaterActions.createRaterFailire({error: err});
        });
      return of(x);
    })
  )});

  update$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(RaterActions.updateRater),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      this.update(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          return RaterActions.updateRaterSuccess({payload: data});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return RaterActions.updateRaterFailure({error: err});
        });
        return of(x);
      })
  )});

  delete$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(RaterActions.deleteRater),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      this.delete(x.payload.id ?? '')
        .then(() => {
          this.loader.isLoading.next(false);
          return RaterActions.deleteRaterSuccess({payload: x.payload.id});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return RaterActions.deleteRaterFailure({error: err});
        });
        return of(x);
      })
  )});

  loadFeedback$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(RaterActions.loadRaterFeedback),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      return this.getFeedback(x.payload).pipe(
        map(feedback => {
          const result = new Array<unknown>();
          feedback.forEach(f => {
              return result.push({...f.doc.data(), id: f.doc.id});
          });
          this.loader.isLoading.next(false);
          return RaterActions.loadRaterFeedbackSuccess({payload: result});
        }),
        catchError((err, caught) => {
          this.loader.isLoading.next(false);
          this.store.dispatch(RaterActions.loadRaterFeedbackFailure({error: err}));
          return caught;
        }));
      }))
  });

  // colleagueToPeer$ = createEffect(() => {this.actions$.pipe(
  //     ofType(raterActions.RaterActionTypes.CHANGE_COLLEAGUE_TO_PEER),
  //     map(() => {
  //         this.loader.isLoading.next(true);
  //         this.changeFeedbackRelationship();
  //         this.loader.isLoading.next(false);
  //         return new raterActions.ChangeColleagueToPeerSuccessAction();
  //     },
  //     catchError((err, caught) => {
  //         this.loader.isLoading.next(false);
  //         return caught;
  //     })));

  // deDupRaters$ = createEffect(() => {this.actions$.pipe(
  //     ofType(raterActions.RaterActionTypes.DEDUP_RATERS),
  //     map(() => {
  //         this.loader.isLoading.next(true);
  //         this.deDupRaters();
  //         this.loader.isLoading.next(false);
  //         return new raterActions.DedupRatersSuccessAction();
  //     },
  //     catchError((err, caught) => {
  //         this.loader.isLoading.next(false);
  //         return caught;
  //     })));

  get() {
    const table = `raters${this.campaignYear}`;
    return collectionChanges<Rater>(query<Rater>(collection(this.firestore, table) as CollectionReference<Rater>));
  }

  getRaters(id: string) {
    const table = `raters${this.campaignYear}`;
    return collectionChanges<Rater>(query(collection(this.firestore, table) as CollectionReference<Rater>, where('id', '==', id)));
  }

  getCampaignFeedback(id: string) {
    const table = `feedbacks${this.campaignYear}`;
    return collectionChanges<Feedback>(query(collection(this.firestore, table) as CollectionReference<Feedback>,
      where('campaignId', '==', id)));
}

  getFeedback(x: SelectRaterParams) {
    const table = `feedbacks${this.campaignYear}`;
    return collectionChanges<Feedback>(query(collection(this.firestore, table) as CollectionReference<Feedback>,
        where('campaignId', '==', x.campaign.id),
        where('participantId', '==', x.participant.id),
        where('raterId', '==', x.rater.id)));
  }

  getAssociates(id: string) {
    const table = `associates${this.campaignYear}`;
    return collectionChanges<Associate>(query(collection(this.firestore, table) as CollectionReference<Associate>,
      where('companyId', '==', id)));
  }

  create(rater: Rater) {
    delete rater.id;
    const g = Object.assign({}, rater);
    const table = `raters${this.campaignYear}`;
    return addDoc(collection(this.firestore, table), g);
  }

  update(rater: Rater) {
    const g = Object.assign({}, rater);
    const table = `raters${this.campaignYear}`;
    return updateDoc(doc(collection(this.firestore, table) as CollectionReference<Rater>, g.id), g);
  }

  delete(id: string) {
    const table = `raters${this.campaignYear}`;
    return deleteDoc(doc(this.firestore, table, id));
  }

  // changeFeedbackRelationship() {
  //   const table = `raters${this.campaignYear}`;
  //   const raters = this.firestore.collection<Rater>(query).ref
  //       .where('relationship', '==', enumRationship.COLLEAGUE).get();

  //   raters.then(data => {
  //     console.log(data.size + ' Rater colleague records.');

  //     let changes = 0;
  //     data.docs.forEach(i => {
  //       const r = <Rater>i.data();

  //       if (EC_ASSOCIATES.includes(r.participantId) && EC_ASSOCIATES.includes(r.associateId)) {
  //           r.id = i.id;
  //           r.relationship = enumRationship.PEER;

  //           console.log(r);
  //           changes++;
  //           this.update(<Rater>(r));
  //       }
  //     });
  //     console.log(changes + ' updated records.');
  //   });
  // }

//   deDupRaters() {
//       const table = `raters${this.campaignYear}`;
//       const dedups = this.firestore.collection<Rater>(query).ref
//           .where('relationship', '>', enumRationship.UNKNOWN).get();

//       dedups.then(data => {
//           const raters = new Map();
//           data.forEach(r => {
//               const rater = <Rater>r.data();
//               rater.id = r.id;

//               const key = rater.associateId + rater.participantId;
//               if (raters.has(key)) {
//                   console.log(`duplicate rater: ${JSON.stringify(rater)}`);
//                   rater.relationship = enumRationship.UNKNOWN;
// //                    this.update(<Rater>(rater));
//               } else {
//                   raters.set(key, rater);
//               }
//           });
//       });
//  }
}
