import { createReducer, on } from '@ngrx/store';
import * as SharedActions from './shared.actions';
import { adapter, initialState } from './shared.entity';


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

