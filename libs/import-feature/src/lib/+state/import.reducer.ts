import { createReducer, on } from '@ngrx/store';
import * as ImportActions from './import.actions';
import { importEntity } from '@hrc/shared-feature';


export const reducer = createReducer(
  importEntity.initialState,
  on(ImportActions.addImport,
    (state, action) => importEntity.adapter.addOne(action.import, state)
  ),
  on(ImportActions.upsertImport,
    (state, action) => importEntity.adapter.upsertOne(action.import, state)
  ),
  on(ImportActions.addImports,
    (state, action) => importEntity.adapter.addMany(action.imports, state)
  ),
  on(ImportActions.upsertImports,
    (state, action) => importEntity.adapter.upsertMany(action.imports, state)
  ),
  // on(ImportActions.updateImport,
  //   (state, action) => adapter.updateOne(action.payload, state)
  // ),
  on(ImportActions.updateImports,
    (state, action) => importEntity.adapter.updateMany(action.imports, state)
  ),
  // on(ImportActions.deleteImport,
  //   (state, action) => adapter.removeOne(action.id, state)
  // ),
  on(ImportActions.deleteImports,
    (state, action) => importEntity.adapter.removeMany(action.ids, state)
  ),
  // on(ImportActions.loadImports,
  //   (state, action) => adapter.setAll(action.imports, state)
  // ),
  on(ImportActions.clearImports,
    state => importEntity.adapter.removeAll(state)
  ),
);

