import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Feedback } from '@hrcatalyst/shared-feature';
import * as FeedbackActions from './feedback.actions';

export const feedbacksFeatureKey = 'feedbacks';

export interface State extends EntityState<Feedback> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Feedback> = createEntityAdapter<Feedback>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(FeedbackActions.addFeedback,
    (state, action) => adapter.addOne(action.feedback, state)
  ),
  on(FeedbackActions.upsertFeedback,
    (state, action) => adapter.upsertOne(action.feedback, state)
  ),
  on(FeedbackActions.addFeedbacks,
    (state, action) => adapter.addMany(action.feedbacks, state)
  ),
  on(FeedbackActions.upsertFeedbacks,
    (state, action) => adapter.upsertMany(action.feedbacks, state)
  ),
  on(FeedbackActions.updateFeedback,
    (state, action) => adapter.updateOne(action.feedback, state)
  ),
  on(FeedbackActions.updateFeedbacks,
    (state, action) => adapter.updateMany(action.feedbacks, state)
  ),
  on(FeedbackActions.deleteFeedback,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(FeedbackActions.deleteFeedbacks,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(FeedbackActions.loadFeedbacks,
    (state, action) => adapter.setAll(action.feedbacks, state)
  ),
  on(FeedbackActions.clearFeedbacks,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
