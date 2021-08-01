import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as CampaignActions from './campaign.actions';



@Injectable()
export class CampaignEffects {

  // loadCampaigns$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(CampaignActions.loadCampaigns),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => CampaignActions.loadCampaignsSuccess({ data })),
  //         catchError(error => of(CampaignActions.loadCampaignsFailure({ error }))))
  //     )
  //   );
  // });



  constructor(private actions$: Actions) {}

}
