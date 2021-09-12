import { Component } from '@angular/core';
import { Store} from '@ngrx/store';
import { ClientModalComponent } from './client.modal';
import { Router } from '@angular/router';
import { Client, Company, ConfirmationComponent } from '@hrcatalyst/shared-feature';
import { createClient, deleteClient, selectClient, updateClient } from './+state/client.actions';
import { ClientState } from './+state/client.entity';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'hrcatalyst-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  clientsDefs = [
    { headerName: 'Client Name', field: 'name', sortable: true }
  ];

  selectedCompany?: Company;
  selectedClient?: Client;
  hasClient = false;

  private gridApi?: any;

  // clientState$: Observable<IClient[]>;
  // clientSubscription$: Subscription;
  clients?: Client[];

  constructor(private dialog: MatDialog, private clientStore: Store<ClientState>, private router: Router) {
      const xtra = this.router.getCurrentNavigation()?.extras.state;

      // if (xtra != null) {
      //   this.selectedCompany = xtra.payload;
      //   this.clientStore.dispatch(loadCompanyClients({id: this.selectedCompany?.id ?? ''}));
      // }

      // this.clientState$ = this.clientStore.select(clientEntity.selectAll);
      // this.clientSubscription$ = this.clientState$.subscribe((state) => {
      //     this.clients = state;
      // });
  }

  // ngOnDestroy() {
  //   if (this.clientSubscription$ != null) {
  //     this.clientSubscription$.unsubscribe();
  //   }
  // }

  onReset() {
    this.selectedCompany = undefined;
    this.selectedClient = undefined;
  }

  openClientModal(client: any) {
    const dialogRef = this.dialog.open(ClientModalComponent, {
      width: '450px',
      data: client
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The client dialog was closed');
      if (result instanceof Client) {
        if (result.id !== undefined) {
          this.clientStore.dispatch(updateClient({payload: result}));
        } else {
          this.clientStore.dispatch(createClient({payload: result}));
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
        this.clientStore.dispatch(deleteClient({payload: selectedRows[0]}));
      }
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  onClientStatus() {
    console.log('onClientStatue');
  }

  addClient() {
    const client = new Client();
    client.companyId = this.selectedCompany?.id ?? '';

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

  onRowDoubleClicked(row: any) {
    this.clientStore.dispatch(selectClient({payload:row.data}));

    this.selectedClient = row.data;

    this.router.navigate(['/campaign'], { state: { company: this.selectedCompany, client: this.selectedClient} });
  }

  onBackClicked() {
    this.router.navigate(['/home']);
  }
}
