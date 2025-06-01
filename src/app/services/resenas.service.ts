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

  // 🔐 Obtiene las credenciales del usuario autenticado desde localStorage
  private get usuario(): { username: string, password: string } {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) throw new Error('No hay usuario autenticado');
    return JSON.parse(usuario);
  }

  // 🛡️ Genera las cabeceras con autenticación Basic y tipo JSON
  private get headers(): HttpHeaders {
    const { username, password } = this.usuario;
    return new HttpHeaders({
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      'Content-Type': 'application/json'
    });
  }

  // 📝 Crear una nueva reseña
  crearResena(resena: Resena): Observable<Resena> {
    return this.http.post<Resena>(this.apiUrl, resena, { headers: this.headers });
  }

  // 📚 Obtener reseñas de un libro por su ID interno (Mongo)
  obtenerResenasPorLibro(idLibro: string): Observable<Resena[]> {
    return this.http.get<Resena[]>(`${this.apiUrl}/libro/${idLibro}`, { headers: this.headers });
  }

  // 👤 Obtener reseñas publicadas por un usuario a partir de su ID
  obtenerResenasPorUsuario(idUsuario: string): Observable<Resena[]> {
    return this.http.get<Resena[]>(`${this.apiUrl}/usuario/${idUsuario}`, { headers: this.headers });
  }

  // 👥 Obtener reseñas de un usuario por su username (admin o perfiles públicos)
  obtenerResenasPorUsername(username: string): Observable<Resena[]> {
    return this.http.get<Resena[]>(`${this.apiUrl}/username/${username}`, { headers: this.headers });
  }

  // 🔄 Actualizar una reseña ya publicada
  actualizarResena(id: string, resena: Resena): Observable<Resena> {
    return this.http.put<Resena>(`${this.apiUrl}/${id}`, resena, { headers: this.headers });
  }

  // ❌ Eliminar una reseña por su ID
  eliminarResena(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  // 🔎 Obtener una reseña concreta por su ID
  obtenerResenaPorId(id: string): Observable<Resena> {
    return this.http.get<Resena>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  // 📘 Obtener todas las reseñas públicas asociadas a un libro (por GoogleBookId)
  obtenerResenasPorGoogleBookId(googleBookId: string): Observable<Resena[]> {
    return this.http.get<Resena[]>(`${this.apiUrl}/google/${googleBookId}`, { headers: this.headers });
  }
}
