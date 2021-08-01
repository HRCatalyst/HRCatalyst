import * as fromCampaign from './campaign.reducer';
import { selectCampaignState } from './campaign.selectors';

describe('Campaign Selectors', () => {
  it('should select the feature state', () => {
    const result = selectCampaignState({
      [fromCampaign.campaignFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
