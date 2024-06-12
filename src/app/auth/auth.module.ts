import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetComponent,
    ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ResetComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AuthModule { }