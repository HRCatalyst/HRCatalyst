import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCampaign from './campaign.reducer';

export const selectCampaignState = createFeatureSelector<fromCampaign.State>(
  fromCampaign.campaignFeatureKey
);
