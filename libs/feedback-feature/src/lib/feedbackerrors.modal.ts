import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { enumFeedbackType, Feedback, FEEDBACK_STATUS, FEEDBACK_TYPE, FormBase, Question, RELATIONSHIP_DATA } from '@hrc/shared-feature';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionState } from '@hrc/question-feature';

@Component({
  selector: 'hrc-feedbackerrors.modal',
  templateUrl: './feedbackerrors.modal.html',
  styleUrls: ['./feedbackerrors.modal.css']
})
export class FeedbackErrorsModalComponent extends FormBase {
  form = new FormGroup({
    'participant_email': new FormControl('', [Validators.required]),
    'rater_email': new FormControl('', [Validators.required]),
    'relationship': new FormControl('', [Validators.required]),
    'status': new FormControl('', [Validators.required, Validators.minLength(2)]),
    'type': new FormControl('', [Validators.required, Validators.minLength(2)]),
    'question': new FormControl('', [Validators.required, Validators.minLength(2)]),
    'answer': new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  statuses = FEEDBACK_STATUS;
  types = FEEDBACK_TYPE;
  relationships = RELATIONSHIP_DATA;

  // questionState$: Observable<IQuestion[]>;
  // questionSubscription$: Subscription;
  questions?: Question[];

  constructor(public dialogRef: MatDialogRef<FeedbackErrorsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Feedback, private questionStore: Store<QuestionState>) {
      super();

      // this.questionState$ = this.questionStore.select(selectQuestionState);

      // this.questionSubscription$ = this.questionState$.subscribe((state) => {
      //   if (state.length > 0) {
      //     this.questions = state;
      //   }
      // });

      if (data !== null) {
        data.type = data.type !== undefined ? data.type : this.types[enumFeedbackType.WRITTEN].name;

        this.form.get('participant_email')?.setValue(data.participantEmail);
        this.form.get('rater_email')?.setValue(data.raterEmail);
        this.form.get('relationship')?.setValue(data.relationship);
        this.form.get('status')?.setValue(data.status);
        this.form.get('type')?.setValue(data.type);
        this.form.get('question')?.setValue(data.question);
        this.form.get('answer')?.setValue(data.answer);
      }
  }

  // ngOnDestroy() {
  //   if (this.questionSubscription$ != null) {
  //     this.questionSubscription$.unsubscribe();
  //   }
  // }

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
