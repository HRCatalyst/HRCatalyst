import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as ClientActions from './client.actions';



@Injectable()
export class ClientEffects {

  // loadClients$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(ClientActions.loadClients),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => ClientActions.loadClientsSuccess({ data })),
  //         catchError(error => of(ClientActions.loadClientsFailure({ error }))))
  //     )
  //   );
  // });



  constructor(private actions$: Actions) {}

}
