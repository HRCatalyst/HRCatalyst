import { Component, OnDestroy } from '@angular/core';
import { RaterModalComponent } from './rater.modal';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { RaterImportComponent } from './rater.import';
import { Subscription } from 'rxjs';
import { Associate, Campaign, Client, Company, ConfirmationComponent, Participant, Rater, SelectRaterParams } from '@hrcatalyst/shared-feature';
import { MatDialog } from '@angular/material/dialog';
import { RaterState } from './+state/rater.entity';
import { createRater, deleteRater, selectRater, updateRater } from './+state/rater.actions';
import { FeedbackState } from '@hrcatalyst/feedback-feature';

@Component({
  selector: 'hrcatalyst-rater',
  templateUrl: './rater.component.html',
  styleUrls: ['./rater.component.css']
})
export class RaterComponent implements OnDestroy {
  ratersDefs = [
    { headerName: 'First Name', field: 'firstName', sortable: true },
    { headerName: 'Last Name', field: 'lastName', sortable: true },
    { headerName: 'Title', field: 'title', sortable: true },
    { headerName: 'Email Address', field: 'emailAddress', sortable: true },
    { headerName: 'Notes', field: 'notes', sortable: true }
  ];

  selectedCompany?: Company;
  selectedClient?: Client;
  selectedCampaign?: Campaign;
  selectedAssociate?: Associate;
  selectedParticipant?: Participant;
  selectedRater?: Associate;
  hasRater = false;

  private gridApi: any;

  raterSubscription$: Subscription;
  raters: Array<Associate> = new Array<Associate>();

  constructor(private dialog: MatDialog, private router: Router, private raterStore: Store<RaterState>,
    private feedbackStore: Store<FeedbackState>) {
      const xtra = this.router.getCurrentNavigation()?.extras.state;

      if (xtra != null) {
        this.selectedCompany = xtra.company;
        this.selectedClient = xtra.client;
        this.selectedCampaign = xtra.campaign;
        this.selectedParticipant = xtra.participant;
        this.selectedAssociate = xtra.associate;

        if (this.selectedCampaign && this.selectedParticipant && this.selectedAssociate) {
        //   this.raterStore.dispatch({payload: loadParticipantRaters(new SelectParticipantParams(
        //       this.selectedCampaign, this.selectedParticipant, this.selectedAssociate)}));

        //   this.feedbackStore.dispatch({payload: loadParticipantFeedback(new SelectParticipantParams(
        //       this.selectedCampaign, this.selectedParticipant, this.selectedAssociate)}));
        }

      }

      this.raterSubscription$ = this.raterStore.pipe(select((state: any) => state)).subscribe((state) => {
        if (state.rater.associates != null) {
          this.raters = state.rater.associates;
        }
      });
    }

    ngOnDestroy() {
      if (this.raterSubscription$ != undefined) {
        this.raterSubscription$.unsubscribe();
      }
    }

    onReset() {
      this.selectedCompany = undefined;
      this.selectedClient = undefined;
      this.selectedCampaign = undefined;
      this.selectedAssociate = undefined;
      this.selectedParticipant = undefined;
      this.selectedRater = undefined;
    }

    IsSelectedParticipant() {
      return (this.selectedParticipant != null);
    }

    openRaterModal(rater: Rater) {
      const dialogRef = this.dialog.open(RaterModalComponent, {
        width: '450px',
        data: rater
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The rater dialog was closed');

        if (result instanceof Rater) {
          if (result.id !== undefined) {
            this.raterStore.dispatch(updateRater({payload: result}));
          } else {
            this.raterStore.dispatch(createRater({payload: result}));
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
          this.raterStore.dispatch(deleteRater({payload: selectedRows[0]}));
        }
      });
    }

    onGridReady(params: any) {
      this.gridApi = params.api;
      this.gridApi.sizeColumnsToFit();
    }

    addRater() {
      const rater = new Rater();
      rater.participantId = this.selectedParticipant?.associateId ?? '';

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

    // dedupRaters() {
    //   this.raterStore.dispatchdedupRatersAction());
    // }

    onSelectionChanged() {
      const selectedRows = this.gridApi.getSelectedRows();

      this.hasRater = selectedRows.length > 0;
    }

    onRowDoubleClicked(row: any) {
      this.selectedRater = row.data;

      if (this.selectedCampaign && this.selectedAssociate &&this.selectedRater) {
        this.raterStore.dispatch(selectRater({payload: new SelectRaterParams(
          this.selectedCampaign, this.selectedAssociate, this.selectedRater)}));

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
    }

    onBackClicked() {
      this.router.navigate(['/participant'], { state: {
        company: this.selectedCompany, client: this.selectedClient, campaign: this.selectedCampaign } });
    }

    onUpload() {
      const dialogRef = this.dialog.open(RaterImportComponent, {
        width: '450px',
        data: this.selectedCompany?.id
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`The rater import dialog was closed ${result}`);
      });
    }
}


