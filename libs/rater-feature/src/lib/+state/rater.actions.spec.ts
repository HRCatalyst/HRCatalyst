import * as fromRater from './rater.actions';

describe('loadRaters', () => {
  it('should return an action', () => {
    expect(fromRater.loadRaters().type).toBe('[Rater] Load Raters');
  });
});
