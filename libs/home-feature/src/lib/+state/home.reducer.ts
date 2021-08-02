import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Home } from './home.model';
import * as HomeActions from './home.actions';

export const homesFeatureKey = 'homes';

export interface State extends EntityState<Home> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Home> = createEntityAdapter<Home>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


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
