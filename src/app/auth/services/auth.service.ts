// Proyecto: PageMark
// Archivo: auth.service.ts
// Descripción: Servicio de autenticación para login.
// Autor: Richard Chadwick Plaza
// Fecha: 19/05/2025 - Curso: 2º DAM

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.API_BASE_URL}/usuarios`;
  
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/login`, body, {
      responseType: 'text'
    });
  }

  register(username: string, email: string, password: string): Observable<any> {
    const body = { username, email, password, rol: 'USER' };
    return this.http.post(`${this.apiUrl}`, body);
  }
  
}
