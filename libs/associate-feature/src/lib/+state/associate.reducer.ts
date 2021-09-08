import { createReducer, on } from '@ngrx/store';
import * as AssociateActions from './associate.actions';
import { adapter, initialState } from './associate.entity';

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
  on(AssociateActions.updateAssociateEntity,
    (state, action) => adapter.updateOne(action.associate, state)
  ),
  on(AssociateActions.updateAssociates,
    (state, action) => adapter.updateMany(action.associates, state)
  ),
  on(AssociateActions.deleteAssociateEntity,
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

  on(AssociateActions.loadAssociate, state => {
    return state;
  }),
  on(AssociateActions.loadAssociateSuccess, (state, action) => {
    return state;
  }),
  on(AssociateActions.loadAssociateFailure, (state, error) => {
    return state;
  }),
  on(AssociateActions.loadCompanyAssociates, state => {
    return state;
  }),
  on(AssociateActions.loadCompanyAssociatesInprogress, state => {
    return state;
  }),
  on(AssociateActions.loadCompanyAssociatesSuccess, (state, action) => {
    return state;
  }),
  on(AssociateActions.loadCompanyAssociatesFailure, (state, error) => {
    return state;
  }),
  on(AssociateActions.searchAssociates, state => {
    return state;
  }),
  on(AssociateActions.searchAssociatesInprogress, (state, action) => {
    return state;
  }),
  on(AssociateActions.searchAssociatesSuccess, (state, action) => {
    return state;
  }),
  on(AssociateActions.searchAssociatesFailure, (state, error) => {
    return state;
  }),
  on(AssociateActions.selectAssociate, state => {
    return state;
  }),
  on(AssociateActions.createAssociate, state => {
    return state;
  }),
  on(AssociateActions.createAssociateSuccess, (state, action) => {
    return state;
  }),
  on(AssociateActions.createAssociateFailire, (state, error) => {
    return state;
  }),
  on(AssociateActions.updateAssociateSuccess, (state, action) => {
    return state;
  }),
  on(AssociateActions.updateAssociateFailure, (state, error) => {
    return state;
  }),
  on(AssociateActions.deleteAssociateSuccess, (state, action) => {
    return state;
  }),
  on(AssociateActions.deleteAssociateFailure, (state, error) => {
    return state;
  })
);

