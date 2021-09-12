import { Component, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Feedback, FEEDBACK_STATUS, FEEDBACK_TYPE, FormBase, IQuestion, Question, RELATIONSHIP_DATA } from '@hrcatalyst/shared-feature';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionState } from '@hrcatalyst/question-feature';
import * as questionEntity from '@hrcatalyst/question-feature';


@Component({
  selector: 'hrcatalyst-feedback-modal',
  templateUrl: './feedback.modal.html',
  styleUrls: ['./feedback.modal.css']
})
export class FeedbackModalComponent extends FormBase implements OnDestroy {
  form = new FormGroup({
    'relationship': new FormControl('', [Validators.required]),
    'status': new FormControl('', [Validators.required, Validators.minLength(2)]),
    'type': new FormControl('', [Validators.required, Validators.minLength(2)]),
    'question': new FormControl('', [Validators.required, Validators.minLength(2)]),
    'answer': new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  statuses = FEEDBACK_STATUS;
  types = FEEDBACK_TYPE;
  relationships = RELATIONSHIP_DATA;

  questionState$: Observable<IQuestion[]>;
  questionSubscription$: Subscription;
  questions?: Question[];

  constructor(public dialogRef: MatDialogRef<FeedbackModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Feedback, private questionStore: Store<QuestionState>) {
      super();

      this.questionState$ = this.questionStore.select(questionEntity.selectAll);
      this.questionSubscription$ = this.questionState$.subscribe((state) => {
        if (state.length > 0) {
          this.questions = state;
        }
      });

      if (data !== null) {
        this.form.get('relationship')?.setValue(data.relationship);
        this.form.get('status')?.setValue(data.status);
        this.form.get('type')?.setValue(data.type);
        this.form.get('question')?.setValue(data.question);
        this.form.get('answer')?.setValue(data.answer);
      }
  }

  ngOnDestroy() {
    if (this.questionSubscription$ != null) {
      this.questionSubscription$.unsubscribe();
    }
  }

  onSubmit() {
    this.onSave();
  }

  onSave() {
    const fb = new Feedback();

    fb.id = this.data.id;
    fb.campaignId = this.data.campaignId;
    fb.campaignName = this.data.campaignName;
    fb.raterId = this.data.raterId;
    fb.raterEmail = this.data.raterEmail;
    fb.raterFirst = this.data.raterFirst;
    fb.raterLast = this.data.raterLast;
    fb.participantId = this.data.participantId;
    fb.participantEmail = this.data.participantEmail;
    fb.participantFirst = this.data.participantFirst;
    fb.participantLast = this.data.participantLast;
    fb.relationship =   this.form.get('relationship')?.value;
    fb.dateCreated = new Date().toLocaleString();
    fb.status = this.form.get('status')?.value;
    fb.type = this.form.get('type')?.value;
    fb.question = this.form.get('question')?.value;
    fb.answer = this.form.get('answer')?.value;

    this.dialogRef.close(fb);
  }

}
