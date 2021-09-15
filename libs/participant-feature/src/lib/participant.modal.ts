import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Associate, FormBase, IParticipant, Participant } from '@hrc/shared-feature';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'hrc-participant-modal',
  templateUrl: './participant.modal.html',
  styleUrls: ['./participant.modal.css']
})
export class ParticipantModalComponent extends FormBase {
  form = new FormGroup({
    'participant': new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  // associateState$: Observable<IAssociate[]>;
  // associateSubscription: Subscription;
  associates?: Associate[];

  constructor(public dialogRef: MatDialogRef<ParticipantModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IParticipant
    ) {
      super();

      // this.associateState$ = this.associateStore.select(associateEntity.selectAll);

      // this.associateSubscription = this.associateState$.subscribe((state) => {
      //     this.associates = state;
      // });
  }

  // ngOnDestroy() {
  //   if (this.associateSubscription != null) {
  //     this.associateSubscription.unsubscribe();
  //   }
  // }

  onSubmit() {
    this.onSave();
  }

  onSave() {
    const ptc = new Participant();

    ptc.campaignId = this.data.campaignId;
    ptc.associateId = this.form.get('participant')?.value;

    this.dialogRef.close(ptc);
  }
}
