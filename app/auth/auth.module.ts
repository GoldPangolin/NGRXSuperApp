import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects';
import { MaterialModule } from '../material';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './container/login-page.component';
import { LoginFormComponent, LogoutConfirmationDialogComponent } from './components';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        MaterialModule,
        AuthRoutingModule,
        StoreModule.forFeature({
            name: fromAuth.authFeatureKey,
            reducer: fromAuth.reducers,
        }),
        EffectsModule.forFeature(AuthEffects)
    ],
    declarations: [
        LoginPageComponent,
        LoginFormComponent,
        LogoutConfirmationDialogComponent
    ],
    providers: []
})
export class AuthModule{}