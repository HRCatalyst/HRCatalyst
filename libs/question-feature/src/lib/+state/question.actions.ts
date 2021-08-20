import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Question } from '@hrcatalyst/shared-feature';

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

export const updateQuestion = createAction(
  '[Question/API] Update Question',
  props<{ question: Update<Question> }>()
);

export const updateQuestions = createAction(
  '[Question/API] Update Questions',
  props<{ questions: Update<Question>[] }>()
);

export const deleteQuestion = createAction(
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
