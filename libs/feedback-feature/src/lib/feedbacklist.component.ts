import { Component, OnInit, OnDestroy } from '@angular/core';
import { Company } from 'src/app/company/company.interface';
import { Client } from 'src/app/client/client.interface';
import { Campaign } from 'src/app/campaign/campaign.interface';
import { Associate } from 'src/app/associate/associate.interface';
import { Store, select } from '@ngrx/store';
import { Feedback } from 'src/app/feedback/feedback.interface';
import * as feedbackEntity from 'src/app/feedback/feedback.entity';
import * as companyEntity from 'src/app/company/company.entity';
import * as clientEntity from 'src/app/client/client.entity';
import * as participantEntity from 'src/app/participant/participant.entity';
import { Participant } from 'src/app/participant/participant.interface';
import { ExportService } from '../export/export.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hrcatalyst-feedbacklist',
  templateUrl: './feedbacklist.component.html',
  styleUrls: ['./feedbacklist.component.css']
})
export class FeedbackListComponent implements OnDestroy, OnInit {
  feedbacksDefs = [
    { headerName: 'Campaign', field: 'campaignName', sortable: true },
    { headerName: 'Participant', field: 'participantEmail', sortable: true },
    { headerName: 'Rater', field: 'raterEmail', sortable: true },
    { headerName: 'Question', field: 'question', sortable: true },
    { headerName: 'Answer', field: 'answer', sortable: true },
    { headerName: 'Relationship', field: 'relationship', sortable: true },
    { headerName: 'Status', field: 'status', sortable: true }
  ];

  selectedCompany: Company;
  selectedClient: Client;
  selectedCampaign: Campaign;
  selectedAssociate: Associate;
  selectedParticipant: Participant;

  participantSubscription$: Subscription;
  feedbackSubscription$: Subscription;
  companySubscription$: Subscription;
  clientSubscription$: Subscription;

  private gridApi;

  feedbacks: Feedback[] = null;

  constructor(private feedbackStore: Store<feedbackEntity.FeedbackState>,
     private clientStore: Store<clientEntity.ClientState>, private companyStore: Store<companyEntity.CompanyState>,
     private participantStore: Store<participantEntity.ParticipantState>, private exportService: ExportService) {

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

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.participantSubscription$ != null) { this.participantSubscription$.unsubscribe(); }
    if (this.feedbackSubscription$ != null) { this.feedbackSubscription$.unsubscribe(); }
    if (this.companySubscription$ != null) { this.companySubscription$.unsubscribe(); }
    if (this.clientSubscription$ != null) { this.clientSubscription$.unsubscribe(); }
  }

  onReset() {
    this.selectedCompany = null;
    this.selectedClient = null;
    this.selectedCampaign = null;
    this.selectedParticipant = null;
    this.selectedAssociate = null;
    this.feedbacks = null;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  onDownload() {
    const filename = this.uniqueName();

    this.feedbacks.forEach(f => {
      if (f.dateReceived != null) {
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
    return this.selectedAssociate.lastName + '-' + this.selectedAssociate.firstName + '-' + this.uniqueID();
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();

    if (selectedRows.length > 0) {
    }
  }

  onRowDoubleClicked(row) {

  }

  onBackClicked() {

  }
}

