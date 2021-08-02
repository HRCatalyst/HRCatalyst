import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as QuestionActions from './question.actions';



@Injectable()
export class QuestionEffects {

  // loadQuestions$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(QuestionActions.loadQuestions),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => QuestionActions.loadQuestionsSuccess({ data })),
  //         catchError(error => of(QuestionActions.loadQuestionsFailure({ error }))))
  //     )
  //   );
  // });

  constructor(private actions$: Actions) {}

}
