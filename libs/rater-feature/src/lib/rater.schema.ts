export enum enumImportRater {
    PARTICIPANT_EMAIL = 0,
    RESPONDENT_EMAIL = 1,
    RELATIONSHIP = 2,
  }

  export const schemaImportRater = {
      'Participant Email': {
        prop: 'participantEmail',
        required: true
      },
      'Respondent Email': {
        prop: 'respondentEmail',
        required: true
      },
      'Relationship': {
        prop: 'relationship',
        required: true
      }
  };
