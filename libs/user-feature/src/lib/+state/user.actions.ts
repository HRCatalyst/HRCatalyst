import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { User } from '@hrc/shared-feature';

export const loadUsers = createAction(
  '[User/API] Load Users',
  props<{ users: User[] }>()
);

export const addUser = createAction(
  '[User/API] Add User',
  props<{ user: User }>()
);

export const upsertUser = createAction(
  '[User/API] Upsert User',
  props<{ user: User }>()
);

export const addUsers = createAction(
  '[User/API] Add Users',
  props<{ users: User[] }>()
);

export const upsertUsers = createAction(
  '[User/API] Upsert Users',
  props<{ users: User[] }>()
);

export const updateUserEntity = createAction(
  '[User/API] Update User',
  props<{ user: Update<User> }>()
);

export const updateUsers = createAction(
  '[User/API] Update Users',
  props<{ users: Update<User>[] }>()
);

export const deleteUserEntity = createAction(
  '[User/API] Delete User',
  props<{ id: string }>()
);

export const deleteUsers = createAction(
  '[User/API] Delete Users',
  props<{ ids: string[] }>()
);

export const clearUsers = createAction(
  '[User/API] Clear Users'
);

export const loadAllUsers = createAction(
  '[User/API] LOAD_ALL_USERS'
);

export const loadAllUsersSuccess = createAction(
  '[User/API] LOAD_ALL_USERS_SUCCESS',
  props<{ payload:  unknown}>()
);

export const loadAllUsersFailure = createAction(
  '[User/API] LOAD_ALL_USERS_FAILURE',
  props<{ error:  string}>()
);

export const createUser = createAction(
  '[User/API] CREATE_USER',
  props<{ payload:  User}>()
);

export const createUserSuccess = createAction(
  '[User/API] CREATE_USER_SUCCESS',
  props<{ payload:  User}>()
);

export const createUserFailure = createAction(
  '[User/API] CREATE_USER_FAILURE',
  props<{ error:  unknown}>()
);

export const updateUser = createAction(
  '[User/API] UPDATE_USER',
  props<{ payload:  User}>()
);

export const updateUserSuccess = createAction(
  '[User/API] UPDATE_USER_SUCCESS',
  props<{ payload:  unknown}>()
);

export const updateUserFailure = createAction(
  '[User/API] UPDATE_USER_FAILURE',
  props<{ error:  unknown}>()
);

export const deleteUser = createAction(
  '[User/API] DELETE_USER',
  props<{ payload:  User}>()
);

export const deleteUserSuccess = createAction(
  '[User/API] DELETE_USER_SUCCESS',
  props<{ payload:  unknown}>()
);

export const deleteUserFailure = createAction(
  '[User/API] DELETE_USER_FAILURE',
  props<{ error:  unknown}>()
);
