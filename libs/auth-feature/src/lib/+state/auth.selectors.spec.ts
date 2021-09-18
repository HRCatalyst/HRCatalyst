import * as fromAuth from './auth.reducer';
import { selectAuthState } from '../../../../shared-feature/src/lib/selectors/auth.selectors';

describe('Auth Selectors', () => {
  it('should select the feature state', () => {
    const result = selectAuthState({
      [fromAuth.authFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
