import { Store } from '@ngrx/store';
import { selectLoggedIn } from './../store/reducers/index';
import { inject } from '@angular/core';
import * as fromAuth from '@super-app/auth/store/reducers';
import { AuthActions } from '../store/actions';
import { Observable, map } from 'rxjs';

export const authGuard = (): Observable<boolean> => {
    const store = inject(Store);
    return store.select(fromAuth.selectLoggedIn).pipe(
        map((authed)=> {
            if(!authed) {
                store.dispatch(AuthActions.loginRedirect());
                return false;
            }
            return true;
        })
    )
}