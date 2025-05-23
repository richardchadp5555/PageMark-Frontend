// Proyecto: PageMark
// Archivo: noticias.service.ts
// Descripción: Servicio para obtener noticias literarias desde el backend.
// Autor: Richard Chadwick Plaza
// Fecha: 23/05/2025 - Curso: 2º DAM

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Noticia } from '../interfaces/noticia.interface';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private apiUrl = `${environment.API_BASE_URL}/noticias`;

  constructor(private http: HttpClient) {}

  obtenerNoticias(): Observable<Noticia[]> {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    if (!username || !password) {
      throw new Error('No hay credenciales guardadas en localStorage.');
    }

    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${username}:${password}`)
    });

    return this.http.get<Noticia[]>(this.apiUrl, { headers });
  }
}
