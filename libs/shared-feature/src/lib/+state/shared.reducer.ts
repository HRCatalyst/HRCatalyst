import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Shared } from './shared.model';
import * as SharedActions from './shared.actions';

export const sharedsFeatureKey = 'shareds';

export interface State extends EntityState<Shared> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Shared> = createEntityAdapter<Shared>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(SharedActions.addShared,
    (state, action) => adapter.addOne(action.shared, state)
  ),
  on(SharedActions.upsertShared,
    (state, action) => adapter.upsertOne(action.shared, state)
  ),
  on(SharedActions.addShareds,
    (state, action) => adapter.addMany(action.shareds, state)
  ),
  on(SharedActions.upsertShareds,
    (state, action) => adapter.upsertMany(action.shareds, state)
  ),
  on(SharedActions.updateShared,
    (state, action) => adapter.updateOne(action.shared, state)
  ),
  on(SharedActions.updateShareds,
    (state, action) => adapter.updateMany(action.shareds, state)
  ),
  on(SharedActions.deleteShared,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(SharedActions.deleteShareds,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(SharedActions.loadShareds,
    (state, action) => adapter.setAll(action.shareds, state)
  ),
  on(SharedActions.clearShareds,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
