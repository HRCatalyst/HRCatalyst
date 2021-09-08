import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { IImport, Import, ImportSuccessResult } from '@hrcatalyst/shared-feature';
import { DocumentReference } from '@angular/fire/firestore';

export const loadImports = createAction(
  '[Import/API] Load Imports',
  props<{ imports: Import[] }>()
);

export const addImport = createAction(
  '[Import/API] Add Import',
  props<{ import: Import }>()
);

export const upsertImport = createAction(
  '[Import/API] Upsert Import',
  props<{ import: Import }>()
);

export const addImports = createAction(
  '[Import/API] Add Imports',
  props<{ imports: Import[] }>()
);

export const upsertImports = createAction(
  '[Import/API] Upsert Imports',
  props<{ imports: Import[] }>()
);

export const updateImportEntity = createAction(
  '[Import/API] Update Import',
  props<{ import: Update<Import> }>()
);

export const updateImports = createAction(
  '[Import/API] Update Imports',
  props<{ imports: Update<Import>[] }>()
);

export const deleteImportEntity = createAction(
  '[Import/API] Delete Import',
  props<{ id: string }>()
);

export const deleteImports = createAction(
  '[Import/API] Delete Imports',
  props<{ ids: string[] }>()
);

export const clearImports = createAction(
  '[Import/API] Clear Imports'
);

export const loadImport = createAction(
  '[Import/API] LOAD_IMPORT'
);

export const loadImportInprogress = createAction(
  '[Import/API] LOAD_IMPORT_INPROGRESS'
);

export const loadImportSuccess = createAction(
  '[Import/API] LOAD_IMPORT_SUCCESS',
  props<{ payload: ImportSuccessResult }>()
);

export const loadImportFailure = createAction(
  '[Import/API] LOAD_IMPORT_FAILURE',
  props<{ error: unknown }>()
);

export const selectImport = createAction(
  '[Import/API] SELECT_IMPORT',
  props<{ payload: unknown }>()
);

export const loadAllImports = createAction(
  '[Import/API] LOAD_ALL_IMPORTS'
);

export const loadAllImportsSuccess = createAction(
  '[Import/API] LOAD_ALL_IMPORTS_SUCCESS',
  props<{ payload: unknown }>()
);

export const loadAllImportsFailure = createAction(
  '[Import/API] LOAD_ALL_IMPORTS_FAILURE',
  props<{ error: unknown }>()
);

export const logImportError = createAction(
  '[Import/API] LOG_IMPORT_ERROR',
  props<{ payload: IImport }>()
);

export const logImportErrorSuccess = createAction(
  '[Import/API] LOG_IMPORT_ERROR_SUCCESS',
  props<{ payload: DocumentReference }>()
);

export const logImportErrorFailire = createAction(
  '[Import/API] LOG_IMPORT_ERROR_FAILURE',
  props<{ error: unknown }>()
);

export const updateImport = createAction(
  '[Import/API] UPDATE_IMPORT',
  props<{ payload: IImport }>()
);

export const updateImportSuccess = createAction(
  '[Import/API] UPDATE_IMPORT_SUCCESS',
  props<{ payload: unknown }>()
);

export const updateImportFailure = createAction(
  '[Import/API] UPDATE_IMPORT_FAILURE',
  props<{ error: unknown }>()
);

export const deleteImport = createAction(
  '[Import/API] DELETE_IMPORT',
  props<{ payload: IImport }>()
);

export const deleteImportSuccess = createAction(
  '[Import/API] DELETE_IMPORT_SUCCESS',
  props<{ payload: unknown }>()
);

export const deleteImportFailure = createAction(
  '[Import/API] DELETE_IMPORT_FAILURE',
  props<{ error: unknown }>()
);
