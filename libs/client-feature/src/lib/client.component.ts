import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store} from '@ngrx/store';
import * as clientEntity from 'src/app/client/client.entity';
import { Company } from 'src/app/company/company.interface';
import { LoadCompanyClientsAction, DeleteClientAction, UpdateClientAction } from 'src/app/client/client.action';
import { MatDialog } from '@angular/material';
import { Client, IClient } from 'src/app/client/client.interface';
import { CreateClientAction, SelectClientAction } from 'src/app/client/client.action';
import { ClientModalComponent } from './client.modal';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmationComponent } from 'src/app/shared/confirmation/confirmation.component';

@Component({
  selector: 'hrcatalyst-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnDestroy, OnInit {
  clientsDefs = [
    { headerName: 'Client Name', field: 'name', sortable: true }
  ];

  selectedCompany: Company;
  selectedClient: Client;
  hasClient = false;

  private gridApi;

  clientState$: Observable<IClient[]>;
  clientSubscription$: Subscription;
  clients: Client[];

  constructor(private dialog: MatDialog, private clientStore: Store<clientEntity.ClientState>, private router: Router) {
      const xtra = this.router.getCurrentNavigation().extras.state;

      if (xtra != null) {
        this.selectedCompany = xtra.payload;
        this.clientStore.dispatch(new LoadCompanyClientsAction(this.selectedCompany.id));
      }

      this.clientState$ = this.clientStore.select(clientEntity.selectAll);
      this.clientSubscription$ = this.clientState$.subscribe((state) => {
          this.clients = state;
      });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.clientSubscription$ != null) {
      this.clientSubscription$.unsubscribe();
    }
  }

  onReset() {
    this.selectedCompany = null;
    this.selectedClient = null;
  }

  openClientModal(client) {
    const dialogRef = this.dialog.open(ClientModalComponent, {
      width: '450px',
      data: client
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The client dialog was closed');
      if (result instanceof Client) {
        if (result.id !== undefined) {
          this.clientStore.dispatch(new UpdateClientAction(result));
        } else {
          this.clientStore.dispatch(new CreateClientAction(result));
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
        this.clientStore.dispatch(new DeleteClientAction(selectedRows[0]));
      }
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  onClientStatus() {

  }

  addClient() {
    const client = new Client();
    client.companyId = this.selectedCompany.id;

    this.openClientModal(client);
  }

  editClient() {
    const selectedRows = this.gridApi.getSelectedRows();

    if (selectedRows.length > 0) {
      this.openClientModal(selectedRows[0]);
    }
  }

  deleteClient() {
    const selectedRows = this.gridApi.getSelectedRows();

    if (selectedRows.length > 0) {
        const message = 'Are your sure you want to delete Client ' + selectedRows[0].first_name + ' ' + selectedRows[0].last_name;

        this.openConfirmationModal('Delete Client', message);
    }
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();

    this.hasClient = selectedRows.length > 0;
  }

  onRowDoubleClicked(row) {
    const params = new SelectClientAction(row.data);
    this.clientStore.dispatch(params);

    this.selectedClient = row.data;

    this.router.navigate(['/campaign'], { state: { company: this.selectedCompany, client: this.selectedClient} });
  }

  onBackClicked() {
    this.router.navigate(['/home']);
  }
}
