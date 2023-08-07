import { Injectable} from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { routerNavigatedAction } from '@ngrx/router-store';
import * as fromRoot from '../../root-reducers';
import { map, tap } from 'rxjs';

@Injectable() 
export class RouterEffects {

    updateTitle$ = createEffect(
        () =>
          this.actions$.pipe(
            ofType(routerNavigatedAction),
            concatLatestFrom(() => this.store.select(fromRoot.selectRouteData)),
            map(([, data]) => `Book Collection - ${data['title']}`),
            tap((title) => this.titleService.setTitle(title))
          ),
        {
          dispatch: false,
        }
      );
      
    constructor(
        private actions$: Actions, 
        private store: Store,
        private titleService: Title
        ){}
}
