// Proyecto: PageMark
// Archivo: resenas.service.ts
// Descripción: Servicio para gestionar reseñas desde el frontend (crear, obtener, actualizar, eliminar).
// Autor: Richard Chadwick Plaza - 2º DAM

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Resena } from '../interfaces/resena.interface';

@Injectable({
  providedIn: 'root'
})
export class ResenasService {
  private apiUrl = `${environment.API_BASE_URL}/resenas`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) throw new Error('No hay usuario autenticado');

    const { username, password } = JSON.parse(usuario);
    return new HttpHeaders({
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      'Content-Type': 'application/json'
    });
  }

  crearResena(resena: Resena): Observable<Resena> {
    return this.http.post<Resena>(this.apiUrl, resena, { headers: this.getHeaders() });
  }

  obtenerResenasPorLibro(idLibro: string): Observable<Resena[]> {
    return this.http.get<Resena[]>(`${this.apiUrl}/libro/${idLibro}`, { headers: this.getHeaders() });
  }

  obtenerResenasPorUsuario(idUsuario: string): Observable<Resena[]> {
    return this.http.get<Resena[]>(`${this.apiUrl}/usuario/${idUsuario}`, { headers: this.getHeaders() });
  }

  // Obtener reseñas de un usuario por su usernme
  obtenerResenasPorUsername(username: string): Observable<Resena[]> {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) throw new Error('No hay usuario autenticado');
  
    const { username: u, password } = JSON.parse(usuario);
    const headers = {
      Authorization: `Basic ${btoa(`${u}:${password}`)}`
    };
  
    return this.http.get<Resena[]>(`${this.apiUrl}/username/${username}`, { headers });
  }
  
  actualizarResena(id: string, resena: Resena): Observable<Resena> {
    return this.http.put<Resena>(`${this.apiUrl}/${id}`, resena, { headers: this.getHeaders() });
  }

  eliminarResena(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  obtenerResenaPorId(id: string): Observable<Resena> {
  const usuario = localStorage.getItem('usuario');
  if (!usuario) throw new Error('No hay usuario autenticado');

  const { username, password } = JSON.parse(usuario);
  const headers = {
    Authorization: `Basic ${btoa(`${username}:${password}`)}`
  };


  return this.http.get<Resena>(`${this.apiUrl}/${id}`, { headers });
}

obtenerResenasPorGoogleBookId(googleBookId: string): Observable<Resena[]> {
  return this.http.get<Resena[]>(`${this.apiUrl}/google/${googleBookId}`, { headers: this.getHeaders() });
}


}
