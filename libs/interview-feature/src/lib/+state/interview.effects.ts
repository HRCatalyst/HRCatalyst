import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap } from 'rxjs/operators';
import { of, zip } from 'rxjs';
import * as InterviewActions from './interview.actions';
import { addDoc, collection, collectionChanges, CollectionReference, deleteDoc, doc, Firestore, query, updateDoc, where } from '@angular/fire/firestore';
import { Associate, Campaign, enumFeedbackType, Feedback, Interview, InterviewParticipant, LoaderService, Participant, Rater,
  interviewEntity } from '@hrc/shared-feature';
import { Store } from '@ngrx/store';
// import { createFeedback } from '@hrc/feedback-feature';


@Injectable()
export class InterviewEffects {
  campaignYear: string = Date.now.toString();

  constructor(private actions$: Actions, private firestore: Firestore, private store: Store<interviewEntity.InterviewState>,
      private loader: LoaderService) {
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
          raters.forEach(p => {
            if (p.doc.data().relationship > 0) {
              const ia = new InterviewParticipant();
              ia.participantId = p.doc.data().participantId;

              const part = participants.find(i => i.doc.data().associateId === ia.participantId);
              if (part != null) {
                const campaign = campaigns.find(y => y.doc.id === part.doc.data().campaignId);
                if (campaign != null) {
                    ia.campaignId = campaign.doc.id;
                    ia.campaignName = campaign.doc.data().name;
                }
              }

              ia.associateId = p.doc.data().associateId;
              ia.relationship = p.doc.data().relationship;

              const itv = interviews.filter(i => i.doc.data().participantId === ia.participantId
                    && i.doc.data().raterId === ia.associateId);

              ia.interview = Array<Interview>();
              itv.forEach(v => {
                const iv = new Interview();

              iv.id = v.doc.id;
              iv.interviewer = v.doc.data().interviewer;
              iv.campaignId = ia.campaignId;
              iv.campaignName = ia.campaignName;
              iv.participantId = v.doc.data().participantId;
              iv.participantEmail = v.doc.data().participantEmail;
              iv.participantFirst = v.doc.data().participantFirst;
              iv.participantLast = v.doc.data().participantLast;
              iv.participantTitle = v.doc.data().participantTitle;
              iv.participantNotes = v.doc.data().participantNotes;
              iv.raterId = v.doc.data().raterId;
              iv.raterEmail = v.doc.data().raterEmail;
              iv.raterFirst = v.doc.data().raterFirst;
              iv.raterLast = v.doc.data().raterLast;
              iv.raterTitle = v.doc.data().raterTitle;
              iv.raterNotes = v.doc.data().raterNotes;
              iv.relationship = v.doc.data().relationship;
              iv.dateReceived = v.doc.data().dateReceived;
              iv.dateCreated = v.doc.data().dateCreated;
              iv.status = v.doc.data().status;
              iv.type = v.doc.data().type;
              iv.question = v.doc.data().question;
              iv.answer = v.doc.data().answer;

              ia.interview?.push(iv);
            });

            ia.status = ia.interview.length > 0 ? ia.interview[0].status : 'Pending';
            const assocs = associates.filter(a => a.doc.id === ia.participantId);

            if (assocs.length > 0) {
              ia.first = assocs[0].doc.data().firstName;
              ia.last = assocs[0].doc.data().lastName;
              ia.participantEmail = assocs[0].doc.data().emailAddress;
              ia.title = assocs[0].doc.data().title;
              ia.notes = assocs[0].doc.data().notes;
            }

            result.push(ia);
          }
        });
        this.store.dispatch(InterviewActions.loadInterviewParticipantsSuccess({payload: result}));
        this.loader.isLoading.next(false);
      });
        return of(InterviewActions.loadInterviewParticipantsInprogress());
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
      return this.create(x.payload)
        .then(data => {
          if (x.payload.status === 'Declined' || x.payload.status === 'Submitted') {
              this.addFeedback(x.payload);
          }
          this.loader.isLoading.next(false);
          return InterviewActions.createInterviewSuccess({payload: {...x.payload, id: data.id}});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return InterviewActions.createInterviewFailire({error: err});
        });
    })
  )});

  update$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(InterviewActions.updateInterview),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      return this.update(x.payload)
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
    })
  )});

  delete$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(InterviewActions.deleteInterview),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      return this.delete(x.id ?? '')
        .then(() => {
          this.loader.isLoading.next(false);
          return InterviewActions.deleteInterviewSuccess({payload: x.id});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return InterviewActions.deleteInterviewFailure({error: err});
        });
    })
  )});

  get() {
    const table = `interviews${this.campaignYear}`;
    return collectionChanges<Interview>(query<Interview>(collection(this.firestore, table) as CollectionReference<Interview>));

  }

  getById(id: string) {
    const table = `interviews${this.campaignYear}`;
    return collectionChanges<Interview>(query(collection(this.firestore, table) as CollectionReference<Interview>,
      where('id', '==', id)));
  }

  getCampaigns() {
    const table = `campaigns${this.campaignYear}`;
    return collectionChanges<Campaign>(query<Campaign>(collection(this.firestore, table) as CollectionReference<Campaign>));
  }

  getParticipants() {
    const table = `participants${this.campaignYear}`;
    return collectionChanges<Participant>(query<Participant>(collection(this.firestore, table) as CollectionReference<Participant>));
  }

  getParticipant(id: string) {
    const table = `participants${this.campaignYear}`;
    return collectionChanges<Participant>(query(collection(this.firestore, table) as CollectionReference<Participant>,
      where('associateId', '==', id)));
  }

  getAssociates() {
    const table = `associates${this.campaignYear}`;
    return collectionChanges<Associate>(query<Associate>(collection(this.firestore, table) as CollectionReference<Associate>));
  }

  getRaters(id: string) {
    const table = `raters${this.campaignYear}`;
    return collectionChanges<Rater>(query(collection(this.firestore, table) as CollectionReference<Rater>,
      where('associateId', '==', id)));
  }

  getInterviews(id: string) {
    const table = `interviews${this.campaignYear}`;
    return collectionChanges<Interview>(query(collection(this.firestore, table) as CollectionReference<Interview>,
      where('raterId', '==', id)));
  }

  create(interview: Interview) {
    delete interview.id;
    const g = Object.assign({}, interview);
    const table = `interviews${this.campaignYear}`;
    return addDoc(collection(this.firestore, table), g);
  }

  update(interview: Interview) {
    const g = Object.assign({}, interview);
    const table = `interviews${this.campaignYear}`;
    return updateDoc(doc(collection(this.firestore, table) as CollectionReference<Interview>, interview.id), g);
  }

  delete(id: string) {
    const table = `interviews${this.campaignYear}`;
    return deleteDoc(doc(this.firestore, table, id));
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

//      this.store.dispatch(createFeedback({payload: feedback}));
  }
}
