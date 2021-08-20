export interface ICompany {
  id?: string;
  name: string;
}

export class Company implements ICompany {
  id?: string;
  name = '';
}

