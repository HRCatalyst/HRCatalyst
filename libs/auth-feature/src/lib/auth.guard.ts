import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Auth } from './+state/auth.reducer';
import { selectAuthState } from './+state/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements OnDestroy, CanActivate {
  authenticated = false;
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private store: Store<Auth>, private router: Router) {
    this.store.pipe(select(selectAuthState))
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state) => {
        this.authenticated = (state.user != null);
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.authenticated) {
          // logged in so return true
          return true;
      }

      // not logged in so redirect to login page
      this.router.navigate(['/login']);
      return false;
  }
}
