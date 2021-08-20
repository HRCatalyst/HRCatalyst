export interface IClient {
  id?: string;
  companyId: string;
  name: string;
}

export class Client implements IClient {
  id?: string;
  companyId = '';
  name = '';
}
