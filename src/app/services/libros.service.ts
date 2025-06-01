// Proyecto: PageMark
// Archivo: libros.service.ts
// Descripción: Servicio que conecta con el backend para buscar libros y obtener libros populares.
// Autor: Richard Chadwick Plaza - 2º DAM

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResultadoBusqueda } from '../interfaces/libro-google.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  private apiUrl = `${environment.API_BASE_URL}/libros`;

  constructor(private http: HttpClient) {}

  // 🔐 Obtiene las credenciales del usuario autenticado desde localStorage
  private get usuario(): { username: string, password: string } {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) throw new Error('No hay usuario autenticado');
    return JSON.parse(usuario);
  }

  // 🛡️ Genera las cabeceras con Basic Auth a partir del usuario actual
  private get headers(): HttpHeaders {
    const { username, password } = this.usuario;
    return new HttpHeaders({
      Authorization: `Basic ${btoa(`${username}:${password}`)}`
    });
  }

  // 📚 Busca libros en Google Books API a través del backend con paginación
  buscarLibros(query: string, maxResults: number = 40, startIndex: number = 0): Observable<ResultadoBusqueda> {
    const url = `${this.apiUrl}/buscar?q=${encodeURIComponent(query)}&maxResults=${maxResults}&startIndex=${startIndex}`;
    return this.http.get<ResultadoBusqueda>(url, { headers: this.headers });
  }

  // 🔥 Obtiene los libros populares (almacenados en MongoDB)
  obtenerLibrosPopulares(): Observable<any> {
    return this.http.get(`${this.apiUrl}/populares`, { headers: this.headers });
  }

  // 📖 Obtiene un libro por su ID de Mongo
  obtenerLibroPorId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  // 🔍 Obtiene los detalles del libro desde Google Books API por su GoogleBookId
  obtenerDetallesDesdeGoogle(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/google/${id}`, { headers: this.headers });
  }

  // 💾 Guarda un libro para el usuario actual
  guardarLibro(libro: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, libro, { headers: this.headers });
  }

  // 🧠 Devuelve el libro guardado por un usuario concreto y su GoogleBookId
  obtenerLibroGuardado(username: string, googleBookId: string): Observable<any> {

    return this.http.get(`${this.apiUrl}/usuario/${username}/google/${googleBookId}`, { headers: this.headers });
  }

  // 📂 Obtiene todos los libros de un usuario en un estado dado (QUIERO_LEER, LEYENDO, LEIDO)
  obtenerLibrosPorEstado(username: string, estado: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuario/${username}/estado/${estado}`, { headers: this.headers });
  }

    // 🗑️ Elimina un libro guardado usando su ID interno de Mongo
  eliminarLibroPorId(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.headers });
  }


  // 🔄 Cambia el estado de un libro guardado (ej: QUIERO_LEER → LEIDO)
  actualizarEstadoLibro(id: string, nuevoEstado: string): Observable<any> {
    const headers = this.headers.set('Content-Type', 'application/json');
    return this.http.patch(`${this.apiUrl}/${id}`, { estado: nuevoEstado }, { headers });
  }

  // 📈 Actualiza el número de página leída en un libro guardado
  actualizarPagina(id: string, nuevaPagina: number): Observable<any> {
    const headers = this.headers.set('Content-Type', 'application/json');
    return this.http.patch(`${this.apiUrl}/${id}`, { pagina: nuevaPagina }, { headers });
  }
}
