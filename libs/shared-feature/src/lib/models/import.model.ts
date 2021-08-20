export interface IImport {
  id?: string;
  importType: string;
  eventType: string;
  eventDate: Date;
  content: string;
  status: string;
}

export class Import implements IImport {
  id?: string;
  importType = '';
  eventType = '';
  eventDate = new Date;
  content = '';
  status = '';
}
