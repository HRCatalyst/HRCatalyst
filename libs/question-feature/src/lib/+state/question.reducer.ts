import { createReducer, on } from '@ngrx/store';
import * as QuestionActions from './question.actions';
import { adapter, initialState } from './question.entity';


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
  on(QuestionActions.updateQuestionEntity,
    (state, action) => adapter.updateOne(action.question, state)
  ),
  on(QuestionActions.updateQuestions,
    (state, action) => adapter.updateMany(action.questions, state)
  ),
  on(QuestionActions.deleteQuestionEntity,
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
  on(QuestionActions.loadQuestion,
    state => { return state; }
  ),
  on(QuestionActions.selectQuestion,
    state => { return state; }
  ),
  on(QuestionActions.loadAllQuestions,
    state => { return state; }
  ),
  on(QuestionActions.loadAllQuestionsSuccess,
    state => { return state; }
  ),
  on(QuestionActions.loadAllQuestionsFailure,
    state => { return state; }
  ),
  on(QuestionActions.createQuestion,
    state => { return state; }
  ),
  on(QuestionActions.createQuestionSuccess,
    state => { return state; }
  ),
  on(QuestionActions.createQuestionFailire,
    state => { return state; }
  ),
  on(QuestionActions.updateQuestion,
    state => { return state; }
  ),
  on(QuestionActions.updateQuestionSuccess,
    state => { return state; }
  ),
  on(QuestionActions.updateQuestionFailure,
    state => { return state; }
  ),
  on(QuestionActions.deleteQuestion,
    state => { return state; }
  ),
  on(QuestionActions.deleteQuestionSuccess,
    state => { return state; }
  ),
  on(QuestionActions.deleteQuestionFailure,
    state => { return state; }
  )
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
