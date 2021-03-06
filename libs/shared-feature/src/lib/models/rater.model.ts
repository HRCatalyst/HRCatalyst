import { Associate } from "./associate.model";
import { Campaign } from "./campaign.model";

export interface IRater {
  id?: string;
  participantId: string;
  associateId: string;
  relationship: number;
  unsolicited: boolean;
}

export class Rater implements IRater {
  id?: string;
  participantId = '';
  associateId = '';
  relationship = 0;
  unsolicited = false;
}

export class Relationship {
  id = 0;
  name = '';
}

export class SelectRaterParams {
  constructor(
  public campaign: Campaign,
  public participant: Associate,
  public rater: Associate) {}
}
