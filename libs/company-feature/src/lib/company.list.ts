import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { CompanyModalComponent } from './company.modal';
import { Company, ConfirmationComponent } from '@hrc/shared-feature';
import { Subject, takeUntil } from 'rxjs';
import { createCompany, deleteCompany, loadAllCompanys, selectCompany, updateCompany } from './+state/company.actions';
import { companyEntity } from '@hrc/shared-feature'
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'hrc-company-list',
  templateUrl: './company.list.html',
  styleUrls: ['./company.list.css']
})
export class CompanyListComponent implements OnDestroy, OnInit {
  private onDestroy$: Subject<void> = new Subject<void>();
  companysDefs = [
    { headerName: 'Company Name', field: 'name', sortable: true }
  ];

  private gridApi;

  selectedCompany?: Company = undefined;
  hasCompany = false;
  companys?: Company[];
  welcomeUser = '';

  constructor(private dialog: MatDialog, private store: Store<companyEntity.CompanyState>, private router: Router) {
    this.store.pipe(select(companyEntity.selectAll))
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state) => {
        if (state.length > 0) {
          this.companys = state;
        }
      });
  }

  ngOnInit() {
    this.store.dispatch(loadAllCompanys());
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  openCompanyModal(company) {
    const dialogRef = this.dialog.open(CompanyModalComponent, {
      width: '450px',
      data: company
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The company dialog was closed.');
      if (result instanceof Company) {
        if (result.id !== undefined) {
          this.store.dispatch(updateCompany({payload: result}));
        } else {
          this.store.dispatch(createCompany({payload: result}));
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
        this.store.dispatch(deleteCompany({payload: selectedRows[0]}));
      }
    });
  }

  addCompany() {
    const company = new Company();

    this.openCompanyModal(company);
  }

  editCompany() {
    const selectedRows = this.gridApi.getSelectedRows();

    if (selectedRows.length > 0) {
      this.openCompanyModal(selectedRows[0]);
    }
  }

  deleteCompany() {
    const selectedRows = this.gridApi.getSelectedRows();

    if (selectedRows.length > 0) {
        const message = 'Are your sure you want to delete Company ' + selectedRows[0].name;

        this.openConfirmationModal('Delete Company', message);
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  onSelectionChanged($event) {
    const selectedRows = this.gridApi.getSelectedRows();

    this.hasCompany = selectedRows.length > 0;
  }

  onRowDoubleClicked(row) {
    const params = selectCompany({payload: row.data});
    this.store.dispatch(params);
    this.router.navigate(['/company'], { state: params });
  }
}
