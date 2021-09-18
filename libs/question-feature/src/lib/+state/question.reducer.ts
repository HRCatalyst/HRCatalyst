import { createReducer, on } from '@ngrx/store';
import * as QuestionActions from './question.actions';
import { questionEntity } from '@hrc/shared-feature';


export const reducer = createReducer(
  questionEntity.initialState,
  on(QuestionActions.addQuestion,
    (state, action) => questionEntity.adapter.addOne(action.question, state)
  ),
  on(QuestionActions.upsertQuestion,
    (state, action) => questionEntity.adapter.upsertOne(action.question, state)
  ),
  on(QuestionActions.addQuestions,
    (state, action) => questionEntity.adapter.addMany(action.questions, state)
  ),
  on(QuestionActions.upsertQuestions,
    (state, action) => questionEntity.adapter.upsertMany(action.questions, state)
  ),
  on(QuestionActions.updateQuestionEntity,
    (state, action) => questionEntity.adapter.updateOne(action.question, state)
  ),
  on(QuestionActions.updateQuestions,
    (state, action) => questionEntity.adapter.updateMany(action.questions, state)
  ),
  on(QuestionActions.deleteQuestionEntity,
    (state, action) => questionEntity.adapter.removeOne(action.id, state)
  ),
  on(QuestionActions.deleteQuestions,
    (state, action) => questionEntity.adapter.removeMany(action.ids, state)
  ),
  on(QuestionActions.loadQuestions,
    (state, action) => questionEntity.adapter.setAll(action.questions, state)
  ),
  on(QuestionActions.clearQuestions,
    state => questionEntity.adapter.removeAll(state)
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

