import { metaReducers } from './root-reducers/index';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CoreModule } from './core';
import { AppComponent } from './core/containers';
import { AppRoutingModule } from './app-routing.module';
import { rootReducer } from './root-reducers';
import { UserEffects } from './core/effects';
import { RouterEffects } from './core/effects/router.effects';
import { AuthModule } from './auth';
@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    StoreModule.forRoot(rootReducer, { 
      metaReducers,
      runtimeChecks: {
        // strictStateImmutability and strictActionImmutability are enabled by default
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
     }),
    StoreDevtoolsModule.instrument({ name: 'Super self Improve', maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([UserEffects, RouterEffects]),
    StoreRouterConnectingModule.forRoot(),
    AppRoutingModule
  ],
  declarations: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
