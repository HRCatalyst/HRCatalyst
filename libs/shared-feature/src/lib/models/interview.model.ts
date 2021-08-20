export interface IInterview {
  id?: string;
  interviewer: string;
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

export class Interview implements IInterview {
  id?: string;
  interviewer = '';
  campaignId?: string;
  campaignName?: string;
  raterId?: string;
  raterEmail = '';
  raterFirst?: string;
  raterLast?: string;
  raterTitle?: string;
  raterNotes?: string;
  participantId?: string;
  participantEmail = '';
  participantFirst?: string;
  participantLast?: string;
  participantTitle?: string;
  participantNotes?: string;
  relationship?: string;
  dateReceived = '';
  dateCreated = '';
  status = '';
  type = '';
  question = '';
  answer = '';
}

export class InterviewEdit extends Interview {
  interviews: Interview[] = Array<Interview>();
}

export interface IInterviewParticipant {
  id?: string;
  campaignId: string;
  campaignName: string;
  participantId: string;
  participantEmail: string;
  associateId: string;
  first: string;
  last: string;
  title: string;
  notes: string;
  relationship: number;
  unsolicited: string;
  status: string;
  interview?: Interview[];
}

export class InterviewParticipant implements IInterviewParticipant {
  id?: string;
  campaignId = '';
  campaignName = '';
  participantId = '';
  participantEmail = '';
  associateId = '';
  first = '';
  last = '';
  title = '';
  notes = '';
  relationship = 0;
  unsolicited = '';
  status = '';
  interview?: Interview[];
}
