import { createReducer, on } from '@ngrx/store';
import * as HomeActions from './home.actions';
import { homeEntity } from '@hrc/shared-feature';

export const reducer = createReducer(
  homeEntity.initialState,
  on(HomeActions.addHome,
    (state, action) => homeEntity.adapter.addOne(action.home, state)
  ),
  on(HomeActions.upsertHome,
    (state, action) =>homeEntity.adapter.upsertOne(action.home, state)
  ),
  on(HomeActions.addHomes,
    (state, action) => homeEntity.adapter.addMany(action.homes, state)
  ),
  on(HomeActions.upsertHomes,
    (state, action) => homeEntity.adapter.upsertMany(action.homes, state)
  ),
  on(HomeActions.updateHome,
    (state, action) => homeEntity.adapter.updateOne(action.home, state)
  ),
  on(HomeActions.updateHomes,
    (state, action) => homeEntity.adapter.updateMany(action.homes, state)
  ),
  on(HomeActions.deleteHome,
    (state, action) => homeEntity.adapter.removeOne(action.id, state)
  ),
  on(HomeActions.deleteHomes,
    (state, action) => homeEntity.adapter.removeMany(action.ids, state)
  ),
  on(HomeActions.loadHomes,
    (state, action) => homeEntity.adapter.setAll(action.homes, state)
  ),
  on(HomeActions.clearHomes,
    state => homeEntity.adapter.removeAll(state)
  ),
);

