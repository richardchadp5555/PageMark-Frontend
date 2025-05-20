// Proyecto: PageMark
// Archivo: buscar-libros.component.ts
// Descripción: Página para buscar libros a través de Google Books.
// Autor: Richard Chadwick Plaza - 2º DAM

import { Component } from '@angular/core';
import { LibrosService } from '../../services/libros.service';

@Component({
  selector: 'app-buscar-libros',
  templateUrl: './buscar-libros.component.html',
  styleUrls: ['./buscar-libros.component.scss']
})
export class BuscarLibrosComponent {
  libros: any[] = [];

  constructor(private librosService: LibrosService) {}

  onSearch(query: string): void {
    this.librosService.buscarLibros(query).subscribe({
      next: (res: any) => {
        const data = JSON.parse(res); // respuesta stringificada del backend
        this.libros = data.items || [];
      },
      error: () => {
        alert('Error al buscar libros.');
      }
    });
  }
}
