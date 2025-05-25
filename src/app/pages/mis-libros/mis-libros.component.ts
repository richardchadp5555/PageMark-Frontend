// Proyecto: PageMark
// Archivo: mis-libros.component.ts
// Descripción: Muestra los libros del usuario agrupados por estado: "QUIERO_LEER", "LEYENDO" y "LEIDO"
// Autor: Richard Chadwick Plaza - 2º DAM

import { Component, OnInit } from '@angular/core';
import { LibrosService } from 'src/app/services/libros.service';

@Component({
  selector: 'app-mis-libros',
  templateUrl: './mis-libros.component.html',
  styleUrls: ['./mis-libros.component.scss']
})
export class MisLibrosComponent implements OnInit {
  quieroLeer: any[] = [];
  leyendo: any[] = [];
  leido: any[] = [];

  isLoading: boolean = true;
  error: string = '';

  constructor(private librosService: LibrosService) {}

  ngOnInit(): void {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
      this.error = 'No has iniciado sesión.';
      this.isLoading = false;
      return;
    }

    const { username } = JSON.parse(usuario);

    Promise.all([
      this.librosService.obtenerLibrosPorEstado(username, 'QUIERO_LEER').toPromise(),
      this.librosService.obtenerLibrosPorEstado(username, 'LEYENDO').toPromise(),
      this.librosService.obtenerLibrosPorEstado(username, 'LEIDO').toPromise()
    ])
    .then(([quieroLeer, leyendo, leido]) => {
      this.quieroLeer = quieroLeer;
      this.leyendo = leyendo;
      this.leido = leido;
      this.isLoading = false;
    })
    .catch(() => {
      this.error = 'Error al cargar tus libros.';
      this.isLoading = false;
    });
  }
}
