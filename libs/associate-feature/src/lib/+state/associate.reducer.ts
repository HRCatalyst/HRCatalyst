import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Associate } from './associate.model';
import * as AssociateActions from './associate.actions';

export const associatesFeatureKey = 'associates';

export interface State extends EntityState<Associate> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Associate> = createEntityAdapter<Associate>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(AssociateActions.addAssociate,
    (state, action) => adapter.addOne(action.associate, state)
  ),
  on(AssociateActions.upsertAssociate,
    (state, action) => adapter.upsertOne(action.associate, state)
  ),
  on(AssociateActions.addAssociates,
    (state, action) => adapter.addMany(action.associates, state)
  ),
  on(AssociateActions.upsertAssociates,
    (state, action) => adapter.upsertMany(action.associates, state)
  ),
  on(AssociateActions.updateAssociate,
    (state, action) => adapter.updateOne(action.associate, state)
  ),
  on(AssociateActions.updateAssociates,
    (state, action) => adapter.updateMany(action.associates, state)
  ),
  on(AssociateActions.deleteAssociate,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(AssociateActions.deleteAssociates,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(AssociateActions.loadAssociates,
    (state, action) => adapter.setAll(action.associates, state)
  ),
  on(AssociateActions.clearAssociates,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
