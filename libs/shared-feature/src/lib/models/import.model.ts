import { Associate } from "./associate.model";
import { Campaign } from "./campaign.model";
import { Participant } from "./participant.model";
import { Rater } from "./rater.model";

export interface IImport {
  id?: string;
  importType: string;
  eventType: string;
  eventDate: Date;
  content: string;
  status: string;
}

export class Import implements IImport {
  id?: string;
  importType = '';
  eventType = '';
  eventDate = new Date;
  content = '';
  status = '';
}

export class ImportSuccessResult {
  constructor(
  public campaigns: Campaign[],
  public participants: Participant[],
  public raters: Rater[],
  public associates: Associate[]) {}
}
