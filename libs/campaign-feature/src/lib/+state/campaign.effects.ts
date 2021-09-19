import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as CampaignActions from './campaign.actions';
import { Campaign, CampaignYear, LoaderService } from '@hrc/shared-feature';
import { addDoc, collection, collectionChanges, CollectionReference, deleteDoc, doc, Firestore, query, updateDoc, where } from '@angular/fire/firestore';
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
          setActiveCampaign,
          updateCampaign,
          updateCampaignFailure,
          updateCampaignSuccess,
          updateCampaignYear,
          updateCampaignYearFailure,
          updateCampaignYearSuccess } from './campaign.actions';
import { Store } from '@ngrx/store';
import { campaignEntity } from '@hrc/shared-feature';

@Injectable()
export class CampaignEffects {
  campaignYear: string = Date.now.toString();
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private actions$: Actions, private firestore: Firestore,
    private store: Store<campaignEntity.CampaignState>, private loader: LoaderService) {
    this.campaignYear = '2021';
  }

  loadCampaign$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(CampaignActions.loadCampaign),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      return this.getById(x.payload).pipe(
        map(camp => {
          this.loader.isLoading.next(false);
          const result = new Array<Campaign>();
          camp.forEach(d => result.push({ ...d.doc.data(), id: d.doc.id }));
          return CampaignActions.loadCampaignSuccess({payload: result[0]});
        }),
        catchError((err, caught) => {
          this.store.dispatch(CampaignActions.loadCampaignFailure({error: err}));
          this.loader.isLoading.next(false);
          return caught;
        }));
      })
    )
  });

  allCampaigns$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(CampaignActions.loadAllCampaigns),
    mergeMap(() => {
      this.loader.isLoading.next(true);
      return this.get().pipe(
        map(camp => {
            this.loader.isLoading.next(false);
            const result = new Array<Campaign>();
            camp.forEach(d => result.push({ ...d.doc.data(), id: d.doc.id }));
            return CampaignActions.loadAllCampaignsSuccess({payload: result});
        }),
        catchError((err, caught) => {
            this.store.dispatch(CampaignActions.loadAllCampaignsFailure({error: err}));
            this.loader.isLoading.next(false);
            return caught;
        })
      );
      })
  )});

  loadYears$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(CampaignActions.loadCampaignYears),
    mergeMap(() => {
      this.loader.isLoading.next(true);
      return this.getYears().pipe(
        map(Years => {
          this.loader.isLoading.next(false);
          const result = new Array<CampaignYear>();
          Years.forEach(d => result.push({ ...d.doc.data(), id: d.doc.id }));

          const active = Years.filter(c => c.doc.data().active === true);

          if (active.length > 0) {
            const year = {id: active[0].doc.id, ...active[0].doc.data()};
            this.store.dispatch(setActiveCampaign({payload: year}));
          }

          return loadCampaignYearsSuccess({payload: result});
        }),
        catchError((err, caught) => {
          this.store.dispatch(loadCampaignYearsFailure({error: err}));
          this.loader.isLoading.next(false);
          return caught;
        })
      )})
    )
  });

  loadCampaigns$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(CampaignActions.loadClientCampaigns),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      return this.getCampaigns(x.payload).pipe(
        map((data) => {
          const result = new Array<Campaign>();
          data.forEach(d => result.push({ ...d.doc.data(), id: d.doc.id }));

          this.store.dispatch(CampaignActions.loadClientCampaignsSuccess({payload: result}));
          this.loader.isLoading.next(false);
          return CampaignActions.loadClientCampaignsSuccess({payload: result});
        }),
        catchError((err, caught) => {
          this.loader.isLoading.next(false);
          this.store.dispatch(CampaignActions.loadClientCampaignsFailure({error: err}));
          return caught;
        })
      )})
    )
  });

  create$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(createCampaign),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      return this.create(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          this.store.dispatch(loadClientCampaigns({payload: x.payload.clientId}));
          return createCampaignSuccess({payload: {...x.payload, id: data.id}});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return createCampaignFailire({error: err});
        });
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
        .catch((err: any) => {
            this.loader.isLoading.next(false);
            return updateCampaignFailure({error: err});
        });
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
          return deleteCampaignSuccess({payload: x.payload});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return deleteCampaignFailure({error: err});
        });
    })
  )});

  // loadYears$ = createEffect(() => {
  //   return this.actions$.pipe(
  //   ofType(loadCampaignYears),
  //   mergeMap(() => {
  //     this.loader.isLoading.next(true);
  //     return this.getYears()
  //     .pipe(
  //       map(Years => {
  //         this.loader.isLoading.next(false);
  //         const active = Years.filter(c => c.doc.data().active === true);
  //         if (active.length > 0) {
  //           const year = {id: active[0].doc.id, ...active[0].doc.data()};
  //           this.store.dispatch(setActiveCampaign({payload: year}));
  //         }
  //         const result = new Array<CampaignYear>();
  //         Years.forEach(d => result.push({ ...d.doc.data(), id: d.doc.id }));
  //         return loadCampaignYearsSuccess({payload: result});
  //       }),
  //       catchError((err, caught) => {
  //         this.store.dispatch(loadCampaignYearsFailure({error: err}));
  //         this.loader.isLoading.next(false);
  //         return caught;
  //       })
  //     )
  //   })
  // )});

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
          return createCampaignYearSuccess({payload: {...x.payload, id: data.id}});
        })
        .catch((err: any) => {
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
        .catch((err: any) => {
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
          return CampaignActions.deleteCampaignYearSuccess({payload: x.payload});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return CampaignActions.deleteCampaignYearFailure({error: err});
        });
    })
  )});

  get() {
    const table = `campaigns${this.campaignYear}`;
    return collectionChanges<Campaign>(query<Campaign>(collection(this.firestore, table) as CollectionReference<Campaign>));
  }

  getById(id: string) {
    const table = `campaigns${this.campaignYear}`;
    return collectionChanges<Campaign>(query(collection(this.firestore, table) as CollectionReference<Campaign>, where('id', '==', id)));
  }

  getCampaigns(id: string) {
    const table = `campaigns${this.campaignYear}`;
    return collectionChanges<Campaign>(query(collection(this.firestore, table) as CollectionReference<Campaign>, where('clientId', '==', id)));
  }

  create(campaign: Campaign) {
    delete campaign.id;
    const g = Object.assign({}, campaign);
    const table = `campaigns${this.campaignYear}`;
    return addDoc(collection(this.firestore, table), g);
  }

  update(campaign: Campaign) {
    const g = Object.assign({}, campaign);
    const table = `campaigns${this.campaignYear}/${campaign.id}`;
    return updateDoc(doc(collection(this.firestore, table) as CollectionReference<Campaign>, g.id), g);
  }

  delete(id: string) {
    const table = `campaigns${this.campaignYear}/${id}`;
    return deleteDoc(doc(this.firestore, table, id));
  }

  // campaign year
  getYears() {
    return collectionChanges<CampaignYear>(query<CampaignYear>(collection(this.firestore, 'years') as CollectionReference<CampaignYear>));
  }

  createYear(year: CampaignYear) {
    delete year.id;
    const g = Object.assign({}, year);
    return addDoc(collection(this.firestore, 'years'), g);
  }

  updateYear(year: CampaignYear) {
    const g = Object.assign({}, year);
    const table = `years/${year.id}`;
    return updateDoc(doc(collection(this.firestore, table) as CollectionReference<Campaign>, g.id), g);
  }

  clearActiveYears(key: string) {
    collectionChanges<CampaignYear>(query(collection(this.firestore, 'years') as CollectionReference<CampaignYear>,
    where('active', '==', true))).pipe(
      map((data) => {
        data.forEach(d => {
          if (d.doc.id !== key) {
            const year = { ...d.doc.data(), id: d.doc.id } as CampaignYear;
            year.active = false;
            this.updateYear(year);
          }
        });
      }),
      catchError((err, caught) => {
        this.loader.isLoading.next(false);
        this.store.dispatch(updateCampaignFailure({error: err}));
        return caught;
      })
    )
  }

  deleteYear(id: string) {
    const table = `years/${id}`;
    return deleteDoc(doc(this.firestore, table, id));
  }
}

