import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { CampaignYear} from 'src/app/campaign/campaign.interface';
import { ConfirmationComponent } from 'src/app/shared/confirmation/confirmation.component';
import * as campaignEntity from 'src/app/campaign/campaign.entity';
import { CreateCampaignYearAction, DeleteCampaignYearAction, LoadCampaignYearsAction, UpdateCampaignYearAction } from 'src/app/campaign/campaign.action';
import { takeUntil } from 'rxjs/operators';
import { CampaignYearModalComponent } from './campaign.year.modal';


@Component({
  selector: 'hrcatalyst-campaign-year',
  templateUrl: './campaign.year.component.html',
  styleUrls: ['./campaign.year.component.css']
})
export class CampaignYearComponent implements OnDestroy, OnInit {
  private onDestroy$: Subject<void> = new Subject<void>();

  yearsDefs = [
    { headerName: 'Campaign Year', field: 'year', sortable: true },
    { headerName: 'Archive Suffix', field: 'suffix', sortable: false},
    { headerName: 'Active', field: 'active', sortable: false }
  ];

  selectedYear: CampaignYear;
  hasYear = false;

  private gridApi;

  years: CampaignYear[];

  constructor(private dialog: MatDialog, private campaignStore: Store<campaignEntity.CampaignState>) {
    this.campaignStore.pipe(select((state: any) => state))
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state) => {
        if (state.campaign.campaignYears != null) {
          this.years = state.campaign.campaignYears;
        }
    });
  }

  ngOnInit() {
    this.campaignStore.dispatch(new LoadCampaignYearsAction());
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  openCampaignModal(campaignYear) {
    const dialogRef = this.dialog.open(CampaignYearModalComponent, {
      width: '450px',
      data: campaignYear
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The campaign year dialog was closed');
      if (result instanceof CampaignYear) {
        if (result.id !== undefined) {
          this.campaignStore.dispatch(new UpdateCampaignYearAction(result));
        } else {
          this.campaignStore.dispatch(new CreateCampaignYearAction(result));
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
        this.campaignStore.dispatch(new DeleteCampaignYearAction(selectedRows[0]));
      }
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  addYear() {
    const client = new CampaignYear();

    this.openCampaignModal(client);
  }

  editYear() {
    const selectedRows = this.gridApi.getSelectedRows();

    if (selectedRows.length > 0) {
      this.openCampaignModal(selectedRows[0]);
    }
  }

  deleteYear() {
    const selectedRows = this.gridApi.getSelectedRows();

    if (selectedRows.length > 0) {
        const message = 'Are your sure you want to delete Campaign Year' + selectedRows[0].name ;

        this.openConfirmationModal('Delete Campaign Year', message);
    }
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();

    this.hasYear = selectedRows.length > 0;
  }

}
