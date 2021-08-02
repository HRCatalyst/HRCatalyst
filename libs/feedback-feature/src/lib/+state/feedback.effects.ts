import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as FeedbackActions from './feedback.actions';



@Injectable()
export class FeedbackEffects {

  // loadFeedbacks$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(FeedbackActions.loadFeedbacks),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => FeedbackActions.loadFeedbacksSuccess({ data })),
  //         catchError(error => of(FeedbackActions.loadFeedbacksFailure({ error }))))
  //     )
  //   );
  // });

  constructor(private actions$: Actions) {}

}
