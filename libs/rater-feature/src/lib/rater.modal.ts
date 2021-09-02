import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { IAssociate, Associate } from 'src/app/associate/associate.interface';
import * as associateEntity from 'src/app/associate/associate.entity';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBase } from 'src/app/shared/form.base';
import { Store } from '@ngrx/store';
import { IRater, Rater } from 'src/app/rater/rater.interface';
import { RELATIONSHIP_DATA } from 'src/app/rater/relationship.data';

@Component({
  selector: 'hrcatalyst-rater-modal',
  templateUrl: './rater.modal.html',
  styleUrls: ['./rater.modal.css']
})
export class RaterModalComponent extends FormBase implements OnDestroy, OnInit {
  form = new FormGroup({
    'rater': new FormControl('', [Validators.required, Validators.minLength(2)]),
    'relationship': new FormControl('', [Validators.required]),
  });

  relationships = RELATIONSHIP_DATA;

  associateState$: Observable<IAssociate[]>;
  associateSubscription$: Subscription;
  associates: Associate[];

  constructor(public dialogRef: MatDialogRef<RaterModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRater, private associateStore: Store<associateEntity.AssociateState>
    ) {
      super();

      this.associateState$ = this.associateStore.select(associateEntity.selectAll);
      this.associateSubscription$ = this.associateState$.subscribe((state) => {
          this.associates = state;
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.associateSubscription$ != null) {
      this.associateSubscription$.unsubscribe();
    }
  }

  onSubmit() {
    this.onSave();
  }

  onSave() {
    const ptc = new Rater();

    ptc.participantId = this.data.participantId;
    ptc.associateId =   this.form.get('rater').value;
    ptc.relationship =   this.form.get('relationship').value;

    this.dialogRef.close(ptc);
  }
}
