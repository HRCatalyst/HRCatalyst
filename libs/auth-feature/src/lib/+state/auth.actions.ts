import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Auth, IFirebaseUser, LoginModel, RegistrationModel, User } from '@hrcatalyst/shared-feature';


export const loadAuths = createAction(
  '[Auth/API] Load Auths',
  props<{ auths: Auth[] }>()
);

export const loadAuthsSuccess = createAction(
  '[Auth/API] Load Auths Success',
  props<{ payload: User[] }>()
);

export const loadAuthsFailure = createAction(
  '[Auth/API] Load Auths Failure',
  props<{ payload: unknown }>()
);

export const addAuth = createAction(
  '[Auth/API] Add Auth',
  props<{ auth: Auth }>()
);

export const upsertAuth = createAction(
  '[Auth/API] Upsert Auth',
  props<{ auth: Auth }>()
);

export const addAuths = createAction(
  '[Auth/API] Add Auths',
  props<{ auths: Auth[] }>()
);

export const upsertAuths = createAction(
  '[Auth/API] Upsert Auths',
  props<{ auths: Auth[] }>()
);

export const updateAuth = createAction(
  '[Auth/API] Update Auth',
  props<{ auth: Update<Auth> }>()
);

export const updateAuths = createAction(
  '[Auth/API] Update Auths',
  props<{ auths: Update<Auth>[] }>()
);

export const deleteAuth = createAction(
  '[Auth/API] Delete Auth',
  props<{ id: string }>()
);

export const deleteAuths = createAction(
  '[Auth/API] Delete Auths',
  props<{ ids: string[] }>()
);

export const clearAuths = createAction(
  '[Auth/API] Clear Auths'
);

export const loadSettings = createAction(
  '[Auth/API] Load Settings',
  props<{ id: string }>()
);

export const loadSettingsInprogress = createAction(
  '[Auth/API] Load Settings Inprogress'
);

export const loginRequired = createAction(
  '[Auth/API] Login Required'
);

export const loadSettingsSuccess = createAction(
  '[Auth/API] Load Settings Success',
  props<{ payload: User }>()
);

export const loadSettingsFailure = createAction(
  '[Auth/API] Load Settings Failure',
  props<{ error: unknown }>()
);

export const loginAttempt = createAction(
  '[Auth/API] Login Attempt',
  props<{ payload: LoginModel }>()
);

export const loginInprogress = createAction(
  '[Auth/API] Login Inprogress'
);

export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  props<{ payload: IFirebaseUser }>()
);

export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<{ payload: unknown }>()
);

export const logoutAttempt = createAction(
  '[Auth/API] Logout Attempt'
);

export const logoutSuccess = createAction(
  '[Auth/API] Logout Success'
);

export const logoutFailure = createAction(
  '[Auth/API] Logout Failure',
  props<{ payload: unknown }>()
);

export const registrationAttempt = createAction(
  '[Auth/API] Registration Attempt',
  props<{ payload: RegistrationModel }>()
);

export const registrationSuccess = createAction(
  '[Auth/API] Registration Success',
  props<{ payload: unknown }>()
);

export const registrationFailure = createAction(
  '[Auth/API] Registration Failure',
  props<{ payload: unknown }>()
);


