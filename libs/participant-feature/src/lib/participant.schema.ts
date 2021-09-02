export enum enumImportParticipant {
    CLIENT = 0,
    CAMPAIGN = 1,
    PARTICIPANT_EMAIL = 2
  }

  export const schemaImportParticipant = {
      'client': {
        prop: 'client',
        required: true
      },
      'Campaign': {
        prop: 'campaign',
        required: true
      },
      'Participant Email': {
        prop: 'participantEmail',
        required: true
      }
  };
