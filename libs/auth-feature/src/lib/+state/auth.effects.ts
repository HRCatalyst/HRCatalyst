import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import * as AuthActions from './auth.actions';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IFirebaseUser, LoaderService, User } from '@hrcatalyst/shared-feature';
import { Store } from '@ngrx/store';
import { Auth } from './auth.reducer';
import { loginFailure, loginSuccess,loginInprogress } from './auth.actions';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {

  constructor(private store: Store<Auth>, private firebaseAuth: AngularFireAuth, private firestore: AngularFirestore,
    private router: Router, private loader: LoaderService, private actions$: Actions) {
  }

  loginAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginAttempt),
      mergeMap(x => {
        this.firebaseAuth.signInWithEmailAndPassword(x.payload.userName, x.payload.password)
          .then((data) => {
            const user = {
              uid: data.user?.uid,
              email: data.user?.email,
              displayName: data.user?.displayName,
              phoneNumber: data.user?.phoneNumber
            }
            this.store.dispatch(loginSuccess({ payload: <IFirebaseUser>(user)  }));
          })
          .catch((err) => {
            this.store.dispatch(loginFailure({ payload: err }));
          })
          return of(loginInprogress());
      })
    )
  );

  loadSettings$ = createEffect(() =>
    this.actions$.pipe(
    ofType(AuthActions.loadSettings),
    mergeMap(x => {
        this.loader.isLoading.next(true);
        this.get(x.id)
          .then((data) => {
            if (data.docs.length > 0) {
              const item = data.docs[0].data();

              this.store.dispatch(AuthActions.loadSettingsSuccess({ payload: item }));
              this.loader.isLoading.next(false);
              return of(item);
            }
            return of(data);
          })
          .catch(err => {
            this.loader.isLoading.next(false);
            return of(AuthActions.loadSettingsFailure({ error: err }));
          });

          return of(x);
        }),
        map(() => {
            return AuthActions.loadSettingsInprogress();
        }),
        catchError((err, caught) => {
          this.store.dispatch(AuthActions.loadSettingsFailure({ error: err}));
          this.loader.isLoading.next(false);
          return caught;
        })
      ));

      get(uid: string) {
        return this.firestore.collection<User>('users').ref.where('uid', '==', uid).get();
      }
}
