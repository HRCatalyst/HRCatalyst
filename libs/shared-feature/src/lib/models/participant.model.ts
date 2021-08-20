export interface IParticipant {
  id?: string;
  campaignId: string;
  associateId: string;
}

export class Participant implements IParticipant {
  id?: string;
  campaignId = '';
  associateId = '';
}

export interface ICampaignParticipantsParams {
  companyId: string;
  campaignId: string;
}

export class CampaignParticipantsParams implements ICampaignParticipantsParams {
  constructor(public companyId: string, public campaignId: string) {}
}
