import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { userEntity } from '@hrc/shared-feature';


export const reducer = createReducer(
  userEntity.initialState,
  on(UserActions.addUser,
    (state, action) => userEntity.adapter.addOne(action.user, state)
  ),
  on(UserActions.upsertUser,
    (state, action) => userEntity.adapter.upsertOne(action.user, state)
  ),
  on(UserActions.addUsers,
    (state, action) => userEntity.adapter.addMany(action.users, state)
  ),
  on(UserActions.upsertUsers,
    (state, action) => userEntity.adapter.upsertMany(action.users, state)
  ),
  on(UserActions.updateUserEntity,
    (state, action) => userEntity.adapter.updateOne(action.user, state)
  ),
  on(UserActions.updateUsers,
    (state, action) => userEntity.adapter.updateMany(action.users, state)
  ),
  on(UserActions.deleteUserEntity,
    (state, action) => userEntity.adapter.removeOne(action.id, state)
  ),
  on(UserActions.deleteUsers,
    (state, action) => userEntity.adapter.removeMany(action.ids, state)
  ),
  on(UserActions.loadUsers,
    (state, action) => userEntity.adapter.setAll(action.users, state)
  ),
  on(UserActions.clearUsers,
    state => userEntity.adapter.removeAll(state)
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

