export enum enumImportAssociate {
  ASSOCIATE_EMAIL = 0,
  ASSOCIATE_FIRST_NAME = 1,
  ASSOCIATE_LAST_NAME = 2,
  TITLE = 3,
  ADMIN = 4,
  NOTES = 5
}

export const schemaImportAssociate = {
    'Associate Email': {
      prop: 'associateEmail',
      required: true
    },
    'Associate First Name': {
      prop: 'associateFirstName',
      required: true
    },
    'Associate Last Name': {
      prop: 'associateLastName',
      required: true
    },
    'Title': {
      prop: 'title',
      required: true
    },
    'Admin': {
      prop: 'admin',
      required: true
    },
    'Notes': {
      prop: 'notes',
      required: true
    }
};

