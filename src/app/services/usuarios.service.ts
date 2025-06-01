// Proyecto: PageMark
// Archivo: usuarios.service.ts
// Descripción: Servicio para operaciones relacionadas con usuarios (búsqueda, avatar, etc.)
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

  // URL base del backend (por ejemplo http://localhost:8080/api/usuarios)
  private apiUrl = `${environment.API_BASE_URL}/usuarios`;

  constructor(private http: HttpClient) {}

  // 🔐 MÉTODO PRIVADO que obtiene las credenciales del usuario autenticado desde localStorage
  // Si no hay sesión iniciada lanza un error
  private get usuario(): { username: string, password: string } {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) throw new Error('No hay usuario autenticado');
    return JSON.parse(usuario); // { username: 'richard', password: '...' }
  }

  // 🛡️ MÉTODO PRIVADO que genera las cabeceras de autenticación en formato Basic Auth
  // Se usa en todas las peticiones protegidas al backend
  private get headers(): HttpHeaders {
    const { username, password } = this.usuario;
    return new HttpHeaders({
      Authorization: `Basic ${btoa(`${username}:${password}`)}`
    });
  }

  // 🔎 Buscar usuarios por nombre parcial (público)
  buscarUsuarios(query: string): Observable<UsuarioResumen[]> {
    return this.http.get<UsuarioResumen[]>(`${this.apiUrl}/buscar?query=${query}`, {
      headers: this.headers
    });
  }

  // 🌐 Obtener solo la URL del avatar (cadena con la ruta del archivo, no la imagen)
  obtenerAvatarUrl(username: string): Observable<{ avatarUrl: string }> {
    return this.http.get<{ avatarUrl: string }>(`${this.apiUrl}/avatar-url/${username}`, {
      headers: this.headers
    });
  }

  // ⬆️ Subir imagen de avatar al backend para el usuario dado
  // Se envía como FormData (multipart/form-data)
  subirAvatar(username: string, formData: FormData): Observable<string> {
    return this.http.post(`${this.apiUrl}/avatar/${username}`, formData, {
      headers: this.headers,
      responseType: 'text' // la respuesta es solo la URL como string
    });
  }

  // 🖼️ Obtener la imagen de avatar como BLOB autenticado (no accesible públicamente)
  // Se utiliza para construir un ObjectURL en el frontend
  obtenerImagenAvatar(nombreArchivo: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/avatar-img/${nombreArchivo}`, {
      headers: this.headers,
      responseType: 'blob' // se obtiene un objeto binario (imagen)
    });
  }
}
