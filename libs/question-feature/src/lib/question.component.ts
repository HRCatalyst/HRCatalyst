import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { QuestionModalComponent } from './question.modal';
import { ConfirmationComponent, Question } from '@hrcatalyst/shared-feature';
import { QuestionState } from './+state/question.entity';
import { MatDialog } from '@angular/material/dialog';
import { createQuestion, deleteQuestion, loadAllQuestions } from './+state/question.actions';

@Component({
  selector: 'hrcatalyst-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questionsDefs = [
    { headerName: 'Reference', field: 'reference', sortable: true },
    { headerName: 'Content', field: 'content', sortable: true },
  ];

  private gridApi: any;

  // questionState$: Observable<IQuestion[]>;
  // questionSubscription$: Subscription;
  questions?: Question[];
  welcomeUser = '';
  hasQuestion = false;

  constructor(private dialog: MatDialog, private store: Store<QuestionState>, private router: Router) {
    // this.questionState$ = this.store.select(selectQuestionState);
    // this.questionSubscription$ = this.questionState$.subscribe((state) => {
    //   if (state.length > 0) {
    //     this.questions = state;
    //   }
    // });
  }

  ngOnInit() {
    this.store.dispatch(loadAllQuestions());
  }

  // ngOnDestroy() {
  //   if (this.questionSubscription$ != null) {
  //     this.questionSubscription$.unsubscribe();
  //   }
  // }

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

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();

    this.hasQuestion = selectedRows.length > 0;
  }

  onRowDoubleClicked(row:any) {
    if (row) {
      console.log(row);
    }
  }
}

