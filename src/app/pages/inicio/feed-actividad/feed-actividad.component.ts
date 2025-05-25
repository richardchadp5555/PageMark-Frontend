// Proyecto: PageMark
// Archivo: feed-actividad.component.ts
// Descripción: Componente que muestra el feed de actividad tipo red social con paginación.
// Autor: Richard Chadwick Plaza - 2º DAM

import { Component, OnInit } from '@angular/core';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-feed-actividad',
  templateUrl: './feed-actividad.component.html',
  styleUrls: ['./feed-actividad.component.scss']
})
export class FeedActividadComponent implements OnInit {
  actividades: any[] = [];
  isLoading = true;
  error = '';
  page = 0;
  size = 15;
  cargandoMas = false;
  noHayMas = false;

  constructor(private feedService: FeedService) {}

  ngOnInit(): void {
    this.cargarPagina();
  }

  cargarPagina(): void {
    this.cargandoMas = true;

    this.feedService.obtenerFeed(this.page, this.size).subscribe({
      next: (data) => {
        this.actividades.push(...data.content);
        this.isLoading = false;
        this.cargandoMas = false;

        if (data.content.length < this.size) this.noHayMas = true;
        else this.page++;
      },
      error: () => {
        this.error = 'No se pudo cargar el feed de actividad.';
        this.isLoading = false;
        this.cargandoMas = false;
      }
    });
  }


}
