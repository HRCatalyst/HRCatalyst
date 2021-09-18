import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackModalComponent } from './feedback.modal';
import { Store, select } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Associate, Campaign, Client, Company, ConfirmationComponent, Feedback, feedbackEntity,
  Participant, SelectRaterParams } from '@hrc/shared-feature';
import { createFeedback, deleteFeedback, loadRaterFeedback, updateFeedback } from './+state/feedback.actions';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'hrc-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnDestroy {
  feedbacksDefs = [
    { headerName: 'Campaign', field: 'campaignName', sortable: true },
    { headerName: 'Participant', field: 'participantEmail', sortable: true },
    { headerName: 'Rater', field: 'raterEmail', sortable: true },
    { headerName: 'Question', field: 'question', sortable: true },
    { headerName: 'Answer', field: 'answer', sortable: true },
    { headerName: 'Status', field: 'status', sortable: true }
  ];

  selectedCompany?: Company;
  selectedClient?: Client;
  selectedCampaign?: Campaign;
  selectedParticipant?: Participant;
  selectedAssociate?: Associate;
  selectedRater?: Associate;
  hasFeedback = false;

  private gridApi: any;

  private onDestroy$: Subject<void> = new Subject<void>();
  // raterState$?: Observable<IRater[]>;
  // raterSubscription$: Subscription;
  feedbacks?: Feedback[] = undefined;

  constructor(private dialog: MatDialog, private store: Store<feedbackEntity.FeedbackState>,
     private router: Router) {
      const xtra = this.router.getCurrentNavigation()?.extras.state;

      if (xtra != null) {
        this.selectedCompany = xtra.company;
        this.selectedClient = xtra.client;
        this.selectedCampaign = xtra.campaign;
        this.selectedParticipant = xtra.participant;
        this.selectedAssociate = xtra.associate;
        this.selectedRater = xtra.rater;

        if (this.selectedCampaign && this.selectedAssociate && this.selectedRater) {
          this.store.dispatch(loadRaterFeedback({payload: new SelectRaterParams(
            this.selectedCampaign, this.selectedAssociate, this.selectedRater)}));
        }

      }

    //  this.store.pipe(select(selectFeedbackState))
    //   .pipe(takeUntil(this.onDestroy$))
    //   .subscribe((state) => {
    //     if (state.feedback != null) {
    //       this.feedbacks = state.rater.feedback;
    //     }
    //   });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  onReset() {
    this.selectedCompany = undefined;
    this.selectedClient = undefined;
    this.selectedCampaign = undefined;
    this.selectedParticipant = undefined;
    this.selectedRater = undefined;
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  openFeedbackModal(feedback: Feedback) {
    const dialogRef = this.dialog.open(FeedbackModalComponent, {
      width: '450px',
      data: feedback
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The feedback dialog was closed');
      if (result instanceof Feedback) {
        if (result.id !== undefined) {
          this.store.dispatch(updateFeedback({payload: result}));
        } else {
          this.store.dispatch(createFeedback({payload: result}));
        }
      }
    });
  }

 openConfirmationModal(title: string, message: string) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '450px',
      data: { title: title, message: message }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The confirmation dialog was closed');
      if (result === true) {
        const selectedRows = this.gridApi.getSelectedRows();
        this.store.dispatch(deleteFeedback({payload: selectedRows[0]}));
      }
    });
  }

  addFeedback() {
    const fb = new Feedback();

    fb.campaignId = this.selectedCampaign?.id;
    fb.campaignName = this.selectedCampaign?.name;
    fb.participantId = this.selectedParticipant?.id;
    fb.participantEmail = this.selectedAssociate?.emailAddress ?? '';
    fb.participantFirst = this.selectedAssociate?.firstName;
    fb.participantLast = this.selectedAssociate?.lastName;
    fb.raterId = this.selectedRater?.id;
    fb.raterEmail = this.selectedRater?.emailAddress ?? '';
    fb.raterFirst = this.selectedRater?.firstName;
    fb.raterLast = this.selectedRater?.lastName;

    this.openFeedbackModal(fb);
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

  onSelectionChanged($event) {
    const selectedRows = this.gridApi.getSelectedRows();

    this.hasFeedback = selectedRows.length > 0;
  }

  onRowDoubleClicked(row: any) {
    if (row) {
      console.log(row);
    }
  }

  onBackClicked() {
    this.router.navigate(['/rater'], { state: {
      company: this.selectedCompany,
      client: this.selectedClient,
      campaign: this.selectedCampaign,
      participant: this.selectedParticipant,
      rater: this.selectedRater,
      associate: this.selectedAssociate
    }
  });
  }
}
