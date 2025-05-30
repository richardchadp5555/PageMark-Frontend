// Proyecto: PageMark
// Archivo: login-pages.component.ts
// Descripción: Lógica para el formulario de login paso a paso.
// Autor: Richard Chadwick Plaza
// Fecha: 19/05/2025 - Curso: 2º DAM

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-pages',
  templateUrl: './login-pages.component.html',
  styleUrls: ['./login-pages.component.scss']
})
export class LoginPagesComponent {
  paso: number = 1;
  formUsername!: FormGroup;
  formPassword!: FormGroup;
  mostrarPassword: boolean = false;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formUsername = this.fb.group({
      username: ['', Validators.required]
    });

    this.formPassword = this.fb.group({
      password: ['', Validators.required]
    });
  }

  siguientePaso(): void {
    if (this.formUsername.invalid) return;
    this.paso = 2;
  }

  login(): void {
    if (this.formPassword.invalid) return;
  
    const username = this.formUsername.value.username;
    const password = this.formPassword.value.password;
  
    this.loading = true;
  
    this.authService.login(username, password).subscribe({
      next: () => {
        this.router.navigate(['/inicio']); // No toques localStorage aquí
      },
      error: () => {
        this.loading = false;
        alert('Usuario o contraseña incorrectos');
        this.paso = 1;
      }
    });
  }  
  
  
}
