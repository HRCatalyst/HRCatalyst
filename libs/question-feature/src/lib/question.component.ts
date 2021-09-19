import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { QuestionModalComponent } from './question.modal';
import { ConfirmationComponent, Question, questionEntity, selectQuestionState } from '@hrc/shared-feature';
import { MatDialog } from '@angular/material/dialog';
import { createQuestion, deleteQuestion, loadAllQuestions } from './+state/question.actions';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'hrc-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject<void>();
  questionsDefs = [
    { headerName: 'Reference', field: 'reference', sortable: true },
    { headerName: 'Content', field: 'content', sortable: true },
  ];

  private gridApi: any;

  questions?: Question[];
  welcomeUser = '';
  hasQuestion = false;

  constructor(private dialog: MatDialog, private store: Store<questionEntity.QuestionState>, private router: Router) {
    this.store.pipe(select(questionEntity.selectAll))
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state) => {
      if (state) {
        this.questions = state;
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(loadAllQuestions());
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  openQuestionModal(question: Question) {
    const dialogRef = this.dialog.open(QuestionModalComponent, {
      width: '450px',
      data: question
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The question dialog was closed');
      if (result instanceof Question) {
        this.store.dispatch(createQuestion({payload: result}));
      }
    });
  }

  openConfirmationModal(title: string, message: string) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '450px',
      data: { title: title, message: message }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The confirmation dialog was closed');
      if (result === true) {
        const selectedRows = this.gridApi.getSelectedRows();
        this.store.dispatch(deleteQuestion({payload: selectedRows[0]}));
      }
    });
  }

  onGridReady(params:any) {
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

  onSelectionChanged($event) {
    const selectedRows = this.gridApi.getSelectedRows();

    this.hasQuestion = selectedRows.length > 0;
  }

  onRowDoubleClicked(row: any) {
    if (row) {
      console.log(row);
    }
  }
}

