// Proyecto: PageMark
// Archivo: buscar-libros.component.ts
// Descripción: Página que permite buscar libros mediante Google Books.
// Autor: Richard Chadwick Plaza - 2º DAM

import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../../../services/libros.service';
import { ActivatedRoute } from '@angular/router';
// Interfaces que definen el tipo de resultado devuelto por la API
import { ResultadoBusqueda, LibroGoogle } from '../../../interfaces/libro-google.interface';

@Component({
  selector: 'app-buscar-libros',
  templateUrl: './buscar-libros.component.html',
  styleUrls: ['./buscar-libros.component.scss']
})
export class BuscarLibrosComponent implements OnInit {
  // Lista de libros encontrados en la búsqueda
  libros: LibroGoogle[] = [];

  // Indicador de si hay un error en la búsqueda
  errorBusqueda: boolean = false;

  // Indicador de si se está realizando una búsqueda
  buscando: boolean = false;

  // Parámetros de búsqueda
  q: string = '';
  startIndex: number = 0;
  maxResults: number = 40;

  // Controla si ya no hay más libros que cargar desde la API
  noHayMasResultados: boolean = false;

  // Cantidad total de libros disponibles según la API
  totalItems: number = 0;

  constructor(
    private librosService: LibrosService,
    private route: ActivatedRoute
  ) {}

  // Se ejecuta al cargar el componente
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const q = params['q'];

      if (q && q.trim().length >= 3) {
        this.q = q.trim();
        this.startIndex = 0;
        this.libros = [];
        this.totalItems = 0;
        this.noHayMasResultados = false;
        this.buscarMasLibros();
      }
    });
  }

  // Este método permite buscar más libros con una misma query mediante un botón de "ver más"
  buscarMasLibros(): void {
    this.buscando = true;
    this.errorBusqueda = false;
  
    this.librosService.buscarLibros(this.q, this.maxResults, this.startIndex).subscribe({
      next: (res: ResultadoBusqueda) => {
        const nuevos = res.items || [];
  
        // Concatenamos sin borrar los anteriores
        this.libros = [...this.libros, ...nuevos];
        this.buscando = false;
  
        // Solo una vez, guardamos el total de libros reportado por la API
        if (this.startIndex === 0) {
          this.totalItems = res.totalItems || 0;
        }
  
        // Actualizamos el índice para la siguiente página
        this.startIndex += this.maxResults;
  
        // ✅ Comprobamos si ya no hay más resultados
        if (this.startIndex >= this.totalItems || nuevos.length === 0) {
          this.noHayMasResultados = true;
        }
      },
      error: () => {
        this.errorBusqueda = true;
        this.buscando = false;
      }
    });
  }
  

  
}
