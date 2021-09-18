import { createFeatureSelector } from '@ngrx/store';
import { campaignsFeatureKey, CampaignState } from './../entities/campaign.entity';


export const selectCampaignState = createFeatureSelector<CampaignState>(
  campaignsFeatureKey
);
