// Proyecto: PageMark
// Archivo: selector-usuario.component.ts
// Descripción: Componente para seleccionar un usuario en el panel admin.
// Autor: Richard Chadwick Plaza - 2º DAM

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-selector-usuario',
  templateUrl: './selector-usuario.component.html',
  styleUrls: ['./selector-usuario.component.scss']
})
export class SelectorUsuarioComponent {
  @Input() usuarios: any[] = [];
  @Input() label: string = 'Seleccionar usuario';
  @Output() usuarioSeleccionado = new EventEmitter<any>();

  seleccionar(usuario: any): void {
    this.usuarioSeleccionado.emit(usuario);
  }
}
