import { Feedback } from '@hrc/shared-feature';
import { createReducer, on } from '@ngrx/store';
import * as FeedbackActions from './feedback.actions';
import { adapter, initialState } from './feedback.entity';


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
  on(FeedbackActions.updateFeedbackEntity,
    (state, action) => adapter.updateOne(action.feedback, state)
  ),
  on(FeedbackActions.updateFeedbacks,
    (state, action) => adapter.updateMany(action.feedbacks, state)
  ),
  on(FeedbackActions.deleteFeedbackEntity,
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
  on(FeedbackActions.loadFeedback,
    state => { return state; }
  ),
  on(FeedbackActions.loadFeedbackSuccess, (state, action) => {
    state = adapter.removeAll(state);
    return adapter.addMany(action.payload, state);
  }),
  on(FeedbackActions.loadFeedbackFailure,
    state => { return state; }
  ),
  on(FeedbackActions.loadFeedbackErrors,
    state => { return state; }
  ),
  on(FeedbackActions.loadFeedbackErrorsSuccess,
    state => { return state; }
  ),
  on(FeedbackActions.loadFeedbackErrorsFailure,
    state => { return state; }
  ),
  on(FeedbackActions.loadParticipantFeedback,
    state => { return state; }
  ),
  on(FeedbackActions.loadParticipantFeedbackInprogress,
    state => { return state; }
  ),
  on(FeedbackActions.loadParticipantFeedbackSuccess, (state, action) => {
    const feedbacks = action.payload.map(e => {
      return {
          ...e
      } as Feedback;
    });
    return {...state, feedback: feedbacks};
  }),
  on(FeedbackActions.loadParticipantFeedbackFailure,
    state => { return state; }
  ),
  on(FeedbackActions.loadParticipantAssociatesSuccess,
    state => { return state; }
  ),
  on(FeedbackActions.createFeedback,
    state => { return state; }
  ),
  on(FeedbackActions.createFeedbackSuccess,
    state => { return state; }
  ),
  on(FeedbackActions.createFeedbackFailire,
    state => { return state; }
  ),
  on(FeedbackActions.updateFeedback,
    state => { return state; }
  ),
  on(FeedbackActions.updateFeedbackSuccess,
    state => { return state; }
  ),
  on(FeedbackActions.updateFeedbackFailure,
    state => { return state; }
  ),
  on(FeedbackActions.deleteFeedback,
    state => { return state; }
  ),
  on(FeedbackActions.deleteFeedbackSuccess,
    state => { return state; }
  ),
  on(FeedbackActions.deleteFeedbackFailure,
    state => { return state; }
  ),
  on(FeedbackActions.changePendingToReceived,
    state => { return state; }
  ),
  on(FeedbackActions.changePendingToReceivedSuccess,
    state => { return state; }
  ),
  on(FeedbackActions.changePendingToReceivedFailure,
    state => { return state; }
  ),
  on(FeedbackActions.changeColleagueToPeer,
    state => { return state; }
  ),
  on(FeedbackActions.changeColleagueToPeerSuccess,
    state => { return state; }
  ),
  on(FeedbackActions.changeColleagueToPeerFailure,
    state => { return state; }
  ),
);

