export interface Auth {
  id: string;
}

export class LoginModel {
  constructor(public userName: string, public password: string) {

  }
}

export class RegistrationModel extends User {
  userName: string;
  password: string;
  confirm: string;
  constructor() {
      super();
  }
}

export interface IAuth {
  user?: firebase.User;
  settings?: User;
  loading?: boolean;
  error?: string;
  selectedOrganization?: string;
}

export class AuthState implements IAuth {
  user?: firebase.User;
  settings?: User;
  loading?: boolean;
  error?: string;
  selectedOrganization?: string;
}
