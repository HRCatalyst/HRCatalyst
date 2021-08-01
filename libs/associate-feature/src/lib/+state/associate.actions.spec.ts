import * as fromAssociate from './associate.actions';

describe('loadAssociates', () => {
  it('should return an action', () => {
    expect(fromAssociate.loadAssociates().type).toBe('[Associate] Load Associates');
  });
});
