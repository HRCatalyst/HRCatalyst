import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { IQuestion, Question } from 'src/app/question/question.interface';
import * as questionEntity from 'src/app/question/question.entity';
import { LoadAllQuestionsAction, CreateQuestionAction, DeleteQuestionAction } from 'src/app/question/question.action';
import { QuestionModalComponent } from './question.modal';
import { ConfirmationComponent } from 'src/app/shared/confirmation/confirmation.component';

@Component({
  selector: 'hrcatalyst-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnDestroy, OnInit {
  questionsDefs = [
    { headerName: 'Reference', field: 'reference', sortable: true },
    { headerName: 'Content', field: 'content', sortable: true },
  ];

  private gridApi;

  questionState$: Observable<IQuestion[]>;
  questionSubscription$: Subscription;
  questions: Question[];
  welcomeUser = '';
  hasQuestion = false;

  constructor(private dialog: MatDialog, private store: Store<questionEntity.QuestionState>, private router: Router) {
    this.questionState$ = this.store.select(questionEntity.selectAll);
    this.questionSubscription$ = this.questionState$.subscribe((state) => {
      if (state.length > 0) {
        this.questions = state;
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(new LoadAllQuestionsAction());
  }

  ngOnDestroy() {
    if (this.questionSubscription$ != null) {
      this.questionSubscription$.unsubscribe();
    }
  }

  openQuestionModal(question) {
    const dialogRef = this.dialog.open(QuestionModalComponent, {
      width: '450px',
      data: question
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The question dialog was closed');
      if (result instanceof Question) {
        this.store.dispatch(new CreateQuestionAction(result));
      }
    });
  }

  openConfirmationModal(title, message) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '450px',
      data: { title: title, message: message }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The confirmation dialog was closed');
      if (result === true) {
        const selectedRows = this.gridApi.getSelectedRows();
        this.store.dispatch(new DeleteQuestionAction(selectedRows[0]));
      }
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  addQuestion() {
    const question = new Question();

    this.openQuestionModal(question);
  }

  editQuestion() {
    const selectedRows = this.gridApi.getSelectedRows();

    if (selectedRows.length > 0) {
      this.openQuestionModal(selectedRows[0]);
    }
  }

  deleteQuestion() {
    const selectedRows = this.gridApi.getSelectedRows();

    if (selectedRows.length > 0) {
        const message = 'Are your sure you want to delete Question?';

        this.openConfirmationModal('Delete Question', message);
    }
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();

    this.hasQuestion = selectedRows.length > 0;
  }

  onRowDoubleClicked(row) {
  }
}

