// Proyecto: PageMark
// Archivo: search-bar.component.ts
// Descripción: Barra de búsqueda que redirige a /buscar-libros con queryParams.
// Autor: Richard Chadwick Plaza - 2º DAM

import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchInput = new FormControl('');

  constructor(private router: Router) {}

  // Método que se ejecuta al pulsar Enter
  onSearch(): void {
    const value = this.searchInput.value?.trim();

    // Solo buscar si hay 3 caracteres o más
    if (value && value.length >= 3) {
      this.router.navigate(['/buscar-libros'], {
        queryParams: { q: value }
      });
    }
  }
}
