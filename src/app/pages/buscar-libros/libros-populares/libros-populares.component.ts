// Proyecto: PageMark
// Archivo: libros-populares.component.ts
// Descripción: Componente para mostrar libros populares usando una lista fija del backend
// Autor: Richard Chadwick Plaza - 2º DAM

import { Component, OnInit } from '@angular/core';
import { LibrosService } from 'src/app/services/libros.service';

@Component({
  selector: 'app-libros-populares',
  templateUrl: './libros-populares.component.html',
  styleUrls: ['./libros-populares.component.scss']
})
export class LibrosPopularesComponent implements OnInit {
  librosPopulares: any[] = [];
  isLoading = true;
  error = false;

  constructor(private librosService: LibrosService) {}

  ngOnInit(): void {
    this.librosService.obtenerLibrosPopulares().subscribe({
      next: (data) => {
        console.log('📦 Libros populares recibidos:', data);
        this.librosPopulares = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar libros populares:', err);
        this.error = true;
        this.isLoading = false;
      }
    });
  }
}
