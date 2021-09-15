import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of, zip } from 'rxjs';
import * as ParticipantActions from './participant.actions';
import { addDoc, collection, collectionChanges, CollectionReference, deleteDoc, doc, Firestore, query, updateDoc, where } from '@angular/fire/firestore';
import { Associate, Feedback, LoaderService, Participant } from '@hrc/shared-feature';
import { Store } from '@ngrx/store';
import { ParticipantState } from './participant.entity';


@Injectable()
export class ParticipantEffects {
  campaignYear: string = Date.now.toString();

  constructor(private actions$: Actions, private firestore: Firestore,
    private store: Store<ParticipantState>, private loader: LoaderService) {
    this.campaignYear = '2021';
  }

  loadCampaigns$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(ParticipantActions.loadParticipantCampaign),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      return this.getCampaign(x.payload).pipe(
        map((data) => {
          const result = new Array<Participant>();
          data.forEach(d => result.push({ ...d.doc.data(), id: d.doc.id }));

          this.store.dispatch(ParticipantActions.loadParticipantCampaignSuccess({payload: result}));
          this.loader.isLoading.next(false);
          return ParticipantActions.loadParticipantCampaignSuccess({payload: result});
        }),
        catchError((err, caught) => {
          this.loader.isLoading.next(false);
          this.store.dispatch(ParticipantActions.loadParticipantCampaignFailure({error: err}));
          return caught;
        }));
      }))
    });

  loadParticipants$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(ParticipantActions.loadCampaignParticipants),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      zip(this.getParticipants(x.payload.campaignId),
          this.getAssociates(x.payload.companyId),
          this.getFeedback(x.payload.campaignId)).subscribe(([participants, associates, feedbacks]) => {
            const result = new Array<Participant>();
              participants.forEach(p => {
                  return result.push({...p.doc.data(), id: p.doc.id});
              });

              this.store.dispatch(ParticipantActions.loadCampaignParticipantsSuccess({payload: result}));

              const partIds = participants.map(p => p.doc.data().associateId);
              const assocs = associates.filter(a => partIds.includes(a.doc.id));

              const data = new Array<unknown>();
              assocs.forEach(r => {
                  const d = r.doc.data();
                  const fb = feedbacks.filter(f => f.doc.data().participantId === r.doc.id);

                  return data.push({...d, id: r.doc.id, feedback: fb.length});
              });
              this.store.dispatch(ParticipantActions.loadCampaignAssociatesSuccess({payload: data}));
              this.loader.isLoading.next(false);
            });
        return of(x);
      }),
      map(() => {
          return ParticipantActions.loadCampaignParticipantsInprogress();
      }),
      catchError((err, caught) => {
        this.store.dispatch(ParticipantActions.loadCampaignParticipantsFailure(err));
        this.loader.isLoading.next(false);
        return caught;
      })
    );
  });

  create$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(ParticipantActions.createParticipant),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      return this.create(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          return ParticipantActions.createParticipantSuccess({payload: {...x.payload, id: data.id}});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return ParticipantActions.createParticipantFailire({error: err});
        });
    })
  )});

  update$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(ParticipantActions.updateParticipant),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      this.update(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          return ParticipantActions.updateParticipantSuccess({payload: x.payload});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return ParticipantActions.updateParticipantFailure({error: err});
        });
      return of(x);
    })
  )});

  delete$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(ParticipantActions.deleteParticipant),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      return this.delete(x.payload.id ?? '')
        .then(() => {
          this.loader.isLoading.next(false);
          return ParticipantActions.deleteParticipantSuccess({payload: x.payload});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return ParticipantActions.deleteParticipantFailure({error: err});
        });
    })
  )});

  get() {
    const table = `participants${this.campaignYear}`;
    return collectionChanges<Participant>(query<Participant>(collection(this.firestore, table) as CollectionReference<Participant>));
  }

  getParticipants(id: string) {
    const table = `participants${this.campaignYear}`;
    return collectionChanges<Participant>(query(collection(this.firestore, table) as CollectionReference<Participant>,
      where('campaignId', '==', id)));
  }

  getCampaign(id: string) {
    const table = `participants${this.campaignYear}`;
    return collectionChanges<Participant>(query(collection(this.firestore, table) as CollectionReference<Participant>,
      where('associateId', '==', id)));
  }

  getAssociates(id: string) {
    const table = `associates${this.campaignYear}`;
    return collectionChanges<Associate>(query(collection(this.firestore, table) as CollectionReference<Associate>,
      where('companyId', '==', id)));
  }

  getFeedback(id: string) {
    const table = `feedbacks${this.campaignYear}`;
    return collectionChanges<Feedback>(query(collection(this.firestore, table) as CollectionReference<Feedback>,
      where('campaignId', '==', id)));
  }

  create(participant: Participant) {
    delete participant.id;
    const g = Object.assign({}, participant);
    const table = `participants${this.campaignYear}`;
    return addDoc(collection(this.firestore, table), g);
  }

  update(participant: Participant) {
    const g = Object.assign({}, participant);
    const table = `participants${this.campaignYear}`;
    return updateDoc(doc(collection(this.firestore, table) as CollectionReference<Associate>, g.id), g);
  }

  delete(id: string) {
    const table = `participants${this.campaignYear}`;
    return deleteDoc(doc(this.firestore, table, id));
  }
}
