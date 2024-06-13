import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { Error404Component } from './error404/error404.component';

const routes: Routes = [
          
    //{ path: '', redirectTo: 'login', pathMatch: 'full' }, 
    { path: '**', redirectTo: 'login' },
    {path: '**', component: Error404Component}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
