import { Component, OnInit, OnDestroy } from '@angular/core';
import { Company } from 'src/app/company/company.interface';
import * as associateEntity from 'src/app/associate/associate.entity';
import { Associate, IAssociate } from 'src/app/associate/associate.interface';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { AssociateModalComponent } from './associate.modal';
import { CreateAssociateAction, SelectAssociateAction, LoadCompanyAssociatesAction, UpdateAssociateAction, DeleteAssociateAction } from 'src/app/associate/associate.action';
import { Router } from '@angular/router';
import { AssociateImportModalComponent } from './associate.import.modal';
import { ConfirmationComponent } from 'src/app/shared/confirmation/confirmation.component';

@Component({
  selector: 'hrcatalyst-associate',
  templateUrl: './associate.component.html',
  styleUrls: ['./associate.component.css']
})
export class AssociateComponent implements OnDestroy, OnInit {
  associatesDefs = [
    { headerName: 'First Name', field: 'firstName', sortable: true },
    { headerName: 'Last Name', field: 'lastName', sortable: true },
    { headerName: 'Title', field: 'title', sortable: true },
    { headerName: 'Email Address', field: 'emailAddress', sortable: true },
    { headerName: 'Notes', field: 'notes', sortable: true },
  ];

  selectedCompany: Company;
  selectedAssociate: Associate;
  hasAssociate = false;

  private gridApi;

  associateState$: Observable<IAssociate[]>;
  associateSubscription$: Subscription;
  associates: Associate[];

  constructor(private dialog: MatDialog, private associateStore: Store<associateEntity.AssociateState>, private router: Router) {
      const nav = this.router.getCurrentNavigation();

      if (nav != null) {
        this.selectedCompany = nav.extras.state.payload;
        this.associateStore.dispatch(new LoadCompanyAssociatesAction(this.selectedCompany.id));
      }

      this.associateState$ = this.associateStore.select(associateEntity.selectAll);
      this.associateSubscription$ = this.associateState$.subscribe((state) => {
          this.associates = state;
      });
    }

    ngOnInit() {

    }

    ngOnDestroy() {
      if (this.associateSubscription$ != null) {
        this.associateSubscription$.unsubscribe();
      }
    }

    openAssociateModal(associate) {
      const dialogRef = this.dialog.open(AssociateModalComponent, {
        width: '450px',
        height: '550px',
        data: associate
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The associate dialog was closed.');
        if (result instanceof Associate) {
          result.companyId = this.selectedCompany.id;

          if (result.id !== undefined) {
            this.associateStore.dispatch(new UpdateAssociateAction(result));
          } else {
            this.associateStore.dispatch(new CreateAssociateAction(result));
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
          this.associateStore.dispatch(new DeleteAssociateAction(selectedRows[0]));
        }
      });
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

    onGridReady(params) {
      this.gridApi = params.api;
      this.gridApi.sizeColumnsToFit();
    }

    onSelectionChanged() {
      const selectedRows = this.gridApi.getSelectedRows();

      this.hasAssociate = selectedRows.length > 0;
    }

    onRowDoubleClicked(row) {
      this.associateStore.dispatch(new SelectAssociateAction(row.data));
    }

    onUpload() {
      const dialogRef = this.dialog.open(AssociateImportModalComponent, {
        width: '450px',
        data: this.selectedCompany.id
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The associate import dialog was closed');
      });
    }
}
