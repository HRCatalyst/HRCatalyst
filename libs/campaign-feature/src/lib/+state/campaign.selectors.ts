import { createFeatureSelector } from '@ngrx/store';
import { campaignsFeatureKey, CampaignState } from './campaign.entity';


export const selectCampaignState = createFeatureSelector<CampaignState>(
  campaignsFeatureKey
);
