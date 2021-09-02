import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as userEntity from 'src/app/user/user.entity';
import { User, IUser } from 'src/app/user/user.interface';
import { LoadAllUsersAction } from 'src/app/user/user.action';

@Component({
  selector: 'hrcatalyst-user',
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

  userState$: Observable<IUser[]>;
  userSubscription$: Subscription;
  users: User[];

  constructor(private store: Store<userEntity.UserState>) {
    this.userState$ = this.store.select(userEntity.selectAll);

    this.userSubscription$ = this.userState$.subscribe((state) => {
      if (state.length > 0) {
        this.users = state;
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(new LoadAllUsersAction());
  }

  ngOnDestroy() {
    if (this.userSubscription$ != null) {
      this.userSubscription$.unsubscribe();
    }
  }
}
