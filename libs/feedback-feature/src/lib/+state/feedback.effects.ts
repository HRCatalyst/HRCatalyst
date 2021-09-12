import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as FeedbackActions from './feedback.actions';
import { Firestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { enumFeedbackStatus, Feedback, FEEDBACK_STATUS, LoaderService } from '@hrcatalyst/shared-feature';
import { FeedbackState } from './feedback.entity';

@Injectable()
export class FeedbackEffects {
  campaignYear: string = Date.now.toString();

  constructor(private actions$: Actions, private firestore: Firestore,
    private store: Store<FeedbackState>, private loader: LoaderService) {
    this.campaignYear = '2021';
  }

  loadFeedback$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(FeedbackActions.loadFeedback),
    mergeMap(() => {
      this.loader.isLoading.next(true);
      return this.get()
        .pipe(
          map(feedback => {
            this.loader.isLoading.next(false);
            return FeedbackActions.loadFeedbackSuccess({payload: feedback});
          }),
          catchError((err, caught) => {
            this.store.dispatch(FeedbackActions.loadFeedbackFailure({error: err}));
            this.loader.isLoading.next(false);
            return caught;
          })
        )
    }))
  });

  participantFeedback$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(FeedbackActions.loadParticipantFeedback),
    mergeMap(x => {
      this.loader.isLoading.next(true);
        this.getFeedback(x.payload.campaign.id ?? '', x.payload.participant.associateId)
        .then((data) => {
          const result = new Array<unknown>();
          data.docs.forEach(x => {
              return result.push({...x.data(), id: x.id});
          });

          this.store.dispatch(FeedbackActions.loadParticipantFeedbackSuccess({payload: result}));
          this.loader.isLoading.next(false);
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return of(FeedbackActions.loadParticipantFeedbackFailure({error: err}));
        });

      return of(x);
      }),
      map(() => {
          this.loader.isLoading.next(false);
          return FeedbackActions.loadParticipantFeedbackInprogress();
      }),
      catchError((err, caught) => {
        this.store.dispatch(FeedbackActions.loadParticipantFeedbackFailure({error: err}));
        this.loader.isLoading.next(false);
        return caught;
      })
    )});

  create$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(FeedbackActions.createFeedback),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      this.create(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          return FeedbackActions.createFeedbackSuccess({payload: data});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return FeedbackActions.createFeedbackFailire({error: err});
        });
      return of(x);
    })
  )});

  update$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(FeedbackActions.updateFeedback),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      this.update(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          return FeedbackActions.updateFeedbackSuccess({payload: data});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return FeedbackActions.updateFeedbackFailure({error: err});
        });
      return of(x);
    })
  )});

  delete$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(FeedbackActions.deleteFeedback),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      this.delete(x.payload.id ?? '')
        .then(() => {
          this.loader.isLoading.next(false);
          return FeedbackActions.deleteFeedbackSuccess({payload: x.payload});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return FeedbackActions.deleteFeedbackFailure({error: err});
        });
      return of(x);
    })
  )});

  get() {
      const query = `feedbacks${this.campaignYear}`;
      return this.firestore.collection<Feedback>(query).snapshotChanges();
  }

  getFeedback(campaignId: string, participantId: string) {
      const query = `feedbacks${this.campaignYear}`;
      return this.firestore.collection<Feedback>(query).ref
          .where('campaignId', '==', campaignId)
          .where('participantId', '==', participantId)
          .get();
  }

  getErrors() {
      const query = `feedbacks${this.campaignYear}`;
      return this.firestore.collection<Feedback>(query).snapshotChanges();
  }

  create(feedback: Feedback) {
    delete feedback.id;
    const g = Object.assign({}, feedback);
    const query = `feedbacks${this.campaignYear}`;
    return this.firestore.collection<Feedback>(query).add(g);
  }

  update(feedback: Feedback) {
    const g = Object.assign({}, feedback);
    const query = `feedbacks${this.campaignYear}/${feedback.id}`;
    return this.firestore.doc(query).update(g);
  }

  delete(id: string) {
    const query = `feedbacks${this.campaignYear}/${id}`;
    return this.firestore.doc(query).delete();
  }

  changePendingToReceived() {
      const query = `feedbacks${this.campaignYear}`;
      const feedback = this.firestore.collection<Feedback>(query).ref
          .where('status', '==', 'Pending').get();

      feedback.then(data => {
          data.docs.forEach(i => {
              const f = i.data();
              f.id = i.id;
              f.status = FEEDBACK_STATUS[enumFeedbackStatus.RECEIVED].name;

              this.update(<Feedback>(f));
          });
      });
  }
}
