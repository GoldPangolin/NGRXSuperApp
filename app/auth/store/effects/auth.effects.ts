import { loginSuccess } from './../actions/auth.actions';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../services/auth.service";
import { AuthActions } from "../actions";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { Credentials, User } from "../../models";
import { Router } from '@angular/router';
import { UserActions } from 'src/app/core/actions';
import { MatDialog } from '@angular/material/dialog';
import { LogoutConfirmationDialogComponent } from '../../components';

// this is a observable factory that intercepts the path before the reducer to give it some new infomration to work with from outside sources.
// you need to inject the effect in the the effects module to make it work.

@Injectable()
export class AuthEffects{

    // in an effect we declare a steam of the actions we are intercepting.
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            map((action) => action.credentials),
            exhaustMap((auth: Credentials) =>
                this.authService.login(auth).pipe(
                map((user) => AuthActions.loginSuccess({ user })),
                catchError((error) => of(AuthActions.loginFailure({ error }))))
            )
        )
    );
// The dispatch: false configuration property is an optional property you can set in an effect that determines whether the effect will dispatch an action once it has completed its operation.
// Here is what dispatch: false does:
// dispatch: true: This is the default behavior. Once the effect completes its operation, it will dispatch a new action. The action returned by the effect is then sent to the reducer to modify the state.
// dispatch: false: If you set dispatch to false, the effect will not dispatch a new action after it completes its operation.

    loginSuccess$ = createEffect(
        ()=> 
            this.actions$.pipe(
                ofType(AuthActions.loginSuccess),
                tap(()=> {
                    this.router.navigate(['/home']);
                })
            ),
            { dispatch: false }
    );

    loginRedirect$ = createEffect(
        () =>
          this.actions$.pipe(
            ofType(AuthActions.loginRedirect, AuthActions.logout),
            tap(() => {
              this.router.navigate(['/login']);
            })
          ),
        { dispatch: false }
      );

      logoutConfirmation$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.logoutConfirmation),
        exhaustMap(() => {
          const dialogRef = this.dialog.open<
            LogoutConfirmationDialogComponent,
            undefined,
            boolean
          >(LogoutConfirmationDialogComponent);
  
          return dialogRef.afterClosed();
        }),
        map((result) =>
          result ? AuthActions.logout() : AuthActions.logoutConfirmationDismiss()
        )
      )
    );

    logoutIdleUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.idleTimeout),
      map(() => AuthActions.logout())
    )
  );

    
    constructor(
        private actions$: Actions, 
        private authService: AuthService,
        private router: Router,
        private dialog: MatDialog
    ){}
}