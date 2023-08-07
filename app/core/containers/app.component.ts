import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { LayoutActions } from '../actions';

import * as fromRoot from '../../root-reducers';
import * as fromAuth from '../../auth/store/reducers';
import { AuthActions } from '@super-app/auth/store/actions';

@Component({
  selector: 'app-root',
  template: `
    <bc-layout>
      <ng-container *ngIf="(showSidenav$ | async )! as sidenav" >
      <bc-sidenav [open]="sidenav" (closeMenu)="closeSidenav()">
        <bc-nav-item
          (navigate)="closeSidenav()"
          *ngIf="(loggedIn$ | async)!"
          routerLink="/"
          icon="shopping-cart"
          hint="View your Shopping Cart"
        >
          Shopping Cart
        </bc-nav-item>
        <bc-nav-item
          (navigate)="closeSidenav()"
          *ngIf="(loggedIn$ | async)!"
          routerLink="/"
          icon="check-list"
          hint="Your Daily Tasks"
        >
          Task List
        </bc-nav-item>
        <bc-nav-item
          (navigate)="closeSidenav()"
          *ngIf="(loggedIn$ | async)! === false"
        >
          Sign In
        </bc-nav-item>
        <bc-nav-item (navigate)="logout()" *ngIf="(loggedIn$ | async)!">
          Sign Out
        </bc-nav-item>
      </bc-sidenav>
      </ng-container>
      <bc-toolbar (openMenu)="openSidenav()">  Task List </bc-toolbar>

      <router-outlet></router-outlet>
    </bc-layout>
  `,
  styles: [``]
})
export class AppComponent {
  title = 'Self Improvement Super App';

  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean> = of(true);

  constructor(private store: Store) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.showSidenav$ = this.store.select<boolean>(fromRoot.selectShowSidenav);
    this.loggedIn$ = this.store.select(fromAuth.selectLoggedIn);
  }

  closeSidenav() {
    /**
     * All state updates are handled through dispatched actions in 'container'
     * components. This provides a clear, reproducible history of state
     * updates and user interaction through the life of our
     * application.
     */
    this.store.dispatch(LayoutActions.closeSidenav());
  }

  openSidenav() {
    this.store.dispatch(LayoutActions.openSidenav());
  }

  logout() {
    this.store.dispatch(AuthActions.logoutConfirmation());
  }
}
