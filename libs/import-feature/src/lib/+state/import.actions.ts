import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Import } from './import.model';

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

export const updateImport = createAction(
  '[Import/API] Update Import',
  props<{ import: Update<Import> }>()
);

export const updateImports = createAction(
  '[Import/API] Update Imports',
  props<{ imports: Update<Import>[] }>()
);

export const deleteImport = createAction(
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
