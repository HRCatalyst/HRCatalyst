import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthState, selectAuthState } from '@hrc/auth-feature';
import { loadCampaignYears } from '@hrc/campaign-feature';
import { loadInterviewParticipants } from '@hrc/interview-feature';
import { AssociateSearchResult, User } from '@hrc/shared-feature';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { loadAssociate, searchAssociates } from './+state/associate.actions';
import { AssociateState } from './+state/associate.entity';
import { selectAssociateState } from './+state/associate.selectors';


@Component({
  selector: 'hrc-associate-search',
  templateUrl: './associate-search.component.html',
  styleUrls: ['./associate-search.component.css']
})
export class AssociateSearchComponent implements OnDestroy, OnInit {
  private onDestroy$: Subject<void> = new Subject<void>();
  user$?: User;
  searchResults: AssociateSearchResult[] = new Array<AssociateSearchResult>();

  searchDefs = [
    { headerName: 'First Name', field: 'first', sortable: true },
    { headerName: 'Last Name', field: 'last', sortable: true },
    { headerName: 'Email Address', field: 'email', sortable: true },
  ];

  private gridApi?: any;

  constructor(private associateStore: Store<AssociateState>, private store: Store<AuthState>, private router: Router) {
    this.store.pipe(select(selectAuthState))
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state) => {
        if (state.settings !== undefined) {
          this.user$ = state.settings;
        }
    });

    this.associateStore.pipe(select(selectAssociateState))
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state) => {
        if (state.searchResult !== undefined) {
          this.searchResults = state.searchResult;
        }
    });
  }

  ngOnInit() {
    this.store.dispatch(loadCampaignYears());
  }

  searchAssociates(criteria: string) {
    if (criteria.length > 2) {
      this.associateStore.dispatch(searchAssociates({payload: criteria}));
    } else {
      this.searchResults = new Array<AssociateSearchResult>();
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  onBackClicked() {
    this.router.navigate(['/home']);
  }

  onSelectionChanged($event) {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows) {
      console.log(selectedRows);
    }
  }

  onRowDoubleClicked(row: any) {
    this.associateStore.dispatch(loadAssociate(row.data.id));
    this.associateStore.dispatch(loadInterviewParticipants(row.data.id));
    this.router.navigate(['/interview']);
  }
}


