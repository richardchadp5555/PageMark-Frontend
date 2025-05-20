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
    return this.http.get(`${this.apiUrl}/buscar?q=${encodeURIComponent(query)}`, {
      responseType: 'text'
    });
  }
}
