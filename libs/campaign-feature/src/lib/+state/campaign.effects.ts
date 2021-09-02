import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

import * as CampaignActions from './campaign.actions';
import { Campaign, CampaignYear, LoaderService } from '@hrcatalyst/shared-feature';
import { AngularFirestore } from '@angular/fire/firestore';
import { createCampaign,
          createCampaignFailire,
          createCampaignSuccess,
          createCampaignYear,
          createCampaignYearFailire,
          createCampaignYearSuccess,
          deleteCampaign,
          deleteCampaignFailure,
          deleteCampaignSuccess,
          deleteCampaignYear,
          loadCampaignYears,
          loadCampaignYearsFailure,
          loadCampaignYearsSuccess,
          loadClientCampaigns,
          loadClientCampaignsFailure,
          setActiveCampaign,
          updateCampaign,
          updateCampaignFailure,
          updateCampaignSuccess,
          updateCampaignYear,
          updateCampaignYearFailure,
          updateCampaignYearSuccess } from './campaign.actions';
import { Store } from '@ngrx/store';
import { CampaignState } from './campaign.reducer';

@Injectable()
export class CampaignEffects {
  campaignYear: string = Date.now.toString();
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private actions$: Actions, private firestore: AngularFirestore,
    private store: Store<CampaignState>, private loader: LoaderService) {
    this.campaignYear = '2021';
  }

  loadCampaign$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(CampaignActions.loadCampaign),
    mergeMap(x => {
        this.loader.isLoading.next(true);
        return this.getById(x.payload)
          .pipe(
            map(camp => {
              this.loader.isLoading.next(false);
              return CampaignActions.loadCampaignSuccess({payload: camp.data()});
            }),
            catchError((err, caught) => {
              this.store.dispatch(CampaignActions.loadCampaignFailure({error: err}));
              this.loader.isLoading.next(false);
              return caught;
            }));
      return of(x);
    })
    )
  });

  allCampaigns$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(CampaignActions.loadAllCampaigns),
    mergeMap(() => {
          this.loader.isLoading.next(true);
          return this.get()
              .pipe(
                map(camp => {
                    this.loader.isLoading.next(false);
                    return CampaignActions.loadAllCampaignsSuccess({payload: camp});
                }),
                catchError((err, caught) => {
                    this.store.dispatch(CampaignActions.loadAllCampaignsFailure({error: err}));
                    this.loader.isLoading.next(false);
                    return caught;
                })
          );
      })
  )});

  loadCampaigns$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(CampaignActions.loadClientCampaigns),
    mergeMap(x => {
        this.loader.isLoading.next(true);
        this.getCampaigns(x.payload)
          .then((data) => {
            const result = new Array<unknown>();
            data.docs.forEach(d => result.push({ ...d.data(), id: d.id }));

            this.store.dispatch(CampaignActions.loadClientCampaignsSuccess({payload: result}));
            this.loader.isLoading.next(false);
            return CampaignActions.loadClientCampaignsSuccess({payload: result});
          })
          .catch(err => {
            this.loader.isLoading.next(false);
            return of(loadClientCampaignsFailure({error: err}));
          });
        return of(x);
      })
  )});

  create$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(createCampaign),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      return this.create(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          this.store.dispatch(loadClientCampaigns({payload: x.payload.clientId}));
          return createCampaignSuccess({payload: data});
        })
        .catch(err => {
          this.loader.isLoading.next(false);
          return createCampaignFailire({error: err});
        });
      return of(x);
    })
  )});

  update$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(updateCampaign),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      return this.update(x.payload)
        .then(() => {
          this.loader.isLoading.next(false);
          return updateCampaignSuccess({payload: x.payload});
        })
        .catch(err => {
            this.loader.isLoading.next(false);
            return updateCampaignFailure({error: err});
        });
      return of(x);
    })
  )});

  delete$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(deleteCampaign),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      return this.delete(x.payload.id ?? '')
        .then(() => {
          this.loader.isLoading.next(false);
          return deleteCampaignSuccess({payload: x.payload.id});
        })
        .catch(err => {
          this.loader.isLoading.next(false);
          return deleteCampaignFailure({error: err});
        });
    return of(x);
    })
  )});

  loadYears$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(loadCampaignYears),
    mergeMap(() => {
        this.loader.isLoading.next(true);
        return this.getYears()
        .pipe(
          map(Years => {
              this.loader.isLoading.next(false);

              const active = Years.filter(c => c.payload.doc.data().active === true);
              if (active.length > 0) {
                const year = {id: active[0].payload.doc.id, ...active[0].payload.doc.data()};
                this.store.dispatch(setActiveCampaign({payload: year}));
              }
              return loadCampaignYearsSuccess({payload: Years});
          }),
          catchError((err, caught) => {
            this.store.dispatch(loadCampaignYearsFailure({error: err}));
            this.loader.isLoading.next(false);
            return caught;
          })
        )
      return [];
    })
  )});

  createYear$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(createCampaignYear),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      if (x.payload.active) {
        this.clearActiveYears('');
      }
      return this.createYear(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          return createCampaignYearSuccess({payload: data});
        })
        .catch(err => {
            this.loader.isLoading.next(false);
            return createCampaignYearFailire({error: err});
        });
    })
  )});

  updateYear$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(updateCampaignYear),
    mergeMap(x => {
      this.loader.isLoading.next(true);
        if (x.payload.active) {
          this.clearActiveYears(x.payload.id ?? '');
        }
        return this.updateYear(x.payload)
          .then(() => {
            this.loader.isLoading.next(false);
            return updateCampaignYearSuccess({payload: x.payload});
          })
          .catch(err => {
            this.loader.isLoading.next(false);
            return updateCampaignYearFailure({error: err});
          });
    })
  )});

  deleteYear$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteCampaignYear),
      mergeMap(x => {
          this.loader.isLoading.next(true);
          return this.deleteYear(x.payload.id ?? '')
            .then(() => {
              this.loader.isLoading.next(false);
              return deleteCampaignSuccess({payload: 0});
            })
            .catch(err => {
              this.loader.isLoading.next(false);
              return deleteCampaignFailure({error: err});
            });
    })
  )});

  get() {
    const query = `campaigns${this.campaignYear}`;
    return this.firestore.collection<Campaign>(query).snapshotChanges();
  }

  getById(id: string) {
    const query = `campaigns${this.campaignYear}/${id}`;
    return this.firestore.doc(query).get();
  }

  getCampaigns(id: string) {
    const query = `campaigns${this.campaignYear}`;
    return this.firestore.collection<Campaign>(query).ref.where('clientId', '==', id).get();
  }

  create(campaign: Campaign) {
    delete campaign.id;
    const g = Object.assign({}, campaign);
    const query = `campaigns${this.campaignYear}`;
    return this.firestore.collection<Campaign>(query).add(g);
  }

  update(campaign: Campaign) {
    const g = Object.assign({}, campaign);
    const query = `campaigns${this.campaignYear}/${campaign.id}`;
    return this.firestore.doc(query).update(g);
  }

  delete(id: string) {
    const query = `campaigns${this.campaignYear}/${id}`;
    return this.firestore.doc(query).delete();
  }

  // campaign year
  getYears() {
    return this.firestore.collection<CampaignYear>('years').snapshotChanges();
  }

  createYear(year: CampaignYear) {
    delete year.id;
    const g = Object.assign({}, year);
    return this.firestore.collection<CampaignYear>('years').add(g);
  }

  updateYear(year: CampaignYear) {
    const g = Object.assign({}, year);
    const query = `years/${year.id}`;

    return this.firestore.doc(query).update(g);
  }

  clearActiveYears(key: string) {
    this.firestore.collection<CampaignYear>('years').ref.where('active', '==', true).get().then((data) => {
      data.docs.forEach(d => {
        if (d.id !== key) {
          const year = { ...d.data(), id: d.id } as CampaignYear;
          year.active = false;
          this.updateYear(year);
        }

      });
    })
    .catch(error => {
      this.loader.isLoading.next(false);
      return of(updateCampaignFailure(error));
    });
  }

  deleteYear(id: string) {
    const query = `years/${id}`;
    return this.firestore.doc(query).delete();
  }
}

