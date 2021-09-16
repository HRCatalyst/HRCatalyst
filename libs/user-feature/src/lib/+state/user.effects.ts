import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as UserActions from './user.actions';
import { addDoc, collection, collectionChanges, CollectionReference, deleteDoc, doc, Firestore, query, updateDoc, where } from '@angular/fire/firestore';
import { LoaderService, User } from '@hrc/shared-feature';
import { Store } from '@ngrx/store';
import { UserState } from './user.entity';


@Injectable()
export class UserEffects {

  constructor(
      private actions$: Actions,
      private firestore: Firestore,
      private loader: LoaderService,
      private store: Store<UserState>
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
        return this.create(x.payload)
          .then(data => {
            return UserActions.createUserSuccess({payload: {...x.payload, id: data.id}});
          })
          .catch((err: any) => {
            this.loader.isLoading.next(false);
            return UserActions.createUserFailure({error: err});
          });
        })
    )});

    update$ = createEffect(() => {
      return this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap(x => {
        this.loader.isLoading.next(true);
        return this.update(x.payload)
          .then(data => {
            this.loader.isLoading.next(false);
            return UserActions.updateUserSuccess({payload: data});
          })
          .catch((err: any) => {
            this.loader.isLoading.next(false);
            return UserActions.updateUserFailure({error: err});
          });
        })
    )});

    delete$ = createEffect(() => {
      return this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap(x => {
        this.loader.isLoading.next(true);
        return this.delete(x.payload.id ?? '')
          .then(() => {
            this.loader.isLoading.next(false);
            return UserActions.deleteUserSuccess({payload: x.payload.id});
          })
          .catch((err: any)=> {
            this.loader.isLoading.next(false);
            return UserActions.deleteUserFailure({error: err});
          });
        })
    )});

    get() {
      return collectionChanges<User>(query<User>(collection(this.firestore, 'users') as CollectionReference<User>));

    }

    loadById(id: string) {
      return collectionChanges<User>(query(collection(this.firestore, 'users') as CollectionReference<User>, where('id', '==', id)));
    }

    create(user: User) {
      delete user.id;
      const g = Object.assign({}, user);
      const table = `users`;
      return addDoc(collection(this.firestore, table), g);
    }

    update(user: User) {
      const g = Object.assign({}, user);
      const table = `users`;
      return updateDoc(doc(collection(this.firestore, table) as CollectionReference<User>, g.id), g);
    }

    delete(id: string) {
      const table = `users`;
      return deleteDoc(doc(this.firestore, table, id));
    }

}
