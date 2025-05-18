import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Noticia } from '../interfaces/noticia.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private apiUrl = `${environment.API_BASE_URL}/noticias/zenda`;

  // Credenciales temporales (hasta tener login funcional)
  private username = 'richard';
  private password = 'Janadama5555';

  constructor(private http: HttpClient) {}

  obtenerNoticias(): Observable<Noticia[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`)
    });

    return this.http.get<Noticia[]>(this.apiUrl, { headers });
  }

  probarZenda(): Observable<string> {
  const headers = new HttpHeaders({
    'Authorization': 'Basic ' + btoa('richard:Janadama5555')
  });

  return this.http.get(`${environment.API_BASE_URL}/noticias/zenda`, {
    headers,
    responseType: 'text'
  });
}

}
