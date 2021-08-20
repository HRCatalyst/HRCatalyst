export interface IHome {
  id?: string;
  company: string;
  opponent: string;
  site: string;
  when: string;
}

export class Home implements IHome {
  id?: string;
  company = '';
  opponent = '';
  site = '';
  when = '';
}
