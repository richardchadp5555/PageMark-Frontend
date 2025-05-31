// Proyecto: PageMark
// Archivo: usuarios.service.ts
// Descripción: Servicio para operaciones relacionadas con usuarios (búsqueda, seguidores, etc.)
// Autor: Richard Chadwick Plaza - 2º DAM

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UsuarioResumen } from '../interfaces/usuario-resumen.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = `${environment.API_BASE_URL}/usuarios`;

  constructor(private http: HttpClient) {}

  buscarUsuarios(query: string): Observable<UsuarioResumen[]> {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) throw new Error('No hay usuario autenticado');

    const { username, password } = JSON.parse(usuario);
    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`${username}:${password}`)}`
    });

    return this.http.get<UsuarioResumen[]>(`${this.apiUrl}/buscar?query=${query}`, { headers });
  }


  // Obtener la URL del avatar de un usuario
obtenerAvatarUrl(username: string): Observable<{ avatarUrl: string }> {
  const usuario = localStorage.getItem('usuario');
  if (!usuario) throw new Error('No hay usuario autenticado');

  const { username: u, password } = JSON.parse(usuario);
  const headers = new HttpHeaders({
    Authorization: `Basic ${btoa(`${u}:${password}`)}`
  });

  return this.http.get<{ avatarUrl: string }>(`${this.apiUrl}/avatar-url/${username}`, { headers });
}

subirAvatar(username: string, formData: FormData): Observable<string> {
  const usuario = localStorage.getItem('usuario');
  if (!usuario) throw new Error('No hay usuario autenticado');

  const { username: user, password } = JSON.parse(usuario);
  const headers = new HttpHeaders({
    Authorization: `Basic ${btoa(`${user}:${password}`)}`
  });

  return this.http.post(`${this.apiUrl}/avatar/${username}`, formData, {
    headers,
    responseType: 'text'
  });
}


}
