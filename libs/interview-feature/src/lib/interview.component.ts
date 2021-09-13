import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { FormBase, Interview, InterviewEdit, IQuestion, Question } from '@hrc/shared-feature';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { loadAllQuestions, QuestionState } from '@hrc/question-feature';
import * as questionEntity from '@hrc/question-feature';

@Component({
  selector: 'hrc-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent extends FormBase implements OnDestroy, OnInit {
  form = new FormGroup({

  });

  private onDestroy$: Subject<void> = new Subject<void>();
  questionState$?: Observable<IQuestion[]>;
  questions?: Question[];
  ecInterview = false;

  constructor(public dialogRef: MatDialogRef<InterviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InterviewEdit, private questionStore: Store<QuestionState>) {
      super();

      this.questionStore.select(questionEntity.selectAll)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state) => {
        if (state.length > 0) {
          this.questions = state.filter(q => q.required === true &&
            ((q.reference.toLowerCase().includes('ec') && this.ecInterview) || !q.reference.toLowerCase().includes('ec')))
              .sort((a, b) => a.sequence - b.sequence);

            this.questions?.forEach(q => {
              this.form.setControl(q.reference, new FormControl());

              const answer = this.data.interviews.filter(i => i.question === q.reference);
              if (answer.length > 0) {
                this.form.get(q.reference)?.setValue(answer[0].answer);
              }
          });
        }
      });
  }

  ngOnInit() {
    if (this.data != null && this.data.campaignName != null) {
      this.ecInterview = this.data.campaignName.toLowerCase().startsWith('ec');
    }
    this.questionStore.dispatch(loadAllQuestions());
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  onDecline() {
    this.onSave('Declined');
  }

  onDraft() {
    this.onSave('Draft');
  }

  onSubmit() {
    this.onSave('Submitted');
  }

  onSave(status: string) {
    const interviews = new Array<Interview>();

    this.questions?.forEach(q => {
      const iv = new Interview();

      iv.interviewer = this.data.interviewer;
      iv.campaignId = this.data.campaignId;
      iv.campaignName = this.data.campaignName;
      iv.raterId = this.data.raterId;
      iv.raterEmail = this.data.raterEmail;
      iv.raterFirst = this.data.raterFirst;
      iv.raterLast = this.data.raterLast;
      iv.participantId = this.data.participantId;
      iv.participantEmail = this.data.participantEmail;
      iv.participantFirst = this.data.participantFirst;
      iv.participantLast = this.data.participantLast;
      iv.relationship =   this.data.relationship;
      iv.dateCreated = new Date().toLocaleString();
      iv.dateReceived = iv.dateCreated;
      iv.status = status;

      iv.question = q.reference;
      iv.answer = this.form.get(q.reference)?.value;

      const interview = this.data.interviews.filter(i => i.question === q.reference);
      iv.id = interview.length > 0 ? interview[0].id : undefined;

      interviews.push(iv);
    });

    this.dialogRef.close(interviews);
  }
}
