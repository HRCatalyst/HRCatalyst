import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of, zip } from 'rxjs';
import * as ParticipantActions from './participant.actions';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Associate, Feedback, LoaderService, Participant } from '@hrc/shared-feature';
import { Store } from '@ngrx/store';
import { ParticipantState } from './participant.entity';


@Injectable()
export class ParticipantEffects {
  campaignYear: string = Date.now.toString();

  constructor(private actions$: Actions, private firestore: AngularFirestore,
    private store: Store<ParticipantState>, private loader: LoaderService) {
    this.campaignYear = '2021';
  }

  loadCampaigns$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(ParticipantActions.loadParticipantCampaign),
    mergeMap(x => {
        this.loader.isLoading.next(true);
        this.getCampaign(x.payload)
          .then((data) => {
            const result = new Array<unknown>();
            data.docs.forEach(d => result.push({ ...d.data(), id: d.id }));

            this.store.dispatch(ParticipantActions.loadParticipantCampaignSuccess({payload: result}));
            this.loader.isLoading.next(false);
          })
          .catch((err: any) => {
            this.loader.isLoading.next(false);
            return of(ParticipantActions.loadParticipantCampaignFailure({error: err}));
          });
        return of(x);
      }),
      map(() => {
          return ParticipantActions.loadParticipantCampaignInprogress();
      }),
      catchError((err, caught) => {
        this.store.dispatch(ParticipantActions.loadParticipantCampaignFailure(err));
        this.loader.isLoading.next(false);
        return caught;
      })
    );
  });

  loadParticipants$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(ParticipantActions.loadCampaignParticipants),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      zip(this.getParticipants(x.payload.campaignId),
          this.getAssociates(x.payload.companyId),
          this.getFeedback(x.payload.campaignId)).subscribe(([participants, associates, feedbacks]) => {
            const result = new Array<unknown>();
              participants.docs.forEach(p => {
                  return result.push({...p.data(), id: p.id});
              });

              this.store.dispatch(ParticipantActions.loadCampaignParticipantsSuccess({payload: result}));

              const partIds = participants.docs.map(p => p.data().associateId);
              const assocs = associates.docs.filter(a => partIds.includes(a.id));

              const data = new Array<unknown>();
              assocs.forEach(r => {
                  const d = r.data();
                  const fb = feedbacks.docs.filter(f => f.data().participantId === r.id);

                  return data.push({...d, id: r.id, feedback: fb.length});
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
      this.create(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          return ParticipantActions.createParticipantSuccess({payload: data});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return ParticipantActions.createParticipantFailire({error: err});
        });
      return of(x);
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
          return ParticipantActions.updateParticipantSuccess({payload: data});
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
      this.delete(x.payload.id ?? '')
        .then(() => {
          this.loader.isLoading.next(false);
          return ParticipantActions.deleteParticipantSuccess({payload: x.payload.id});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return ParticipantActions.deleteParticipantFailure({error: err});
        });
      return of(x);
    })
  )});

  get() {
      const query = `participants${this.campaignYear}`;
      return this.firestore.collection<Participant>(query).snapshotChanges();
  }

  getParticipants(id: string) {
      const query = `participants${this.campaignYear}`;
      return this.firestore.collection<Participant>(query).ref.where('campaignId', '==', id).get();
  }

  getCampaign(id: string) {
      const query = `participants${this.campaignYear}`;
      return this.firestore.collection<Participant>(query).ref.where('associateId', '==', id).get();
  }

  getAssociates(id: string) {
      const query = `associates${this.campaignYear}`;
      return this.firestore.collection<Associate>(query).ref.where('companyId', '==', id).get();
  }

  getFeedback(id: string) {
      const query = `feedbacks${this.campaignYear}`;
      return this.firestore.collection<Feedback>(query).ref.where('campaignId', '==', id).get();
  }

  create(participant: Participant) {
    delete participant.id;
    const g = Object.assign({}, participant);
    const query = `participants${this.campaignYear}`;
    return this.firestore.collection<Participant>(query).add(g);
  }

  update(participant: Participant) {
    const g = Object.assign({}, participant);
    const query = `participants${this.campaignYear}/${participant.id}`;
    return this.firestore.doc(query).update(g);
  }

  delete(id: string) {
      const query = `participants${this.campaignYear}/${id}`;
      return this.firestore.doc(query).delete();
  }
}
