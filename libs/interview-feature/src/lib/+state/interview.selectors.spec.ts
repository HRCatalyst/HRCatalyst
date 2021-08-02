import * as fromInterview from './interview.reducer';
import { selectInterviewState } from './interview.selectors';

describe('Interview Selectors', () => {
  it('should select the feature state', () => {
    const result = selectInterviewState({
      [fromInterview.interviewFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
