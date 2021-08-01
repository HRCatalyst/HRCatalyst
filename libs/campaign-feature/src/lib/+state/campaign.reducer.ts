import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Campaign } from './campaign.model';
import * as CampaignActions from './campaign.actions';

export const campaignsFeatureKey = 'campaigns';

export interface State extends EntityState<Campaign> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Campaign> = createEntityAdapter<Campaign>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(CampaignActions.addCampaign,
    (state, action) => adapter.addOne(action.campaign, state)
  ),
  on(CampaignActions.upsertCampaign,
    (state, action) => adapter.upsertOne(action.campaign, state)
  ),
  on(CampaignActions.addCampaigns,
    (state, action) => adapter.addMany(action.campaigns, state)
  ),
  on(CampaignActions.upsertCampaigns,
    (state, action) => adapter.upsertMany(action.campaigns, state)
  ),
  on(CampaignActions.updateCampaign,
    (state, action) => adapter.updateOne(action.campaign, state)
  ),
  on(CampaignActions.updateCampaigns,
    (state, action) => adapter.updateMany(action.campaigns, state)
  ),
  on(CampaignActions.deleteCampaign,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(CampaignActions.deleteCampaigns,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(CampaignActions.loadCampaigns,
    (state, action) => adapter.setAll(action.campaigns, state)
  ),
  on(CampaignActions.clearCampaigns,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
