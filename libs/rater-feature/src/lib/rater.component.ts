import { Component, OnInit, OnDestroy } from '@angular/core';
import { Participant } from 'src/app/participant/participant.interface';
import { Associate } from 'src/app/associate/associate.interface';
import { RaterModalComponent } from './rater.modal';
import { CreateRaterAction, LoadParticipantRatersAction, DeleteRaterAction, UpdateRaterAction,
  SelectRaterAction, SelectRaterParams, DedupRatersFailureAction, DedupRatersAction } from 'src/app/rater/rater.action';
import * as raterEntity from 'src/app/rater/rater.entity';
import * as feedbackEntity from 'src/app/feedback/feedback.entity';
import { Rater } from 'src/app/rater/rater.interface';
import { MatDialog } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { Campaign } from 'src/app/campaign/campaign.interface';
import { SelectParticipantParams } from 'src/app/participant/participant.action';
import { Company } from 'src/app/company/company.interface';
import { Client } from 'src/app/client/client.interface';
import { RaterImportComponent } from './rater.import';
import { LoadParticipantFeedbackAction } from 'src/app/feedback/feedback.action';
import { ConfirmationComponent } from 'src/app/shared/confirmation/confirmation.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hrcatalyst-rater',
  templateUrl: './rater.component.html',
  styleUrls: ['./rater.component.css']
})
export class RaterComponent implements OnDestroy, OnInit {
  ratersDefs = [
    { headerName: 'First Name', field: 'firstName', sortable: true },
    { headerName: 'Last Name', field: 'lastName', sortable: true },
    { headerName: 'Title', field: 'title', sortable: true },
    { headerName: 'Email Address', field: 'emailAddress', sortable: true },
    { headerName: 'Notes', field: 'notes', sortable: true }
  ];

  selectedCompany: Company;
  selectedClient: Client;
  selectedCampaign: Campaign;
  selectedAssociate: Associate;
  selectedParticipant: Participant;
  selectedRater: Associate;
  hasRater = false;

  private gridApi;

  raterSubscription$: Subscription;
  raters: Array<Associate> = new Array<Associate>();

  constructor(private dialog: MatDialog, private router: Router, private raterStore: Store<raterEntity.RaterState>,
    private feedbackStore: Store<feedbackEntity.FeedbackState>) {
      const xtra = this.router.getCurrentNavigation().extras.state;

      if (xtra != null) {
        this.selectedCompany = xtra.company;
        this.selectedClient = xtra.client;
        this.selectedCampaign = xtra.campaign;
        this.selectedParticipant = xtra.participant;
        this.selectedAssociate = xtra.associate;

        this.raterStore.dispatch(new LoadParticipantRatersAction(new SelectParticipantParams(
            this.selectedCampaign, this.selectedParticipant, this.selectedAssociate)));

        this.feedbackStore.dispatch(new LoadParticipantFeedbackAction(new SelectParticipantParams(
            this.selectedCampaign, this.selectedParticipant, this.selectedAssociate)));
      }

      this.raterSubscription$ = this.raterStore.pipe(select((state: any) => state)).subscribe((state) => {
        if (state.rater.associates != null) {
          this.raters = state.rater.associates;
        }
      });
    }

    ngOnInit() {

    }

    ngOnDestroy() {
      if (this.raterSubscription$ != null) {
        this.raterSubscription$.unsubscribe();
      }
    }

    onReset() {
      this.selectedCompany = null;
      this.selectedClient = null;
      this.selectedCampaign = null;
      this.selectedAssociate = null;
      this.selectedParticipant = null;
      this.selectedRater = null;
    }

    IsSelectedParticipant() {
      return (this.selectedParticipant != null);
    }

    openRaterModal(participant) {
      const dialogRef = this.dialog.open(RaterModalComponent, {
        width: '450px',
        data: participant
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The rater dialog was closed');

        if (result instanceof Rater) {
          if (result.id !== undefined) {
            this.raterStore.dispatch(new UpdateRaterAction(result));
          } else {
            this.raterStore.dispatch(new CreateRaterAction(result));
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
          this.raterStore.dispatch(new DeleteRaterAction(selectedRows[0]));
        }
      });
    }

    onGridReady(params) {
      this.gridApi = params.api;
      this.gridApi.sizeColumnsToFit();
    }

    addRater() {
      const rater = new Rater();
      rater.participantId = this.selectedParticipant.associateId;

      this.openRaterModal(rater);
    }

    editRater() {
      const selectedRows = this.gridApi.getSelectedRows();

      if (selectedRows.length > 0) {
        this.openRaterModal(selectedRows[0]);
      }
    }

    deleteRater() {
      const selectedRows = this.gridApi.getSelectedRows();

      if (selectedRows.length > 0) {
          const message = 'Are your sure you want to delete Rater ';
          this.openConfirmationModal('Delete Rater', message);
      }
    }

    dedupRaters() {
      this.raterStore.dispatch(new DedupRatersAction());
    }

    onSelectionChanged() {
      const selectedRows = this.gridApi.getSelectedRows();

      this.hasRater = selectedRows.length > 0;
    }

    onRowDoubleClicked(row) {
      this.selectedRater = row.data;

     this.raterStore.dispatch(new SelectRaterAction(new SelectRaterParams(
       this.selectedCampaign, this.selectedAssociate, this.selectedRater)));

      this.router.navigate(['/feedback'], { state: {
          company: this.selectedCompany,
          client: this.selectedClient,
          campaign: this.selectedCampaign,
          participant: this.selectedParticipant,
          associate: this.selectedAssociate,
          rater: this.selectedRater
        }
      });
    }

    onBackClicked() {
      this.router.navigate(['/participant'], { state: {
        company: this.selectedCompany, client: this.selectedClient, campaign: this.selectedCampaign } });
    }

    onUpload() {
      const dialogRef = this.dialog.open(RaterImportComponent, {
        width: '450px',
        data: this.selectedCompany.id
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The rater import dialog was closed');
      });
    }
}
