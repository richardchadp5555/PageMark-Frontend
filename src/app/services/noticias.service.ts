import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticia } from '../interfaces/noticia.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class NoticiaService {
  private apiUrl = `${environment.API_BASE_URL}/noticias`;

  constructor(private http: HttpClient) {}

  obtenerNoticias(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.apiUrl);
  }
}