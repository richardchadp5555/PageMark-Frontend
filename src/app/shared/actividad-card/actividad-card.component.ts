// Proyecto: PageMark
// Archivo: actividad-card.component.ts
// Descripción: Componente reutilizable para mostrar una entrada del feed de actividad
// Autor: Richard Chadwick Plaza - 2º DAM

import { Component, Input } from '@angular/core';
import { Actividad } from '../../interfaces/actividad.interface';

@Component({
  selector: 'app-actividad-card',
  templateUrl: './actividad-card.component.html',
  styleUrls: ['./actividad-card.component.scss']
})
export class ActividadCardComponent {
  @Input() actividad!: Actividad;
}
