import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as InterviewActions from './interview.actions';



@Injectable()
export class InterviewEffects {

  // loadInterviews$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(InterviewActions.loadInterviews),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => InterviewActions.loadInterviewsSuccess({ data })),
  //         catchError(error => of(InterviewActions.loadInterviewsFailure({ error }))))
  //     )
  //   );
  // });

  constructor(private actions$: Actions) {}

}
