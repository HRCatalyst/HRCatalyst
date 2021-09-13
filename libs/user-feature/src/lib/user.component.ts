import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '@hrc/shared-feature';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { loadAllUsers } from './+state/user.actions';
import { UserState } from './+state/user.entity';
import { selectUserState } from './+state/user.selectors';

@Component({
  selector: 'hrc-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnDestroy, OnInit {
  columnDefs = [
    { headerName: 'First Name', field: 'first_name' },
    { headerName: 'Last Name', field: 'last_name' },
    { headerName: 'Email Address', field: 'email_address' },
    { headerName: 'Phone Number', field: 'phone_number' },
    { headerName: 'Role', field: 'role' },
  ];

  entities?: Dictionary<User>;
  users?: User[];
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private store: Store<UserState>) {
    this.store.select(selectUserState)
    .pipe(takeUntil(this.onDestroy$))
    .subscribe((state) => {
      this.entities = state.entities;
    });
  }

  ngOnInit() {
    this.store.dispatch(loadAllUsers());
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
