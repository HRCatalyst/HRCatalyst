import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as UserActions from './user.actions';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IUser, LoaderService, User } from '@hrc/shared-feature';
import { Store } from '@ngrx/store';


@Injectable()
export class UserEffects {

  constructor(
      private actions$: Actions,
      private firestore: AngularFirestore,
      private loader: LoaderService,
      private store: Store<IUser>
    ) {

    }

    load$ = createEffect(() => {
      return this.actions$.pipe(
      ofType(UserActions.loadAllUsers),
      mergeMap(() => {
        this.loader.isLoading.next(true);
        return this.get()
          .pipe(
            map(Users => {
              this.loader.isLoading.next(false);
              return UserActions.loadAllUsersSuccess({payload: Users});
            }),
            catchError((err, caught) => {
              this.loader.isLoading.next(false);
              this.store.dispatch(UserActions.loadAllUsersFailure({error: err}));
              return caught;
            })
            )
        })
      )});

    create$ = createEffect(() => {
      return this.actions$.pipe(
      ofType(UserActions.createUser),
      mergeMap(x => {
        this.loader.isLoading.next(true);
        this.create(x.payload)
          .then(data => {
            return UserActions.createUserSuccess({payload: data});
          })
          .catch((err: any) => {
            this.loader.isLoading.next(false);
            return UserActions.createUserFailure({error: err});
          });
          return of(x);
        })
    )});

    update$ = createEffect(() => {
      return this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap(x => {
        this.loader.isLoading.next(true);
        this.update(x.payload)
          .then(data => {
            this.loader.isLoading.next(false);
            return UserActions.updateUserSuccess({payload: data});
          })
          .catch((err: any) => {
            this.loader.isLoading.next(false);
            return UserActions.updateUserFailure({error: err});
          });
          return of(x);
        })
    )});

    delete$ = createEffect(() => {
      return this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap(x => {
        this.loader.isLoading.next(true);
        this.delete(x.payload.id ?? '')
          .then(() => {
            this.loader.isLoading.next(false);
            return UserActions.deleteUserSuccess({payload: x.payload.id});
          })
          .catch((err: any)=> {
            this.loader.isLoading.next(false);
            return UserActions.deleteUserFailure({error: err});
          });
          return of(x);
        })
    )});

    get() {
        return this.firestore.collection<User>('users').snapshotChanges();
    }

    loadById(id: string) {
        return this.firestore.doc('users/' + id).get();
    }

    create(user: User) {
      const usr = new User;

      delete user.id;
      usr.first_name = user.first_name;
      usr.last_name = user.last_name;
      usr.email_address = user.email_address;
      usr.phone_number = user.phone_number;
      usr.role = user.role;
      usr.uid = user.uid;

      const g = Object.assign({}, usr);
      return this.firestore.collection<User>('users').add(g);
    }

    update(user: User) {
      const g = Object.assign({}, user);
      return this.firestore.doc('users/' + user.id).update(g);
    }

    delete(id: string) {
      return this.firestore.doc('users/' + id).delete();
    }

}
