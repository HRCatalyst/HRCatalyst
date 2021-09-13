import { Campaign, ICampaignYear } from '@hrc/shared-feature';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

export const campaignsFeatureKey = 'campaigns';
export interface CampaignState  extends EntityState<Campaign> {
    selectedCampaign?: Campaign;
    campaignYears?: ICampaignYear[];
    selectedYear?: ICampaignYear;
    activeYear?: ICampaignYear;
}

export function selectcampaignId(a: Campaign): string {
    // In this case this would be optional since primary key is id
    return a.id ?? '';
}

export function sortByName(a: Campaign, b: Campaign): number {
    return (a.name).localeCompare(b.name);
}

export const adapter: EntityAdapter<Campaign> = createEntityAdapter<Campaign>({
    selectId: selectcampaignId,
    sortComparer: sortByName,
});

export const initialState: CampaignState = adapter.getInitialState({
    // additional entity state properties
    selectedCampaign: undefined,
    campaignYears: undefined,
    selectedYear: undefined,
    activeYear: undefined
});

// Create the default selectors
export const getCampaignState = createFeatureSelector<CampaignState>('campaign');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = adapter.getSelectors(getCampaignState);


