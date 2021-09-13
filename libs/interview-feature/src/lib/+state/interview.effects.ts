import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of, zip } from 'rxjs';

import * as InterviewActions from './interview.actions';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Associate, Campaign, enumFeedbackType, Feedback, IAssociate, IFeedback, Interview, InterviewParticipant, LoaderService, Participant, Rater } from '@hrc/shared-feature';
import { Store } from '@ngrx/store';
import { createFeedback } from '@hrc/feedback-feature';


@Injectable()
export class InterviewEffects {
  campaignYear: string = Date.now.toString();

  constructor(private actions$: Actions, private firestore: AngularFirestore,
      private store: Store<IAssociate>, private feedbackStore: Store<IFeedback>, private loader: LoaderService) {
        this.campaignYear = '2021';
  }

  loadParticipants$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(InterviewActions.loadInterviewParticipants),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      zip(this.getCampaigns(),
        this. getParticipants(),
        this.getRaters(x.payload),
        this.getInterviews(x.payload),
        this.getAssociates()).subscribe(([campaigns, participants, raters, interviews, associates]) => {
          const result = new Array<InterviewParticipant>();
          raters.docs.forEach(p => {
            if (p.data().relationship > 0) {
              const ia = new InterviewParticipant();
              ia.participantId = p.data().participantId;

              const part = participants.find(i => i.payload.doc.data().associateId === ia.participantId);
              if (part != null) {
                const campaign = campaigns.find(y => y.payload.doc.id === part.payload.doc.data().campaignId);
                if (campaign != null) {
                    ia.campaignId = campaign.payload.doc.id;
                    ia.campaignName = campaign.payload.doc.data().name;
                }
              }

              ia.associateId = p.data().associateId;
              ia.relationship = p.data().relationship;

              const itv = interviews.docs.filter(i => i.data().participantId === ia.participantId
                    && i.data().raterId === ia.associateId);

              ia.interview = Array<Interview>();
              itv.forEach(v => {
                const iv = new Interview();

              iv.id = v.id;
              iv.interviewer = v.data().interviewer;
              iv.campaignId = ia.campaignId;
              iv.campaignName = ia.campaignName;
              iv.participantId = v.data().participantId;
              iv.participantEmail = v.data().participantEmail;
              iv.participantFirst = v.data().participantFirst;
              iv.participantLast = v.data().participantLast;
              iv.participantTitle = v.data().participantTitle;
              iv.participantNotes = v.data().participantNotes;
              iv.raterId = v.data().raterId;
              iv.raterEmail = v.data().raterEmail;
              iv.raterFirst = v.data().raterFirst;
              iv.raterLast = v.data().raterLast;
              iv.raterTitle = v.data().raterTitle;
              iv.raterNotes = v.data().raterNotes;
              iv.relationship = v.data().relationship;
              iv.dateReceived = v.data().dateReceived;
              iv.dateCreated = v.data().dateCreated;
              iv.status = v.data().status;
              iv.type = v.data().type;
              iv.question = v.data().question;
              iv.answer = v.data().answer;

              ia.interview?.push(iv);
            });

            ia.status = ia.interview.length > 0 ? ia.interview[0].status : 'Pending';

            const assocs = associates.filter(a => a.payload.doc.id === ia.participantId);

            if (assocs.length > 0) {
                ia.first = assocs[0].payload.doc.data().firstName;
                ia.last = assocs[0].payload.doc.data().lastName;
                ia.participantEmail = assocs[0].payload.doc.data().emailAddress;
                ia.title = assocs[0].payload.doc.data().title;
                ia.notes = assocs[0].payload.doc.data().notes;
            }

            result.push(ia);
          }
        });

        this.store.dispatch(InterviewActions.loadInterviewParticipantsSuccess({payload: result}));
        this.loader.isLoading.next(false);
      });
        return of(x);
      }),
      map(() => {
          return InterviewActions.loadInterviewParticipantsInprogress();
      }),
      catchError((err, caught) => {
        this.store.dispatch(InterviewActions.loadInterviewParticipantsFailure({error: err}));
        this.loader.isLoading.next(false);
        return caught;
      })
    );
  });

  create$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(InterviewActions.createInterview),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      this.create(x.payload)
        .then(data => {
          if (x.payload.status === 'Declined' || x.payload.status === 'Submitted') {
              this.addFeedback(x.payload);
          }
          this.loader.isLoading.next(false);
          return InterviewActions.createInterviewSuccess({payload: data});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return InterviewActions.createInterviewFailire({error: err});
        });
        return of(x);
      })
    )});

  update$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(InterviewActions.updateInterview),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      this.update(x.payload)
        .then(data => {
          if (x.payload.status === 'Declined' || x.payload.status === 'Submitted') {
              this.addFeedback(x.payload);
          }
          this.loader.isLoading.next(false);
          return InterviewActions.updateInterviewSuccess({payload: data});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return InterviewActions.updateInterviewFailure({error: err});
        });
      return of(x);
    })
  )});

  delete$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(InterviewActions.deleteInterview),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      this.delete(x.id ?? '')
        .then(() => {
          this.loader.isLoading.next(false);
          return InterviewActions.deleteInterviewSuccess({payload: x.id});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return InterviewActions.deleteInterviewFailure({error: err});
        });
        return of(x);
      })
    )});

  get() {
      const query = `interviews${this.campaignYear}`;
      return this.firestore.collection<Interview>(query).snapshotChanges();
  }

  getById(id: string) {
      const query = `interviews${this.campaignYear}/${id}`;
      return this.firestore.doc(query).get();
  }

  getCampaigns() {
      const query = `campaigns${this.campaignYear}`;
      return this.firestore.collection<Campaign>(query).snapshotChanges();
  }

  getParticipants() {
      const query = `participants${this.campaignYear}`;
      return this.firestore.collection<Participant>(query).snapshotChanges();
  }

  getParticipant(id: string) {
      const query = `participants${this.campaignYear}`;
      return this.firestore.collection<Participant>(query).ref.where('associateId', '==', id).get();
  }

  getAssociates() {
      const query = `associates${this.campaignYear}`;
      return this.firestore.collection<Associate>(query).snapshotChanges();
  }

  getRaters(id: string) {
      const query = `raters${this.campaignYear}`;
      return this.firestore.collection<Rater>(query).ref.where('associateId', '==', id).get();
  }

  getInterviews(id: string) {
      const query = `interviews${this.campaignYear}`;
      return this.firestore.collection<Interview>(query).ref.where('raterId', '==', id).get();
  }

  create(interview: Interview) {
      delete interview.id;
      const g = Object.assign({}, interview);
      const query = `interviews${this.campaignYear}`;
      return this.firestore.collection<Interview>(query).add(g);
  }

  update(interview: Interview) {
      const g = Object.assign({}, interview);
      const query = `interviews${this.campaignYear}/${interview.id}`;
      return this.firestore.doc(query).update(g);
  }

  delete(id: string) {
      const query = `interviews${this.campaignYear}/${id}`;
      return this.firestore.doc(query).delete();
  }

  addFeedback(interview: Interview) {
      const feedback = new Feedback();

      feedback.id = undefined;
      feedback.campaignId = interview.campaignId;
      feedback.campaignName = interview.campaignName;
      feedback.raterId = interview.raterId;
      feedback.raterEmail = interview.raterEmail;
      feedback.raterFirst = interview.raterFirst;
      feedback.raterLast = interview.raterLast;
      feedback.participantId = interview.participantId;
      feedback.participantEmail = interview.participantEmail;
      feedback.participantFirst = interview.participantFirst;
      feedback.participantLast = interview.participantLast;
      feedback.relationship = interview.relationship;
      feedback.dateReceived = interview.dateReceived;
      feedback.dateCreated = interview.dateCreated;
      feedback.status = interview.status;
      feedback.type = enumFeedbackType.INTERVIEW.toString();
      feedback.question = interview.question;
      feedback.answer = interview.answer;

      this.feedbackStore.dispatch(createFeedback({payload: feedback}));
  }
}
