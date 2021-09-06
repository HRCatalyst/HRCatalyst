import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as UserActions from './user.actions';
import { User } from '@hrcatalyst/shared-feature';

export const usersFeatureKey = 'users';

export interface UserState extends EntityState<User> {
  selectedUser?: User;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UserState = adapter.getInitialState({
  selectedUser: undefined,
});


export const reducer = createReducer(
  initialState,
  on(UserActions.addUser,
    (state, action) => adapter.addOne(action.user, state)
  ),
  on(UserActions.upsertUser,
    (state, action) => adapter.upsertOne(action.user, state)
  ),
  on(UserActions.addUsers,
    (state, action) => adapter.addMany(action.users, state)
  ),
  on(UserActions.upsertUsers,
    (state, action) => adapter.upsertMany(action.users, state)
  ),
  on(UserActions.updateUserEntity,
    (state, action) => adapter.updateOne(action.user, state)
  ),
  on(UserActions.updateUsers,
    (state, action) => adapter.updateMany(action.users, state)
  ),
  on(UserActions.deleteUserEntity,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(UserActions.deleteUsers,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(UserActions.loadUsers,
    (state, action) => adapter.setAll(action.users, state)
  ),
  on(UserActions.clearUsers,
    state => adapter.removeAll(state)
  ),
  on(UserActions.loadAllUsers,
    state => { return state; }
  ),
  on(UserActions.loadAllUsersSuccess,
    state => { return state; }
  ),
  on(UserActions.loadAllUsersFailure,
    state => { return state; }
  ),
  on(UserActions.createUser,
    state => { return state; }
  ),
  on(UserActions.createUserSuccess,
    state => { return state; }
  ),
  on(UserActions.createUserFailure,
    state => { return state; }
  ),
  on(UserActions.updateUser,
    state => { return state; }
  ),
  on(UserActions.updateUserSuccess,
    state => { return state; }
  ),
  on(UserActions.updateUserFailure,
    state => { return state; }
  ),
  on(UserActions.deleteUser,
    state => { return state; }
  ),
  on(UserActions.deleteUserSuccess,
    state => { return state; }
  ),
  on(UserActions.deleteUserFailure,
    state => { return state; }
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
