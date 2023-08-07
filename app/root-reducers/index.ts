import { RouterReducerState, getRouterSelectors, routerReducer } from '@ngrx/router-store';
import * as layoutReducer from '../core/reducers/layout.reducer';

import { isDevMode } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';


export interface State {
    [layoutReducer.layoutFeaturKey]: layoutReducer.State,
    router: RouterReducerState
}

export const rootReducer: ActionReducerMap<State> = {
    [layoutReducer.layoutFeaturKey]: layoutReducer.reducer,
    router: routerReducer,
}

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return (state, action) => {
      const result = reducer(state, action);
      console.groupCollapsed(action.type);
      console.log('prev state', state);
      console.log('action', action);
      console.log('next state', result);
      console.groupEnd();
  
      return result;
    };
  }

  /**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = isDevMode() ? [logger] : [];

/**
 * Layout Selectors
 */
export const selectLayoutState = createFeatureSelector<layoutReducer.State>(
  layoutReducer.layoutFeaturKey
);

export const selectShowSidenav = createSelector(
  selectLayoutState,
  layoutReducer.layoutSelector
);

/**
 * Router Selectors
 */
export const { selectRouteData } = getRouterSelectors();