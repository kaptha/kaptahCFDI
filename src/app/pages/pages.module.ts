import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

//import { UsuariosComponent } from './usuarios/usuarios.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [        
    DashboardComponent,    
    PerfilComponent,    
    PagesComponent,
    ],
  exports: [        
    DashboardComponent,    
    PerfilComponent,    
    PagesComponent,
    ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class PagesModule { }