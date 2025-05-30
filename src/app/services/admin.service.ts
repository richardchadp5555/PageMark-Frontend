// Proyecto: PageMark
// Archivo: admin.service.ts
// Descripción: Servicio para funciones administrativas en el panel de admin (usuarios, libros, reseñas).
// Autor: Richard Chadwick Plaza - 2º DAM

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrlUsuarios = `${environment.API_BASE_URL}/usuarios`;
  private apiUrlLibros = `${environment.API_BASE_URL}/libros`;
  private apiUrlResenas = `${environment.API_BASE_URL}/resenas`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const usuarioData = localStorage.getItem('usuario');
    if (!usuarioData) throw new Error('Usuario no autenticado');

    const { username, password } = JSON.parse(usuarioData);
    return new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${username}:${password}`)
    });
  }

  // ✅ Obtener lista de usuarios
  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlUsuarios, { headers: this.getHeaders() });
  }

  // ✅ Actualizar credenciales de un usuario
  actualizarUsuario(id: string, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrlUsuarios}/${id}`, datos, { headers: this.getHeaders() });
  }

  // ✅ Eliminar un usuario
  eliminarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrlUsuarios}/${id}`, { headers: this.getHeaders() });
  }

  // ✅ Obtener libros guardados por un usuario
  obtenerLibrosDeUsuario(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlLibros}/usuario/${username}`, { headers: this.getHeaders() });
  }

  // ✅ Obtener reseñas publicadas por un usuario
  obtenerResenasDeUsuario(idUsuario: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlResenas}/usuario/${idUsuario}`, { headers: this.getHeaders() });
  }
}
