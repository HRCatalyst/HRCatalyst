import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBase, IQuestion, Question } from '@hrcatalyst/shared-feature';


@Component({
  selector: 'hrcatalyst-question.modal',
  templateUrl: './question.modal.html',
  styleUrls: ['./question.modal.css']
})
export class QuestionModalComponent extends FormBase {
  form = new FormGroup({
    'reference': new FormControl('', [Validators.required, Validators.minLength(2)]),
    'content': new FormControl('', [Validators.required, Validators.minLength(2)])
  });
  constructor(public dialogRef: MatDialogRef<QuestionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IQuestion) {
    super();

  }

  onSave() {
    const qst = new Question();

    qst.reference = this.form.get('reference')?.value;
    qst.content = this.form.get('content')?.value;

    this.dialogRef.close(qst);
  }

  onSubmit() {
    this.onSave();
  }
}
