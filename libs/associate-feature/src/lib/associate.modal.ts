import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Associate, FormBase, IAssociate } from '@hrc/shared-feature';

@Component({
  selector: 'hrc-associate.modal',
  templateUrl: './associate.modal.html',
  styleUrls: ['./associate.modal.css']
})
export class AssociateModalComponent extends FormBase {
  form = new FormGroup({
    'first_name': new FormControl('', [Validators.required, Validators.minLength(2)]),
    'last_name': new FormControl('', [Validators.required, Validators.minLength(2)]),
    'email_address': new FormControl('', [Validators.required, Validators.minLength(2)]),
    'title': new FormControl('', []),
    'notes': new FormControl('', []),
  });
  constructor(public dialogRef: MatDialogRef<AssociateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAssociate) {
    super();

    if (data !== null) {
      this.form.get('first_name')?.setValue(data.firstName);
      this.form.get('last_name')?.setValue(data.lastName);
      this.form.get('title')?.setValue(data.title);
      this.form.get('email_address')?.setValue(data.emailAddress);
      this.form.get('notes')?.setValue(data.notes);
    }
  }

  onSave() {
    const asc = new Associate();

    if (asc) {
      asc.id = this.data.id;
      asc.companyId = this.data.companyId;
      asc.firstName = this.form.get('first_name')?.value;
      asc.lastName = this.form.get('last_name')?.value;
      asc.title = this.form.get('title')?.value === undefined ? '' : this.form.get('title')?.value;
      asc.emailAddress = this.form.get('email_address')?.value;
      asc.notes = this.form.get('notes')?.value === undefined ? '' : this.form.get('notes')?.value;

      this.dialogRef.close(asc);
    }

  }

  onSubmit() {
    this.onSave();
  }
}
