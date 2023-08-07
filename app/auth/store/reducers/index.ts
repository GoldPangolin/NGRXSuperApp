//ok what is the reducer file doing. 
// it seems to be where we are defining out memoized selectors. 
// we are bubbling up out feature state to be a feature selector for all of auth. 
// essentially we would budle all of our reducers . create memoized selectors. 
import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../root-reducers'
import * as fromAuth from './auth.reducers';
import * as fromLoginPage from './login-page.reducer';

export const authFeatureKey = 'auth';

// define feature state;
export interface AuthState {
    [fromAuth.statusFeatureKey]: fromAuth.State,
    [fromLoginPage.loginPageFeatureKey]: fromLoginPage.State
}

export interface State extends fromRoot.State {
    [authFeatureKey]: AuthState
}

//create a method that combines the reducers 
// We need to understand what is going on here at a higher level. 
export function reducers(state: AuthState | undefined, action: Action) {
    return combineReducers({
      [fromAuth.statusFeatureKey]: fromAuth.reducer,
      [fromLoginPage.loginPageFeatureKey]: fromLoginPage.reducer,
    })(state, action);
}

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

// so looks like selectors are composable and probably work similar to reducer like
// functions.
export const selectAuthStatusState = createSelector(
    selectAuthState,
    (state) => 
        state.status
);

export const selectUser = createSelector(
    selectAuthStatusState,
    fromAuth.getUser
);

export const selectLoggedIn = createSelector(selectUser, (user) => !!user);

export const selectLoginPageState = createSelector(
  selectAuthState,
  (state) => state.loginPage
);
export const selectLoginPageError = createSelector(
  selectLoginPageState,
  fromLoginPage.getError
);
export const selectLoginPagePending = createSelector(
  selectLoginPageState,
  fromLoginPage.getPending
);