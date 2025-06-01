// Proyecto: PageMark
// Archivo: resena-form.component.ts
// Descripción: Componente para dejar una reseña sobre un libro ya leído.
// Autor: Richard Chadwick Plaza - 2º DAM

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Resena } from 'src/app/interfaces/resena.interface';
import { ResenasService } from 'src/app/services/resenas.service';

@Component({
  selector: 'app-resena-form',
  templateUrl: './resena-form.component.html',
  styleUrls: ['./resena-form.component.scss']
})
export class ResenaFormComponent {
  @Input() libroId!: string;
  @Input() googleBookId!: string;
  @Input() titulo!: string;
  @Input() idUsuario!: string;
  @Input() username!: string;

  @Output() resenaPublicada = new EventEmitter<void>(); // 👈 Evento al publicar

  puntuacion = 0;
  comentario = '';
  mensaje = '';
  enviado = false;

  constructor(private resenasService: ResenasService) {}

  enviarResena() {
    const nuevaResena: Resena = {
      idLibro: this.libroId,
      googleBookId: this.googleBookId,
      idUsuario: this.idUsuario,
      username: this.username,
      puntuacion: this.puntuacion,
      comentario: this.comentario,
      fecha: new Date().toISOString()
    };

    this.resenasService.crearResena(nuevaResena).subscribe({
      next: () => {
        this.enviado = true;
        this.mensaje = '¡Reseña publicada con éxito!';
        this.resenaPublicada.emit(); //  Dispara evento hacia el padre
      },
      error: (err) => {
        this.mensaje = err.status === 409 ? 'Ya has reseñado este libro.' : 'Error al enviar reseña.';
      }
    });
  }
}
