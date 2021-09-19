import { Component, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationModel, homeEntity } from '@hrc/shared-feature';
import { registrationAttempt, SignupComponent } from '@hrc/auth-feature';
import { ImportModalComponent } from '@hrc/import-feature';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'hrc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
  private onDestroy$: Subject<void> = new Subject<void>();
  welcomeUser = '';
  role = 0;

  constructor(private dialog: MatDialog, private router: Router, private store: Store<homeEntity.HomeState>) {
    this.store.pipe(select((state: any) => state))
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state) => {
        if (state.auth.settings != null) {
          this.welcomeUser = 'Welcome back ' + state.auth.settings.first_name + '!';
          this.role = state.auth.settings.role;
        }
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  onUpload() {
    const file = 'file';

    const dialogRef = this.dialog.open(ImportModalComponent, {
      width: '450px',
      data: file
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`The import dialog was closed ${result}`);
    });
  }

  onInterview() {
    this.router.navigate(['/associate']);
  }

  onRegister() {
    const dialogRef = this.dialog.open(SignupComponent, {
      width: '650px',
      height: '450px',
      data: ''
    });

    dialogRef.beforeClosed().subscribe(result => {
      console.log('The signup dialog was closed');
      if (result instanceof RegistrationModel) {
        this.store.dispatch(registrationAttempt({payload: result}));
      }
    });
  }
}
