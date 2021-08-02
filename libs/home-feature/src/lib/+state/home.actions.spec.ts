import * as fromHome from './home.actions';

describe('loadHomes', () => {
  it('should return an action', () => {
    expect(fromHome.loadHomes().type).toBe('[Home] Load Homes');
  });
});
