// Proyecto: PageMark
// Archivo: libros.service.ts
// Descripción: Servicio que conecta con el backend para buscar libros.
// Autor: Richard Chadwick Plaza - 2º DAM

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  private apiUrl = `${environment.API_BASE_URL}/libros`;

  constructor(private http: HttpClient) {}

  buscarLibros(query: string): Observable<any> {
    const usuario = localStorage.getItem('usuario');
  
    if (!usuario) {
      throw new Error('No hay usuario autenticado');
    }
  
    const { username, password } = JSON.parse(usuario);
    const basicToken = btoa(`${username}:${password}`);
    const headers = {
      Authorization: `Basic ${basicToken}`
    };
  
    return this.http.get(`${this.apiUrl}/buscar?q=${encodeURIComponent(query)}`, {
      headers,
      responseType: 'text'
    });
  }  
  
}
