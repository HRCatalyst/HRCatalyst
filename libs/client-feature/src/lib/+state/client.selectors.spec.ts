import * as fromClient from './client.reducer';
import { selectClientState } from './client.selectors';

describe('Client Selectors', () => {
  it('should select the feature state', () => {
    const result = selectClientState({
      [fromClient.clientFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
