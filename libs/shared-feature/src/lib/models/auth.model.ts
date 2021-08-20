import { User } from "./user.model";

export interface Auth {
  id: string;
}

export class LoginModel {
  constructor(public userName: string, public password: string) {

  }
}

export class RegistrationModel extends User {
  userName = '';
  password = '';
  confirm = '';
  constructor() {
      super();
  }
}

export interface IAuth {
  user?: unknown; // firebase.User
  settings?: User;
  loading?: boolean;
  error?: string;
  selectedOrganization?: string;
}

export class AuthState implements IAuth {
  user?: unknown; // firebase.User
  settings?: User;
  loading?: boolean;
  error?: string;
  selectedOrganization?: string;
}
