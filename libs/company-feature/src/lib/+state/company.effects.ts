import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as CompanyActions from './company.actions';



@Injectable()
export class CompanyEffects {

  // loadCompanys$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(CompanyActions.loadCompanys),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => CompanyActions.loadCompanysSuccess({ data })),
  //         catchError(error => of(CompanyActions.loadCompanysFailure({ error }))))
  //     )
  //   );
  // });



  constructor(private actions$: Actions) {}

}
