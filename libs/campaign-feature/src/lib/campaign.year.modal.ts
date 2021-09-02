import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CampaignYear, ICampaignYear } from 'src/app/campaign/campaign.interface';
import { FormBase } from 'src/app/shared/form.base';

@Component({
  selector: 'hrcatalyst-campaign-year-modal',
  templateUrl: './campaign.year.modal.html',
  styleUrls: ['./campaign.year.modal.css']
})
export class CampaignYearModalComponent extends FormBase implements OnInit {
  form = new FormGroup({
    'year': new FormControl('', [Validators.required, Validators.minLength(2)]),
    'suffix': new FormControl('')
  });
  active = false;
  constructor(public dialogRef: MatDialogRef<CampaignYearModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICampaignYear) {
    super();

    if (data !== null) {
      this.form.get('year').setValue(data.year);
      this.form.get('suffix').setValue(data.suffix);
      this.active = data.active;
    }
  }

  ngOnInit() {
  }

  onSave() {
    const year = new CampaignYear();

    year.id = this.data.id;
    year.year = this.form.get('year').value;
    year.suffix = this.form.get('suffix').value;
    year.active = this.active === undefined ? false : this.active;

    this.dialogRef.close(year);
  }

  onSubmit() {
    this.onSave();
  }

  changed() {
    this.active = !this.active;
  }
}
