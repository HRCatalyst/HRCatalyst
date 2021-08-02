import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Rater } from './rater.model';
import * as RaterActions from './rater.actions';

export const ratersFeatureKey = 'raters';

export interface State extends EntityState<Rater> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Rater> = createEntityAdapter<Rater>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(RaterActions.addRater,
    (state, action) => adapter.addOne(action.rater, state)
  ),
  on(RaterActions.upsertRater,
    (state, action) => adapter.upsertOne(action.rater, state)
  ),
  on(RaterActions.addRaters,
    (state, action) => adapter.addMany(action.raters, state)
  ),
  on(RaterActions.upsertRaters,
    (state, action) => adapter.upsertMany(action.raters, state)
  ),
  on(RaterActions.updateRater,
    (state, action) => adapter.updateOne(action.rater, state)
  ),
  on(RaterActions.updateRaters,
    (state, action) => adapter.updateMany(action.raters, state)
  ),
  on(RaterActions.deleteRater,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(RaterActions.deleteRaters,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(RaterActions.loadRaters,
    (state, action) => adapter.setAll(action.raters, state)
  ),
  on(RaterActions.clearRaters,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
