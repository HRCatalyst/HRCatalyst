import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Interview } from './interview.model';
import * as InterviewActions from './interview.actions';

export const interviewsFeatureKey = 'interviews';

export interface State extends EntityState<Interview> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Interview> = createEntityAdapter<Interview>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


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
  on(InterviewActions.updateInterview,
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
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
