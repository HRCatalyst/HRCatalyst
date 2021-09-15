import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Associate } from '@hrc/shared-feature';

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

export const updateAssociateEntity = createAction(
  '[Associate] Update Associate',
  props<{ associate: Update<Associate> }>()
);

export const updateAssociates = createAction(
  '[Associate] Update Associates',
  props<{ associates: Update<Associate>[] }>()
);

export const deleteAssociateEntity = createAction(
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
  props<{ payload: Associate }>()
);

export const loadAssociateFailure = createAction(
  '[Associate] Load Associate Failure',
  props<{ error: unknown }>()
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
  props<{ payload: Associate[] }>()
);

export const loadCompanyAssociatesFailure = createAction(
  '[Associate] Load Company Associate Failure',
  props<{ error: string }>()
);

export const searchAssociates = createAction(
  '[Associate] Search Associates',
  props<{ payload: string }>()
);

export const searchAssociatesInprogress = createAction(
  '[Associate] Search Associate Inprogress',
);

export const searchAssociatesSuccess = createAction(
  '[Associate] Search Associate Success',
  props<{ payload: Associate[] }>()
);

export const searchAssociatesFailure = createAction(
  '[Associate] Search Associate Failure',
  props<{ error: unknown }>()
);

export const selectAssociate = createAction(
  '[Associate] Select Associate',
  props<{ payload?: Associate }>()
);

export const createAssociate = createAction(
  '[Associate] Create Associate',
  props<{ payload: Associate }>()
);

export const createAssociateSuccess = createAction(
  '[Associate] Create Associate Success',
  props<{ payload: Associate }>()
);

export const createAssociateFailire = createAction(
  '[Associate] Create Associate Failure',
    props<{ error: unknown }>()
);

export const updateAssociate = createAction(
  '[Associate] Update Associate',
    props<{ payload: Associate }>()
);

export const updateAssociateSuccess = createAction(
  '[Associate] Update Associate Success',
    props<{ payload: Associate }>()
);

export const updateAssociateFailure = createAction(
  '[Associate] Update Associate Failure',
  props<{ error: unknown }>()
);

export const deleteAssociate = createAction(
  '[Associate] Delete Associate',
    props<{ payload: Associate }>()
);

export const deleteAssociateSuccess = createAction(
  '[Associate] Delete Associate Success',
  props<{ payload: Associate }>()
);

export const deleteAssociateFailure = createAction(
  '[Associate] Delete Associate Failure',
  props<{ error: unknown }>()
);
