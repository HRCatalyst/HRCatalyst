import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IFirebaseUser, LoginModel, User } from '@hrcatalyst/shared-feature';
import { select, Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { loadSettings, loginAttempt } from '../+state/auth.actions';
import { Auth } from '../+state/auth.reducer';
import { selectAuthState } from '../+state/auth.selectors';

@Component({
  selector: 'hrcatalyst-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  currentUser?: IFirebaseUser = undefined;
  settings?: User = undefined;
  private onDestroy$: Subject<void> = new Subject<void>();

  loginForm = new FormGroup({
    'userName': new FormControl('', [Validators.required, Validators.minLength(4)]),
    'userPassword': new FormControl('', [Validators.required, Validators.minLength(4)])
  });
  constructor(private store: Store<Auth>, private router: Router) {
    this.store.pipe(select(selectAuthState))
      .subscribe((state) => {
      if (state.user != null && this.currentUser !== state.user) {
        this.currentUser = state.user;
        this.store.dispatch(loadSettings({ id: state.user.uid }));
      }
      if (state.settings != null && this.settings !== state.settings) {
        this.settings = state.settings;
        // if (state.auth.settings.role === 1) {
        this.router.navigate(['/home']);
        // } else {
        //   this.router.navigate(['/associate']);
        // }
      }
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  onSubmit() {
    const userName = this.loginForm.controls['userName'];
    const password = this.loginForm.controls['userPassword'];

    console.log(`Login Attempt => ${userName}/${password}`);
    this.store.dispatch(loginAttempt({ payload: new LoginModel(userName.value, password.value) }));
  }
}

