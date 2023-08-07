import { Component } from "@angular/core";
import { Store } from '@ngrx/store';
import { Credentials } from '@super-app/auth/models';
import * as fromAuth from '@super-app/auth/store/reducers';
import { AuthActions } from "../store/actions";

@Component({
    selector: 'login-page',
    template: `
        <bc-login-form
            (submitted)="onSubmit($event)"
            [pending]="(pending$ | async)!"
            [errorMessage]="(error$ | async)!"
        >
        </bc-login-form>
    `,
    styles: [``]
}) export class LoginPageComponent {
    pending$ = this.store.select(fromAuth.selectLoginPagePending);
    error$ = this.store.select(fromAuth.selectLoginPageError);

    constructor(private store: Store) {}

    onSubmit(credentials: Credentials) {
        this.store.dispatch(AuthActions.login({credentials}))
    }
}