import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Campaign } from './campaign.model';

export const loadCampaigns = createAction(
  '[Campaign/API] Load Campaigns', 
  props<{ campaigns: Campaign[] }>()
);

export const addCampaign = createAction(
  '[Campaign/API] Add Campaign',
  props<{ campaign: Campaign }>()
);

export const upsertCampaign = createAction(
  '[Campaign/API] Upsert Campaign',
  props<{ campaign: Campaign }>()
);

export const addCampaigns = createAction(
  '[Campaign/API] Add Campaigns',
  props<{ campaigns: Campaign[] }>()
);

export const upsertCampaigns = createAction(
  '[Campaign/API] Upsert Campaigns',
  props<{ campaigns: Campaign[] }>()
);

export const updateCampaign = createAction(
  '[Campaign/API] Update Campaign',
  props<{ campaign: Update<Campaign> }>()
);

export const updateCampaigns = createAction(
  '[Campaign/API] Update Campaigns',
  props<{ campaigns: Update<Campaign>[] }>()
);

export const deleteCampaign = createAction(
  '[Campaign/API] Delete Campaign',
  props<{ id: string }>()
);

export const deleteCampaigns = createAction(
  '[Campaign/API] Delete Campaigns',
  props<{ ids: string[] }>()
);

export const clearCampaigns = createAction(
  '[Campaign/API] Clear Campaigns'
);
