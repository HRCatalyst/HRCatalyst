import { Component, OnInit, OnDestroy } from '@angular/core';
import { Campaign } from 'src/app/campaign/campaign.interface';
import * as participantEntity from 'src/app/participant/participant.entity';
import { Participant, IParticipant, CampaignParticipantsParams } from 'src/app/participant/participant.interface';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { ParticipantModalComponent } from './participant.modal';
import { SelectParticipantAction, CreateParticipantAction, LoadCampaignParticipantsAction, SelectParticipantParams,
  UpdateParticipantAction, DeleteParticipantAction} from 'src/app/participant/participant.action';
import { Associate, IAssociate } from 'src/app/associate/associate.interface';
import { Company } from 'src/app/company/company.interface';
import { Client } from 'src/app/client/client.interface';
import { ParticipantImportComponent } from './participant.import';
import { ConfirmationComponent } from 'src/app/shared/confirmation/confirmation.component';

@Component({
  selector: 'hrcatalyst-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnDestroy, OnInit {
  participantsDefs = [
    { headerName: 'First Name', field: 'firstName', sortable: true },
    { headerName: 'Last Name', field: 'lastName', sortable: true },
    { headerName: 'Title', field: 'title', sortable: true },
    { headerName: 'Email Address', field: 'emailAddress', sortable: true },
    { headerName: 'Notes', field: 'notes', sortable: true }
  ];

  selectedCompany: Company;
  selectedClient: Client;
  selectedCampaign: Campaign;
  selectedParticipant: Participant;
  selectedAssociate: Associate;
  hasParticipant = false;

  private gridApi;

  participantState$: Observable<IParticipant[]>;
  participantSubscription$: Subscription;
  participants: Participant[];
  associateState$: Observable<IAssociate[]>;
  associateSubscription$: Subscription;
  associates: Array<any>;

  constructor(private dialog: MatDialog, private participantStore: Store<participantEntity.ParticipantState>, private router: Router) {
      const xtra = this.router.getCurrentNavigation().extras.state;

      if (xtra != null) {
        this.selectedCompany = xtra.company;
        this.selectedClient = xtra.client;
        this.selectedCampaign = xtra.campaign;

        this.participantStore.dispatch(new LoadCampaignParticipantsAction(new
            CampaignParticipantsParams(this.selectedCompany.id, this.selectedCampaign.id)));
      }

      this.participantState$ = this.participantStore.select(participantEntity.selectAll);
      this.participantSubscription$ = this.participantState$.subscribe((state) => {
          this.participants = state;
      });

      this.associateSubscription$ = this.participantStore.pipe(select((state: any) => state)).subscribe((state) => {
        if (state.participant.associates != null) {
            this.associates = state.participant.associates;
        }
      });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
      if (this.participantSubscription$ != null) {
        this.participantSubscription$.unsubscribe();
      }
      if (this.associateSubscription$ != null) {
        this.associateSubscription$.unsubscribe();
      }
    }

    onReset() {
      this.selectedCompany = null;
      this.selectedClient = null;
      this.selectedCampaign = null;
      this.selectedParticipant = null;
      this.selectedAssociate = null;
    }

    openParticipantModal(participant) {
      const dialogRef = this.dialog.open(ParticipantModalComponent, {
        width: '450px',
        data: participant
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The participant dialog was closed');
        if (result instanceof Participant) {
          if (result.id !== undefined) {
            this.participantStore.dispatch(new UpdateParticipantAction(result));
          } else {
            this.participantStore.dispatch(new CreateParticipantAction(result));
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
          this.participantStore.dispatch(new DeleteParticipantAction(selectedRows[0]));
        }
      });
    }

    onGridReady(params) {
      this.gridApi = params.api;
      this.gridApi.sizeColumnsToFit();
    }

    addParticipant() {
      const client = new Participant();
      client.campaignId = this.selectedCampaign.id;

      this.openParticipantModal(client);
    }

    editParticipant() {
      const selectedRows = this.gridApi.getSelectedRows();

      if (selectedRows.length > 0) {
        this.openParticipantModal(selectedRows[0]);
      }
    }

    deleteParticipant() {
      const selectedRows = this.gridApi.getSelectedRows();

      if (selectedRows.length > 0) {
          const message = 'Are your sure you want to delete Participant ';

          this.openConfirmationModal('Delete Participant', message);
      }
    }

    onSelectionChanged() {
      const selectedRows = this.gridApi.getSelectedRows();

      this.hasParticipant = selectedRows.length > 0;
    }

    onRowDoubleClicked(row) {
      this.selectedAssociate = row.data;
      this.selectedParticipant = this.participants.find(x => x.associateId === this.selectedAssociate.id);

      const params = new SelectParticipantAction(new SelectParticipantParams(
        this.selectedCampaign, this.selectedParticipant, this.selectedAssociate));

      this.participantStore.dispatch(params);

      this.router.navigate(['/rater'], { state: {
          company: this.selectedCompany,
          client: this.selectedClient,
          campaign: this.selectedCampaign,
          participant: this.selectedParticipant,
          associate: this.selectedAssociate
        }
      });
    }

    onBackClicked() {
      this.router.navigate(['/campaign'], { state: { company: this.selectedCompany, client: this.selectedClient} });
    }

    onUpload() {
      const dialogRef = this.dialog.open(ParticipantImportComponent, {
        width: '450px',
        data: this.selectedCompany.id
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The participant import dialog was closed');
      });
    }
}
