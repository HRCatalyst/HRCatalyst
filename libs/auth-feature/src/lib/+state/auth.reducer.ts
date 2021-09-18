import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { authEntity } from '@hrc/shared-feature';


export const reducer = createReducer(
  authEntity.initialState,
  on(AuthActions.addAuth,
    (state, action) => authEntity.adapter.addOne(action.auth, state)
  ),
  on(AuthActions.upsertAuth,
    (state, action) => authEntity.adapter.upsertOne(action.auth, state)
  ),
  on(AuthActions.addAuths,
    (state, action) => authEntity.adapter.addMany(action.auths, state)
  ),
  on(AuthActions.upsertAuths,
    (state, action) => authEntity.adapter.upsertMany(action.auths, state)
  ),
  on(AuthActions.updateAuth,
    (state, action) => authEntity.adapter.updateOne(action.auth, state)
  ),
  on(AuthActions.updateAuths,
    (state, action) => authEntity.adapter.updateMany(action.auths, state)
  ),
  on(AuthActions.deleteAuth,
    (state, action) => authEntity.adapter.removeOne(action.id, state)
  ),
  on(AuthActions.deleteAuths,
    (state, action) => authEntity.adapter.removeMany(action.ids, state)
  ),
  on(AuthActions.loadAuths,
    (state, action) => authEntity.adapter.setAll(action.auths, state)
  ),
  on(AuthActions.clearAuths,
    state => authEntity.adapter.removeAll(state)
  ),
  on(AuthActions.loadSettings, state => {
    return state;
  }),
  on(AuthActions.loadSettingsInprogress, state => {
    return state;
  }),
  on(AuthActions.loginRequired, state => {
    return state;
  }),
  on(AuthActions.loadSettingsSuccess, (state, action) => {
    return {...state, settings: action.payload };
  }),
  on(AuthActions.loadSettingsFailure, (state, action) => {
    console.log(action.error);
    return state;
  }),
  on(AuthActions.loginAttempt, state => {
    return state;
  }),
  on(AuthActions.loginInprogress, state => {
    return state;
  }),
  on(AuthActions.loginSuccess, (state, action) => {
    return {...state, user: action.payload };
  }),
  on(AuthActions.loginFailure, state => {
    return {...state, loading: false };
  }),
  on(AuthActions.logoutAttempt, state => {
    return {...state, user: undefined, settings: undefined, loading: false };
  }),
  on(AuthActions.logoutSuccess, state => {
    return {...state, user: undefined, settings: undefined, loading: false };
  }),
  on(AuthActions.logoutFailure, state => {
    return state;
  }),
  on(AuthActions.registrationAttempt, state => {
    return state;
  }),
  on(AuthActions.registrationSuccess, (state, action) => {
    return {...state, user: action.payload, loading: false };
  }),
  on(AuthActions.registrationFailure, state => {
    return {...state, user: undefined, loading: false };
  })
);

