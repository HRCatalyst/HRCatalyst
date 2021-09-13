import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { IQuestion, Question } from '@hrc/shared-feature';
import { DocumentReference } from '@angular/fire/compat/firestore';

export const loadQuestions = createAction(
  '[Question/API] Load Questions',
  props<{ questions: Question[] }>()
);

export const addQuestion = createAction(
  '[Question/API] Add Question',
  props<{ question: Question }>()
);

export const upsertQuestion = createAction(
  '[Question/API] Upsert Question',
  props<{ question: Question }>()
);

export const addQuestions = createAction(
  '[Question/API] Add Questions',
  props<{ questions: Question[] }>()
);

export const upsertQuestions = createAction(
  '[Question/API] Upsert Questions',
  props<{ questions: Question[] }>()
);

export const updateQuestionEntity = createAction(
  '[Question/API] Update Question',
  props<{ question: Update<Question> }>()
);

export const updateQuestions = createAction(
  '[Question/API] Update Questions',
  props<{ questions: Update<Question>[] }>()
);

export const deleteQuestionEntity = createAction(
  '[Question/API] Delete Question',
  props<{ id: string }>()
);

export const deleteQuestions = createAction(
  '[Question/API] Delete Questions',
  props<{ ids: string[] }>()
);

export const clearQuestions = createAction(
  '[Question/API] Clear Questions'
);

export const loadQuestion = createAction(
  '[Question/API] LOAD_QUESTION'
);

export const selectQuestion = createAction(
  '[Question/API] SELECT_QUESTION',
  props<{ payload: unknown}>()
);

export const loadAllQuestions = createAction(
  '[Question/API] LOAD_ALL_QUESTIONS'
);

export const loadAllQuestionsSuccess = createAction(
  '[Question/API] LOAD_ALL_QUESTIONS_SUCCESS',
  props<{ payload: unknown}>()
);

export const loadAllQuestionsFailure = createAction(
  '[Question/API] LOAD_ALL_QUESTIONS_FAILURE',
  props<{ error: unknown}>()
);

export const createQuestion = createAction(
  '[Question/API] CREATE_QUESTION',
  props<{ payload: IQuestion}>()
);

export const createQuestionSuccess = createAction(
  '[Question/API] CREATE_QUESTION_SUCCESS',
  props<{ payload: DocumentReference}>()
);

export const createQuestionFailire = createAction(
  '[Question/API] CREATE_QUESTION_FAILURE',
  props<{ error: unknown}>()
);

export const updateQuestion = createAction(
  '[Question/API] UPDATE_QUESTION',
  props<{ payload: IQuestion}>()
);

export const updateQuestionSuccess = createAction(
  '[Question/API] UPDATE_QUESTION_SUCCESS',
  props<{ payload: unknown}>()
);

export const updateQuestionFailure = createAction(
  '[Question/API] UPDATE_QUESTION_FAILURE',
  props<{ error: unknown}>()
);

export const deleteQuestion = createAction(
  '[Question/API] DELETE_QUESTION',
  props<{ payload: IQuestion}>()
);

export const deleteQuestionSuccess = createAction(
  '[Question/API] DELETE_QUESTION_SUCCESS',
  props<{ payload: unknown}>()
);

export const deleteQuestionFailure = createAction(
  '[Question/API] DELETE_QUESTION_FAILURE',
  props<{ error: unknown}>()
);
