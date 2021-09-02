import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { IAssociate, Associate } from 'src/app/associate/associate.interface';
import * as associateEntity from 'src/app/associate/associate.entity';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBase } from 'src/app/shared/form.base';
import { ICampaign } from 'src/app/campaign/campaign.interface';
import { Store } from '@ngrx/store';
import { IParticipant, Participant } from 'src/app/participant/participant.interface';

@Component({
  selector: 'hrcatalyst-participant-modal',
  templateUrl: './participant.modal.html',
  styleUrls: ['./participant.modal.css']
})
export class ParticipantModalComponent extends FormBase implements OnDestroy, OnInit {
  form = new FormGroup({
    'participant': new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  associateState$: Observable<IAssociate[]>;
  associateSubscription: Subscription;
  associates: Associate[];

  constructor(public dialogRef: MatDialogRef<ParticipantModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IParticipant, private associateStore: Store<associateEntity.AssociateState>
    ) {
      super();

      this.associateState$ = this.associateStore.select(associateEntity.selectAll);

      this.associateSubscription = this.associateState$.subscribe((state) => {
          this.associates = state;
      });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.associateSubscription != null) {
      this.associateSubscription.unsubscribe();
    }
  }

  onSubmit() {
    this.onSave();
  }

  onSave() {
    const ptc = new Participant();

    ptc.campaignId = this.data.campaignId;
    ptc.associateId = this.form.get('participant').value;

    this.dialogRef.close(ptc);
  }
}
