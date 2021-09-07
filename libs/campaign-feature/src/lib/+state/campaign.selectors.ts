import { createFeatureSelector } from '@ngrx/store';
import { CampaignState } from './campaign.entity';
import { campaignsFeatureKey } from './campaign.reducer';

export const selectCampaignState = createFeatureSelector<CampaignState>(
  campaignsFeatureKey
);
