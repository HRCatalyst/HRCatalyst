import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as AssociateActions from './associate.actions';



@Injectable()
export class AssociateEffects {

  // loadAssociates$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(AssociateActions.loadAssociates),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => AssociateActions.loadAssociatesSuccess({ data })),
  //         catchError(error => of(AssociateActions.loadAssociatesFailure({ error }))))
  //     )
  //   );
  // });



  constructor(private actions$: Actions) {}

}
