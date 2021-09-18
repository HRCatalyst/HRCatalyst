import { Campaign, CampaignYear, campaignEntity } from '@hrc/shared-feature';
import { createReducer, on } from '@ngrx/store';
import * as CampaignActions from './campaign.actions';

export const reducer = createReducer(
  campaignEntity.initialState,
  on(CampaignActions.addCampaign,
    (state, action) => campaignEntity.adapter.addOne(action.campaign, state)
  ),
  on(CampaignActions.upsertCampaign,
    (state, action) => campaignEntity.adapter.upsertOne(action.campaign, state)
  ),
  on(CampaignActions.addCampaigns,
    (state, action) => campaignEntity.adapter.addMany(action.campaigns, state)
  ),
  on(CampaignActions.upsertCampaigns,
    (state, action) => campaignEntity.adapter.upsertMany(action.campaigns, state)
  ),
  on(CampaignActions.updateCampaignEntity,
    (state, action) => campaignEntity.adapter.updateOne(action.campaign, state)
  ),
  on(CampaignActions.updateCampaigns,
    (state, action) => campaignEntity.adapter.updateMany(action.campaigns, state)
  ),
  on(CampaignActions.deleteCampaignEntity,
    (state, action) => campaignEntity.adapter.removeOne(action.id, state)
  ),
  on(CampaignActions.deleteCampaigns,
    (state, action) => campaignEntity.adapter.removeMany(action.ids, state)
  ),
  on(CampaignActions.loadCampaigns,
    (state, action) => campaignEntity.adapter.setAll(action.campaigns, state)
  ),
  on(CampaignActions.clearCampaigns,
    state => campaignEntity.adapter.removeAll(state)
  ),
  on(CampaignActions.loadCampaign, state => {
     return {...state, selectedCampaign: undefined};
  }),
  on(CampaignActions.loadCampaignSuccess, (state, action) => {
    return {...state, selectedCampaign: action.payload};
  }),
  on(CampaignActions.loadCampaignFailure,
    state => { return state; }
  ),
  on(CampaignActions.loadAllCampaigns,
    state => { return state; }
  ),
  on(CampaignActions.loadAllCampaignsSuccess, (state, action) => {
    const campaigns = action.payload.map(e => {
        return {
        id: e.id,
        clientId: e.clientId,
        name: e.name,
        status: e.status
        } as Campaign;
    });
    state = campaignEntity.adapter.removeAll(state);
    return campaignEntity.adapter.addMany(campaigns, state);
  }),
  on(CampaignActions.loadAllCampaignsFailure,
        state => { return state; }
      ),
  on(CampaignActions.loadCampaignYears,
        state => { return {...state, campaignYears: undefined}; }
    ),
  on(CampaignActions.loadCampaignYearsSuccess, (state, action) => {
    const years = action.payload.map(e => {
      return {
          id: e.id,
          year: e.year,
          suffix: e.suffix,
          active: e.active
      } as CampaignYear;
    });
    return {...state, campaignYears: years};
  }),
  on(CampaignActions.loadCampaignYearsFailure,
    state => { return state; }
  ),
  on(CampaignActions.loadClientCampaigns,
    state => { return campaignEntity.adapter.removeAll(state); }
  ),
  on(CampaignActions.loadClientCampaignsInprogress,
    state => { return state; }
  ),
  on(CampaignActions.loadClientCampaignsSuccess, (state, action) => {
    if (action.payload.length === 0) {
      state => { return state; }
    }
    const campaigns = action.payload.map(e => {
      return {
          id: e.id, ...e
      } as Campaign;
    });
    state = campaignEntity.adapter.removeAll(state);
    return campaignEntity.adapter.addMany(campaigns, state);
}),
on(CampaignActions.loadClientCampaignsFailure,
      state => { return state;
}),
on(CampaignActions.selectCampaign, (state, action) => {
    return {...state, selectedCampaign: action.payload};
}),
on(CampaignActions.selectCampaignYear, (state, action) => {
    return {...state, selectedYear: action.payload};
}),
on(CampaignActions.setActiveCampaign, (state, action) => {
    return {...state, activeYear: action.payload};
}),
on(CampaignActions.createCampaign,
      state => { return state; }
    ),
on(CampaignActions.createCampaignSuccess,
      state => { return state; }
    ),
on(CampaignActions.createCampaignFailire,
  state => { return state; }
),
on(CampaignActions.updateCampaign,
  state => { return state; }
    ),
on(CampaignActions.updateCampaignSuccess, (state, action) => {
    return campaignEntity.adapter.updateOne({ id: action.payload.id ?? '', changes: action.payload }, state);
}),
on(CampaignActions.updateCampaignFailure,
      state => { return state; }
),
on(CampaignActions.deleteCampaign,
  state => { return state; }
),
on(CampaignActions.deleteCampaignSuccess, (state, action) => {
  return campaignEntity.adapter.removeOne(action.payload.id ?? '', state);
}),
on(CampaignActions.deleteCampaignFailure,
      state => {  return state; }
    ),
on(CampaignActions.createCampaignYear,
      state => {  return state; }
    ),
on(CampaignActions.createCampaignYearSuccess,
      state => {  return state; }
    ),
  on(CampaignActions.createCampaignYearFailire,
      state => {  return state; }
  ),
  on(CampaignActions.updateCampaignYear,
    state => { return state; }
  ),
  on(CampaignActions.updateCampaignYearSuccess,
    state => { return state; }
  ),
  on(CampaignActions.updateCampaignFailure,
    state => { return state; }
  ),
  on(CampaignActions.deleteCampaignYear,
    state => { return state; }
  ),
  on(CampaignActions.deleteCampaignYearSuccess,
    state => { return state; }
  ),
  on(CampaignActions.deleteCampaignFailure,
    state => {  return state; }
  ),
);

