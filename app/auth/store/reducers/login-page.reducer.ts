import { createReducer, on } from '@ngrx/store';

import { AuthActions } from '../actions';

//the reducer takes in the action data and then returns the new state based on 
// incoming actions. 
// we must define the feature key for the StoreModule
// we must define the inital state. 
// we must define the state. 

export const loginPageFeatureKey = "loginPage"

export interface State {
    error: string | null;
    pending: boolean;
}

export const initialState : State = {
    error: null,
    pending: false
}

export const reducer = createReducer(
    initialState,
    on(AuthActions.login, (state) => ({
        ...state,
        error: null,
        pending: true,
      })),
    
      on(AuthActions.loginSuccess, (state) => ({
        ...state,
        error: null,
        pending: false,
      })),
      on(AuthActions.loginFailure, (state, { error }) => ({
        ...state,
        error,
        pending: false,
      }))
)

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;