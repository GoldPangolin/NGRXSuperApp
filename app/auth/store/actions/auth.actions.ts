import { Credentials, User } from './../../models/users';
import { createAction, props } from "@ngrx/store";

export const login = createAction('[Auth] Login', props<{credentials: Credentials}>());
export const logout = createAction('[Auth] Logout');
export const logoutConfirmation = createAction('[Auth] Logout Confirmation');
export const logoutConfirmationDismiss = createAction(
  '[Auth] Logout Confirmation Dismiss'
);
export const loginSuccess = createAction('[Auth/Api] Login Success', props<{user: User}>());
export const loginFailure = createAction('[Auth/Api] Loutout Failure', props<{error: any}>());

export const loginRedirect = createAction('[Auth/API] Login Redirect');