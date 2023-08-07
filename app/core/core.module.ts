import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent, NotFoundPageComponent } from './containers';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material';
import {LayoutComponent, NavItemComponent, SidenavComponent, ToolbarComponent} from './components';

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
  LayoutComponent,
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent
];

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    RouterModule
  ],
  declarations: COMPONENTS,

  exports: COMPONENTS
})
export class CoreModule { }
