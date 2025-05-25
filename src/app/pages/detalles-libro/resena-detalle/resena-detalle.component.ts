// Proyecto: PageMark
// Archivo: resena-detalle.component.ts
// Descripción: Muestra una reseña individual accediendo por su ID
// Autor: Richard Chadwick Plaza - 2º DAM

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResenasService } from 'src/app/services/resenas.service';
import { Resena } from 'src/app/interfaces/resena.interface';

@Component({
  selector: 'app-resena-detalle',
  templateUrl: './resena-detalle.component.html',
  styleUrls: ['./resena-detalle.component.scss']
})
export class ResenaDetalleComponent implements OnInit {
  resena: Resena | null = null;
  isLoading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private resenasService: ResenasService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.resenasService.obtenerResenaPorId(id).subscribe({
        next: (data) => {
          this.resena = data;
          this.isLoading = false;
        },
        error: () => {
          this.error = 'No se pudo cargar la reseña.';
          this.isLoading = false;
        }
      });
    }
  }
}
