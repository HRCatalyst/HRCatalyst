import { createReducer, on } from '@ngrx/store';
import * as CampaignActions from './campaign.actions';
import { adapter, initialState } from './campaign.entity';

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
  on(CampaignActions.updateCampaignEntity,
    (state, action) => adapter.updateOne(action.campaign, state)
  ),
  on(CampaignActions.updateCampaigns,
    (state, action) => adapter.updateMany(action.campaigns, state)
  ),
  on(CampaignActions.deleteCampaignEntity,
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
  // on(CampaignActions.loadCampaign, (state, action) => {
  //   return {...state, selectedCampaign: null};
  // }),
  // on(CampaignActions.loadCampaignSuccess, (state, action) => {
  //   return {...state, selectedCampaign: action.payload};
  // }),
  on(CampaignActions.loadCampaignFailure,
    state => { return state; }
  ),
  on(CampaignActions.loadAllCampaigns,
    state => { return state; }
  ),
// on(CampaignActions.loadAllCampaignsSuccess,
//     const campaigns = action.payload.map(e => {
//         return {
//         id: e.payload.doc.id,
//         ...e.payload.doc.data()
//         } as Campaign;
//     });
//     state = campaignEntity.adapter.removeAll(state);
//     return campaignEntity.adapter.addMany(campaigns, state);
//     ),
on(CampaignActions.loadAllCampaignsFailure,
      state => { return state; }
    ),
on(CampaignActions.loadCampaignYears,
      state => { return state; }
    ),
// on(CampaignActions.loadCampaignYearsSuccess,
//     const years = action.payload.map(e => {
//         return {
//             id: e.payload.doc.id,
//             year: e.payload.doc.data().year,
//             suffix: e.payload.doc.data().suffix,
//             active: e.payload.doc.data().active
//         } as CampaignYear;
//     });
//     return {...state, campaignYears: years};
//     ),
on(CampaignActions.loadCampaignYearsFailure,
      state => { return state; }
    ),
on(CampaignActions.loadClientCampaigns,
//    (state) = campaignEntity.adapter.removeAll(state);
      state => { return state; }
    ),
on(CampaignActions.loadClientCampaignsInprogress,
      state => { return state; }
    ),
// on(CampaignActions.LOAD_CLIENT_CAMPAIGNS_SUCCESS,
//     if (action.payload.length === 0) {
//           state => { return state; }
//     }

//     const campaigns = action.payload.map(e => {
//         return {
//             id: e.id, ...e
//         } as Campaign;
//     });
//     state = campaignEntity.adapter.removeAll(state);
//     return campaignEntity.adapter.addMany(campaigns, state);
//     ),
on(CampaignActions.loadClientCampaignsFailure,
      state => { return state;
}),
on(CampaignActions.selectCampaign, (state, action) => {
    return {...state, selectedCampaign: action.payload};
}),
// on(CampaignActions.selectCampaignYear, (state, action) => {
//     return {...state, selectedYear: action.payload};
// }),
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
    return adapter.updateOne({ id: action.payload.id ?? '', changes: action.payload }, state);
}),
on(CampaignActions.updateCampaignFailure,
      state => { return state; }
    ),
// on(CampaignActions.deleteCampaign, (state, action) => {
//     return adapter.removeOne(action.payload.id, state);
// }),
on(CampaignActions.deleteCampaignSuccess,
      state => { return state; }
    ),
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


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
