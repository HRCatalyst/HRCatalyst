import * as fromInterview from './interview.actions';

describe('loadInterviews', () => {
  it('should return an action', () => {
    expect(fromInterview.loadInterviews().type).toBe('[Interview] Load Interviews');
  });
});
