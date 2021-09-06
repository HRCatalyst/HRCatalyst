import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Feedback } from '@hrcatalyst/shared-feature';
import * as FeedbackActions from './feedback.actions';

export const feedbacksFeatureKey = 'feedbacks';

export interface FeedbackState extends EntityState<Feedback> {
  selectedFeedback?: Feedback;
}

export const adapter: EntityAdapter<Feedback> = createEntityAdapter<Feedback>();

export const initialState: FeedbackState = adapter.getInitialState({
  selectedFeedback: undefined
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
  on(FeedbackActions.loadFeedbackAction,
    state => { return state; }
  ),
  on(FeedbackActions.loadFeedbackSuccessAction,
    state => { return state; }
  ),
  on(FeedbackActions.loadFeedbackFailureAction,
    state => { return state; }
  ),
  on(FeedbackActions.loadFeedbackErrorsAction,
    state => { return state; }
  ),
  on(FeedbackActions.loadFeedbackErrorsSuccessAction,
    state => { return state; }
  ),
  on(FeedbackActions.loadFeedbackErrorsFailureAction,
    state => { return state; }
  ),
  on(FeedbackActions.loadParticipantFeedbackAction,
    state => { return state; }
  ),
  on(FeedbackActions.loadParticipantFeedbackInprogressAction,
    state => { return state; }
  ),
  on(FeedbackActions.loadParticipantFeedbackSuccessAction,
    state => { return state; }
  ),
  on(FeedbackActions.loadParticipantFeedbackFailureAction,
    state => { return state; }
  ),
  on(FeedbackActions.loadParticipantAssociatesSuccessAction,
    state => { return state; }
  ),
  on(FeedbackActions.createFeedbackAction,
    state => { return state; }
  ),
  on(FeedbackActions.createFeedbackSuccessAction,
    state => { return state; }
  ),
  on(FeedbackActions.createFeedbackFailireAction,
    state => { return state; }
  ),
  on(FeedbackActions.updateFeedbackAction,
    state => { return state; }
  ),
  on(FeedbackActions.updateFeedbackSuccessAction,
    state => { return state; }
  ),
  on(FeedbackActions.updateFeedbackFailureAction,
    state => { return state; }
  ),
  on(FeedbackActions.deleteFeedbackAction,
    state => { return state; }
  ),
  on(FeedbackActions.deleteFeedbackSuccessAction,
    state => { return state; }
  ),
  on(FeedbackActions.deleteFeedbackFailureAction,
    state => { return state; }
  ),
  on(FeedbackActions.changePendingToReceivedAction,
    state => { return state; }
  ),
  on(FeedbackActions.changePendingToReceivedSuccessAction,
    state => { return state; }
  ),
  on(FeedbackActions.changePendingToReceivedFailureAction,
    state => { return state; }
  ),
  on(FeedbackActions.changeColleagueToPeerAction,
    state => { return state; }
  ),
  on(FeedbackActions.changeColleagueToPeerSuccessAction,
    state => { return state; }
  ),
  on(FeedbackActions.changeColleagueToPeerFailureAction,
    state => { return state; }
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
