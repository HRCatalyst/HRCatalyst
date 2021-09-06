import { Associate } from "./associate.model";
import { Campaign } from "./campaign.model";

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

export class SelectParticipantParams {
  constructor(
  public campaign: Campaign,
  public participant: Participant,
  public associate: Associate) {}

}
