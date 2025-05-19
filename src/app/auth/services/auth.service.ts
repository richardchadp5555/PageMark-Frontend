// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  // Login → guarda las credenciales si son válidas
  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${username}:${password}`)
    });

    // guardamos el token en localStorage
    localStorage.setItem('auth', btoa(`${username}:${password}`));
    localStorage.setItem('username', username);

    // Probamos que las credenciales sean válidas llamando a un endpoint protegido
    return this.http.get(`${environment.API_BASE_URL}/usuarios/${username}`, { headers });
  }

  // Registro
  register(data: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${environment.API_BASE_URL}/usuarios`, data);
  }

  // Obtener el username guardado
  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  // Obtener el token completo codificado
  getToken(): string {
    return localStorage.getItem('auth') || '';
  }

  // Logout
  logout(): void {
    localStorage.clear();
  }

  // Saber si hay sesión activa
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth');
  }
}
