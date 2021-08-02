import * as fromCompany from './company.actions';

describe('loadCompanys', () => {
  it('should return an action', () => {
    expect(fromCompany.loadCompanys().type).toBe('[Company] Load Companys');
  });
});
