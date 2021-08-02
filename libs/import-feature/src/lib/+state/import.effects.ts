import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as ImportActions from './import.actions';



@Injectable()
export class ImportEffects {

  // loadImports$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(ImportActions.loadImports),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => ImportActions.loadImportsSuccess({ data })),
  //         catchError(error => of(ImportActions.loadImportsFailure({ error }))))
  //     )
  //   );
  // });

  constructor(private actions$: Actions) {}

}
