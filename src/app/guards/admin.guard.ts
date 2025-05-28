// Proyecto: PageMark
// Archivo: admin.guard.ts
// Descripción: Protege rutas que requieren rol ADMIN.
// Autor: Richard Chadwick Plaza
// Fecha: 27/05/2025 - Curso: 2º DAM

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const usuarioData = localStorage.getItem('usuario');

    if (usuarioData) {
      const usuario = JSON.parse(usuarioData);
      if (usuario.rol === 'ADMIN') {
        return true;
      }
    }

    // Si no es admin, redirigimos
    this.router.navigate(['/inicio']);
    return false;
  }
}
