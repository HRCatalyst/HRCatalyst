import { IFirebaseUser } from "./firebase.user";
import { User } from "./user.model";
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
  user?: IFirebaseUser;
  settings?: User;
  loading?: boolean;
  error?: string;
  selectedOrganization?: string;
}

export class Auth implements IAuth {
  user?: IFirebaseUser;
  settings?: User;
  loading?: boolean;
  error?: string;
  selectedOrganization?: string;
}
