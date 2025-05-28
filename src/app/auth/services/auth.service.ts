// Proyecto: PageMark
// Archivo: auth.service.ts
// Descripción: Servicio centralizado para login, registro y logout de usuarios.
//              Gestiona credenciales, almacenamiento local y llamadas al backend.
// Autor: Richard Chadwick Plaza
// Fecha: 25/05/2025 - Curso: 2º DAM

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.API_BASE_URL}/usuarios`;

  constructor(private http: HttpClient) {}

  // Método: login()
  // Descripción: Envía las credenciales al backend, y si son válidas,
  //              guarda el usuario y contraseña en localStorage (para autenticación Basic).
  login(username: string, password: string): Observable<any> {
    const body = { username, password };

    return new Observable(observer => {
      this.http.post(`${this.apiUrl}/login`, body).subscribe({
        next: (res: any) => {
          const rol = res.rol; // obtenemos el rol del backend
          localStorage.setItem('usuario', JSON.stringify({ username, password, rol }));
          observer.next(res);
          observer.complete();
        },
        error: () => {
          observer.error('Credenciales incorrectas o servidor no disponible');
        }
      });
    });
  }

  // Método: register()
  // Descripción: Registra un nuevo usuario. Si el registro es correcto,
  //              guarda las credenciales automáticamente en localStorage.
  register(username: string, email: string, password: string): Observable<any> {
    const body = { username, email, password, rol: 'USER' };

    return new Observable(observer => {
      this.http.post(`${this.apiUrl}`, body).subscribe({
        next: (res: any) => {
          localStorage.setItem('usuario', JSON.stringify({ username, password }));
          observer.next(res);
          observer.complete();
        },
        error: () => {
          observer.error('No se pudo registrar el usuario. ¿Quizá ya existe?');
        }
      });
    });
  }

  // Método: logout()
  // Descripción: Limpia localStorage y opcionalmente registra en el backend
  //              que el usuario ha cerrado sesión, para mostrarlo en el feed.
  logout(): void {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const { username } = JSON.parse(usuario);

      // Opcional: notificar al backend que el usuario ha salido
      this.http.post(`${this.apiUrl}/logout`, { username }).subscribe({
        next: () => console.log('Logout registrado en el backend'),
        error: () => console.warn('No se pudo registrar el logout, continuando...'),
        complete: () => {
          localStorage.clear();
          location.href = '/auth/login'; // Redirige fuera de Angular
        }
      });
    } else {
      localStorage.clear();
      location.href = '/auth/login';
    }
  }

  // Método: getUsuarioActual()
  // Descripción: Devuelve el usuario actualmente autenticado (si existe) desde localStorage.
  getUsuarioActual(): { username: string, password: string } | null {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }
}
