import { createReducer, on } from '@ngrx/store';
import * as InterviewActions from './interview.actions';
import { interviewEntity } from '@hrc/shared-feature';


export const reducer = createReducer(
  interviewEntity.initialState,
  on(InterviewActions.addInterview,
    (state, action) => interviewEntity.adapter.addOne(action.interview, state)
  ),
  on(InterviewActions.upsertInterview,
    (state, action) => interviewEntity.adapter.upsertOne(action.interview, state)
  ),
  on(InterviewActions.addInterviews,
    (state, action) => interviewEntity.adapter.addMany(action.interviews, state)
  ),
  on(InterviewActions.upsertInterviews,
    (state, action) => interviewEntity.adapter.upsertMany(action.interviews, state)
  ),
  on(InterviewActions.updateInterviewEntity,
    (state, action) => interviewEntity.adapter.updateOne(action.interview, state)
  ),
  on(InterviewActions.updateInterviews,
    (state, action) => interviewEntity.adapter.updateMany(action.interviews, state)
  ),
  on(InterviewActions.deleteInterview,
    (state, action) => interviewEntity.adapter.removeOne(action.id, state)
  ),
  on(InterviewActions.deleteInterviews,
    (state, action) => interviewEntity.adapter.removeMany(action.ids, state)
  ),
  on(InterviewActions.loadInterviews,
    (state, action) => interviewEntity.adapter.setAll(action.interviews, state)
  ),
  on(InterviewActions.clearInterviews,
    state => interviewEntity.adapter.removeAll(state)
  ),
  on(InterviewActions.loadInterview,
    state => interviewEntity.adapter.removeAll(state)
  ),
  on(InterviewActions.loadInterviewSuccess,
    state => interviewEntity.adapter.removeAll(state)
  ),
  on(InterviewActions.loadInterviewFailure,
    state => interviewEntity.adapter.removeAll(state)
  ),
  on(InterviewActions.loadInterviewParticipants,
    state => interviewEntity.adapter.removeAll(state)
  ),
  on(InterviewActions.loadInterviewParticipantsInprogress,
    state => interviewEntity.adapter.removeAll(state)
  ),
  on(InterviewActions.loadInterviewParticipantsSuccess,
    state => interviewEntity.adapter.removeAll(state)
  ),
  on(InterviewActions.loadInterviewParticipantsFailure,
    state => interviewEntity.adapter.removeAll(state)
  ),
  on(InterviewActions.createInterview,
    state => interviewEntity.adapter.removeAll(state)
  ),
  on(InterviewActions.createInterviewSuccess,
    state => interviewEntity.adapter.removeAll(state)
  ),
  on(InterviewActions.createInterviewFailire,
    state => interviewEntity.adapter.removeAll(state)
  ),
  on(InterviewActions.updateInterview,
    state => interviewEntity.adapter.removeAll(state)
  ),
  on(InterviewActions.updateInterviewSuccess,
    state => interviewEntity.adapter.removeAll(state)
  ),
  on(InterviewActions.updateInterviewFailure,
    state => interviewEntity.adapter.removeAll(state)
  ),
  on(InterviewActions.deleteInterviewEntity,
    state => interviewEntity.adapter.removeAll(state)
  ),
  on(InterviewActions.deleteInterviewSuccess,
    state => interviewEntity.adapter.removeAll(state)
  ),
  on(InterviewActions.deleteInterviewFailure,
    state => interviewEntity.adapter.removeAll(state)
  ),
);

