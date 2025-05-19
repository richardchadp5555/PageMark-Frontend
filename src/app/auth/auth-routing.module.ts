import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPagesComponent } from './pages/login-pages/login-pages.component';
import { RegisterPagesComponent } from './pages/register-pages/register-pages.component';


const routes: Routes = [
  { path: 'login', component: LoginPagesComponent },
  { path: 'register', component: RegisterPagesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
