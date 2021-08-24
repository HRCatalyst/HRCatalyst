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
