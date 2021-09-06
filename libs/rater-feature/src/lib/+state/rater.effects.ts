import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of, zip } from 'rxjs';

import * as RaterActions from './rater.actions';
import { Store } from '@ngrx/store';
import { Associate, Feedback, IRater, LoaderService, Rater, SelectRaterParams, enumRationship} from '@hrcatalyst/shared-feature';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class RaterEffects {
  campaignYear: string = Date.now.toString();

  constructor(
    private actions$: Actions,
    private firestore: AngularFirestore,
    private loader: LoaderService,
    private store: Store<IRater>
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
            raters.docs.forEach(r => {
              return result.push({...r.data(), id: r.id});
            });

            this.store.dispatch(RaterActions.loadParticipantRatersSuccess({payload: result}));

            const partIds = raters.docs.map(p => p.data().associateId);

            const assocs = associates.docs.filter(a => partIds.includes(a.id));

            const data = new Array<unknown>();
            assocs.forEach(a => {
              const d = a.data();
              const fb = feedbacks.docs.filter(f => f.data().raterId === a.id);

              return data.push({...d, id: a.id, feedback: fb.length});
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
          return RaterActions.createRaterSuccess({payload:data});
        })
        .catch(err => {
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
        .catch(err => {
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
        .catch(err => {
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
      this.getFeedback(x.payload)
        .then(feedback => {
          const result = new Array<unknown>();
          feedback.docs.forEach(f => {
              return result.push({...f.data(), id: f.id});
          });
          this.loader.isLoading.next(false);
          return RaterActions.loadRaterFeedbackSuccess({payload: result});
        })
        .catch(err => {
          this.loader.isLoading.next(false);
          return RaterActions.loadRaterFeedbackFailure({error: err});
        });
        return of(x);
      })
  )});

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
      const query = `raters${this.campaignYear}`;
      return this.firestore.collection<Rater>(query).snapshotChanges();
  }

  getRaters(id: string) {
      const query = `raters${this.campaignYear}`;
      return this.firestore.collection<Rater>(query).ref.where('participantId', '==', id).get();
  }

  getCampaignFeedback(id: string) {
      const query = `feedbacks${this.campaignYear}`;
      return this.firestore.collection<Feedback>(query).ref.where('campaignId', '==', id).get();
  }

  getFeedback(x: SelectRaterParams) {
      const query = `feedbacks${this.campaignYear}`;
      return this.firestore.collection<Feedback>(query).ref
          .where('campaignId', '==', x.campaign.id)
          .where('participantId', '==', x.participant.id)
          .where('raterId', '==', x.rater.id)
          .get();
  }

  getAssociates(id: string) {
      const query = `associates${this.campaignYear}`;
      return this.firestore.collection<Associate>(query).ref.where('companyId', '==', id).get();
  }

  create(rater: Rater) {
    delete rater.id;
    const g = Object.assign({}, rater);
    const query = `raters${this.campaignYear}`;
    return this.firestore.collection<Rater>(query).add(g);
  }

  update(rater: Rater) {
    const g = Object.assign({}, rater);
    return this.firestore.doc(`raters${this.campaignYear}`).update(g);
  }

  delete(id: string) {
    return this.firestore.doc(`raters${this.campaignYear}/${id}`).delete();
  }

  // changeFeedbackRelationship() {
  //   const query = `raters${this.campaignYear}`;
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

  deDupRaters() {
      const query = `raters${this.campaignYear}`;
      const dedups = this.firestore.collection<Rater>(query).ref
          .where('relationship', '>', enumRationship.UNKNOWN).get();

      dedups.then(data => {
          const raters = new Map();
          data.forEach(r => {
              const rater = <Rater>r.data();
              rater.id = r.id;

              const key = rater.associateId + rater.participantId;
              if (raters.has(key)) {
                  console.log(`duplicate rater: ${JSON.stringify(rater)}`);
                  rater.relationship = enumRationship.UNKNOWN;
//                    this.update(<Rater>(rater));
              } else {
                  raters.set(key, rater);
              }
          });
      });
 }
}
