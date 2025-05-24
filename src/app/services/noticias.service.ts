// Proyecto: PageMark
// Fichero: noticias.service.ts
// Descripción: Servicio Angular para obtener noticias literarias desde el backend con autenticación.
// Autor: Richard Chadwick Plaza
// Fecha: 23/05/2025 - Curso: 2º DAM

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Noticia } from '../interfaces/noticia.interface';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private apiUrl = `${environment.API_BASE_URL}/noticias`;

  constructor(private http: HttpClient) {}

  obtenerNoticias(): Observable<Noticia[]> {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
      return throwError(() => new Error('No hay credenciales en localStorage.'));
    }

    const { username, password } = JSON.parse(usuario);
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${username}:${password}`)
    });

    return this.http.get<Noticia[]>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        console.error('❌ Error al obtener noticias:', error);
        return throwError(() => new Error('Error al cargar noticias.'));
      })
    );
  }
}
