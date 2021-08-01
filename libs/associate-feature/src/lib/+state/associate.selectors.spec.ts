import * as fromAssociate from './associate.reducer';
import { selectAssociateState } from './associate.selectors';

describe('Associate Selectors', () => {
  it('should select the feature state', () => {
    const result = selectAssociateState({
      [fromAssociate.associateFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
