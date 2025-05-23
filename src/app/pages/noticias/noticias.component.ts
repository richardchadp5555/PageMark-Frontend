// Proyecto: PageMark
// Archivo: noticias.component.ts
// Descripción: Componente para mostrar noticias literarias desde el backend.
// Autor: Richard Chadwick Plaza
// Fecha: 22/05/2025 - Curso: 2º DAM

import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Noticia } from 'src/app/interfaces/noticia.interface';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  noticias: Noticia[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private noticiaService: NoticiasService) {}

  ngOnInit(): void {
    this.noticiaService.obtenerNoticias().subscribe({
      next: (data: Noticia[]) => {
        this.noticias = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error al cargar noticias:', err);
        this.error = 'No se pudieron cargar las noticias.';
        this.isLoading = false;
      }
    });
  }
}
