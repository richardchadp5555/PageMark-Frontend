import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-pages',
  templateUrl: './login-pages.component.html',
  styleUrls: ['./login-pages.component.scss']
})
export class LoginPagesComponent {
  paso = 1;
  loading = false;

  formEmail = this.fb.group({
    username: ['', Validators.required] // usamos username en lugar de email
  });

  formPassword = this.fb.group({
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  siguientePaso() {
    if (this.formEmail.valid) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.paso = 2;
      }, 1000);
    }
  }

  login() {
    const username = this.formEmail.value.username!;
    const password = this.formPassword.value.password!;

    this.authService.login(username, password).subscribe({
      next: () => {
        this.router.navigate(['/']); // redirigir a inicio
      },
      error: () => {
        alert('Credenciales incorrectas');
      }
    });
  }
}
