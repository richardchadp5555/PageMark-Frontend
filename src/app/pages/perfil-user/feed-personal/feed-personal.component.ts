// Proyecto: PageMark
// Archivo: feed-personal.component.ts
// Descripción: Feed de actividad personal del usuario autenticado o visitado
// Autor: Richard Chadwick Plaza - 2º DAM

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FeedService } from 'src/app/services/feed.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-feed-personal',
  templateUrl: './feed-personal.component.html',
  styleUrls: ['./feed-personal.component.scss']
})
export class FeedPersonalComponent implements OnChanges {
  @Input() username: string = '';  // Usuario del que se mostrará el feed
  @Input() esMiPerfil: boolean = false;

  actividades: any[] = [];
  isLoading = true;
  cargandoMas = false;
  noHayMas = false;
  error = '';

  page = 0;
  size = 5;

  constructor(private feedService: FeedService,
     private usuariosService: UsuariosService
  ) {}

  // Detecta cambios en el username recibido por @Input
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['username'] && this.username) {
      this.resetearEstado();
      this.cargarPagina();
    }
  }

  // Carga una página más de actividad
  cargarPagina(): void {
    if (this.noHayMas) return;

    this.cargandoMas = true;

    this.feedService.obtenerFeedPaginadoUsuario(this.username, this.page, this.size).subscribe({
      next: (data) => {
        this.actividades = [...this.actividades, ...data.content];
        this.cargandoMas = false;
        this.isLoading = false;
        this.noHayMas = data.content.length < this.size;
        this.page++;
      },
      error: () => {
        this.error = 'Error al cargar la actividad.';
        this.cargandoMas = false;
        this.isLoading = false;
      }
    });
  }

  // Reinicia el estado interno al cambiar de usuario
  private resetearEstado(): void {
    this.actividades = [];
    this.page = 0;
    this.noHayMas = false;
    this.isLoading = true;
    this.error = '';
  }
}
