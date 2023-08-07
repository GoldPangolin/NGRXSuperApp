import { createReducer, on } from "@ngrx/store";
import { LayoutActions } from "../actions";


export const layoutFeaturKey = 'Layout';
export interface State {
    showSidenav: boolean;
}

export const initialState: State = {
    showSidenav: false
}

export const reducer = createReducer(
    initialState,
    on(LayoutActions.closeSidenav, () => ({ showSidenav: false })),
    on(LayoutActions.openSidenav, () => ({ showSidenav: true }))
)

export const layoutSelector = (state: State) => state.showSidenav; 
