// Proyecto: PageMark
// Archivo: register-pages.component.ts
// Descripción: Formulario de registro. Registra al usuario y lo logea automáticamente.
// Autor: Richard Chadwick Plaza - 2º DAM

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-pages',
  templateUrl: './register-pages.component.html',
  styleUrls: ['./register-pages.component.scss']
})
export class RegisterPagesComponent {
  form!: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  registrar(): void {
    if (this.form.invalid) return;

    this.loading = true;

    const { username, email, password } = this.form.value;

    this.authService.register(username, email, password).subscribe({
      next: () => {
        localStorage.setItem('usuario', JSON.stringify({ username }));
        this.router.navigate(['/inicio']);
      },
      error: () => {
        this.loading = false;
        alert('No se pudo registrar el usuario. Puede que ya exista.');
      }
    });
  }
}
