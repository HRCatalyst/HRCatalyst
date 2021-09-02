export enum enumExportFeedback {
    FEEDBACK_ID,
    CAMPAIGN_ID,
    CAMPAIGN_NAME,
    RATER_ID,
    RATER_EMAIL,
    RATER_FIRST,
    RATER_LAST,
    PARTICIPANT_ID,
    PARTICIPANT_EMAIL,
    PARTICIPANT_FIRST,
    PARTICIPANT_LAST,
    DATE_RECEIVED,
    DATE_CREATED,
    STATUS,
    TYPE,
    QUESTION,
    ANSWER
  }

  export const schemaExportFeedback = {
      'Feedback ID': {
        prop: 'Id',
        required: true
      },
      'Campaign ID': {
        prop: 'campaignId',
        required: true
      },
      'Campaign Name': {
        prop: 'campaignName',
        required: true
      },
      'Rater ID': {
        prop: 'raterId',
        required: true
      },
      'Rater Email': {
        prop: 'raterEmail',
        required: true
      },
      'Rater First': {
        prop: 'raterFirst',
        required: true
      },
      'Rater Last': {
        prop: 'raterLast',
        required: true
      },
      'Participant ID': {
        prop: 'participantId',
        required: true
      },
      'Participant Email': {
        prop: 'participantEmail',
        required: true
      },
      'Participant First': {
        prop: 'participantFirst',
        required: true
      },
      'Participant Last': {
        prop: 'participantLast',
        required: true
      },
      'Date Received': {
        prop: 'dateReceived',
        required: true
      },
      'Date Created': {
        prop: 'dateCreated',
        required: true
      },
      'Status': {
        prop: 'status',
        required: true
      },
      'Type': {
        prop: 'type',
        required: true
      },
      'Question': {
        prop: 'question',
        required: true
      },
      'Answer': {
        prop: 'answer',
        required: true,
      }
  };
