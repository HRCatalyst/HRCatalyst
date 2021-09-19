import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Associate, Company, selectCompanyAssociates } from '@hrc/shared-feature';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { companyEntity } from '@hrc/shared-feature'
import { Router } from '@angular/router';
import { loadCompanyAssociates } from '../+state/company.actions';

@Component({
  selector: 'hrc-company-associate',
  templateUrl: './company-associate.component.html',
  styleUrls: ['./company-associate.component.scss']
})
export class CompanyAssociateComponent implements OnDestroy{
  associatesDefs = [
    { headerName: 'First Name', field: 'firstName', sortable: true },
    { headerName: 'Last Name', field: 'lastName', sortable: true },
    { headerName: 'Title', field: 'title', sortable: true },
    { headerName: 'Email Address', field: 'emailAddress', sortable: true },
    { headerName: 'Notes', field: 'notes', sortable: true },
  ];

  selectedCompany?: Company;
  selectedAssociate?: Associate;
  hasAssociate = false;

  private onDestroy$: Subject<void> = new Subject<void>();
  private gridApi: any;

  associates?: Associate[];

  constructor(private dialog: MatDialog, private store: Store<companyEntity.CompanyState>, private router: Router) {
      const nav = this.router.getCurrentNavigation();

      if (nav != null) {
        this.selectedCompany = nav.extras.state?.payload;
        this.store.dispatch(loadCompanyAssociates({payload: this.selectedCompany?.id ?? ''}));
      }

      this.store.pipe(select(selectCompanyAssociates))
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((state) => {
          this.associates = state;
        });
    }

    ngOnDestroy() {
      this.onDestroy$.next();
    }

    openAssociateModal(associate: Associate) {
      // const dialogRef = this.dialog.open(AssociateModalComponent, {
      //   width: '450px',
      //   height: '550px',
      //   data: associate
      // });

      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The associate dialog was closed.');
      //   if (result instanceof Associate) {
      //     result.companyId = this.selectedCompany?.id ?? '';

      //     if (result.id !== undefined) {
      //       this.associateStore.dispatch(updateAssociate({payload: result}));
      //     } else {
      //       this.associateStore.dispatch(createAssociate({payload: result}));
      //     }
      //   }
      // });
    }

    openConfirmationModal(title: string, message: string) {
      // const dialogRef = this.dialog.open(ConfirmationComponent, {
      //   width: '450px',
      //   data: { title: title, message: message }
      // });

      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The confirmation dialog was closed');
      //   if (result === true) {
      //     const selectedRows = this.gridApi.getSelectedRows();
      //     this.associateStore.dispatch(deleteAssociate(selectedRows[0]));
      //   }
      // });
    }

    addAssociate() {
      const associate = new Associate();

      this.openAssociateModal(associate);
    }

    editAssociate() {
      const selectedRows = this.gridApi.getSelectedRows();

      if (selectedRows.length > 0) {
        this.openAssociateModal(selectedRows[0]);
      }
    }

    deleteAssociate() {
      const selectedRows = this.gridApi.getSelectedRows();

      if (selectedRows.length > 0) {
          const message = 'Are your sure you want to delete Associate ' + selectedRows[0].first_name + ' ' + selectedRows[0].last_name;

          this.openConfirmationModal('Delete Associate', message);
      }
    }

    onGridReady(params: any) {
      this.gridApi = params.api;
      this.gridApi.sizeColumnsToFit();
    }

    onSelectionChanged($event) {
      const selectedRows = this.gridApi.getSelectedRows();

      this.hasAssociate = selectedRows.length > 0;
    }

    onRowDoubleClicked(row: any) {
//      this.associateStore.dispatch(selectAssociate({payload: row.data}));
    }

    onUpload() {
      // const dialogRef = this.dialog.open(AssociateImportModalComponent, {
      //   width: '450px',
      //   data: this.selectedCompany?.id
      // });

      // dialogRef.afterClosed().subscribe(result => {
      //   console.log(`The associate import dialog was closed ${result}`);
      // });
    }
}

