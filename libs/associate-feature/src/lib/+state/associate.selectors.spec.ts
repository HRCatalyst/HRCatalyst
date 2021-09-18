import * as fromAssociate from './associate.reducer';
import { selectAssociateState } from '../../../../shared-feature/src/lib/selectors/associate.selectors';

describe('Associate Selectors', () => {
  it('should select the feature state', () => {
    const result = selectAssociateState({
      [fromAssociate.associateFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
