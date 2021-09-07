import { createReducer, on } from '@ngrx/store';
import * as InterviewActions from './interview.actions';
import { adapter, initialState } from './interview.entity';


export const reducer = createReducer(
  initialState,
  on(InterviewActions.addInterview,
    (state, action) => adapter.addOne(action.interview, state)
  ),
  on(InterviewActions.upsertInterview,
    (state, action) => adapter.upsertOne(action.interview, state)
  ),
  on(InterviewActions.addInterviews,
    (state, action) => adapter.addMany(action.interviews, state)
  ),
  on(InterviewActions.upsertInterviews,
    (state, action) => adapter.upsertMany(action.interviews, state)
  ),
  on(InterviewActions.updateInterviewEntity,
    (state, action) => adapter.updateOne(action.interview, state)
  ),
  on(InterviewActions.updateInterviews,
    (state, action) => adapter.updateMany(action.interviews, state)
  ),
  on(InterviewActions.deleteInterview,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(InterviewActions.deleteInterviews,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(InterviewActions.loadInterviews,
    (state, action) => adapter.setAll(action.interviews, state)
  ),
  on(InterviewActions.clearInterviews,
    state => adapter.removeAll(state)
  ),
  on(InterviewActions.loadInterview,
    state => adapter.removeAll(state)
  ),
  on(InterviewActions.loadInterviewSuccess,
    state => adapter.removeAll(state)
  ),
  on(InterviewActions.loadInterviewFailure,
    state => adapter.removeAll(state)
  ),
  on(InterviewActions.loadInterviewParticipants,
    state => adapter.removeAll(state)
  ),
  on(InterviewActions.loadInterviewParticipantsInprogress,
    state => adapter.removeAll(state)
  ),
  on(InterviewActions.loadInterviewParticipantsSuccess,
    state => adapter.removeAll(state)
  ),
  on(InterviewActions.loadInterviewParticipantsFailure,
    state => adapter.removeAll(state)
  ),
  on(InterviewActions.createInterview,
    state => adapter.removeAll(state)
  ),
  on(InterviewActions.createInterviewSuccess,
    state => adapter.removeAll(state)
  ),
  on(InterviewActions.createInterviewFailire,
    state => adapter.removeAll(state)
  ),
  on(InterviewActions.updateInterview,
    state => adapter.removeAll(state)
  ),
  on(InterviewActions.updateInterviewSuccess,
    state => adapter.removeAll(state)
  ),
  on(InterviewActions.updateInterviewFailure,
    state => adapter.removeAll(state)
  ),
  on(InterviewActions.deleteInterviewEntity,
    state => adapter.removeAll(state)
  ),
  on(InterviewActions.deleteInterviewSuccess,
    state => adapter.removeAll(state)
  ),
  on(InterviewActions.deleteInterviewFailure,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
