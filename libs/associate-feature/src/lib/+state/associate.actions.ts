import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Associate } from './associate.model';

export const loadAssociates = createAction(
  '[Associate] Load Associates',
  props<{ associates: Associate[] }>()
);

export const addAssociate = createAction(
  '[Associate] Add Associate',
  props<{ associate: Associate }>()
);

export const upsertAssociate = createAction(
  '[Associate] Upsert Associate',
  props<{ associate: Associate }>()
);

export const addAssociates = createAction(
  '[Associate] Add Associates',
  props<{ associates: Associate[] }>()
);

export const upsertAssociates = createAction(
  '[Associate] Upsert Associates',
  props<{ associates: Associate[] }>()
);

export const updateAssociate = createAction(
  '[Associate] Update Associate',
  props<{ associate: Update<Associate> }>()
);

export const updateAssociates = createAction(
  '[Associate] Update Associates',
  props<{ associates: Update<Associate>[] }>()
);

export const deleteAssociate = createAction(
  '[Associate] Delete Associate',
  props<{ id: string }>()
);

export const deleteAssociates = createAction(
  '[Associate] Delete Associates',
  props<{ ids: string[] }>()
);

export const clearAssociates = createAction(
  '[Associate] Clear Associates'
);

export const loadAssociate = createAction(
  '[Associate] Load Associate',
  props<{ payload: string }>()
);

export const loadAssociateSuccess = createAction(
  '[Associate] Load Associate Success',
  props<{ payload: unknown }>()
);

export const loadAssociateFailure = createAction(
  '[Associate] Load Associate Failure',
  props<{ payload: unknown }>()
);

export const loadCompanyAssociates = createAction(
  '[Associate] Load Company Associates',
  props<{ payload: string }>()
);

export const loadCompanyAssociatesInprogress = createAction(
  '[Associate] Load Company Associate Inprogress',
);

export const loadCompanyAssociatesSuccess = createAction(
  '[Associate] Load Company Associate Success',
  props<{ payload: unknown }>()
);

export const loadCompanyAssociatesFailure = createAction(
  '[Associate] Load Company Associate Failure',
  props<{ payload: string }>()
);

export const searchAssociates = createAction(
  '[Associate] SEARCH_ASSOCIATES',
  props<{ payload: string }>()
);

export const searchAssociatesInprogress = createAction(
  '[Associate] SEARCH_ASSOCIATES_INPROGRESS',
);

export const searchAssociatesSuccess = createAction(
  '[Associate] SEARCH_ASSOCIATES_SUCCESS',
  props<{ payload: unknown }>()
);

export const searchAssociatesFailure = createAction(
  '[Associate] SEARCH_ASSOCIATES_FAILURE',
  props<{ payload: unknown }>()
);

export const selectAssociate = createAction(
  '[Associate] SELECT_ASSOCIATE',
  props<{ payload: unknown }>()
);

export const createAssociate = createAction(
  '[Associate] CREATE_ASSOCIATE',
  props<{ payload: Associate }>()
);

export const createAssociateSuccess = createAction(
  '[Associate] CREATE_ASSOCIATE_SUCCESS',
//  props<{ payload: DocumentReference }>()
);

export const createAssociateFailire = createAction(
  '[Associate] CREATE_ASSOCIATE_FAILURE',
    props<{ payload: string }>()
);

export const updateAssociateSuccess = createAction(
  '[Associate] UPDATE_ASSOCIATE_SUCCESS',
    props<{ payload: string }>()
);

export const updateAssociateFailure = createAction(
  '[Associate] UPDATE_ASSOCIATE_FAILURE',
  props<{ payload: unknown }>()
);

export const deleteAssociateSuccess = createAction(
  '[Associate] DELETE_ASSOCIATE_SUCCESS',
  props<{ payload: unknown }>()
);

export const deleteAssociateFailure = createAction(
  '[Associate] Delete Associate Failure',
  props<{ payload: unknown }>()
);
