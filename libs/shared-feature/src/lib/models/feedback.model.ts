export interface IFeedbackStatus {
  id: number;
  name: string;
}

export class FeedbackStatus implements IFeedbackStatus {
  id = 0;
  name = '';
}

export interface IFeedbackType {
  id: number;
  name: string;
}

export class FeedbackType implements IFeedbackType {
  id = 0;
  name = '';
}

export interface IFeedback {
  id?: string;
  campaignId?: string;
  campaignName?: string;
  raterId?: string;
  raterEmail: string;
  raterFirst?: string;
  raterLast?: string;
  participantId?: string;
  participantEmail: string;
  participantFirst?: string;
  participantLast?: string;
  relationship?: string;
  dateReceived: string;
  dateCreated: string;
  status: string;
  type: string;
  question: string;
  answer: string;
}

export class Feedback implements IFeedback {
  id?: string;
  campaignId?: string;
  campaignName?: string;
  raterId?: string;
  raterEmail = '';
  raterFirst?: string;
  raterLast?: string;
  participantId?: string;
  participantEmail = '';
  participantFirst?: string;
  participantLast?: string;
  relationship?: string;
  dateReceived = '';
  dateCreated = '';
  status = '';
  type = '';
  question = '';
  answer = '';
}

export class ReportRater {
  id = '';
  firstName = '';
  lastName = '';
  relationship = '';
  status = '';
}

export class ReportParticipant {
  id = '';
  firstName = '';
  lastName = '';
  raters = '';
  feedback = 0;
  pending = 0;
  unsolicited = 0;
  declined = 0;
  data = Array<ReportRater>();
}
