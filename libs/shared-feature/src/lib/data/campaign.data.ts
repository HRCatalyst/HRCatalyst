import { CampaignStatus } from "../models/campaign.model";

export enum enumCampaignStatus {
  UNKNOWN = 0,
  ACTIVE = 1,
  ARCHIVED = 2
}

export const CAMPAIGN_STATUS: CampaignStatus[] = [
{
  id: 0,
  name: 'Unknown'
},
{
  id: 1,
  name: 'Active'
},
{
  id: 2,
  name: 'Archived'
}
];
