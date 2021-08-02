import * as fromImport from './import.actions';

describe('loadImports', () => {
  it('should return an action', () => {
    expect(fromImport.loadImports().type).toBe('[Import] Load Imports');
  });
});
