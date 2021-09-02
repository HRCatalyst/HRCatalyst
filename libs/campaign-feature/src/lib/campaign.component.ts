import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ICampaign, Campaign } from 'src/app/campaign/campaign.interface';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as campaignEntity from 'src/app/campaign/campaign.entity';
import * as clientEntity from 'src/app/client/client.entity';
import { LoadClientCampaignsAction, SelectCampaignAction, CreateCampaignAction, UpdateCampaignAction, DeleteCampaignAction } from 'src/app/campaign/campaign.action';
import { Client } from 'src/app/client/client.interface';
import { CampaignModalComponent } from './campaign.modal';
import { ConfirmationComponent } from 'src/app/shared/confirmation/confirmation.component';
import { Company } from 'src/app/company/company.interface';
import { SelectCompanyAction } from 'src/app/company/company.action';

@Component({
  selector: 'hrcatalyst-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnDestroy, OnInit {
  campaignsDefs = [
    { headerName: 'Campaign Name', field: 'name', sortable: true },
    { headerName: 'Status', field: 'status', sortable: false }
  ];

  selectedCompany: Company;
  selectedClient: Client;
  hasCampaign = false;

  private gridApi;

  campaignsState$: Observable<ICampaign[]>;
  campaignSubscription$: Subscription;
  campaigns: Campaign[];

  constructor(private dialog: MatDialog, private campaignStore: Store<campaignEntity.CampaignState>,
    private clientStore: Store<clientEntity.ClientState>, private router: Router) {
      const xtra = this.router.getCurrentNavigation().extras.state;

      if (xtra != null) {
        this.selectedCompany = xtra.company;
        this.selectedClient = xtra.client;
        this.clientStore.dispatch(new LoadClientCampaignsAction(this.selectedClient.id));
      }

      this.campaignsState$ = this.campaignStore.select(campaignEntity.selectAll);
      this.campaignSubscription$ = this.campaignsState$.subscribe((state) => {
        this.campaigns = state;
      });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.campaignSubscription$ != null) {
      this.campaignSubscription$.unsubscribe();
    }
  }

  onReset() {
    this.selectedCompany = null;
    this.selectedClient = null;
  }

  openCampaignModal(campaign) {
    const dialogRef = this.dialog.open(CampaignModalComponent, {
      width: '450px',
      data: campaign
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The campaign dialog was closed');
      if (result instanceof Campaign) {
        if (result.id !== undefined) {
          this.campaignStore.dispatch(new UpdateCampaignAction(result));
        } else {
          this.campaignStore.dispatch(new CreateCampaignAction(result));
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
        this.campaignStore.dispatch(new DeleteCampaignAction(selectedRows[0]));
      }
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  addCampaign() {
    const campaign = new Campaign();
    campaign.clientId = this.selectedClient.id;

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

  onRowDoubleClicked(row) {
    const params = new SelectCampaignAction(row.data);

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
    const params = new SelectCompanyAction(this.selectedCompany);
    this.router.navigate(['/company'], { state: params });
  }
}
