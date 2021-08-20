import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Question } from '@hrcatalyst/shared-feature';
import * as QuestionActions from './question.actions';

export const questionsFeatureKey = 'questions';

export interface State extends EntityState<Question> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Question> = createEntityAdapter<Question>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(QuestionActions.addQuestion,
    (state, action) => adapter.addOne(action.question, state)
  ),
  on(QuestionActions.upsertQuestion,
    (state, action) => adapter.upsertOne(action.question, state)
  ),
  on(QuestionActions.addQuestions,
    (state, action) => adapter.addMany(action.questions, state)
  ),
  on(QuestionActions.upsertQuestions,
    (state, action) => adapter.upsertMany(action.questions, state)
  ),
  on(QuestionActions.updateQuestion,
    (state, action) => adapter.updateOne(action.question, state)
  ),
  on(QuestionActions.updateQuestions,
    (state, action) => adapter.updateMany(action.questions, state)
  ),
  on(QuestionActions.deleteQuestion,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(QuestionActions.deleteQuestions,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(QuestionActions.loadQuestions,
    (state, action) => adapter.setAll(action.questions, state)
  ),
  on(QuestionActions.clearQuestions,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
