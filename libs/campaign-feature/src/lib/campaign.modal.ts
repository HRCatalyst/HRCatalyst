import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Campaign, CAMPAIGN_STATUS, FormBase, ICampaign } from '@hrcatalyst/shared-feature';

@Component({
  selector: 'hrcatalyst-campaign.modal',
  templateUrl: './campaign.modal.html',
  styleUrls: ['./campaign.modal.css']
})
export class CampaignModalComponent extends FormBase {
  form = new FormGroup({
    'name': new FormControl('', [Validators.required, Validators.minLength(2)]),
    'status': new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  statuses = CAMPAIGN_STATUS;

  constructor(public dialogRef: MatDialogRef<CampaignModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICampaign) {
    super();

    if (data !== null) {
      this.form.get('name')?.setValue(data.name);
      this.form.get('status')?.setValue(data.status);
    }
  }

  onSave() {
    const cmp = new Campaign();

    cmp.id = this.data.id;
    cmp.clientId = this.data.clientId;
    cmp.name = this.form.get('name')?.value;
    cmp.status = this.form.get('status')?.value;

    this.dialogRef.close(cmp);
  }

  onSubmit() {
    this.onSave();
  }
}
