import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as ParticipantActions from './participant.actions';



@Injectable()
export class ParticipantEffects {

  // loadParticipants$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(ParticipantActions.loadParticipants),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => ParticipantActions.loadParticipantsSuccess({ data })),
  //         catchError(error => of(ParticipantActions.loadParticipantsFailure({ error }))))
  //     )
  //   );
  // });

  constructor(private actions$: Actions) {}

}
