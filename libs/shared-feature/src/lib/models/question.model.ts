export interface IQuestion {
  id?: string;
  reference: string;
  content: string;
  required: boolean;
  sequence: number;
}

export class Question implements IQuestion {
  id?: string;
  reference = '';
  content = '';
  required = false;
  sequence = 0;
}
