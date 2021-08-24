import { Component, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { logoutAttempt } from 'libs/auth-feature/src/lib/+state/auth.actions';
import { Auth } from 'libs/auth-feature/src/lib/+state/auth.reducer';

@Component({
  selector: 'hrcatalyst-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'Feedback Tracker';
  authenticated = false;
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private dialog: MatDialog, private store: Store<Auth>, private router: Router) {
    this.store.pipe(select((state: any) => state))
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state) => {
        if (state.auth.user == null) {
          this.authenticated = false;
          this.router.navigate(['/login']);
        } else {
          this.authenticated = (state.auth.user != null);
        }
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  onReset() {
    // this.store.dispatch(new SelectClientAction(null));
    // this.store.dispatch(new SelectCampaignAction(null));
    // this.store.dispatch(new SelectRaterAction(new SelectRaterParams(null, null, null)));
    // this.store.dispatch(new SelectParticipantAction(new SelectParticipantParams(null, null, null)));
  }

  onLogout() {
    this.onReset();
//    this.store.dispatch(selectCompany());
    this.store.dispatch(logoutAttempt());
  }

  onGoHome() {
    this.onReset();
  }

  onUpload() {
    // const file = 'file';

    // const dialogRef = this.dialog.open(ImportModalComponent, {
    //   width: '450px',
    //   data: file
    // });

    // dialogRef.afterClosed()
    //   .pipe(takeUntil(this.onDestroy$))
    //   .subscribe(result => {
    //     console.log('The import dialog was closed');
    // });
  }
}
