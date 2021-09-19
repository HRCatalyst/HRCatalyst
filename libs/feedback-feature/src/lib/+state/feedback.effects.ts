import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as FeedbackActions from './feedback.actions';
import { addDoc, collection, collectionChanges, CollectionReference, deleteDoc, doc, Firestore, query, updateDoc, where } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { enumFeedbackStatus, Feedback, FEEDBACK_STATUS, LoaderService, feedbackEntity } from '@hrc/shared-feature';

@Injectable()
export class FeedbackEffects {
  campaignYear: string = Date.now.toString();

  constructor(private actions$: Actions, private firestore: Firestore,
    private store: Store<feedbackEntity.FeedbackState>, private loader: LoaderService) {
    this.campaignYear = '2020';
  }

  loadFeedback$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(FeedbackActions.loadFeedback),
    mergeMap(() => {
      this.loader.isLoading.next(true);
      return this.get()
        .pipe(
          map(data => {
            this.loader.isLoading.next(false);
            const result = new Array<Feedback>();
            data.forEach(x => {
              return result.push({...x.doc.data(), id: x.doc.id});
            });
            return FeedbackActions.loadFeedbackSuccess({payload: result});
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
      return this.getFeedback(x.payload.campaign.id ?? '', x.payload.participant.associateId).pipe(
        map((data) => {
          const result = new Array<Feedback>();
          data.forEach(x => {
              return result.push({...x.doc.data(), id: x.doc.id});
          });

          this.store.dispatch(FeedbackActions.loadParticipantFeedbackSuccess({payload: result}));
          this.loader.isLoading.next(false);
          return FeedbackActions.loadParticipantFeedbackSuccess({payload: result});
        }),
        catchError((err, caught) => {
          this.loader.isLoading.next(false);
          this.store.dispatch(FeedbackActions.loadParticipantFeedbackFailure({error: err}));
          return caught;
        }));
      })
    )}
  );

  create$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(FeedbackActions.createFeedback),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      return this.create(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          return FeedbackActions.createFeedbackSuccess({payload: {...x.payload, id: data.id}});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return FeedbackActions.createFeedbackFailire({error: err});
        });
    })
  )});

  update$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(FeedbackActions.updateFeedback),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      return this.update(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          return FeedbackActions.updateFeedbackSuccess({payload: x.payload});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return FeedbackActions.updateFeedbackFailure({error: err});
        });
    })
  )});

  delete$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(FeedbackActions.deleteFeedback),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      return this.delete(x.payload.id ?? '')
        .then(() => {
          this.loader.isLoading.next(false);
          return FeedbackActions.deleteFeedbackSuccess({payload: x.payload});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return FeedbackActions.deleteFeedbackFailure({error: err});
        });
    })
  )});

  get() {
    const table = `feedbacks${this.campaignYear}`;
    return collectionChanges<Feedback>(query<Feedback>(collection(this.firestore, table) as CollectionReference<Feedback>));
  }

  getFeedback(campaignId: string, participantId: string) {
    const table = `feedbacks${this.campaignYear}`;
    return collectionChanges<Feedback>(query(collection(this.firestore, table) as CollectionReference<Feedback>,
      where('campaignId', '==', campaignId),
      where('participantId', '==', participantId)));
  }

  getErrors() {
    const table = `feedbacks${this.campaignYear}`;
    return collectionChanges<Feedback>(query<Feedback>(collection(this.firestore, table) as CollectionReference<Feedback>));
  }

  create(feedback: Feedback) {
    delete feedback.id;
    const g = Object.assign({}, feedback);
    const table = `feedbacks${this.campaignYear}`;
    return addDoc(collection(this.firestore, table), g);
  }

  update(feedback: Feedback) {
    const g = Object.assign({}, feedback);
    const table = `feedbacks${this.campaignYear}`;
    return updateDoc(doc(collection(this.firestore, table) as CollectionReference<Feedback>, g.id), g);
  }

  delete(id: string) {
    const table = `feedbacks${this.campaignYear}`;
    return deleteDoc(doc(this.firestore, table, id));
  }

  changePendingToReceived() {
    const table = `feedbacks${this.campaignYear}`;
    const feedback = collectionChanges<Feedback>(query(collection(this.firestore, table) as CollectionReference<Feedback>,
      where('status', '==', 'Pending')));

    feedback.pipe(
      map(data => {
        data.forEach(i => {
          const f = i.doc.data();
          f.id = i.doc.id;
          f.status = FEEDBACK_STATUS[enumFeedbackStatus.RECEIVED].name;

          this.update(<Feedback>(f));
        });
      })
    )
  }
}
