import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class HomeEffects {

  // loadHomes$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(HomeActions.loadHomes),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => HomeActions.loadHomesSuccess({ data })),
  //         catchError(error => of(HomeActions.loadHomesFailure({ error }))))
  //     )
  //   );
  // });

  constructor(private actions$: Actions) {}

}
