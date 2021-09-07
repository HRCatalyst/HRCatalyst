import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as AuthActions from './auth.actions';
import { IFirebaseUser, User } from '@hrcatalyst/shared-feature';

export const authsFeatureKey = 'auths';
export interface Auth extends EntityState<Auth> {
    user?: IFirebaseUser;
    settings?: User;
    loading?: boolean;
    error?: string;
    selectedOrganization?: string;
}

export const adapter: EntityAdapter<Auth> = createEntityAdapter<Auth>();

export const initialState: Auth = adapter.getInitialState({
  user: undefined,
  settings: undefined,
  loading: false,
  error: '',
  selectedOrganization: ''
});

export const reducer = createReducer(
  initialState,
  on(AuthActions.addAuth,
    (state, action) => adapter.addOne(action.auth, state)
  ),
  on(AuthActions.upsertAuth,
    (state, action) => adapter.upsertOne(action.auth, state)
  ),
  on(AuthActions.addAuths,
    (state, action) => adapter.addMany(action.auths, state)
  ),
  on(AuthActions.upsertAuths,
    (state, action) => adapter.upsertMany(action.auths, state)
  ),
  on(AuthActions.updateAuth,
    (state, action) => adapter.updateOne(action.auth, state)
  ),
  on(AuthActions.updateAuths,
    (state, action) => adapter.updateMany(action.auths, state)
  ),
  on(AuthActions.deleteAuth,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(AuthActions.deleteAuths,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(AuthActions.loadAuths,
    (state, action) => adapter.setAll(action.auths, state)
  ),
  on(AuthActions.clearAuths,
    state => adapter.removeAll(state)
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
    //return {...state, user: action.payload, loading: false };
    return state;
  }),
  on(AuthActions.registrationFailure, state => {
    return {...state, user: undefined, loading: false };
  })
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
