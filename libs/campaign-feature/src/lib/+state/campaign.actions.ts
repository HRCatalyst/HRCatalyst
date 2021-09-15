import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Campaign, CampaignYear } from '@hrc/shared-feature';
import { DocumentReference } from '@angular/fire/compat/firestore';

export const loadCampaigns = createAction(
  '[Campaign/API] Load Campaigns',
  props<{campaigns: Campaign[]}>()
);

export const addCampaign = createAction(
  '[Campaign/API] Add Campaign',
  props<{campaign: Campaign}>()
);

export const upsertCampaign = createAction(
  '[Campaign/API] Upsert Campaign',
  props<{campaign: Campaign}>()
);

export const addCampaigns = createAction(
  '[Campaign/API] Add Campaigns',
  props<{campaigns: Campaign[]}>()
);

export const upsertCampaigns = createAction(
  '[Campaign/API] Upsert Campaigns',
  props<{campaigns: Campaign[]}>()
);

export const updateCampaignEntity = createAction(
  '[Campaign/API] Update Campaign',
  props<{campaign: Update<Campaign>}>()
);

export const updateCampaigns = createAction(
  '[Campaign/API] Update Campaigns',
  props<{campaigns: Update<Campaign>[]}>()
);

export const deleteCampaignEntity = createAction(
  '[Campaign/API] Delete Campaign',
  props<{id: string}>()
);

export const deleteCampaigns = createAction(
  '[Campaign/API] Delete Campaigns',
  props<{ids: string[]}>()
);

export const clearCampaigns = createAction(
  '[Campaign/API] Clear Campaigns'
);

export const loadCampaign = createAction(
  '[Campaign/API] Load Campaign ',
  props<{payload: string}>()
);

export const loadCampaignSuccess = createAction(
  '[Campaign/API] Load Campaign Success',
  props<{payload: unknown}>()
);

export const loadCampaignFailure = createAction(
  '[Campaign/API] Load Campaign Failure',
  props<{error: unknown}>()
);

export const loadAllCampaigns = createAction(
  '[Campaign/API] Load All Campaigns',
);

export const loadAllCampaignsSuccess = createAction(
  '[Campaign/API] Load All Campaigns Success',
  props<{payload: unknown}>()
);

export const loadAllCampaignsFailure = createAction(
  '[Campaign/API] Load All Campaigns Failure',
  props<{error: unknown}>()
);

export const loadCampaignYears = createAction(
  '[Campaign/API] Load Campaign Years',
);

export const loadCampaignYearsSuccess = createAction(
  '[Campaign/API] Load Campaign Years Success',
  props<{payload: unknown}>()
);

export const loadCampaignYearsFailure = createAction(
  '[Campaign/API] Load Campaign Years Failure',
  props<{error: unknown}>()
);

export const selectCampaign = createAction(
  '[Campaign/API] Select Campaign',
  props<{payload: Campaign}>()
);

export const setActiveCampaign = createAction(
  '[Campaign/API] Set Active Campaign',
  props<{payload: any}>()
);

export const selectCampaignYear = createAction(
  '[Campaign/API] Select Campaign Year',
  props<{payload: unknown}>()
);

export const loadClientCampaigns = createAction(
  '[Campaign/API] Load Client Campaigns',
  props<{payload: string}>()
);

export const loadClientCampaignsInprogress = createAction(
  '[Campaign/API] Load Client Campaigns Inprogress',
);

export const loadClientCampaignsSuccess = createAction(
  '[Campaign/API] Load Client Campaigns Success',
  props<{payload: Campaign[]}>()
);

export const loadClientCampaignsFailure = createAction(
  '[Campaign/API] Load Client Campaigns Failure',
  props<{error: unknown}>()
);

export const createCampaign = createAction(
  '[Campaign/API] Create Campaign',
  props<{payload: Campaign}>()
);

export const createCampaignSuccess = createAction(
  '[Campaign/API] Create Campaign Success',
  props<{payload: Campaign}>()
);

export const createCampaignFailire = createAction(
  '[Campaign/API] Create Campaign Failure',
  props<{error: unknown}>()
);

export const updateCampaign = createAction(
  '[Campaign/API] Update Campaign',
  props<{payload: Campaign}>()
);

export const updateCampaignSuccess = createAction(
  '[Campaign/API] Update Campaign Success',
  props<{payload: Campaign}>()
);

export const updateCampaignFailure = createAction(
  '[Campaign/API] Update Campaign Failure',
  props<{error: unknown}>()
);

export const deleteCampaign = createAction(
  '[Campaign/API] Delete Campaign',
  props<{payload: Campaign}>()
);

export const deleteCampaignSuccess = createAction(
  '[Campaign/API] Delete Campaign Success',
  props<{payload: unknown}>()
);

export const deleteCampaignFailure = createAction(
  '[Campaign/API] Delete Campaign Failure',
  props<{error: unknown}>()
);

export const createCampaignYear = createAction(
  '[Campaign/API] Create Campaign Year',
  props<{payload: CampaignYear}>()
);

export const createCampaignYearSuccess = createAction(
  '[Campaign/API] Create Campaign Year Success',
  props<{payload: CampaignYear}>()
);

export const createCampaignYearFailire = createAction(
  '[Campaign/API] Create Campaign Year Failure',
  props<{error: unknown}>()
);

export const updateCampaignYear = createAction(
  '[Campaign/API] Update Campaign Year',
  props<{payload: CampaignYear}>()
);

export const updateCampaignYearSuccess = createAction(
  '[Campaign/API] Update Campaign Year Success',
  props<{payload: CampaignYear}>()
);

export const updateCampaignYearFailure = createAction(
  '[Campaign/API] Update Campaign Year Failure',
  props<{error: unknown}>()
);

export const deleteCampaignYear = createAction(
  '[Campaign/API] Delete Campaign Year',
  props<{payload: CampaignYear}>()
);

export const deleteCampaignYearSuccess = createAction(
  '[Campaign/API] Delete Campaign Year Success',
  props<{payload: unknown}>()
);

export const deleteCampaignYearFailure = createAction(
  '[Campaign/API] Delete Campaign Year Failure',
  props<{error: unknown}>()
);

