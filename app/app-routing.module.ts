import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundPageComponent } from './core/containers/not-found-page.component';
import { authGuard } from './auth/services/auth-guard.service';

export const routes: Routes = [
    // {
    //     path: 'task-list', loadChildren: ()=> import ('@super-app/task-list/task-list.module').then((m)=> m.TaskListModule),
    //     canActivate: [authGuard],
    // },
    {
        path: 'not-found', component: NotFoundPageComponent, data: { title: ' Page Not Found'}
    },
    {
        path: '**', redirectTo: 'not-found', pathMatch: 'full'
    }
]

@NgModule({
    imports: [RouterModule.forRoot( routes, {
        useHash: true,
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {}