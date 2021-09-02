import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { AssociateSearchResult } from 'src/app/associate/associate.interface';
import * as associateEntity from 'src/app/associate/associate.entity';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { SearchAssociatesAction, SelectAssociateAction, LoadAssociateAction } from 'src/app/associate/associate.action';
import { LoadInterviewParticipantsAction } from 'src/app/interview/interview.action';
import { Router } from '@angular/router';
import { IUser } from 'src/app/user/user.interface';
import { IAuth } from 'src/app/auth/auth.interface';
import { LoadCampaignYearsAction } from 'src/app/campaign/campaign.action';

@Component({
  selector: 'hrcatalyst-associate-search',
  templateUrl: './associate-search.component.html',
  styleUrls: ['./associate-search.component.css']
})
export class AssociateSearchComponent implements OnDestroy, OnInit {
  private onDestroy$: Subject<void> = new Subject<void>();
  user$: IUser;
  searchResults: AssociateSearchResult[] = new Array<AssociateSearchResult>();

  searchDefs = [
    { headerName: 'First Name', field: 'first', sortable: true },
    { headerName: 'Last Name', field: 'last', sortable: true },
    { headerName: 'Email Address', field: 'email', sortable: true },
  ];

  private gridApi;

  constructor(private associateStore: Store<associateEntity.AssociateState>, private store: Store<IAuth>, private router: Router) {
    this.store.pipe(select((state: any) => state))
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state) => {
        if (state.auth.settings != null) {
          this.user$ = state.auth.settings;
        }
    });

    this.associateStore.pipe(select((state: any) => state))
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state) => {
        if (state.associate.searchResult != null) {
          this.searchResults = state.associate.searchResult;
        }
    });
  }

  ngOnInit() {
    this.store.dispatch(new LoadCampaignYearsAction());
  }

  searchAssociates(criteria: string) {
    if (criteria.length > 2) {
      this.associateStore.dispatch(new SearchAssociatesAction(criteria));
    } else {
      this.searchResults = new Array<AssociateSearchResult>();
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  onBackClicked() {
    this.router.navigate(['/home']);
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
  }

  onRowDoubleClicked(row) {
    const params = new LoadAssociateAction(row.data.id);
    this.associateStore.dispatch(params);
    this.associateStore.dispatch(new LoadInterviewParticipantsAction(row.data.id));
    this.router.navigate(['/interview']);
  }
}
