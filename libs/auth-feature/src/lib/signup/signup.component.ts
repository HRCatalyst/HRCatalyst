import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBase, RegistrationModel, ROLE_DATA } from '@hrcatalyst/shared-feature';

@Component({
  selector: 'hrcatalyst-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent extends FormBase {
  form = new FormGroup({
    'userName': new FormControl('', [Validators.required, Validators.minLength(4)]),
    'userPassword': new FormControl('', [Validators.required, Validators.minLength(4)]),
    'userConfirm': new FormControl('', [Validators.required, Validators.minLength(4)]),
    'selected_role': new FormControl('', [Validators.required]),
    'first_name': new FormControl('', [Validators.required, Validators.minLength(2)]),
    'last_name': new FormControl('', [Validators.required, Validators.minLength(2)]),
    'email_address': new FormControl('', [Validators.required, Validators.email]),
    'phone_number': new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  selectedRole?: string;
  roles = ROLE_DATA;

  constructor(public dialogRef: MatDialogRef<SignupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
    super();

  }

  onSave() {
     const usr = new RegistrationModel();

     usr.userName = this.form.get('userName')?.value;
     usr.password = this.form.get('userPassword')?.value;
     usr.confirm = this.form.get('userConfirm')?.value;
     usr.first_name = this.form.get('first_name')?.value;
     usr.last_name = this.form.get('last_name')?.value;
     usr.email_address = this.form.get('email_address')?.value;
     usr.phone_number = this.form.get('phone_number')?.value;
     usr.role = this.form.get('selected_role')?.value;

     this.dialogRef.close(usr);
  }

  onSubmit() {
    this.onSave();
  }
}
