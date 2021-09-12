import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBase, IRater, Rater, RELATIONSHIP_DATA } from '@hrcatalyst/shared-feature';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'hrcatalyst-rater-modal',
  templateUrl: './rater.modal.html',
  styleUrls: ['./rater.modal.css']
})
export class RaterModalComponent extends FormBase {
  form = new FormGroup({
    'rater': new FormControl('', [Validators.required, Validators.minLength(2)]),
    'relationship': new FormControl('', [Validators.required]),
  });

  relationships = RELATIONSHIP_DATA;

  // associateState$: Observable<IAssociate[]>;
  // associateSubscription$: Subscription;
  // associates?: Associate[];

  constructor(public dialogRef: MatDialogRef<RaterModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRater
    ) {
      super();

      // this.associateState$ = this.associateStore.select(associateEntity.selectAll);
      // this.associateSubscription$ = this.associateState$.subscribe((state) => {
      //     this.associates = state;
      // });
  }

  // ngOnDestroy() {
  //   // if (this.associateSubscription$ != null) {
  //   //   this.associateSubscription$.unsubscribe();
  //   // }
  // }

  onSubmit() {
    this.onSave();
  }

  onSave() {
    const ptc = new Rater();

    ptc.participantId = this.data.participantId;
    ptc.associateId =   this.form.get('rater')?.value;
    ptc.relationship =   this.form.get('relationship')?.value;

    this.dialogRef.close(ptc);
  }
}
