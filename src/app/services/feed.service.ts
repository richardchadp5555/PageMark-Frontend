// Proyecto: PageMark
// Archivo: feed.service.ts
// Descripción: Servicio para obtener las actividades del feed desde el backend.
// Autor: Richard Chadwick Plaza - 2º DAM

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private apiUrl = `${environment.API_BASE_URL}/feed`;

  constructor(private http: HttpClient) {}

  // Devuelve el feed global de actividades con paginación
  obtenerFeed(page: number, size: number): Observable<any[]> {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) throw new Error('No hay usuario autenticado');

    const { username, password } = JSON.parse(usuario);
    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`${username}:${password}`)}`
    });

    return this.http.get<any[]>(`${this.apiUrl}?page=${page}&size=${size}`, { headers });
  }

  // Devuelve el feed de un usuario específico (no paginado por ahora)
  obtenerFeedPorUsuario(username: string): Observable<any[]> {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) throw new Error('No hay usuario autenticado');

    const { username: u, password } = JSON.parse(usuario);
    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`${u}:${password}`)}`
    });

    return this.http.get<any[]>(`${this.apiUrl}/${username}`, { headers });
  }
}
