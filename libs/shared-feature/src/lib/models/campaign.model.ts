export interface ICampaignStatus {
  id: number;
  name: string;
}

export class CampaignStatus implements ICampaignStatus {
  id = 0;
  name = '';
}

export interface ICampaign {
  id?: string;
  clientId: string;
  name: string;
  status: string;
}

export class Campaign implements ICampaign {
  id?: string;
  clientId = '';
  name = '';
  status = '';
}

export interface ICampaignYear {
  id?: string;
  year: string;
  suffix: string;
  active: boolean;
}

export class CampaignYear implements ICampaignYear {
  id?: string;
  year = '';
  suffix = '';
  active = false;
}

