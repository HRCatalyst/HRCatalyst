import * as fromImport from './import.reducer';
import { selectImportState } from './import.selectors';

describe('Import Selectors', () => {
  it('should select the feature state', () => {
    const result = selectImportState({
      [fromImport.importFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
