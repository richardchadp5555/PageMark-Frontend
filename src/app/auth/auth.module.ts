import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPagesComponent } from './pages/login-pages/login-pages.component';
import { RegisterPagesComponent } from './pages/register-pages/register-pages.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    LoginPagesComponent,
    RegisterPagesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
