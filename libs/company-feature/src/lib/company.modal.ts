import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ICompany, Company } from 'src/app/company/company.interface';
import { FormBase } from 'src/app/shared/form.base';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'hrc-company',
  templateUrl: './company.modal.html',
  styleUrls: ['./company.modal.css']
})
export class CompanyModalComponent extends FormBase  implements OnInit {
  form = new FormGroup({
    'name': new FormControl('', [Validators.required, Validators.minLength(2)])
  });
  constructor(public dialogRef: MatDialogRef<CompanyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICompany) {
    super();

    this.form.get('name').setValue(data.name);
  }

  ngOnInit() {
  }

  onSave() {
    const org = new Company();

    org.id = this.data.id;
    org.name = this.form.get('name').value;

    this.dialogRef.close(org);
  }

  onSubmit() {
    this.onSave();
  }
}
