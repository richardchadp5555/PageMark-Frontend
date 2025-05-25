// Proyecto: PageMark
// Archivo: libros.service.ts
// Descripción: Servicio que conecta con el backend para buscar libros y obtener libros populares.
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

  obtenerLibrosPopulares(): Observable<any> {
    const usuario = localStorage.getItem('usuario');

    if (!usuario) {
      throw new Error('No hay usuario autenticado');
    }

    const { username, password } = JSON.parse(usuario);
    const basicToken = btoa(`${username}:${password}`);
    const headers = {
      Authorization: `Basic ${basicToken}`
    };

    return this.http.get(`${this.apiUrl}/populares`, {
      headers
    });
  }

  // Este método obtiene un libro almacenado en mongo
  obtenerLibroPorId(id: string): Observable<any> {
  const usuario = localStorage.getItem('usuario');

  if (!usuario) {
    throw new Error('No hay usuario autenticado');
  }

  const { username, password } = JSON.parse(usuario);
  const basicToken = btoa(`${username}:${password}`);
  const headers = {
    Authorization: `Basic ${basicToken}`
  };

  return this.http.get(`${this.apiUrl}/${id}`, {
    headers
  });
}

  // Este método extrae información adicional de google books api
  obtenerDetallesDesdeGoogle(id: string): Observable<any> {
    const usuario = localStorage.getItem('usuario');

    if (!usuario) {
      throw new Error('No hay usuario autenticado');
    }

    const { username, password } = JSON.parse(usuario);
    const basicToken = btoa(`${username}:${password}`);
    const headers = {
      Authorization: `Basic ${basicToken}`
    };

    return this.http.get(`${this.apiUrl}/google/${id}`, {
      headers
    });
  }

  // Guarda un libro para el usuario en MongoDB
  guardarLibro(libro: any): Observable<any> {
    const usuario = localStorage.getItem('usuario');

    if (!usuario) {
      throw new Error('No hay usuario autenticado');
    }

    const { username, password } = JSON.parse(usuario);
    const basicToken = btoa(`${username}:${password}`);
    const headers = {
      Authorization: `Basic ${basicToken}`
    };

    return this.http.post(`${this.apiUrl}`, libro, { headers });
  }

  // Obtiene el libro guardado por el usuario actual (si existe)
  obtenerLibroGuardado(username: string, googleBookId: string): Observable<any> {
    const usuario = localStorage.getItem('usuario');

    if (!usuario) {
      throw new Error('No hay usuario autenticado');
    }

    const { username: u, password } = JSON.parse(usuario);
    const basicToken = btoa(`${u}:${password}`);
    const headers = {
      Authorization: `Basic ${basicToken}`
    };

    return this.http.get(`${this.apiUrl}/usuario/${username}/google/${googleBookId}`, { headers });
  }

  // Obtiene todos los libros del usuario con un estado concreto
  obtenerLibrosPorEstado(username: string, estado: string): Observable<any> {
    const usuario = localStorage.getItem('usuario');

    if (!usuario) {
      throw new Error('No hay usuario autenticado');
    }

    const { username: u, password } = JSON.parse(usuario);
    const basicToken = btoa(`${u}:${password}`);
    const headers = {
      Authorization: `Basic ${basicToken}`
    };

    return this.http.get(`${this.apiUrl}/usuario/${username}/estado/${estado}`, { headers });
  }

  // elimina el libro del usuario actual
  eliminarLibro(id: string): Observable<any> {
  const usuario = localStorage.getItem('usuario');
  if (!usuario) throw new Error('No hay usuario autenticado');

  const { username, password } = JSON.parse(usuario);
  const headers = {
    Authorization: `Basic ${btoa(`${username}:${password}`)}`
  };

  return this.http.delete(`${this.apiUrl}/${id}`, { headers });
}

// Cambia el estado de un libro guardado (ej. de QUIERO_LEER a LEIDO)
actualizarEstadoLibro(id: string, nuevoEstado: string): Observable<any> {
  const usuario = localStorage.getItem('usuario');
  if (!usuario) throw new Error('No hay usuario autenticado');

  const { username, password } = JSON.parse(usuario);
  const headers = {
    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
    'Content-Type': 'application/json'
  };

  return this.http.patch(`${this.apiUrl}/${id}`, { estado: nuevoEstado }, { headers });
}

// Actualiza la página de lectura del libro
actualizarPagina(id: string, nuevaPagina: number): Observable<any> {
  const usuario = localStorage.getItem('usuario');
  if (!usuario) throw new Error('No hay usuario autenticado');

  const { username, password } = JSON.parse(usuario);
  const headers = {
    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
    'Content-Type': 'application/json'
  };

  return this.http.patch(`${this.apiUrl}/${id}`, { pagina: nuevaPagina }, { headers });
}


}
