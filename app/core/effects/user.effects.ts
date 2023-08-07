import { on } from '@ngrx/store';
import { Injectable } from "@angular/core";
import { Actions, createEffect } from "@ngrx/effects";
import { switchMap, map, pipe, fromEvent, merge, timer } from 'rxjs';

import { UserActions } from '../actions';

@Injectable()
export class UserEffects {
    clicks$ = fromEvent(document, 'click');
    keys$ = fromEvent(document, 'keydown');
    mouse$ = fromEvent(document, 'mousemove');
  
    idle$ = createEffect(() =>
      merge(this.clicks$, this.keys$, this.mouse$).pipe(
        // 5 minute inactivity timeout
        switchMap(() => timer(5 * 60 * 1000)),
        map(() => UserActions.idleTimeout())
      )
    );
}