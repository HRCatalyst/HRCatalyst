import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as companyEntity from 'src/app/company/company.entity';
import { MatDialog } from '@angular/material';
import { ImportModalComponent } from '../import/import.modal';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
import { RegistrationAttemptAction } from 'src/app/auth/auth.action';
import { RegistrationModel } from 'src/app/auth/auth.interface';

@Component({
  selector: 'hrcatalyst-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy, OnInit {
  welcomeUser = '';
  role = 0;
//  admin_interview = false;

  rootSubscription$: Subscription;
  constructor(private dialog: MatDialog, private router: Router, private store: Store<companyEntity.CompanyState>) {
    const nav = this.router.getCurrentNavigation();

    this.rootSubscription$ = this.store.pipe(select((state: any) => state)).subscribe((state) => {
        if (state.auth.settings != null) {
          this.welcomeUser = 'Welcome back ' + state.auth.settings.first_name + '!';
          this.role = state.auth.settings.role;
        }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.rootSubscription$ != null) {
      this.rootSubscription$.unsubscribe();
    }
  }

  onUpload() {
    const file = 'file';

    const dialogRef = this.dialog.open(ImportModalComponent, {
      width: '450px',
      data: file
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The import dialog was closed');
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
        this.store.dispatch(new RegistrationAttemptAction(result));
      }
    });
  }

}
