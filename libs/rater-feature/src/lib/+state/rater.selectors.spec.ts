import * as fromRater from './rater.reducer';
import { selectRaterState } from './rater.selectors';

describe('Rater Selectors', () => {
  it('should select the feature state', () => {
    const result = selectRaterState({
      [fromRater.raterFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
