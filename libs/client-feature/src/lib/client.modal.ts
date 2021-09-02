import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IClient, Client } from 'src/app/client/client.interface';
import { FormBase } from 'src/app/shared/form.base';

@Component({
  selector: 'hrcatalyst-client-modal',
  templateUrl: './client.modal.html',
  styleUrls: ['./client.modal.css']
})
export class ClientModalComponent extends FormBase  implements OnInit {
  form = new FormGroup({
    'name': new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  constructor(public dialogRef: MatDialogRef<ClientModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IClient) {
    super();

    if (data !== null) {
      this.form.get('name').setValue(data.name);
    }
  }

  ngOnInit() {
  }

  onSave() {
    const org = new Client();

    org.id = this.data.id;
    org.companyId = this.data.companyId;
    org.name = this.form.get('name').value;

    this.dialogRef.close(org);
  }

  onSubmit() {
    this.onSave();
  }
}
