import { Component, OnDestroy } from '@angular/core';
import { ClientState } from '@hrcatalyst/client-feature';
import { CompanyState } from '@hrcatalyst/company-feature';
import { ParticipantState } from '@hrcatalyst/participant-feature';
import { Associate, Campaign, Client, Company, Feedback, Participant } from '@hrcatalyst/shared-feature';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FeedbackState } from './+state/feedback.entity';

@Component({
  selector: 'hrcatalyst-feedbacklist',
  templateUrl: './feedbacklist.component.html',
  styleUrls: ['./feedbacklist.component.css']
})
export class FeedbackListComponent implements OnDestroy {
  feedbacksDefs = [
    { headerName: 'Campaign', field: 'campaignName', sortable: true },
    { headerName: 'Participant', field: 'participantEmail', sortable: true },
    { headerName: 'Rater', field: 'raterEmail', sortable: true },
    { headerName: 'Question', field: 'question', sortable: true },
    { headerName: 'Answer', field: 'answer', sortable: true },
    { headerName: 'Relationship', field: 'relationship', sortable: true },
    { headerName: 'Status', field: 'status', sortable: true }
  ];

  selectedCompany?: Company;
  selectedClient?: Client;
  selectedCampaign?: Campaign;
  selectedAssociate?: Associate;
  selectedParticipant?: Participant;

  participantSubscription$: Subscription;
  feedbackSubscription$: Subscription;
  companySubscription$: Subscription;
  clientSubscription$: Subscription;

  private gridApi: any;

  feedbacks?: Feedback[] = undefined;

  constructor(private feedbackStore: Store<FeedbackState>, private clientStore: Store<ClientState>,
    private companyStore: Store<CompanyState>, private participantStore: Store<ParticipantState>,
    private exportService: ExportService) {

      this.participantSubscription$ = this.participantStore.pipe(select((state: any) => state)).subscribe((state) => {
        if (state.participant.selectedParticipant != null && this.selectedParticipant !== state.participant.selectedParticipant) {
          this.selectedCampaign = state.participant.selectedCampaign;
          this.selectedAssociate = state.participant.selectedAssociate;
          this.selectedParticipant = state.participant.selectedParticipant;
        }
      });

      this.feedbackSubscription$ = this.feedbackStore.pipe(select((state: any) => state)).subscribe((state) => {
        if (state.feedback.feedback != null && this.feedbacks !== state.feedback.feedback) {
          this.feedbacks = state.feedback.feedback;
        }
      });

      this.companySubscription$ = this.companyStore.pipe(select((state: any) => state)).subscribe((state) => {
        if (state.company.selectedCompany != null && this.selectedCompany !== state.company.selectedCompany) {
          this.selectedCompany = state.company.selectedCompany;
        }
      });

      this.clientSubscription$ = this.clientStore.pipe(select((state: any) => state)).subscribe((state) => {
        if (state.client.selectedClient != null && this.selectedClient !== state.client.selectedClient) {
          this.selectedClient = state.client.selectedClient;
        }
      });
  }

  ngOnDestroy() {
    if (this.participantSubscription$ != null) { this.participantSubscription$.unsubscribe(); }
    if (this.feedbackSubscription$ != null) { this.feedbackSubscription$.unsubscribe(); }
    if (this.companySubscription$ != null) { this.companySubscription$.unsubscribe(); }
    if (this.clientSubscription$ != null) { this.clientSubscription$.unsubscribe(); }
  }

  onReset() {
    this.selectedCompany = undefined;
    this.selectedClient = undefined;
    this.selectedCampaign = undefined;
    this.selectedParticipant = undefined;
    this.selectedAssociate = undefined;
    this.feedbacks = undefined;
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  onDownload() {
    const filename = this.uniqueName();

    this.feedbacks?.forEach(f => {
      if (f.dateReceived !== undefined) {
        const date = f.dateReceived['seconds'];
        const ms = date * 1000;
        f.dateReceived = new Date(ms).toLocaleString();
      }

    });

    this.exportService.exportExcel(this.feedbacks, filename);
  }

  chr4() {
    return Math.random().toString(16).slice(-4);
  }

  uniqueID() {
    return this.chr4() + this.chr4() + this.chr4();
  }

  uniqueName() {
    return this.selectedAssociate?.lastName + '-' + this.selectedAssociate?.firstName + '-' + this.uniqueID();
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();

    if (selectedRows.length > 0) {
      console.log(selectedRows);
    }
  }

  onRowDoubleClicked(row: any) {
    if (row) {
      console.log(row);
    }
  }

  onBackClicked() {
    console.log('onBackClicked');
  }
}

