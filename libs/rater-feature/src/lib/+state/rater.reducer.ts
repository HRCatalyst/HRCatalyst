import { createReducer, on } from '@ngrx/store';
import { adapter, initialState } from './rate.entity';
import * as RaterActions from './rater.actions';


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
  on(RaterActions.updateRaterEntity,
    (state, action) => adapter.updateOne(action.rater, state)
  ),
  on(RaterActions.updateRaters,
    (state, action) => adapter.updateMany(action.raters, state)
  ),
  on(RaterActions.deleteRaterEntity,
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
  on(RaterActions.loadRater,
    state => { return state; }
  ),
  on(RaterActions.loadAllRaters,
    state => { return state; }
  ),
  on(RaterActions.loadAllRatersSuccess,
    state => { return state; }
  ),
  on(RaterActions.loadAllRatersFailure,
    state => { return state; }
  ),
  on(RaterActions.loadParticipantRaters,
    state => { return state; }
  ),
  on(RaterActions.loadParticipantRatersInprogress,
    state => { return state; }
  ),
  on(RaterActions.loadParticipantRatersSuccess,
    state => { return state; }
  ),
  on(RaterActions.loadParticipantRatersFailure,
    state => { return state; }
  ),
  on(RaterActions.loadParticipantAssociatesSuccess,
    state => { return state; }
  ),
  on(RaterActions.selectRater,
    state => { return state; }
  ),
  on(RaterActions.createRater,
    state => { return state; }
  ),
  on(RaterActions.createRaterSuccess,
    state => { return state; }
  ),
  on(RaterActions.createRaterFailire,
    state => { return state; }
  ),
  on(RaterActions.updateRater,
    state => { return state; }
  ),
  on(RaterActions.updateRaterSuccess,
    state => { return state; }
  ),
  on(RaterActions.updateRaterFailure,
    state => { return state; }
  ),
  on(RaterActions.deleteRater,
    state => { return state; }
  ),
  on(RaterActions.deleteRaterSuccess,
    state => { return state; }
  ),
  on(RaterActions.deleteRaterFailure,
    state => { return state; }
  ),
  on(RaterActions.loadRaterFeedback,
    state => { return state; }
  ),
  on(RaterActions.loadRaterFeedbackInprogress,
    state => { return state; }
  ),
  on(RaterActions.loadRaterFeedbackSuccess,
    state => { return state; }
  ),
  on(RaterActions.loadRaterFeedbackFailure,
    state => { return state; }
  ),
  on(RaterActions.changeColleagueToPeer,
    state => { return state; }
  ),
  on(RaterActions.changeColleagueToPeerSuccess,
    state => { return state; }
  ),
  on(RaterActions.changeColleagueToPeerFailure,
    state => { return state; }
  ),
  on(RaterActions.dedupRaters,
    state => { return state; }
  ),
  on(RaterActions.dedupRatersSuccess,
    state => { return state; }
  ),
  on(RaterActions.dedupRatersFailure,
    state => { return state; }
  )
);

