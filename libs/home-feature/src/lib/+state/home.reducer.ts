import { createReducer, on } from '@ngrx/store';
import * as HomeActions from './home.actions';
import { adapter, initialState } from './home.entity';

export const reducer = createReducer(
  initialState,
  on(HomeActions.addHome,
    (state, action) => adapter.addOne(action.home, state)
  ),
  on(HomeActions.upsertHome,
    (state, action) => adapter.upsertOne(action.home, state)
  ),
  on(HomeActions.addHomes,
    (state, action) => adapter.addMany(action.homes, state)
  ),
  on(HomeActions.upsertHomes,
    (state, action) => adapter.upsertMany(action.homes, state)
  ),
  on(HomeActions.updateHome,
    (state, action) => adapter.updateOne(action.home, state)
  ),
  on(HomeActions.updateHomes,
    (state, action) => adapter.updateMany(action.homes, state)
  ),
  on(HomeActions.deleteHome,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(HomeActions.deleteHomes,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(HomeActions.loadHomes,
    (state, action) => adapter.setAll(action.homes, state)
  ),
  on(HomeActions.clearHomes,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
