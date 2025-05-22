// Proyecto: PageMark
// Archivo: search-bar.component.ts
// Descripción: Barra de búsqueda que emite solo si el usuario pulsa Enter.
// Autor: Richard Chadwick Plaza - 2º DAM

import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchInput = new FormControl('');

  @Output() search = new EventEmitter<string>();

  onSearch(): void {
    const value = this.searchInput.value?.trim();
    if (value && value.length >= 3) {
      this.search.emit(value);
    }
  }
}
