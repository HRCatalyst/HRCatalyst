export interface IRole {
  id: number;
  name: string;
}

export class Role implements IRole {
  id = 0;
  name = '';
}

export interface IUser {
  id?: string;
  uid?: string;
  first_name: string;
  last_name: string;
  email_address: string;
  phone_number: string;
  role: string;
}

export class User implements IUser {
  id?: string;
  uid?: string;
  first_name = '';
  last_name = '';
  email_address = '';
  phone_number = '';
  role = '';
}
