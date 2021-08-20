
export interface IAssociate {
  id?: string;
  companyId: string;
  firstName: string;
  lastName: string;
  title: string;
  department: string;
  manager: string;
  assistant: string;
  emailAddress: string;
  notes: string;
  feedback?: number;
}

export class Associate implements IAssociate {
  id = '';
  companyId = '';
  firstName = '';
  lastName = '';
  title = '';
  department = '';
  manager = '';
  assistant = '';
  emailAddress = '';
  notes = '';
  feedback = 0;
}

export interface IAssociateSearchResult {
  id: string;
  email: string;
  last: string;
  first: string;
}

export class AssociateSearchResult implements IAssociateSearchResult {
  id = '';
  email = '';
  last = '';
  first = '';
}
