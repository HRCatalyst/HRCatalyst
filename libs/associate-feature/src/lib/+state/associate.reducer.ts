import { Associate, AssociateSearchResult } from '@hrc/shared-feature';
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
    return {...state, selectedAssociate: undefined};
  }),
  on(AssociateActions.loadAssociateSuccess, (state, action) => {
    return {...state, selectedAssociate: action.payload};
  }),
  on(AssociateActions.loadAssociateFailure, state => {
    return state;
  }),
  on(AssociateActions.loadCompanyAssociates, state => {
    return state;
  }),
  on(AssociateActions.loadCompanyAssociatesInprogress, state => {
    return state;
  }),
  on(AssociateActions.loadCompanyAssociatesSuccess, (state, action) => {
    const associates = action.payload.map(e => {
      return {
          id: e.id, ...e
      } as Associate;
    });
    state = adapter.removeAll(state);
    return adapter.addMany(associates, state);
  }),
  on(AssociateActions.loadCompanyAssociatesFailure, (state, error) => {
    console.log(error);
    return state;
  }),
  on(AssociateActions.searchAssociates, state => {
    return {...state, searchResult: undefined, selectedAssociate: undefined};
  }),
  on(AssociateActions.searchAssociatesInprogress, (state) => {
    return state;
  }),
  on(AssociateActions.searchAssociatesSuccess, (state, action) => {
    const associates = action.payload.map(e => {
      return {
          id: e.id,
          last: e.lastName,
          first: e.firstName,
          email: e.emailAddress
      } as AssociateSearchResult;
  });
  return {...state, searchResult: associates};
  }),
  on(AssociateActions.searchAssociatesFailure, state => {
    return {...state, searchResult: undefined};;
  }),
  on(AssociateActions.selectAssociate, (state, action) => {
    return {...state, selectedAssociate: action.payload};
  }),
  on(AssociateActions.createAssociate, state => {
    return state;
  }),
  on(AssociateActions.createAssociateSuccess, state => {
    return state;
  }),
  on(AssociateActions.createAssociateFailire, state => {
    return state;
  }),
  on(AssociateActions.updateAssociateSuccess, state => {
    return state;
  }),
  on(AssociateActions.updateAssociateFailure, state => {
    return state;
  }),
  on(AssociateActions.deleteAssociateSuccess, state => {
    return state;
  }),
  on(AssociateActions.deleteAssociateFailure, state => {
    return state;
  })
);

