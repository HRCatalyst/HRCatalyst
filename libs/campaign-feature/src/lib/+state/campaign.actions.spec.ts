import * as fromCampaign from './campaign.actions';

describe('loadCampaigns', () => {
  it('should return an action', () => {
    expect(fromCampaign.loadCampaigns().type).toBe('[Campaign] Load Campaigns');
  });
});
