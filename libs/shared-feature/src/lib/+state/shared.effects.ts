import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as SharedActions from './shared.actions';



@Injectable()
export class SharedEffects {

  // loadShareds$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(SharedActions.loadShareds),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => SharedActions.loadSharedsSuccess({ data })),
  //         catchError(error => of(SharedActions.loadSharedsFailure({ error }))))
  //     )
  //   );
  // });

  constructor(private actions$: Actions) {}

}
