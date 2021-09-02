import { Component, OnInit } from '@angular/core';
import { Feedback, IFeedback } from 'src/app/feedback/feedback.interface';
import * as feedbackEntity from 'src/app/feedback/feedback.entity';
import { Store, select } from '@ngrx/store';
import { LoadFeedbackAction, UpdateFeedbackAction, DeleteFeedbackAction, CreateFeedbackAction } from 'src/app/feedback/feedback.action';
import { Observable } from 'rxjs';
import { Associate } from 'src/app/associate/associate.interface';
import * as importEntity from 'src/app/import/import.entity';
import { Campaign } from 'src/app/campaign/campaign.interface';
import { RELATIONSHIP_DATA, enumRationship } from 'src/app/rater/relationship.data';
import { IImport } from 'src/app/import/import.interface';
import { Participant } from 'src/app/participant/participant.interface';
import { Rater } from 'src/app/rater/rater.interface';
import { LoadImportAction } from 'src/app/import/import.action';
import { MatDialog } from '@angular/material';
import { ConfirmationComponent } from 'src/app/shared/confirmation/confirmation.component';
import { FeedbackErrorsModalComponent } from './feedbackerrors.modal';

@Component({
  selector: 'hrcatalyst-feedbackerrors',
  templateUrl: './feedbackerrors.component.html',
  styleUrls: ['./feedbackerrors.component.css']
})
export class FeedbackErrorsComponent implements OnInit {

  feedbacksDefs = [
    { headerName: 'Participant', field: 'participantEmail', sortable: true },
    { headerName: 'Rater', field: 'raterEmail', sortable: true },
    { headerName: 'Relationship', field: 'relationship', sortable: true },
    { headerName: 'Status', field: 'status', sortable: true },
    { headerName: 'Question', field: 'question', sortable: true },
    { headerName: 'Answer', field: 'answer', sortable: true }
  ];

  private gridApi;

  feedbackState$: Observable<IFeedback[]>;
  feedbacks: Feedback[] = null;
  errors: Feedback[] = null;
  hasErrors = false;

  importState$: Observable<IImport[]>;
  associates: Associate[];
  participants: Participant[];
  campaigns: Campaign[];
  raters: Rater[];

  constructor(private dialog: MatDialog, private feedbackStore: Store<feedbackEntity.FeedbackState>,
    private importStore: Store<importEntity.ImportState>) {
    this.feedbackState$ = this.feedbackStore.select(feedbackEntity.selectAll);

    this.feedbackState$.subscribe((state) => {
        this.feedbacks = state;
        this.errors = state.filter(f => f.campaignId == null || f.participantId == null || f.raterId == null);
    });

    this.importState$ = this.importStore.select(importEntity.selectAll);

    this.importStore.pipe(select((state: any) => state)).subscribe((state) => {
      if (state.import.associates != null) {
          this.associates = state.import.associates;
      }

      if (state.import.participants != null) {
          this.participants = state.import.participants;
      }

      if (state.import.campaigns != null) {
          this.campaigns = state.import.campaigns;
      }

      if (state.import.raters != null) {
          this.raters = state.import.raters;
      }
    });
  }

  ngOnInit() {
    this.feedbackStore.dispatch(new LoadFeedbackAction());
    this.importStore.dispatch(new LoadImportAction());
  }

  openFeedbackModal(feedback) {
    const dialogRef = this.dialog.open(FeedbackErrorsModalComponent, {
      width: '450px',
      data: feedback
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The feedback dialog was closed');
      if (result instanceof Feedback) {
        if (result.id !== undefined) {
          this.feedbackStore.dispatch(new UpdateFeedbackAction(result));
        } else {
          this.feedbackStore.dispatch(new CreateFeedbackAction(result));
        }
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
        this.feedbackStore.dispatch(new DeleteFeedbackAction(selectedRows[0]));
      }
    });
  }

  fixFeedback() {
    console.log(this.errors.length + ' feedback errors found!');
    this.errors.map(f => {
      const rater = this.associates.filter(r => r.emailAddress.toLowerCase() === f.raterEmail.toLowerCase());
      const participant = this.associates.filter(p => p.emailAddress.toLowerCase() === f.participantEmail.toLowerCase());

      if (rater.length > 0) {
        f.raterId = rater[0].id;
        f.raterFirst = rater[0].firstName;
        f.raterLast = rater[0].lastName;
      } else {
        console.log('Unable to find rater ' + f.raterEmail.toLowerCase());
      }

      if (participant.length > 0 && rater.length > 0) {
        const relate = this.raters.filter(x => x.associateId === rater[0].id && x.participantId === participant[0].id);
        if (relate.length > 0) {
          const item = RELATIONSHIP_DATA.filter(y => y.id === relate[0].relationship);
          f.relationship = item.length > 0 ? item[0].name : RELATIONSHIP_DATA[enumRationship.UNKNOWN].name;
        }
      }

      if (participant.length > 0) {
        f.participantId = participant[0].id;
        f.participantFirst = participant[0].firstName;
        f.participantLast = participant[0].lastName;

        const associate = this.participants.filter(a => a.associateId === f.participantId);
        if (associate.length > 0) {
            f.campaignId = associate[0].campaignId;

            const campaign = this.campaigns.filter(c => c.id === f.campaignId);
            if (campaign.length > 0) {
              f.campaignName = campaign[0].name;
            } else {
              console.log('Unable to find campaign ' + f.campaignId);
            }
        } else {
          console.log('Unable to find participant ' + f.participantId + ' and email ' + f.participantEmail);
        }
      } else {
        console.log('Unable to find participant ' + f.participantEmail.toLowerCase());
      }

      console.log(f);
      this.feedbackStore.dispatch(new UpdateFeedbackAction(f));
    });

  }

  editFeedback() {
    const selectedRows = this.gridApi.getSelectedRows();

    if (selectedRows.length > 0) {
      this.openFeedbackModal(selectedRows[0]);
    }
  }

  deleteFeedback() {
    const selectedRows = this.gridApi.getSelectedRows();

    if (selectedRows.length > 0) {
        const message = 'Are your sure you want to delete Feedback ' + selectedRows[0].name;

        this.openConfirmationModal('Delete Feedback', message);
    }
  }

  onReset() {
    this.feedbacks = null;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();

    this.hasErrors = selectedRows.length > 0;
  }

  onRowDoubleClicked(row) {

  }
}
