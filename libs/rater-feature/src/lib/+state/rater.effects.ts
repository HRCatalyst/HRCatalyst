import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as RaterActions from './rater.actions';



@Injectable()
export class RaterEffects {

  // loadRaters$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(RaterActions.loadRaters),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => RaterActions.loadRatersSuccess({ data })),
  //         catchError(error => of(RaterActions.loadRatersFailure({ error }))))
  //     )
  //   );
  // });

  constructor(private actions$: Actions) {}

}
