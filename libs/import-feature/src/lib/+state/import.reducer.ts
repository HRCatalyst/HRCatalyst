import { createReducer, on } from '@ngrx/store';
import * as ImportActions from './import.actions';
import { adapter, initialState } from './import.entity';


export const reducer = createReducer(
  initialState,
  on(ImportActions.addImport,
    (state, action) => adapter.addOne(action.import, state)
  ),
  on(ImportActions.upsertImport,
    (state, action) => adapter.upsertOne(action.import, state)
  ),
  on(ImportActions.addImports,
    (state, action) => adapter.addMany(action.imports, state)
  ),
  on(ImportActions.upsertImports,
    (state, action) => adapter.upsertMany(action.imports, state)
  ),
  // on(ImportActions.updateImport,
  //   (state, action) => adapter.updateOne(action.payload, state)
  // ),
  on(ImportActions.updateImports,
    (state, action) => adapter.updateMany(action.imports, state)
  ),
  // on(ImportActions.deleteImport,
  //   (state, action) => adapter.removeOne(action.id, state)
  // ),
  on(ImportActions.deleteImports,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  // on(ImportActions.loadImports,
  //   (state, action) => adapter.setAll(action.imports, state)
  // ),
  on(ImportActions.clearImports,
    state => adapter.removeAll(state)
  ),
);

