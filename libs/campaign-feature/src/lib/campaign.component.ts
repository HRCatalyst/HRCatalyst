import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { CampaignModalComponent } from './campaign.modal';
import { Campaign, Client, Company, ConfirmationComponent } from '@hrc/shared-feature';
import { MatDialog } from '@angular/material/dialog';
import { createCampaign, deleteCampaign, loadClientCampaigns, selectCampaign, updateCampaign } from './+state/campaign.actions';
import { Dictionary } from '@ngrx/entity';
import { selectCampaignState } from './+state/campaign.selectors';
import { takeUntil } from 'rxjs/operators';
import { selectCompany } from '@hrc/company-feature';
import { ClientState } from '@hrc/client-feature';
import { CampaignState } from './+state/campaign.entity';

@Component({
  selector: 'hrc-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnDestroy {
  campaignsDefs = [
    { headerName: 'Campaign Name', field: 'name', sortable: true },
    { headerName: 'Status', field: 'status', sortable: false }
  ];

  selectedCompany?: Company;
  selectedClient?: Client;
  hasCampaign = false;

  private gridApi?: any;

  private onDestroy$: Subject<void> = new Subject<void>();
  campaigns?: Dictionary<Campaign>;

  constructor(private dialog: MatDialog, private campaignStore: Store<CampaignState>,
    private clientStore: Store<ClientState>, private router: Router) {
      const xtra = this.router.getCurrentNavigation()?.extras.state;

      if (xtra != null) {
        this.selectedCompany = xtra.company;
        this.selectedClient = xtra.client;
        this.clientStore.dispatch(loadClientCampaigns({payload: this.selectedClient?.id ?? ''}));
      }

      this.campaignStore.select(selectCampaignState)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state) => {
        this.campaigns = state.entities;
      });
  }


  ngOnDestroy() {
    this.onDestroy$.next();
  }

  onReset() {
    this.selectedCompany = undefined;
    this.selectedClient = undefined;
  }

  openCampaignModal(campaign: Campaign) {
    const dialogRef = this.dialog.open(CampaignModalComponent, {
      width: '450px',
      data: campaign
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The campaign dialog was closed');
      if (result instanceof Campaign) {
        if (result.id !== undefined) {
          this.campaignStore.dispatch(updateCampaign({payload: result}));
        } else {
          this.campaignStore.dispatch(createCampaign({payload: result}));
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
        this.campaignStore.dispatch(deleteCampaign({payload: selectedRows[0]}));
      }
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  addCampaign() {
    const campaign = new Campaign();
    campaign.clientId = this.selectedClient?.id ?? '';

    this.openCampaignModal(campaign);
  }

  editCampaign() {
    const selectedRows = this.gridApi.getSelectedRows();

    if (selectedRows.length > 0) {
      this.openCampaignModal(selectedRows[0]);
    }
  }

  deleteCampaign() {
    const selectedRows = this.gridApi.getSelectedRows();

    if (selectedRows.length > 0) {
        const message = 'Are your sure you want to delete Campaign ' + selectedRows[0].name ;

        this.openConfirmationModal('Delete Campaign', message);
    }
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();

    this.hasCampaign = selectedRows.length > 0;
  }

  onRowDoubleClicked(row: any) {
    const params = selectCampaign({payload: row.data});

    this.campaignStore.dispatch(params);

    this.router.navigate(['/participant'], { state: { company: this.selectedCompany, client: this.selectedClient, campaign: row.data } });
  }

  onCampaignStatus() {
    const selectedRows = this.gridApi.getSelectedRows();

    if (selectedRows.length > 0) {
      this.router.navigate(['/status'], { state: {
        company: this.selectedCompany, client: this.selectedClient, campaign: selectedRows[0] } });
    }
  }

  onBackClicked() {
    const params = selectCompany({payload: this.selectedCompany});
    this.router.navigate(['/company'], { state: params });
  }
}
