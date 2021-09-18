import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { ParticipantModalComponent } from './participant.modal';

import { ParticipantImportComponent } from './participant.import';
import { Associate, Campaign, CampaignParticipantsParams, Client, Company, ConfirmationComponent, IAssociate, IParticipant, Participant, SelectParticipantParams,
  participantEntity } from '@hrc/shared-feature';
import { MatDialog } from '@angular/material/dialog';
import { createParticipant, deleteParticipant, loadCampaignParticipants, selectParticipant, updateParticipant } from './+state/participant.actions';

@Component({
  selector: 'hrc-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnDestroy {
  participantsDefs = [
    { headerName: 'First Name', field: 'firstName', sortable: true },
    { headerName: 'Last Name', field: 'lastName', sortable: true },
    { headerName: 'Title', field: 'title', sortable: true },
    { headerName: 'Email Address', field: 'emailAddress', sortable: true },
    { headerName: 'Notes', field: 'notes', sortable: true }
  ];

  selectedCompany?: Company;
  selectedClient?: Client;
  selectedCampaign?: Campaign;
  selectedParticipant?: Participant;
  selectedAssociate?: Associate;
  hasParticipant = false;

  private gridApi?: any;

  participantState$: Observable<IParticipant[]>;
  participantSubscription$: Subscription;
  participants?: Participant[];
  associateState$?: Observable<IAssociate[]>;
  associateSubscription$: Subscription;
  associates?: Array<any>;

  constructor(private dialog: MatDialog, private store: Store<participantEntity.ParticipantState>, private router: Router) {
      const xtra = this.router.getCurrentNavigation()?.extras.state;

      if (xtra != null) {
        this.selectedCompany = xtra.company;
        this.selectedClient = xtra.client;
        this.selectedCampaign = xtra.campaign;

        this.store.dispatch(loadCampaignParticipants({payload: new
            CampaignParticipantsParams(this.selectedCompany?.id ?? '', this.selectedCampaign?.id ?? '')}));
      }

      this.participantState$ = this.store.select(participantEntity.selectAll);
      this.participantSubscription$ = this.participantState$.subscribe((state) => {
          this.participants = state;
      });

      this.associateSubscription$ = this.store.pipe(select((state: any) => state)).subscribe((state) => {
        if (state.participant.associates != null) {
            this.associates = state.participant.associates;
        }
      });
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
      this.selectedCompany = undefined;
      this.selectedClient = undefined;
      this.selectedCampaign = undefined;
      this.selectedParticipant = undefined;
      this.selectedAssociate = undefined;
    }

    openParticipantModal(participant: Participant) {
      const dialogRef = this.dialog.open(ParticipantModalComponent, {
        width: '450px',
        data: participant
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The participant dialog was closed');
        if (result instanceof Participant) {
          if (result.id !== undefined) {
            this.store.dispatch(updateParticipant({payload: result}));
          } else {
            this.store.dispatch(createParticipant({payload: result}));
          }
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
          this.store.dispatch(deleteParticipant({payload: selectedRows[0]}));
        }
      });
    }

    onGridReady(params: any) {
      this.gridApi = params.api;
      this.gridApi.sizeColumnsToFit();
    }

    addParticipant() {
      const client = new Participant();
      client.campaignId = this.selectedCampaign?.id ?? '';

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

    onSelectionChanged($event) {
      const selectedRows = this.gridApi.getSelectedRows();

      this.hasParticipant = selectedRows.length > 0;
    }

    onRowDoubleClicked(row: any) {
      this.selectedAssociate = row.data;
      this.selectedParticipant = this.participants?.find(x => x.associateId === this.selectedAssociate?.id);

      if (this.selectedCampaign !== undefined &&
        this.selectedParticipant !== undefined &&
        this.selectedAssociate !== undefined) {
        const params = selectParticipant({payload: new SelectParticipantParams(
          this.selectedCampaign, this.selectedParticipant, this.selectedAssociate)});

        this.store.dispatch(params);
      }


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
        data: this.selectedCompany?.id
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`The participant import dialog was closed ${result}`);
      });
    }
}
