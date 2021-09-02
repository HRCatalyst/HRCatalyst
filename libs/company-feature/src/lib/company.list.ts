import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ICompany, Company } from 'src/app/company/company.interface';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as companyEntity from 'src/app/company/company.entity';
import { CompanyModalComponent } from './company.modal';
import { LoadAllCompanysAction, CreateCompanyAction, SelectCompanyAction, UpdateCompanyAction, DeleteCompanyAction } from 'src/app/company/company.action';
import { ConfirmationComponent } from 'src/app/shared/confirmation/confirmation.component';

@Component({
  selector: 'hrcatalyst-company-list',
  templateUrl: './company.list.html',
  styleUrls: ['./company.list.css']
})
export class CompanyListComponent implements OnDestroy, OnInit {
  companysDefs = [
    { headerName: 'Company Name', field: 'name', sortable: true }
  ];

  private gridApi;

  companyState$: Observable<ICompany[]>;
  companySubscription$: Subscription;
  selectedCompany: Company = null;
  hasCompany = false;
  companys: Company[];
  welcomeUser = '';

  constructor(private dialog: MatDialog, private store: Store<companyEntity.CompanyState>, private router: Router) {
    this.companyState$ = this.store.select(companyEntity.selectAll);
    this.companySubscription$ = this.companyState$.subscribe((state) => {
      if (state.length > 0) {
        this.companys = state;
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(new LoadAllCompanysAction());
  }

  ngOnDestroy() {
    if (this.companySubscription$ != null) {
      this.companySubscription$.unsubscribe();
    }
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
          this.store.dispatch(new UpdateCompanyAction(result));
        } else {
          this.store.dispatch(new CreateCompanyAction(result));
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
        this.store.dispatch(new DeleteCompanyAction(selectedRows[0]));
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

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();

    this.hasCompany = selectedRows.length > 0;
  }

  onRowDoubleClicked(row) {
    const params = new SelectCompanyAction(row.data);
    this.store.dispatch(params);
    this.router.navigate(['/company'], { state: params });
  }
}
