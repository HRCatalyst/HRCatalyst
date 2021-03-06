import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CampaignYearModalComponent } from './campaign.year.modal';
import { CampaignYear, ConfirmationComponent, selectCampaignState } from '@hrc/shared-feature';
import { createCampaignYear, deleteCampaignYear, loadCampaignYears, updateCampaignYear } from './+state/campaign.actions';
import { MatDialog } from '@angular/material/dialog';
import { campaignEntity } from '@hrc/shared-feature';

@Component({
  selector: 'hrc-campaign-year',
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

  selectedYear?: CampaignYear;
  hasYear = false;

  private gridApi?: any;

  years?: CampaignYear[];

  constructor(private dialog: MatDialog, private store: Store<campaignEntity.CampaignState>) {
    this.store.pipe(select(selectCampaignState))
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state) => {
        if (state?.campaignYears != undefined) {
          this.years = state.campaignYears;
        }
    });
  }

  ngOnInit() {
    this.store.dispatch(loadCampaignYears());
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  openCampaignModal(campaignYear: CampaignYear) {
    const dialogRef = this.dialog.open(CampaignYearModalComponent, {
      width: '450px',
      data: campaignYear
    });

    dialogRef.afterClosed().subscribe((result: CampaignYear) => {
      console.log('The campaign year dialog was closed');
      if (result instanceof CampaignYear) {
        if (result.id !== undefined) {
          this.store.dispatch(updateCampaignYear({payload: result}));
        } else {
          this.store.dispatch(createCampaignYear({payload: result}));
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
        this.store.dispatch(deleteCampaignYear({payload: selectedRows[0]}));
      }
    });
  }

  onGridReady(params: any) {
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

  onSelectionChanged($event) {
    console.log(`onSelectionChanged ${$event} `);
  }

  onRowDoubleClicked($event) {
    console.log(`onRowDoubleClicked ${$event} `);
  }
}
