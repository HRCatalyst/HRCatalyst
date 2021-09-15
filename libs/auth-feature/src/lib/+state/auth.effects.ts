import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { collection, collectionChanges, CollectionReference, Firestore, query, where } from '@angular/fire/firestore';
import * as AuthActions from './auth.actions';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { IFirebaseUser, LoaderService, User } from '@hrc/shared-feature';
import { Store } from '@ngrx/store';
import { loginFailure, loginSuccess,loginInprogress } from './auth.actions';
import { of } from 'rxjs';
import { AuthState } from './auth.entity';

@Injectable()
export class AuthEffects {

  constructor(private store: Store<AuthState>, private firestore: Firestore,
    private loader: LoaderService, private actions$: Actions) {
  }

  loginAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginAttempt),
      mergeMap(x => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, x.payload.userName,  x.payload.password)
          .then((data) => {
            // Signed in
            const user = {
              uid: data.user?.uid,
              email: data.user?.email,
              displayName: data.user?.displayName,
              phoneNumber: data.user?.phoneNumber
            }
            this.store.dispatch(loginSuccess({ payload: <IFirebaseUser>(user) }));
          })
          .catch((err) => {
            this.store.dispatch(loginFailure({ error: err }));
          });
        return of(loginInprogress());
      })
    )
  );

  loadSettings$ = createEffect(() =>
    this.actions$.pipe(
    ofType(AuthActions.loadSettings),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      this.get(x.id).pipe(
        map((data) => {
          if (data.length > 0) {
            const item = data.pop()?.doc.data();
            if (item) {
              this.store.dispatch(AuthActions.loadSettingsSuccess({ payload: item }));
            }
            this.loader.isLoading.next(false);
            return of(item);
          }
          return of(data);
        }),
        catchError((err, caught) => {
          this.loader.isLoading.next(false);
          this.store.dispatch(AuthActions.loadSettingsFailure({ error: err}));
          return caught;
        }));
        return of(x);
      })
  ));

  get(uid: string) {
    return collectionChanges<User>(query(collection(this.firestore, 'users') as CollectionReference<User>, where('uid', '==', uid)));
  }
}
