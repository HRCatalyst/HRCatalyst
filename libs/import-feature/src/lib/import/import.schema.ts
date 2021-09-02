export enum enumImportFeedback {
  PARTICIPANT_NAME = 0,
  PARTICIPANT_EMAIL = 1,
  RATER_NAME = 2,
  RATER_EMAIL = 3,
  DATE_RECEIVED = 4,
  QUESTION_ID = 5,
  FEEDBACK = 6
}

export const schemaImportFeedback = {
    'Participant Name': {
      prop: 'participantName',
      required: true
    },
    'Participant Email': {
      prop: 'participantEmail',
      required: true
    },
    'Rater Name': {
      prop: 'raterName',
      required: true
    },
    'Rater Email': {
      prop: 'raterEmail',
      required: true
    },
    'Date Received': {
      prop: 'dateReceived',
      required: true
    },
    'Question ID': {
      prop: 'questionId',
      required: true
    },
    'Feedback': {
      prop: 'answer',
      required: true,
    }
};

